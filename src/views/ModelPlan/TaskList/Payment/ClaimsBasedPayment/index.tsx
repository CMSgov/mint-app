import React, { useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {
  Breadcrumb,
  BreadcrumbBar,
  BreadcrumbLink,
  Button,
  Grid,
  GridContainer,
  IconArrowBack
} from '@trussworks/react-uswds';
import { Form, Formik, FormikProps } from 'formik';

import AskAQuestion from 'components/AskAQuestion';
import PageHeading from 'components/PageHeading';
import PageNumber from 'components/PageNumber';
import AutoSave from 'components/shared/AutoSave';
import { ErrorAlert, ErrorAlertMessage } from 'components/shared/ErrorAlert';
import GetClaimsBasedPayment from 'queries/Payments/GetClaimsBasedPayment';
import {
  GetClaimsBasedPayment as GetClaimsBasedPaymentType,
  GetClaimsBasedPayment_modelPlan_payments as ClaimsBasedPaymentFormType,
  GetClaimsBasedPaymentVariables
} from 'queries/Payments/types/GetClaimsBasedPayment';
import { UpdatePaymentsVariables } from 'queries/Payments/types/UpdatePayments';
import UpdatePayments from 'queries/Payments/UpdatePayments';
import flattenErrors from 'utils/flattenErrors';
import { NotFoundPartial } from 'views/NotFound';

import { renderCurrentPage, renderTotalPages } from '..';

const ClaimsBasedPayment = () => {
  const { t } = useTranslation('payments');
  const { t: h } = useTranslation('draftModelPlan');
  const { modelID } = useParams<{ modelID: string }>();

  const formikRef = useRef<FormikProps<ClaimsBasedPaymentFormType>>(null);
  const history = useHistory();

  const { data, loading, error } = useQuery<
    GetClaimsBasedPaymentType,
    GetClaimsBasedPaymentVariables
  >(GetClaimsBasedPayment, {
    variables: {
      id: modelID
    }
  });

  const {
    id,
    payClaims,
    payClaimsOther,
    shouldAnyProvidersExcludedFFSSystems,
    shouldAnyProviderExcludedFFSSystemsNote,
    changesMedicarePhysicianFeeSchedule,
    changesMedicarePhysicianFeeScheduleNote,
    affectsMedicareSecondaryPayerClaims,
    affectsMedicareSecondaryPayerClaimsHow,
    affectsMedicareSecondaryPayerClaimsNote,
    payModelDifferentiation
  } = data?.modelPlan?.payments || ({} as ClaimsBasedPaymentFormType);

  const modelName = data?.modelPlan?.modelName || '';

  const [update] = useMutation<UpdatePaymentsVariables>(UpdatePayments);

  const handleFormSubmit = (
    formikValues: ClaimsBasedPaymentFormType,
    redirect?: 'next' | 'back' | 'task-list'
  ) => {
    const { id: updateId, __typename, ...changeValues } = formikValues;
    update({
      variables: {
        id: updateId,
        changes: changeValues
      }
    })
      .then(response => {
        if (!response?.errors) {
          if (redirect === 'next') {
            history.push(`/models/${modelID}/task-list/payment/page-2`);
          } else if (redirect === 'back') {
            history.push(`/models/${modelID}/task-list/`);
          }
        }
      })
      .catch(errors => {
        formikRef?.current?.setErrors(errors);
      });
  };

  const initialValues: ClaimsBasedPaymentFormType = {
    __typename: 'PlanPayments',
    id: id ?? '',
    payClaims: payClaims ?? [],
    payClaimsOther: payClaimsOther ?? '',
    shouldAnyProvidersExcludedFFSSystems:
      shouldAnyProvidersExcludedFFSSystems ?? null,
    shouldAnyProviderExcludedFFSSystemsNote:
      shouldAnyProviderExcludedFFSSystemsNote ?? '',
    changesMedicarePhysicianFeeSchedule:
      changesMedicarePhysicianFeeSchedule ?? null,
    changesMedicarePhysicianFeeScheduleNote:
      changesMedicarePhysicianFeeScheduleNote ?? '',
    affectsMedicareSecondaryPayerClaims:
      affectsMedicareSecondaryPayerClaims ?? null,
    affectsMedicareSecondaryPayerClaimsHow:
      affectsMedicareSecondaryPayerClaimsHow ?? '',
    affectsMedicareSecondaryPayerClaimsNote:
      affectsMedicareSecondaryPayerClaimsNote ?? '',
    payModelDifferentiation: payModelDifferentiation ?? ''
  };

  if ((!loading && error) || (!loading && !data?.modelPlan)) {
    return <NotFoundPartial />;
  }

  return (
    <>
      <BreadcrumbBar variant="wrap">
        <Breadcrumb>
          <BreadcrumbLink asCustom={Link} to="/">
            <span>{h('home')}</span>
          </BreadcrumbLink>
        </Breadcrumb>
        <Breadcrumb>
          <BreadcrumbLink asCustom={Link} to={`/models/${modelID}/task-list/`}>
            <span>{h('tasklistBreadcrumb')}</span>
          </BreadcrumbLink>
        </Breadcrumb>
        <Breadcrumb current>{t('breadcrumb')}</Breadcrumb>
      </BreadcrumbBar>
      <PageHeading className="margin-top-4 margin-bottom-2">
        {t('heading')}
      </PageHeading>

      <p
        className="margin-top-0 margin-bottom-1 font-body-lg"
        data-testid="model-plan-name"
      >
        <Trans i18nKey="modelPlanTaskList:subheading">
          indexZero {modelName} indexTwo
        </Trans>
      </p>
      <p className="margin-bottom-2 font-body-md line-height-sans-4">
        {h('helpText')}
      </p>

      <AskAQuestion modelID={modelID} />

      <Formik
        initialValues={initialValues}
        onSubmit={values => {
          handleFormSubmit(values, 'next');
        }}
        enableReinitialize
        innerRef={formikRef}
      >
        {(formikProps: FormikProps<ClaimsBasedPaymentFormType>) => {
          const { errors, handleSubmit, setErrors, values } = formikProps;
          const flatErrors = flattenErrors(errors);
          return (
            <>
              {Object.keys(errors).length > 0 && (
                <ErrorAlert
                  testId="formik-validation-errors"
                  classNames="margin-top-3"
                  heading={h('checkAndFix')}
                >
                  {Object.keys(flatErrors).map(key => {
                    return (
                      <ErrorAlertMessage
                        key={`Error.${key}`}
                        errorKey={key}
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
                      <div className="margin-top-6 margin-bottom-3">
                        <Button type="submit" onClick={() => setErrors({})}>
                          {h('next')}
                        </Button>
                      </div>
                      <Button
                        type="button"
                        className="usa-button usa-button--unstyled"
                        onClick={() => handleFormSubmit(values, 'back')}
                      >
                        <IconArrowBack className="margin-right-1" aria-hidden />
                        {h('saveAndReturn')}
                      </Button>
                    </Form>
                  </Grid>
                </Grid>
              </GridContainer>
              {id && (
                <AutoSave
                  values={values}
                  onSave={() => {
                    handleFormSubmit(formikRef.current!.values);
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
          currentPage={2}
          totalPages={3}
          // currentPage={renderCurrentPage(
          //   2,
          //   payType.includes(PayType.CLAIMS_BASED_PAYMENTS),
          //   payType.includes(PayType.NON_CLAIMS_BASED_PAYMENTS)
          // )}
          // totalPages={renderTotalPages(
          //   payType.includes(PayType.CLAIMS_BASED_PAYMENTS),
          //   payType.includes(PayType.NON_CLAIMS_BASED_PAYMENTS)
          // )}
          className="margin-y-6"
        />
      )}
    </>
  );
};

export default ClaimsBasedPayment;
