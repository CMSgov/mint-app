// Code generated by go-swagger; DO NOT EDIT.

package budget

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"context"
	"net/http"
	"time"

	"github.com/go-openapi/errors"
	"github.com/go-openapi/runtime"
	cr "github.com/go-openapi/runtime/client"
	"github.com/go-openapi/strfmt"

	"github.com/cmsgov/mint-app/pkg/cedar/core/gen/models"
)

// NewBudgetAddParams creates a new BudgetAddParams object,
// with the default timeout for this client.
//
// Default values are not hydrated, since defaults are normally applied by the API server side.
//
// To enforce default values in parameter, use SetDefaults or WithDefaults.
func NewBudgetAddParams() *BudgetAddParams {
	return &BudgetAddParams{
		timeout: cr.DefaultTimeout,
	}
}

// NewBudgetAddParamsWithTimeout creates a new BudgetAddParams object
// with the ability to set a timeout on a request.
func NewBudgetAddParamsWithTimeout(timeout time.Duration) *BudgetAddParams {
	return &BudgetAddParams{
		timeout: timeout,
	}
}

// NewBudgetAddParamsWithContext creates a new BudgetAddParams object
// with the ability to set a context for a request.
func NewBudgetAddParamsWithContext(ctx context.Context) *BudgetAddParams {
	return &BudgetAddParams{
		Context: ctx,
	}
}

// NewBudgetAddParamsWithHTTPClient creates a new BudgetAddParams object
// with the ability to set a custom HTTPClient for a request.
func NewBudgetAddParamsWithHTTPClient(client *http.Client) *BudgetAddParams {
	return &BudgetAddParams{
		HTTPClient: client,
	}
}

/* BudgetAddParams contains all the parameters to send to the API endpoint
   for the budget add operation.

   Typically these are written to a http.Request.
*/
type BudgetAddParams struct {

	/* Body.

	   Budget(s) to be added to CEDAR.  This required input in a list of Budget documents.
	*/
	Body *models.BudgetAddRequest

	timeout    time.Duration
	Context    context.Context
	HTTPClient *http.Client
}

// WithDefaults hydrates default values in the budget add params (not the query body).
//
// All values with no default are reset to their zero value.
func (o *BudgetAddParams) WithDefaults() *BudgetAddParams {
	o.SetDefaults()
	return o
}

// SetDefaults hydrates default values in the budget add params (not the query body).
//
// All values with no default are reset to their zero value.
func (o *BudgetAddParams) SetDefaults() {
	// no default values defined for this parameter
}

// WithTimeout adds the timeout to the budget add params
func (o *BudgetAddParams) WithTimeout(timeout time.Duration) *BudgetAddParams {
	o.SetTimeout(timeout)
	return o
}

// SetTimeout adds the timeout to the budget add params
func (o *BudgetAddParams) SetTimeout(timeout time.Duration) {
	o.timeout = timeout
}

// WithContext adds the context to the budget add params
func (o *BudgetAddParams) WithContext(ctx context.Context) *BudgetAddParams {
	o.SetContext(ctx)
	return o
}

// SetContext adds the context to the budget add params
func (o *BudgetAddParams) SetContext(ctx context.Context) {
	o.Context = ctx
}

// WithHTTPClient adds the HTTPClient to the budget add params
func (o *BudgetAddParams) WithHTTPClient(client *http.Client) *BudgetAddParams {
	o.SetHTTPClient(client)
	return o
}

// SetHTTPClient adds the HTTPClient to the budget add params
func (o *BudgetAddParams) SetHTTPClient(client *http.Client) {
	o.HTTPClient = client
}

// WithBody adds the body to the budget add params
func (o *BudgetAddParams) WithBody(body *models.BudgetAddRequest) *BudgetAddParams {
	o.SetBody(body)
	return o
}

// SetBody adds the body to the budget add params
func (o *BudgetAddParams) SetBody(body *models.BudgetAddRequest) {
	o.Body = body
}

// WriteToRequest writes these params to a swagger request
func (o *BudgetAddParams) WriteToRequest(r runtime.ClientRequest, reg strfmt.Registry) error {

	if err := r.SetTimeout(o.timeout); err != nil {
		return err
	}
	var res []error
	if o.Body != nil {
		if err := r.SetBodyParam(o.Body); err != nil {
			return err
		}
	}

	if len(res) > 0 {
		return errors.CompositeValidationError(res...)
	}
	return nil
}
