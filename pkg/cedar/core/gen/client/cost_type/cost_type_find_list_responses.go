// Code generated by go-swagger; DO NOT EDIT.

package cost_type

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"fmt"
	"io"

	"github.com/go-openapi/runtime"
	"github.com/go-openapi/strfmt"

	"github.com/cmsgov/mint-app/pkg/cedar/core/gen/models"
)

// CostTypeFindListReader is a Reader for the CostTypeFindList structure.
type CostTypeFindListReader struct {
	formats strfmt.Registry
}

// ReadResponse reads a server response into the received o.
func (o *CostTypeFindListReader) ReadResponse(response runtime.ClientResponse, consumer runtime.Consumer) (interface{}, error) {
	switch response.Code() {
	case 200:
		result := NewCostTypeFindListOK()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return result, nil
	case 400:
		result := NewCostTypeFindListBadRequest()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	case 401:
		result := NewCostTypeFindListUnauthorized()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	case 500:
		result := NewCostTypeFindListInternalServerError()
		if err := result.readResponse(response, consumer, o.formats); err != nil {
			return nil, err
		}
		return nil, result
	default:
		return nil, runtime.NewAPIError("response status code does not match any response statuses defined for this endpoint in the swagger spec", response, response.Code())
	}
}

// NewCostTypeFindListOK creates a CostTypeFindListOK with default headers values
func NewCostTypeFindListOK() *CostTypeFindListOK {
	return &CostTypeFindListOK{}
}

/* CostTypeFindListOK describes a response with status code 200, with default header values.

OK
*/
type CostTypeFindListOK struct {
	Payload *models.CostTypeFindResponse
}

func (o *CostTypeFindListOK) Error() string {
	return fmt.Sprintf("[GET /costType][%d] costTypeFindListOK  %+v", 200, o.Payload)
}
func (o *CostTypeFindListOK) GetPayload() *models.CostTypeFindResponse {
	return o.Payload
}

func (o *CostTypeFindListOK) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.CostTypeFindResponse)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewCostTypeFindListBadRequest creates a CostTypeFindListBadRequest with default headers values
func NewCostTypeFindListBadRequest() *CostTypeFindListBadRequest {
	return &CostTypeFindListBadRequest{}
}

/* CostTypeFindListBadRequest describes a response with status code 400, with default header values.

Bad Request
*/
type CostTypeFindListBadRequest struct {
	Payload *models.Response
}

func (o *CostTypeFindListBadRequest) Error() string {
	return fmt.Sprintf("[GET /costType][%d] costTypeFindListBadRequest  %+v", 400, o.Payload)
}
func (o *CostTypeFindListBadRequest) GetPayload() *models.Response {
	return o.Payload
}

func (o *CostTypeFindListBadRequest) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewCostTypeFindListUnauthorized creates a CostTypeFindListUnauthorized with default headers values
func NewCostTypeFindListUnauthorized() *CostTypeFindListUnauthorized {
	return &CostTypeFindListUnauthorized{}
}

/* CostTypeFindListUnauthorized describes a response with status code 401, with default header values.

Access Denied
*/
type CostTypeFindListUnauthorized struct {
	Payload *models.Response
}

func (o *CostTypeFindListUnauthorized) Error() string {
	return fmt.Sprintf("[GET /costType][%d] costTypeFindListUnauthorized  %+v", 401, o.Payload)
}
func (o *CostTypeFindListUnauthorized) GetPayload() *models.Response {
	return o.Payload
}

func (o *CostTypeFindListUnauthorized) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}

// NewCostTypeFindListInternalServerError creates a CostTypeFindListInternalServerError with default headers values
func NewCostTypeFindListInternalServerError() *CostTypeFindListInternalServerError {
	return &CostTypeFindListInternalServerError{}
}

/* CostTypeFindListInternalServerError describes a response with status code 500, with default header values.

Internal Server Error
*/
type CostTypeFindListInternalServerError struct {
	Payload *models.Response
}

func (o *CostTypeFindListInternalServerError) Error() string {
	return fmt.Sprintf("[GET /costType][%d] costTypeFindListInternalServerError  %+v", 500, o.Payload)
}
func (o *CostTypeFindListInternalServerError) GetPayload() *models.Response {
	return o.Payload
}

func (o *CostTypeFindListInternalServerError) readResponse(response runtime.ClientResponse, consumer runtime.Consumer, formats strfmt.Registry) error {

	o.Payload = new(models.Response)

	// response payload
	if err := consumer.Consume(response.Body(), o.Payload); err != nil && err != io.EOF {
		return err
	}

	return nil
}
