import React, { useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import {
  Button,
  Fieldset,
  Grid,
  GridContainer,
  Icon,
  Label
} from '@trussworks/react-uswds';
import { Field, Form, Formik, FormikProps } from 'formik';
import {
  ClaimsBasedPayType,
  GetBeneficiaryCostSharingQuery,
  PayType,
  TypedUpdatePaymentsDocument,
  useGetBeneficiaryCostSharingQuery
} from 'gql/gen/graphql';

import AddNote from 'components/AddNote';
import AskAQuestion from 'components/AskAQuestion';
import BooleanRadio from 'components/BooleanRadioForm';
import Breadcrumbs, { BreadcrumbItemOptions } from 'components/Breadcrumbs';
import ConfirmLeave from 'components/ConfirmLeave';
import MutationErrorModal from 'components/MutationErrorModal';
import PageHeading from 'components/PageHeading';
import PageNumber from 'components/PageNumber';
import { ErrorAlert, ErrorAlertMessage } from 'components/shared/ErrorAlert';
import FieldErrorMsg from 'components/shared/FieldErrorMsg';
import FieldGroup from 'components/shared/FieldGroup';
import TextAreaField from 'components/shared/TextAreaField';
import useHandleMutation from 'hooks/useHandleMutation';
import usePlanTranslation from 'hooks/usePlanTranslation';
import { getKeys } from 'types/translation';
import flattenErrors from 'utils/flattenErrors';
import { NotFoundPartial } from 'views/NotFound';

import { renderCurrentPage, renderTotalPages } from '..';

type BeneficiaryCostSharingFormType = GetBeneficiaryCostSharingQuery['modelPlan']['payments'];

const BeneficiaryCostSharing = () => {
  const { t: paymentsT } = useTranslation('payments');

  const { t: paymentsMiscT } = useTranslation('paymentsMisc');

  const { t: miscellaneousT } = useTranslation('miscellaneous');

  const {
    waiveBeneficiaryCostSharingForAnyServices: waiveBeneficiaryCostSharingForAnyServicesConfig,
    waiverOnlyAppliesPartOfPayment: waiverOnlyAppliesPartOfPaymentConfig
  } = usePlanTranslation('payments');

  const { modelID } = useParams<{ modelID: string }>();

  const formikRef = useRef<FormikProps<BeneficiaryCostSharingFormType>>(null);
  const history = useHistory();

  const { data, loading, error } = useGetBeneficiaryCostSharingQuery({
    variables: {
      id: modelID
    }
  });

  const {
    id,
    payType,
    payClaims,
    beneficiaryCostSharingLevelAndHandling,
    waiveBeneficiaryCostSharingForAnyServices,
    waiveBeneficiaryCostSharingServiceSpecification,
    waiverOnlyAppliesPartOfPayment,
    waiveBeneficiaryCostSharingNote
  } = (data?.modelPlan?.payments || {}) as BeneficiaryCostSharingFormType;

  const modelName = data?.modelPlan?.modelName || '';

  const { mutationError } = useHandleMutation(TypedUpdatePaymentsDocument, {
    id,
    formikRef
  });

  const nextPage = () => {
    if (
      formikRef?.current?.values.payType.includes(
        PayType.NON_CLAIMS_BASED_PAYMENTS
      )
    ) {
      history.push(
        `/models/${modelID}/task-list/payment/non-claims-based-payment`
      );
    } else {
      history.push(`/models/${modelID}/task-list/payment/complexity`);
    }
  };

  const initialValues: BeneficiaryCostSharingFormType = {
    __typename: 'PlanPayments',
    id: id ?? '',
    payType: payType ?? [],
    payClaims: payClaims ?? [],
    beneficiaryCostSharingLevelAndHandling:
      beneficiaryCostSharingLevelAndHandling ?? '',
    waiveBeneficiaryCostSharingForAnyServices:
      waiveBeneficiaryCostSharingForAnyServices ?? null,
    waiveBeneficiaryCostSharingServiceSpecification:
      waiveBeneficiaryCostSharingServiceSpecification ?? '',
    waiverOnlyAppliesPartOfPayment: waiverOnlyAppliesPartOfPayment ?? null,
    waiveBeneficiaryCostSharingNote: waiveBeneficiaryCostSharingNote ?? ''
  };

  if ((!loading && error) || (!loading && !data?.modelPlan)) {
    return <NotFoundPartial />;
  }

  return (
    <>
      <MutationErrorModal
        isOpen={mutationError.isModalOpen}
        closeModal={() => mutationError.setIsModalOpen(false)}
        url={mutationError.destinationURL}
      />

      <Breadcrumbs
        items={[
          BreadcrumbItemOptions.HOME,
          BreadcrumbItemOptions.COLLABORATION_AREA,
          BreadcrumbItemOptions.TASK_LIST,
          BreadcrumbItemOptions.PAYMENTS
        ]}
      />
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
          nextPage();
        }}
        enableReinitialize
        innerRef={formikRef}
      >
        {(formikProps: FormikProps<BeneficiaryCostSharingFormType>) => {
          const {
            errors,
            handleSubmit,
            setFieldValue,
            setErrors,
            values
          } = formikProps;
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

              <ConfirmLeave />

              <GridContainer className="padding-left-0 padding-right-0">
                <Grid row gap>
                  <Grid desktop={{ col: 6 }}>
                    <Form
                      className="margin-top-6"
                      data-testid="payment-beneficiary-cost-sharing-form"
                      onSubmit={e => {
                        handleSubmit(e);
                      }}
                    >
                      <Fieldset disabled={!!error || loading}>
                        <PageHeading
                          headingLevel="h3"
                          className="margin-bottom-3"
                        >
                          {paymentsMiscT('beneficaryCostSharingQuestions')}
                        </PageHeading>

                        <FieldGroup
                          scrollElement="beneficiaryCostSharingLevelAndHandling"
                          error={
                            !!flatErrors.beneficiaryCostSharingLevelAndHandling
                          }
                        >
                          <Label
                            htmlFor="beneficiaryCostSharingLevelAndHandling"
                            className="maxw-none"
                          >
                            {paymentsT(
                              'beneficiaryCostSharingLevelAndHandling.label'
                            )}
                          </Label>

                          <FieldErrorMsg>
                            {flatErrors.beneficiaryCostSharingLevelAndHandling}
                          </FieldErrorMsg>

                          <Field
                            as={TextAreaField}
                            className="height-15"
                            error={
                              flatErrors.beneficiaryCostSharingLevelAndHandling
                            }
                            id="payment-beneficiary-cost-sharing"
                            data-testid="payment-beneficiary-cost-sharing"
                            name="beneficiaryCostSharingLevelAndHandling"
                          />
                        </FieldGroup>

                        <FieldGroup
                          scrollElement="waiveBeneficiaryCostSharingForAnyServices"
                          error={
                            !!flatErrors.waiveBeneficiaryCostSharingForAnyServices
                          }
                          className="margin-top-4"
                        >
                          <Label
                            htmlFor="waiveBeneficiaryCostSharingForAnyServices"
                            className="maxw-none"
                          >
                            {paymentsT(
                              'waiveBeneficiaryCostSharingForAnyServices.label'
                            )}
                          </Label>

                          <FieldErrorMsg>
                            {
                              flatErrors.waiveBeneficiaryCostSharingForAnyServices
                            }
                          </FieldErrorMsg>

                          <BooleanRadio
                            field="waiveBeneficiaryCostSharingForAnyServices"
                            id="payment-waive-any-service"
                            value={
                              values.waiveBeneficiaryCostSharingForAnyServices
                            }
                            setFieldValue={setFieldValue}
                            options={
                              waiveBeneficiaryCostSharingForAnyServicesConfig.options
                            }
                            childName="waiveBeneficiaryCostSharingServiceSpecification"
                          >
                            {values.waiveBeneficiaryCostSharingForAnyServices ? (
                              <FieldGroup
                                className="margin-left-4 margin-y-1"
                                scrollElement="waiveBeneficiaryCostSharingServiceSpecification"
                                error={
                                  !!flatErrors.waiveBeneficiaryCostSharingServiceSpecification
                                }
                              >
                                <Label
                                  htmlFor="waiveBeneficiaryCostSharingServiceSpecification"
                                  className="text-normal"
                                >
                                  {paymentsT(
                                    'waiveBeneficiaryCostSharingServiceSpecification.label'
                                  )}
                                </Label>

                                <FieldErrorMsg>
                                  {
                                    flatErrors.waiveBeneficiaryCostSharingServiceSpecification
                                  }
                                </FieldErrorMsg>

                                <Field
                                  as={TextAreaField}
                                  className="height-15"
                                  error={
                                    flatErrors.waiveBeneficiaryCostSharingServiceSpecification
                                  }
                                  id="payment-waive-any-service-specification"
                                  data-testid="payment-waive-any-service-specification"
                                  name="waiveBeneficiaryCostSharingServiceSpecification"
                                />
                              </FieldGroup>
                            ) : (
                              <></>
                            )}
                          </BooleanRadio>

                          {values.waiveBeneficiaryCostSharingForAnyServices && (
                            <FieldGroup
                              scrollElement="waiverOnlyAppliesPartOfPayment"
                              error={
                                !!flatErrors.waiverOnlyAppliesPartOfPayment
                              }
                              className="margin-top-4"
                            >
                              <Label
                                htmlFor="waiverOnlyAppliesPartOfPayment"
                                className="maxw-none text-normal"
                              >
                                {paymentsT(
                                  'waiverOnlyAppliesPartOfPayment.label'
                                )}
                              </Label>

                              <p className="text-base margin-y-1">
                                {paymentsT(
                                  'waiverOnlyAppliesPartOfPayment.sublabel'
                                )}
                              </p>

                              <FieldErrorMsg>
                                {flatErrors.waiverOnlyAppliesPartOfPayment}
                              </FieldErrorMsg>

                              <BooleanRadio
                                field="waiverOnlyAppliesPartOfPayment"
                                id="payment-waive-part-of-payment"
                                value={values.waiverOnlyAppliesPartOfPayment}
                                setFieldValue={setFieldValue}
                                options={
                                  waiverOnlyAppliesPartOfPaymentConfig.options
                                }
                              />
                            </FieldGroup>
                          )}
                          <AddNote
                            id="payment-waive-beneficiary-cost-sharing-note"
                            field="waiveBeneficiaryCostSharingNote"
                          />
                        </FieldGroup>

                        <div className="margin-top-6 margin-bottom-3">
                          <Button
                            type="button"
                            className="usa-button usa-button--outline margin-bottom-1"
                            onClick={() => {
                              history.push(
                                `/models/${modelID}/task-list/payment/anticipating-dependencies`
                              );
                            }}
                          >
                            {miscellaneousT('back')}
                          </Button>

                          <Button type="submit" onClick={() => setErrors({})}>
                            {miscellaneousT('next')}
                          </Button>
                        </div>

                        <Button
                          type="button"
                          className="usa-button usa-button--unstyled"
                          onClick={() =>
                            history.push(`/models/${modelID}/task-list`)
                          }
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
            </>
          );
        }}
      </Formik>

      {data && (
        <PageNumber
          currentPage={renderCurrentPage(
            4,
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
export default BeneficiaryCostSharing;
