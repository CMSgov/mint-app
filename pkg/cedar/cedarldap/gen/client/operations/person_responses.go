// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"fmt"
	"io"

	"github.com/go-openapi/runtime"
	"github.com/go-openapi/strfmt"

	"github.com/cmsgov/mint-app/pkg/cedar/cedarldap/gen/models"
)

// PersonReader is a Reader for the Person structure.
type PersonReader struct {
	formats strfmt.Registry
}

// ReadResponse reads a server response into the received o.
func (o *PersonReader) ReadResponse(response runtime.ClientResponse, consumer runtime.Consumer) (interface{}, error) {
	switch response.Code() {
	case 200:
		result := NewPersonOK()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return result, nil
	case 400:
		result := NewPersonBadRequest()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	case 401:
		result := NewPersonUnauthorized()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	case 500:
		result := NewPersonInternalServerError()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	default:
		return nil, runtime.NewAPIError("response status code does not match any response statuses defined for this endpoint in the swagger spec", response, response.Code())
	}
}

// NewPersonOK creates a PersonOK with default headers values
func NewPersonOK() *PersonOK {
	return &PersonOK{}
}

/* PersonOK describes a response with status code 200, with default header values.

OK
*/
type PersonOK struct {
	Payload *models.PersonList
}

func (o *PersonOK) Error() string {
	return fmt.Sprintf("[GET /person][%d] personOK  %+v", 200, o.Payload)
}
func (o *PersonOK) GetPayload() *models.PersonList {
	return o.Payload
}

func (o *PersonOK) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.PersonList)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewPersonBadRequest creates a PersonBadRequest with default headers values
func NewPersonBadRequest() *PersonBadRequest {
	return &PersonBadRequest{}
}

/* PersonBadRequest describes a response with status code 400, with default header values.

Bad Request
*/
type PersonBadRequest struct {
	Payload *models.Response
}

func (o *PersonBadRequest) Error() string {
	return fmt.Sprintf("[GET /person][%d] personBadRequest  %+v", 400, o.Payload)
}
func (o *PersonBadRequest) GetPayload() *models.Response {
	return o.Payload
}

func (o *PersonBadRequest) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewPersonUnauthorized creates a PersonUnauthorized with default headers values
func NewPersonUnauthorized() *PersonUnauthorized {
	return &PersonUnauthorized{}
}

/* PersonUnauthorized describes a response with status code 401, with default header values.

Access Denied
*/
type PersonUnauthorized struct {
	Payload *models.Response
}

func (o *PersonUnauthorized) Error() string {
	return fmt.Sprintf("[GET /person][%d] personUnauthorized  %+v", 401, o.Payload)
}
func (o *PersonUnauthorized) GetPayload() *models.Response {
	return o.Payload
}

func (o *PersonUnauthorized) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewPersonInternalServerError creates a PersonInternalServerError with default headers values
func NewPersonInternalServerError() *PersonInternalServerError {
	return &PersonInternalServerError{}
}

/* PersonInternalServerError describes a response with status code 500, with default header values.

Internal Server Error
*/
type PersonInternalServerError struct {
	Payload *models.Response
}

func (o *PersonInternalServerError) Error() string {
	return fmt.Sprintf("[GET /person][%d] personInternalServerError  %+v", 500, o.Payload)
}
func (o *PersonInternalServerError) GetPayload() *models.Response {
	return o.Payload
}

func (o *PersonInternalServerError) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}
