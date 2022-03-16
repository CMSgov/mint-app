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

// IntakeAddReader is a Reader for the IntakeAdd structure.
type IntakeAddReader struct {
	formats strfmt.Registry
}

// ReadResponse reads a server response into the received o.
func (o *IntakeAddReader) ReadResponse(response runtime.ClientResponse, consumer runtime.Consumer) (interface{}, error) {
	switch response.Code() {
	case 200:
		result := NewIntakeAddOK()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return result, nil
	case 400:
		result := NewIntakeAddBadRequest()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	case 401:
		result := NewIntakeAddUnauthorized()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	case 500:
		result := NewIntakeAddInternalServerError()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	default:
		return nil, runtime.NewAPIError("response status code does not match any response statuses defined for this endpoint in the swagger spec", response, response.Code())
	}
}

// NewIntakeAddOK creates a IntakeAddOK with default headers values
func NewIntakeAddOK() *IntakeAddOK {
	return &IntakeAddOK{}
}

/* IntakeAddOK describes a response with status code 200, with default header values.

OK
*/
type IntakeAddOK struct {
	Payload *models.Response
}

func (o *IntakeAddOK) Error() string {
	return fmt.Sprintf("[POST /intake][%d] intakeAddOK  %+v", 200, o.Payload)
}
func (o *IntakeAddOK) GetPayload() *models.Response {
	return o.Payload
}

func (o *IntakeAddOK) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewIntakeAddBadRequest creates a IntakeAddBadRequest with default headers values
func NewIntakeAddBadRequest() *IntakeAddBadRequest {
	return &IntakeAddBadRequest{}
}

/* IntakeAddBadRequest describes a response with status code 400, with default header values.

Bad Request
*/
type IntakeAddBadRequest struct {
	Payload *models.Response
}

func (o *IntakeAddBadRequest) Error() string {
	return fmt.Sprintf("[POST /intake][%d] intakeAddBadRequest  %+v", 400, o.Payload)
}
func (o *IntakeAddBadRequest) GetPayload() *models.Response {
	return o.Payload
}

func (o *IntakeAddBadRequest) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewIntakeAddUnauthorized creates a IntakeAddUnauthorized with default headers values
func NewIntakeAddUnauthorized() *IntakeAddUnauthorized {
	return &IntakeAddUnauthorized{}
}

/* IntakeAddUnauthorized describes a response with status code 401, with default header values.

Access Denied
*/
type IntakeAddUnauthorized struct {
	Payload *models.Response
}

func (o *IntakeAddUnauthorized) Error() string {
	return fmt.Sprintf("[POST /intake][%d] intakeAddUnauthorized  %+v", 401, o.Payload)
}
func (o *IntakeAddUnauthorized) GetPayload() *models.Response {
	return o.Payload
}

func (o *IntakeAddUnauthorized) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewIntakeAddInternalServerError creates a IntakeAddInternalServerError with default headers values
func NewIntakeAddInternalServerError() *IntakeAddInternalServerError {
	return &IntakeAddInternalServerError{}
}

/* IntakeAddInternalServerError describes a response with status code 500, with default header values.

Internal Server Error
*/
type IntakeAddInternalServerError struct {
	Payload *models.Response
}

func (o *IntakeAddInternalServerError) Error() string {
	return fmt.Sprintf("[POST /intake][%d] intakeAddInternalServerError  %+v", 500, o.Payload)
}
func (o *IntakeAddInternalServerError) GetPayload() *models.Response {
	return o.Payload
}

func (o *IntakeAddInternalServerError) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}
