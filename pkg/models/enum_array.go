package models

import (
	"bytes"
	"database/sql/driver"
	"strings"

	"errors"
	"fmt"

	"github.com/99designs/gqlgen/graphql"
)

// EnumString is a string that can be converted to an Enum
type EnumString string

// EnumArray is an array of EnumString
type EnumArray []EnumString

// type ArrayEnum[T []string] []string

// []string

// MarshalEnumArray allows an EnumArray to be marshalled by graphql
func MarshalEnumArray(array EnumArray) graphql.Marshaler {
	// return graphql.MarshalString(array)
	return graphql.MarshalAny(array)
}

// UnmarshalEnumArray allows an EnumArray to be unmarshalled by graphql
func UnmarshalEnumArray(v interface{}) (EnumArray, error) {
	idAsString, ok := v.(EnumArray)
	if !ok {
		return EnumArray{}, errors.New("not a valid EnumArray")
	}
	return idAsString, nil
}

//GenericScan provides functionality
func GenericScan[ArrayType ~[]memberType, memberType ~string](src interface{}, array *ArrayType) error {
	switch src := src.(type) {
	case []byte:
		// return array.scanBytes(src)
		// return scanBytes[ArrayType, memberType](src, array)
		return scanBytes(src, array)
	case string:
		// return array.scanBytes([]byte(src))
		// return scanBytes[ArrayType, memberType]([]byte(src), array)
		return scanBytes([]byte(src), array)
	case nil:
		*array = nil
		return nil
	}

	return fmt.Errorf("generic scan: cannot convert %T to an EnumArray", src)
	//todo call the scan functions here

}

// GenericValue implements the driver.Valuer interface.
func GenericValue[ArrayType ~[]memberType, memberType ~string](a ArrayType) (driver.Value, error) {
	if a == nil {
		return nil, nil
	}

	if n := len(a); n > 0 {
		// There will be at least two curly brackets, 2*N bytes of quotes,
		// and N-1 bytes of delimiters.
		b := make([]byte, 1, 1+3*n)
		b[0] = '{'

		b = appendArrayQuotedBytes(b, []byte(a[0]))
		for i := 1; i < n; i++ {
			b = append(b, ',')
			b = appendArrayQuotedBytes(b, []byte(a[i]))
		}

		return string(append(b, '}')), nil
	}

	return "{}", nil

}

func scanBytes[ArrayType ~[]memberType, memberType ~string](src []byte, a *ArrayType) error { //Should this be a bpoint
	elems, err := scanLinearArray(src, []byte{','}, "StringArray")
	if err != nil {
		return err
	}
	if a != nil && len(elems) == 0 {
		*a = (*a)[:0]
	} else {
		b := make(ArrayType, len(elems))
		for i, v := range elems {
			if b[i] = memberType(v); v == nil { //TODO, we can't use memberType here.... will this work?
				return fmt.Errorf(" parsing array element index %d: cannot convert nil to string", i)
			}
		}
		*a = b
	}
	return nil
}
func appendArrayQuotedBytes(b, v []byte) []byte {
	b = append(b, '"')
	for {
		i := bytes.IndexAny(v, `"\`)
		if i < 0 {
			b = append(b, v...)
			break
		}
		if i > 0 {
			b = append(b, v[:i]...)
		}
		b = append(b, '\\', v[i])
		v = v[i+1:]
	}
	return append(b, '"')
}

//Taken from pq.string Array
// parseArray extracts the dimensions and elements of an array represented in
// text format. Only representations emitted by the backend are supported.
// Notably, whitespace around brackets and delimiters is significant, and NULL
// is case-sensitive.
//
// See http://www.postgresql.org/docs/current/static/arrays.html#ARRAYS-IO
func parseArray(src, del []byte) (dims []int, elems [][]byte, err error) {
	var depth, i int

	if len(src) < 1 || src[0] != '{' {
		return nil, nil, fmt.Errorf(" unable to parse array; expected %q at offset %d", '{', 0)
	}

Open:
	for i < len(src) {
		switch src[i] {
		case '{':
			depth++
			i++
		case '}':
			elems = make([][]byte, 0)
			goto Close
		default:
			break Open
		}
	}
	dims = make([]int, i)

Element:
	for i < len(src) {
		switch src[i] {
		case '{':
			if depth == len(dims) {
				break Element
			}
			depth++
			dims[depth-1] = 0
			i++
		case '"':
			var elem = []byte{}
			var escape bool
			for i++; i < len(src); i++ {
				if escape {
					elem = append(elem, src[i])
					escape = false
				} else {
					switch src[i] {
					default:
						elem = append(elem, src[i])
					case '\\':
						escape = true
					case '"':
						elems = append(elems, elem)
						i++
						break Element
					}
				}
			}
		default:
			for start := i; i < len(src); i++ {
				if bytes.HasPrefix(src[i:], del) || src[i] == '}' {
					elem := src[start:i]
					if len(elem) == 0 {
						return nil, nil, fmt.Errorf(" unable to parse array; unexpected %q at offset %d", src[i], i)
					}
					if bytes.Equal(elem, []byte("NULL")) {
						elem = nil
					}
					elems = append(elems, elem)
					break Element
				}
			}
		}
	}

	for i < len(src) {
		if bytes.HasPrefix(src[i:], del) && depth > 0 {
			dims[depth-1]++
			i += len(del)
			goto Element
		} else if src[i] == '}' && depth > 0 {
			dims[depth-1]++
			depth--
			i++
		} else {
			return nil, nil, fmt.Errorf(" unable to parse array; unexpected %q at offset %d", src[i], i)
		}
	}

Close:
	for i < len(src) {
		if src[i] == '}' && depth > 0 {
			depth--
			i++
		} else {
			return nil, nil, fmt.Errorf(" unable to parse array; unexpected %q at offset %d", src[i], i)
		}
	}
	if depth > 0 {
		err = fmt.Errorf(" unable to parse array; expected %q at offset %d", '}', i)
	}
	if err == nil {
		for _, d := range dims {
			if (len(elems) % d) != 0 {
				err = fmt.Errorf(" multidimensional arrays must have elements with matching dimensions")
			}
		}
	}
	return
}

func scanLinearArray(src, del []byte, typ string) (elems [][]byte, err error) {
	dims, elems, err := parseArray(src, del)
	if err != nil {
		return nil, err
	}
	if len(dims) > 1 {
		return nil, fmt.Errorf(" cannot convert ARRAY%s to %s", strings.Replace(fmt.Sprint(dims), " ", "][", -1), typ)
	}
	return elems, err
}
