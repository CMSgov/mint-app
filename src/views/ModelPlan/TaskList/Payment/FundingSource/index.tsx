import React, { Fragment, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbBar,
  BreadcrumbLink,
  Button,
  Fieldset,
  Grid,
  GridContainer,
  Icon,
  Label,
  TextInput
} from '@trussworks/react-uswds';
import { Field, Form, Formik, FormikProps } from 'formik';
import {
  ClaimsBasedPayType,
  FundingSource as FundingSourceEnum,
  GetFundingQuery,
  PayRecipient,
  PayType,
  useGetFundingQuery,
  useUpdatePaymentsMutation
} from 'gql/gen/graphql';

import AddNote from 'components/AddNote';
import AskAQuestion from 'components/AskAQuestion';
import ITSolutionsWarning from 'components/ITSolutionsWarning';
import PageHeading from 'components/PageHeading';
import PageNumber from 'components/PageNumber';
import AutoSave from 'components/shared/AutoSave';
import CheckboxField from 'components/shared/CheckboxField';
import { ErrorAlert, ErrorAlertMessage } from 'components/shared/ErrorAlert';
import FieldErrorMsg from 'components/shared/FieldErrorMsg';
import FieldGroup from 'components/shared/FieldGroup';
import Tooltip from 'components/shared/Tooltip';
import usePlanTranslation from 'hooks/usePlanTranslation';
import useScrollElement from 'hooks/useScrollElement';
import { getKeys } from 'types/translation';
import flattenErrors from 'utils/flattenErrors';
import { dirtyInput } from 'utils/formDiff';
import { NotFoundPartial } from 'views/NotFound';

import { renderCurrentPage, renderTotalPages } from '..';

import './index.scss';

type FundingFormType = GetFundingQuery['modelPlan']['payments'];

