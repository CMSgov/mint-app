// Code generated by go-swagger; DO NOT EDIT.

package role

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"fmt"
	"io"

	"github.com/go-openapi/runtime"
	"github.com/go-openapi/strfmt"

	"github.com/cmsgov/mint-app/pkg/cedar/core/gen/models"
)

// RoleTypeFindReader is a Reader for the RoleTypeFind structure.
type RoleTypeFindReader struct {
	formats strfmt.Registry
}

// ReadResponse reads a server response into the received o.
func (o *RoleTypeFindReader) ReadResponse(response runtime.ClientResponse, consumer runtime.Consumer) (interface{}, error) {
	switch response.Code() {
	case 200:
		result := NewRoleTypeFindOK()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return result, nil
	case 400:
		result := NewRoleTypeFindBadRequest()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	case 401:
		result := NewRoleTypeFindUnauthorized()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	case 404:
		result := NewRoleTypeFindNotFound()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	case 500:
		result := NewRoleTypeFindInternalServerError()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	default:
		return nil, runtime.NewAPIError("response status code does not match any response statuses defined for this endpoint in the swagger spec", response, response.Code())
	}
}

// NewRoleTypeFindOK creates a RoleTypeFindOK with default headers values
func NewRoleTypeFindOK() *RoleTypeFindOK {
	return &RoleTypeFindOK{}
}

/* RoleTypeFindOK describes a response with status code 200, with default header values.

OK
*/
type RoleTypeFindOK struct {
	Payload *models.RoleTypeFindResponse
}

func (o *RoleTypeFindOK) Error() string {
	return fmt.Sprintf("[GET /role/type/{application}][%d] roleTypeFindOK  %+v", 200, o.Payload)
}
func (o *RoleTypeFindOK) GetPayload() *models.RoleTypeFindResponse {
	return o.Payload
}

func (o *RoleTypeFindOK) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.RoleTypeFindResponse)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewRoleTypeFindBadRequest creates a RoleTypeFindBadRequest with default headers values
func NewRoleTypeFindBadRequest() *RoleTypeFindBadRequest {
	return &RoleTypeFindBadRequest{}
}

/* RoleTypeFindBadRequest describes a response with status code 400, with default header values.

Bad Request
*/
type RoleTypeFindBadRequest struct {
	Payload *models.Response
}

func (o *RoleTypeFindBadRequest) Error() string {
	return fmt.Sprintf("[GET /role/type/{application}][%d] roleTypeFindBadRequest  %+v", 400, o.Payload)
}
func (o *RoleTypeFindBadRequest) GetPayload() *models.Response {
	return o.Payload
}

func (o *RoleTypeFindBadRequest) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewRoleTypeFindUnauthorized creates a RoleTypeFindUnauthorized with default headers values
func NewRoleTypeFindUnauthorized() *RoleTypeFindUnauthorized {
	return &RoleTypeFindUnauthorized{}
}

/* RoleTypeFindUnauthorized describes a response with status code 401, with default header values.

Access Denied
*/
type RoleTypeFindUnauthorized struct {
	Payload *models.Response
}

func (o *RoleTypeFindUnauthorized) Error() string {
	return fmt.Sprintf("[GET /role/type/{application}][%d] roleTypeFindUnauthorized  %+v", 401, o.Payload)
}
func (o *RoleTypeFindUnauthorized) GetPayload() *models.Response {
	return o.Payload
}

func (o *RoleTypeFindUnauthorized) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewRoleTypeFindNotFound creates a RoleTypeFindNotFound with default headers values
func NewRoleTypeFindNotFound() *RoleTypeFindNotFound {
	return &RoleTypeFindNotFound{}
}

/* RoleTypeFindNotFound describes a response with status code 404, with default header values.

Not Found
*/
type RoleTypeFindNotFound struct {
	Payload *models.Response
}

func (o *RoleTypeFindNotFound) Error() string {
	return fmt.Sprintf("[GET /role/type/{application}][%d] roleTypeFindNotFound  %+v", 404, o.Payload)
}
func (o *RoleTypeFindNotFound) GetPayload() *models.Response {
	return o.Payload
}

func (o *RoleTypeFindNotFound) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewRoleTypeFindInternalServerError creates a RoleTypeFindInternalServerError with default headers values
func NewRoleTypeFindInternalServerError() *RoleTypeFindInternalServerError {
	return &RoleTypeFindInternalServerError{}
}

/* RoleTypeFindInternalServerError describes a response with status code 500, with default header values.

Internal Server Error
*/
type RoleTypeFindInternalServerError struct {
	Payload *models.Response
}

func (o *RoleTypeFindInternalServerError) Error() string {
	return fmt.Sprintf("[GET /role/type/{application}][%d] roleTypeFindInternalServerError  %+v", 500, o.Payload)
}
func (o *RoleTypeFindInternalServerError) GetPayload() *models.Response {
	return o.Payload
}

func (o *RoleTypeFindInternalServerError) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}
