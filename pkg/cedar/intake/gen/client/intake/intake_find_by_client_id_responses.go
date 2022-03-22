// Code generated by go-swagger; DO NOT EDIT.

package intake

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"fmt"
	"io"

	"github.com/go-openapi/runtime"
	"github.com/go-openapi/strfmt"

	"github.com/cmsgov/mint-app/pkg/cedar/intake/gen/models"
)

// IntakeFindByClientIDReader is a Reader for the IntakeFindByClientID structure.
type IntakeFindByClientIDReader struct {
	formats strfmt.Registry
}

// ReadResponse reads a server response into the received o.
func (o *IntakeFindByClientIDReader) ReadResponse(response runtime.ClientResponse, consumer runtime.Consumer) (interface{}, error) {
	switch response.Code() {
	case 200:
		result := NewIntakeFindByClientIDOK()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return result, nil
	case 400:
		result := NewIntakeFindByClientIDBadRequest()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	case 401:
		result := NewIntakeFindByClientIDUnauthorized()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	case 500:
		result := NewIntakeFindByClientIDInternalServerError()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	default:
		return nil, runtime.NewAPIError("response status code does not match any response statuses defined for this endpoint in the swagger spec", response, response.Code())
	}
}

// NewIntakeFindByClientIDOK creates a IntakeFindByClientIDOK with default headers values
func NewIntakeFindByClientIDOK() *IntakeFindByClientIDOK {
	return &IntakeFindByClientIDOK{}
}

/* IntakeFindByClientIDOK describes a response with status code 200, with default header values.

OK
*/
type IntakeFindByClientIDOK struct {
	Payload *models.Intake
}

func (o *IntakeFindByClientIDOK) Error() string {
	return fmt.Sprintf("[GET /intake/client/{id}][%d] intakeFindByClientIdOK  %+v", 200, o.Payload)
}
func (o *IntakeFindByClientIDOK) GetPayload() *models.Intake {
	return o.Payload
}

func (o *IntakeFindByClientIDOK) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Intake)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewIntakeFindByClientIDBadRequest creates a IntakeFindByClientIDBadRequest with default headers values
func NewIntakeFindByClientIDBadRequest() *IntakeFindByClientIDBadRequest {
	return &IntakeFindByClientIDBadRequest{}
}

/* IntakeFindByClientIDBadRequest describes a response with status code 400, with default header values.

Bad Request
*/
type IntakeFindByClientIDBadRequest struct {
	Payload *models.Response
}

func (o *IntakeFindByClientIDBadRequest) Error() string {
	return fmt.Sprintf("[GET /intake/client/{id}][%d] intakeFindByClientIdBadRequest  %+v", 400, o.Payload)
}
func (o *IntakeFindByClientIDBadRequest) GetPayload() *models.Response {
	return o.Payload
}

func (o *IntakeFindByClientIDBadRequest) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewIntakeFindByClientIDUnauthorized creates a IntakeFindByClientIDUnauthorized with default headers values
func NewIntakeFindByClientIDUnauthorized() *IntakeFindByClientIDUnauthorized {
	return &IntakeFindByClientIDUnauthorized{}
}

/* IntakeFindByClientIDUnauthorized describes a response with status code 401, with default header values.

Access Denied
*/
type IntakeFindByClientIDUnauthorized struct {
	Payload *models.Response
}

func (o *IntakeFindByClientIDUnauthorized) Error() string {
	return fmt.Sprintf("[GET /intake/client/{id}][%d] intakeFindByClientIdUnauthorized  %+v", 401, o.Payload)
}
func (o *IntakeFindByClientIDUnauthorized) GetPayload() *models.Response {
	return o.Payload
}

func (o *IntakeFindByClientIDUnauthorized) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewIntakeFindByClientIDInternalServerError creates a IntakeFindByClientIDInternalServerError with default headers values
func NewIntakeFindByClientIDInternalServerError() *IntakeFindByClientIDInternalServerError {
	return &IntakeFindByClientIDInternalServerError{}
}

/* IntakeFindByClientIDInternalServerError describes a response with status code 500, with default header values.

Internal Server Error
*/
type IntakeFindByClientIDInternalServerError struct {
	Payload *models.Response
}

func (o *IntakeFindByClientIDInternalServerError) Error() string {
	return fmt.Sprintf("[GET /intake/client/{id}][%d] intakeFindByClientIdInternalServerError  %+v", 500, o.Payload)
}
func (o *IntakeFindByClientIDInternalServerError) GetPayload() *models.Response {
	return o.Payload
}

func (o *IntakeFindByClientIDInternalServerError) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}