const FundingSource = () => {
  const { t: paymentsT } = useTranslation('payments');

  const { t: paymentsMiscT } = useTranslation('paymentsMisc');

  const { t: miscellaneousT } = useTranslation('miscellaneous');

  const {
    fundingSource: fundingSourceConfig,
    fundingSourceR: fundingSourceRConfig,
    payRecipients: payRecipientsConfig,
    payType: payTypeConfig
  } = usePlanTranslation('payments');

  const { modelID } = useParams<{ modelID: string }>();

  const formikRef = useRef<FormikProps<FundingFormType>>(null);
  const history = useHistory();

  const { data, loading, error } = useGetFundingQuery({
    variables: {
      id: modelID
    }
  });

  // If redirected from Operational Solutions, scrolls to the relevant question
  useScrollElement(!loading);

  const {
    id,
    fundingSource,
    fundingSourceMedicareAInfo,
    fundingSourceMedicareBInfo,
    fundingSourceOther,
    fundingSourceNote,
    fundingSourceR,
    fundingSourceRMedicareAInfo,
    fundingSourceRMedicareBInfo,
    fundingSourceROther,
    fundingSourceRNote,
    payRecipients,
    payRecipientsOtherSpecification,
    payRecipientsNote,
    payType,
    payTypeNote,
    payClaims
  } = (data?.modelPlan?.payments || {}) as FundingFormType;

  const modelName = data?.modelPlan?.modelName || '';

  const itSolutionsStarted: boolean = !!data?.modelPlan.operationalNeeds.find(
    need => need.modifiedDts
  );

  const [update] = useUpdatePaymentsMutation();

  const handleFormSubmit = (redirect?: 'next' | 'back' | string) => {
    const hasClaimsBasedPayment = formikRef?.current?.values.payType.includes(
      PayType.CLAIMS_BASED_PAYMENTS
    );

    const hasNonClaimBasedPayment = formikRef?.current?.values.payType.includes(
      PayType.NON_CLAIMS_BASED_PAYMENTS
    );

    update({
      variables: {
        id,
        changes: dirtyInput(
          formikRef?.current?.initialValues,
          formikRef?.current?.values
        )
      }
    })
      .then(response => {
        if (!response?.errors) {
          if (redirect === 'next') {
            if (hasClaimsBasedPayment) {
              history.push(
                `/models/${modelID}/task-list/payment/claims-based-payment`
              );
            } else if (hasNonClaimBasedPayment) {
              history.push(
                `/models/${modelID}/task-list/payment/non-claims-based-payment`
              );
            } else {
              history.push(`/models/${modelID}/task-list/payment/complexity`);
            }
          } else if (redirect === 'back') {
            history.push(`/models/${modelID}/task-list/`);
          } else if (redirect) {
            history.push(redirect);
          }
        }
      })
      .catch(errors => {
        formikRef?.current?.setErrors(errors);
      });
  };

  const initialValues: FundingFormType = {
    __typename: 'PlanPayments',
    id: id ?? '',
    fundingSource: fundingSource ?? [],
    fundingSourceMedicareAInfo: fundingSourceMedicareAInfo ?? '',
    fundingSourceMedicareBInfo: fundingSourceMedicareBInfo ?? '',
    fundingSourceOther: fundingSourceOther ?? '',
    fundingSourceNote: fundingSourceNote ?? '',
    fundingSourceR: fundingSourceR ?? [],
    fundingSourceRMedicareAInfo: fundingSourceRMedicareAInfo ?? '',
    fundingSourceRMedicareBInfo: fundingSourceRMedicareBInfo ?? '',
    fundingSourceROther: fundingSourceROther ?? '',
    fundingSourceRNote: fundingSourceRNote ?? '',
    payRecipients: payRecipients ?? [],
    payRecipientsOtherSpecification: payRecipientsOtherSpecification ?? '',
    payRecipientsNote: payRecipientsNote ?? '',
    payType: payType ?? [],
    payTypeNote: payTypeNote ?? '',
    payClaims: payClaims ?? []
  };

  if ((!loading && error) || (!loading && !data?.modelPlan)) {
    return <NotFoundPartial />;
  }

  const FundSelection = ({
    values,
    fieldName,
    config,
    flatErrors
  }: {
    values: FundingFormType;
    fieldName: 'fundingSource' | 'fundingSourceR';
    config: typeof fundingSourceConfig | typeof fundingSourceRConfig;
    flatErrors: any;
  }) => (
    <Fieldset className="funding-source">
      <Label
        htmlFor="fundingSourceType"
        className="maxw-none margin-bottom-105"
      >
        {paymentsT(`${fieldName}.label`)}
      </Label>

      {getKeys(config.options).map(trustType => {
        return (
          <div key={trustType}>
            <div className="display-flex flex-align-center">
              <Field
                key={trustType}
                as={CheckboxField}
                id={`payment-funding-source-${fieldName}-${trustType}`}
                name={fieldName}
                label={config.options[trustType]}
                value={trustType}
                testid={`payment-funding-source-${fieldName}-${trustType}`}
                checked={values[fieldName]?.includes(trustType)}
              />

              {config.tooltips?.[trustType] && (
                <Tooltip
                  label={config.tooltips?.[trustType] || ''}
                  position="right"
                  className="margin-left-05"
                >
                  <Icon.Info className="text-base-light" />
                </Tooltip>
              )}
            </div>

            {trustType === FundingSourceEnum.MEDICARE_PART_A_HI_TRUST_FUND &&
              values[fieldName]?.includes(trustType) && (
                <FieldGroup
                  className="margin-left-4 margin-top-1 margin-bottom-2"
                  error={!!flatErrors[`${fieldName}MedicareAInfo`]}
                >
                  <Label
                    htmlFor={`${fieldName}MedicareAInfo`}
                    className="text-normal"
                  >
                    {paymentsT(`${fieldName}MedicareAInfo.label`)}
                  </Label>

                  <FieldErrorMsg>
                    {flatErrors[`${fieldName}MedicareAInfo`]}
                  </FieldErrorMsg>

                  <Field
                    as={TextInput}
                    id={`payment-${fieldName}-medicare-a-info`}
                    maxLength={50}
                    name={`${fieldName}MedicareAInfo`}
                  />
                </FieldGroup>
              )}

            {trustType === FundingSourceEnum.MEDICARE_PART_B_SMI_TRUST_FUND &&
              values[fieldName]?.includes(trustType) && (
                <FieldGroup
                  className="margin-left-4 margin-top-1 margin-bottom-2"
                  error={!!flatErrors[`${fieldName}MedicareBInfo`]}
                >
                  <Label
                    htmlFor={`${fieldName}MedicareBInfo`}
                    className="text-normal"
                  >
                    {paymentsT(`${fieldName}MedicareBInfo.label`)}
                  </Label>

                  <FieldErrorMsg>
                    {flatErrors[`${fieldName}MedicareBInfo`]}
                  </FieldErrorMsg>

                  <Field
                    as={TextInput}
                    id={`payment-${fieldName}-medicare-b-info`}
                    maxLength={50}
                    name={`${fieldName}MedicareBInfo`}
                  />
                </FieldGroup>
              )}

            {trustType === FundingSourceEnum.OTHER &&
              values[fieldName]?.includes(trustType) && (
                <FieldGroup
                  className="margin-left-4 margin-top-1 margin-bottom-2"
                  error={!!flatErrors[`${fieldName}Other`]}
                >
                  <Label htmlFor={`${fieldName}Other`} className="text-normal">
                    {paymentsT(`${fieldName}Other.label`)}
                  </Label>

                  <FieldErrorMsg>
                    {flatErrors[`${fieldName}Other`]}
                  </FieldErrorMsg>

                  <Field
                    as={TextInput}
                    id={`payment-${fieldName}-other`}
                    maxLength={50}
                    name={`${fieldName}Other`}
                  />
                </FieldGroup>
              )}
          </div>
        );
      })}
    </Fieldset>
  );

  return (
    <>
      <BreadcrumbBar variant="wrap">
        <Breadcrumb>
          <BreadcrumbLink asCustom={Link} to="/">
            <span>{miscellaneousT('home')}</span>
          </BreadcrumbLink>
        </Breadcrumb>
        <Breadcrumb>
          <BreadcrumbLink asCustom={Link} to={`/models/${modelID}/task-list/`}>
            <span>{miscellaneousT('tasklistBreadcrumb')}</span>
          </BreadcrumbLink>
        </Breadcrumb>
        <Breadcrumb current>{paymentsMiscT('breadcrumb')}</Breadcrumb>
      </BreadcrumbBar>
      <PageHeading className="margin-top-4 margin-bottom-2">
        {paymentsMiscT('heading')}
      </PageHeading>

      <p
        className="margin-top-0 margin-bottom-1 font-body-lg"
        data-testid="model-plan-name"
      >
        <Trans i18nKey="modelPlanTaskList:subheading">
          indexZero {modelName || ' '} indexTwo
        </Trans>
      </p>

      <p className="margin-bottom-2 font-body-md line-height-sans-4">
        {miscellaneousT('helpText')}
      </p>

      <AskAQuestion modelID={modelID} />

      <Formik
        initialValues={initialValues}
        onSubmit={() => {
          handleFormSubmit('next');
        }}
        enableReinitialize
        innerRef={formikRef}
      >
        {(formikProps: FormikProps<FundingFormType>) => {
          const { errors, handleSubmit, setErrors, values } = formikProps;

          const flatErrors = flattenErrors(errors);

          return (
            <>
              {getKeys(errors).length > 0 && (
                <ErrorAlert
                  testId="formik-validation-errors"
                  classNames="margin-top-3"
                  heading={miscellaneousT('checkAndFix')}
                >
                  {getKeys(flatErrors).map(key => {
                    return (
                      <ErrorAlertMessage
                        key={`Error.${key}`}
                        errorKey={`${key}`}
                        message={flatErrors[key]}
                      />
                    );
                  })}
                </ErrorAlert>
              )}
              <GridContainer className="padding-left-0 padding-right-0">
                <Grid row gap>
                  <Grid desktop={{ col: 6 }}>
                    <Form
                      className="margin-top-6"
                      data-testid="payment-funding-source-form"
                      onSubmit={e => {
                        handleSubmit(e);
                      }}
                    >
                      <Fieldset disabled={!!error || loading}>
                        <FieldGroup
                          scrollElement="fundingSource"
                          error={!!flatErrors.fundingSource}
                          className="margin-top-4"
                        >
                          <FieldErrorMsg>
                            {flatErrors.fundingSource}
                          </FieldErrorMsg>

                          <FundSelection
                            values={values}
                            fieldName="fundingSource"
                            config={fundingSourceConfig}
                            flatErrors={flatErrors}
                          />

                          <AddNote
                            id="payment-funding-source-note"
                            field="fundingSourceNote"
                          />
                        </FieldGroup>

                        <FieldGroup
                          scrollElement="fundingSourceR"
                          error={!!flatErrors.fundingSourceR}
                          className="margin-top-4"
                        >
                          <FieldErrorMsg>
                            {flatErrors.fundingSourceR}
                          </FieldErrorMsg>

                          <FundSelection
                            values={values}
                            fieldName="fundingSourceR"
                            config={fundingSourceRConfig}
                            flatErrors={flatErrors}
                          />

                          <AddNote
                            id="payment-funding-source-reconciliation-note"
                            field="fundingSourceRNote"
                          />
                        </FieldGroup>

                        <FieldGroup
                          scrollElement="payRecipients"
                          error={!!flatErrors.payRecipients}
                          className="margin-top-4"
                        >
                          <Label htmlFor="payRecipients" className="maxw-none">
                            {paymentsT('payRecipients.label')}
                          </Label>

                          <FieldErrorMsg>
                            {flatErrors.payRecipients}
                          </FieldErrorMsg>

                          <Fieldset>
                            {getKeys(payRecipientsConfig.options).map(type => {
                              return (
                                <Fragment key={type}>
                                  <Field
                                    as={CheckboxField}
                                    id={`payment-pay-recipients-${type}`}
                                    name="payRecipients"
                                    label={payRecipientsConfig.options[type]}
                                    value={type}
                                    checked={values.payRecipients.includes(
                                      type
                                    )}
                                  />

                                  {type === PayRecipient.OTHER &&
                                    values.payRecipients.includes(type) && (
                                      <FieldGroup
                                        className="margin-left-4 margin-top-2 margin-bottom-4"
                                        error={
                                          !!flatErrors.payRecipientsOtherSpecification
                                        }
                                      >
                                        <Label
                                          htmlFor="payRecipientsOtherSpecification"
                                          className="text-normal"
                                        >
                                          {paymentsT(
                                            'payRecipientsOtherSpecification.label'
                                          )}
                                        </Label>

                                        <FieldErrorMsg>
                                          {
                                            flatErrors.payRecipientsOtherSpecification
                                          }
                                        </FieldErrorMsg>

                                        <Field
                                          as={TextInput}
                                          id="payment-pay-recipients-other-specification"
                                          maxLength={50}
                                          name="payRecipientsOtherSpecification"
                                        />
                                      </FieldGroup>
                                    )}
                                </Fragment>
                              );
                            })}
                          </Fieldset>

                          <AddNote
                            id="payment-pay-recipients-note"
                            field="payRecipientsNote"
                          />
                        </FieldGroup>

                        <FieldGroup
                          scrollElement="payType"
                          error={!!flatErrors.payType}
                          className="margin-top-4"
                        >
                          <Label htmlFor="payType" className="maxw-none">
                            {paymentsT('payType.label')}
                          </Label>

                          {itSolutionsStarted && (
                            <ITSolutionsWarning
                              id="payment-pay-recipients-warning"
                              onClick={() =>
                                handleFormSubmit(
                                  `/models/${modelID}/task-list/it-solutions`
                                )
                              }
                            />
                          )}

                          <p className="text-base margin-y-1 margin-top-2">
                            {paymentsT('payType.sublabel')}
                          </p>

                          <FieldErrorMsg>{flatErrors.payType}</FieldErrorMsg>

                          <Fieldset>
                            {getKeys(payTypeConfig.options).map(type => {
                              return (
                                <Field
                                  key={type}
                                  as={CheckboxField}
                                  id={`payment-pay-recipients-${type}`}
                                  name="payType"
                                  label={payTypeConfig.options[type]}
                                  value={type}
                                  checked={values.payType.includes(type)}
                                />
                              );
                            })}
                          </Fieldset>

                          <AddNote
                            id="payment-pay-type-note"
                            field="payTypeNote"
                          />
                        </FieldGroup>

                        <div className="margin-top-6 margin-bottom-3">
                          <Button type="submit" onClick={() => setErrors({})}>
                            {miscellaneousT('next')}
                          </Button>
                        </div>

                        <Button
                          type="button"
                          className="usa-button usa-button--unstyled"
                          onClick={() => handleFormSubmit('back')}
                        >
                          <Icon.ArrowBack
                            className="margin-right-1"
                            aria-hidden
                          />

                          {miscellaneousT('saveAndReturn')}
                        </Button>
                      </Fieldset>
                    </Form>
                  </Grid>
                </Grid>
              </GridContainer>

              {id && (
                <AutoSave
                  values={values}
                  onSave={() => {
                    handleFormSubmit();
                  }}
                  debounceDelay={3000}
                />
              )}
            </>
          );
        }}
      </Formik>

      {data && (
        <PageNumber
          currentPage={renderCurrentPage(
            1,
            payType.includes(PayType.CLAIMS_BASED_PAYMENTS),
            payType.includes(PayType.NON_CLAIMS_BASED_PAYMENTS),
            payClaims.includes(
              ClaimsBasedPayType.REDUCTIONS_TO_BENEFICIARY_COST_SHARING
            )
          )}
          totalPages={renderTotalPages(
            payType.includes(PayType.CLAIMS_BASED_PAYMENTS),
            payType.includes(PayType.NON_CLAIMS_BASED_PAYMENTS),
            payClaims.includes(
              ClaimsBasedPayType.REDUCTIONS_TO_BENEFICIARY_COST_SHARING
            )
          )}
          className="margin-y-6"
        />
      )}
    </>
  );
};

export default FundingSource;
