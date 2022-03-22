// Code generated by go-swagger; DO NOT EDIT.

package component

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"fmt"
	"io"

	"github.com/go-openapi/runtime"
	"github.com/go-openapi/strfmt"

	"github.com/cmsgov/mint-app/pkg/cedar/core/gen/models"
)

// ComponentFindReader is a Reader for the ComponentFind structure.
type ComponentFindReader struct {
	formats strfmt.Registry
}

// ReadResponse reads a server response into the received o.
func (o *ComponentFindReader) ReadResponse(response runtime.ClientResponse, consumer runtime.Consumer) (interface{}, error) {
	switch response.Code() {
	case 200:
		result := NewComponentFindOK()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return result, nil
	case 400:
		result := NewComponentFindBadRequest()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	case 401:
		result := NewComponentFindUnauthorized()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	case 500:
		result := NewComponentFindInternalServerError()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	default:
		return nil, runtime.NewAPIError("response status code does not match any response statuses defined for this endpoint in the swagger spec", response, response.Code())
	}
}

// NewComponentFindOK creates a ComponentFindOK with default headers values
func NewComponentFindOK() *ComponentFindOK {
	return &ComponentFindOK{}
}

/* ComponentFindOK describes a response with status code 200, with default header values.

OK
*/
type ComponentFindOK struct {
	Payload *models.ComponentFindResponse
}

func (o *ComponentFindOK) Error() string {
	return fmt.Sprintf("[GET /component][%d] componentFindOK  %+v", 200, o.Payload)
}
func (o *ComponentFindOK) GetPayload() *models.ComponentFindResponse {
	return o.Payload
}

func (o *ComponentFindOK) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.ComponentFindResponse)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewComponentFindBadRequest creates a ComponentFindBadRequest with default headers values
func NewComponentFindBadRequest() *ComponentFindBadRequest {
	return &ComponentFindBadRequest{}
}

/* ComponentFindBadRequest describes a response with status code 400, with default header values.

Bad Request
*/
type ComponentFindBadRequest struct {
	Payload *models.Response
}

func (o *ComponentFindBadRequest) Error() string {
	return fmt.Sprintf("[GET /component][%d] componentFindBadRequest  %+v", 400, o.Payload)
}
func (o *ComponentFindBadRequest) GetPayload() *models.Response {
	return o.Payload
}

func (o *ComponentFindBadRequest) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewComponentFindUnauthorized creates a ComponentFindUnauthorized with default headers values
func NewComponentFindUnauthorized() *ComponentFindUnauthorized {
	return &ComponentFindUnauthorized{}
}

/* ComponentFindUnauthorized describes a response with status code 401, with default header values.

Access Denied
*/
type ComponentFindUnauthorized struct {
	Payload *models.Response
}

func (o *ComponentFindUnauthorized) Error() string {
	return fmt.Sprintf("[GET /component][%d] componentFindUnauthorized  %+v", 401, o.Payload)
}
func (o *ComponentFindUnauthorized) GetPayload() *models.Response {
	return o.Payload
}

func (o *ComponentFindUnauthorized) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewComponentFindInternalServerError creates a ComponentFindInternalServerError with default headers values
func NewComponentFindInternalServerError() *ComponentFindInternalServerError {
	return &ComponentFindInternalServerError{}
}

/* ComponentFindInternalServerError describes a response with status code 500, with default header values.

Internal Server Error
*/
type ComponentFindInternalServerError struct {
	Payload *models.Response
}

func (o *ComponentFindInternalServerError) Error() string {
	return fmt.Sprintf("[GET /component][%d] componentFindInternalServerError  %+v", 500, o.Payload)
}
func (o *ComponentFindInternalServerError) GetPayload() *models.Response {
	return o.Payload
}

func (o *ComponentFindInternalServerError) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}
