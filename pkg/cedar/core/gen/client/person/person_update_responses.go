// Code generated by go-swagger; DO NOT EDIT.

package person

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"fmt"
	"io"

	"github.com/go-openapi/runtime"
	"github.com/go-openapi/strfmt"

	"github.com/cmsgov/mint-app/pkg/cedar/core/gen/models"
)

// PersonUpdateReader is a Reader for the PersonUpdate structure.
type PersonUpdateReader struct {
	formats strfmt.Registry
}

// ReadResponse reads a server response into the received o.
func (o *PersonUpdateReader) ReadResponse(response runtime.ClientResponse, consumer runtime.Consumer) (interface{}, error) {
	switch response.Code() {
	case 200:
		result := NewPersonUpdateOK()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return result, nil
	case 400:
		result := NewPersonUpdateBadRequest()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	case 401:
		result := NewPersonUpdateUnauthorized()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	case 500:
		result := NewPersonUpdateInternalServerError()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	default:
		return nil, runtime.NewAPIError("response status code does not match any response statuses defined for this endpoint in the swagger spec", response, response.Code())
	}
}

// NewPersonUpdateOK creates a PersonUpdateOK with default headers values
func NewPersonUpdateOK() *PersonUpdateOK {
	return &PersonUpdateOK{}
}

/* PersonUpdateOK describes a response with status code 200, with default header values.

OK
*/
type PersonUpdateOK struct {
	Payload *models.Response
}

func (o *PersonUpdateOK) Error() string {
	return fmt.Sprintf("[PUT /person][%d] personUpdateOK  %+v", 200, o.Payload)
}
func (o *PersonUpdateOK) GetPayload() *models.Response {
	return o.Payload
}

func (o *PersonUpdateOK) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewPersonUpdateBadRequest creates a PersonUpdateBadRequest with default headers values
func NewPersonUpdateBadRequest() *PersonUpdateBadRequest {
	return &PersonUpdateBadRequest{}
}

/* PersonUpdateBadRequest describes a response with status code 400, with default header values.

Bad Request
*/
type PersonUpdateBadRequest struct {
	Payload *models.Response
}

func (o *PersonUpdateBadRequest) Error() string {
	return fmt.Sprintf("[PUT /person][%d] personUpdateBadRequest  %+v", 400, o.Payload)
}
func (o *PersonUpdateBadRequest) GetPayload() *models.Response {
	return o.Payload
}

func (o *PersonUpdateBadRequest) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewPersonUpdateUnauthorized creates a PersonUpdateUnauthorized with default headers values
func NewPersonUpdateUnauthorized() *PersonUpdateUnauthorized {
	return &PersonUpdateUnauthorized{}
}

/* PersonUpdateUnauthorized describes a response with status code 401, with default header values.

Access Denied
*/
type PersonUpdateUnauthorized struct {
	Payload *models.Response
}

func (o *PersonUpdateUnauthorized) Error() string {
	return fmt.Sprintf("[PUT /person][%d] personUpdateUnauthorized  %+v", 401, o.Payload)
}
func (o *PersonUpdateUnauthorized) GetPayload() *models.Response {
	return o.Payload
}

func (o *PersonUpdateUnauthorized) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewPersonUpdateInternalServerError creates a PersonUpdateInternalServerError with default headers values
func NewPersonUpdateInternalServerError() *PersonUpdateInternalServerError {
	return &PersonUpdateInternalServerError{}
}

/* PersonUpdateInternalServerError describes a response with status code 500, with default header values.

Internal Server Error
*/
type PersonUpdateInternalServerError struct {
	Payload *models.Response
}

func (o *PersonUpdateInternalServerError) Error() string {
	return fmt.Sprintf("[PUT /person][%d] personUpdateInternalServerError  %+v", 500, o.Payload)
}
func (o *PersonUpdateInternalServerError) GetPayload() *models.Response {
	return o.Payload
}

func (o *PersonUpdateInternalServerError) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}
