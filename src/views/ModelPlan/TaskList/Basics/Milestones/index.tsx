import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  Breadcrumb,
  BreadcrumbBar,
  BreadcrumbLink,
  Button,
  DatePicker,
  Fieldset,
  IconAdd,
  IconArrowBack,
  Label,
  ProcessList,
  ProcessListHeading,
  ProcessListItem,
  Radio,
  TextInput
} from '@trussworks/react-uswds';
import { Field, Form, Formik, FormikProps } from 'formik';

import MainContent from 'components/MainContent';
import PageHeading from 'components/PageHeading';
import PageNumber from 'components/PageNumber';
import { ErrorAlert, ErrorAlertMessage } from 'components/shared/ErrorAlert';
import FieldErrorMsg from 'components/shared/FieldErrorMsg';
import FieldGroup from 'components/shared/FieldGroup';
import TextAreaField from 'components/shared/TextAreaField';
import GetModelPlanQuery from 'queries/GetModelPlanQuery';
import {
  GetModelPlan,
  GetModelPlanVariables
} from 'queries/types/GetModelPlan';
import flattenErrors from 'utils/flattenErrors';
import planBasicsSchema from 'validations/planBasics';

type PlanBasicsOverviewTypes = {
  modelName: string;
  tightTimeline: string;
};

const Milestones = () => {
  const { t } = useTranslation('basics');
  const { t: h } = useTranslation('draftModelPlan');
  const { modelId } = useParams<{ modelId: string }>();
  const [hasAdditionalNote, setHasAdditionalNote] = useState(false);
  const history = useHistory();

  const { data } = useQuery<GetModelPlan, GetModelPlanVariables>(
    GetModelPlanQuery,
    {
      variables: {
        id: modelId
      }
    }
  );

  const { modelName } = data?.modelPlan || {};

  const initialValues = {
    modelName: modelName as string,
    tightTimeline: ''
  };

  const handleFormSubmit = (formikValues: PlanBasicsOverviewTypes) => {
    console.log(formikValues);
  };

  return (
    <MainContent className="margin-bottom-5">
      <div className="grid-container">
        <div className="tablet:grid-col-12">
          <BreadcrumbBar variant="wrap">
            <Breadcrumb>
              <BreadcrumbLink asCustom={Link} to="/">
                <span>{h('home')}</span>
              </BreadcrumbLink>
            </Breadcrumb>
            <Breadcrumb current>{t('breadcrumb')}</Breadcrumb>
          </BreadcrumbBar>
          <PageHeading className="margin-bottom-1">{t('heading')}</PageHeading>
          <p
            className="margin-top-0 margin-bottom-1 font-body-lg"
            data-testid="model-plan-name"
          >
            <Trans i18nKey="modelPlanTaskList:subheading">
              indexZero {modelName} indexTwo
            </Trans>
          </p>
          <p className="margin-bottom-2 font-body-md line-height-sans-4">
            {t('helpText')}
          </p>

          {/* <ProcessList>
            <ProcessListItem className="padding-bottom-4">
              <div className="grid-col-6">
                <Label htmlFor="Milestone-completeICIP">
                  {t('completeICIP')}
                </Label>
                <div className="usa-hint" id="appointment-date-hint">
                  {h('datePlaceholder')}
                </div>
                <DatePicker id="asdf" name="asdfasdf" />
              </div>
            </ProcessListItem>
            <ProcessListItem className="padding-bottom-4">
              <ProcessListHeading
                type="h4"
                className="font-sans-xl line-height-sans-1"
              >
                Proceed to the second step.
              </ProcessListHeading>
              <p className="font-sans-lg margin-top-1 text-light">
                Suspendisse id velit vitae ligula volutpat condimentum. Aliquam
                erat volutpat.
              </p>
            </ProcessListItem>
            <ProcessListItem>
              <ProcessListHeading
                type="h4"
                className="font-sans-xl line-height-sans-1"
              >
                Complete the step-by-step process.
              </ProcessListHeading>
              <p className="font-sans-lg margin-top-1 text-light">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi
                commodo, ipsum sed pharetra gravida, orci magna rhoncus neque.
              </p>
            </ProcessListItem>
          </ProcessList> */}

          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            enableReinitialize
            validationSchema={planBasicsSchema.pageTwoSchema}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
          >
            {(formikProps: FormikProps<PlanBasicsOverviewTypes>) => {
              const {
                dirty,
                errors,
                handleSubmit,
                setErrors,
                values
              } = formikProps;
              const flatErrors = flattenErrors(errors);
              return (
                <>
                  {Object.keys(errors).length > 0 && (
                    <ErrorAlert
                      testId="formik-validation-errors"
                      classNames="margin-top-3"
                      heading="Please check and fix the following"
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
                  <Form
                    className="tablet:grid-col-6"
                    onSubmit={e => {
                      handleSubmit(e);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <FieldGroup
                      scrollElement="completeICIP"
                      error={!!flatErrors.completeICIP}
                      className="margin-top-4 grid-col-6"
                    >
                      <Label htmlFor="Milestone-completeICIP">
                        {t('completeICIP')}
                      </Label>
                      <div className="usa-hint" id="appointment-date-hint">
                        {h('datePlaceholder')}
                      </div>
                      <FieldErrorMsg>{flatErrors.completeICIP}</FieldErrorMsg>
                      <Field
                        as={DatePicker}
                        error={!!flatErrors.completeICIP}
                        id="Milestone-completeICIP"
                        maxLength={50}
                        name="completeICIP"
                      />
                    </FieldGroup>

                    <FieldGroup
                      scrollElement="tightTimeline"
                      error={!!flatErrors.tightTimeline}
                      className="margin-top-4"
                    >
                      <Label htmlFor="tightTimeline">
                        {t('tightTimeline')}
                      </Label>
                      <span className="usa-hint display-block text-normal margin-top-1">
                        {t('tightTimelineInfo')}
                      </span>
                      <FieldErrorMsg>{flatErrors.tightTimeline}</FieldErrorMsg>
                      <Fieldset>
                        <Field
                          as={Radio}
                          id="tightTimeline-Yes"
                          name="tightTimeline"
                          label={h('yes')}
                          value="YES"
                          checked={values.tightTimeline === 'YES'}
                        />
                        <Field
                          as={Radio}
                          id="tightTimeline-No"
                          name="tightTimeline"
                          label={h('no')}
                          value="NO"
                          checked={values.tightTimeline === 'NO'}
                        />
                      </Fieldset>
                    </FieldGroup>

                    <Button
                      type="button"
                      className="usa-button usa-button--unstyled margin-top-4"
                      onClick={() => setHasAdditionalNote(true)}
                    >
                      <IconAdd className="margin-right-1" aria-hidden />
                      {h('additionalNote')}
                    </Button>

                    {hasAdditionalNote && (
                      <FieldGroup className="margin-top-4">
                        <Field
                          as={TextAreaField}
                          className="height-15"
                          id="ModelType-note"
                          name="note"
                          label={t('Notes')}
                        />
                      </FieldGroup>
                    )}

                    <div className="margin-top-6 margin-bottom-3">
                      <Button
                        type="button"
                        className="usa-button usa-button--outline margin-bottom-1"
                        onClick={() => history.goBack()}
                      >
                        {h('back')}
                      </Button>
                      <Button
                        type="submit"
                        disabled={!dirty}
                        className=""
                        onClick={() => setErrors({})}
                      >
                        {h('next')}
                      </Button>
                    </div>
                  </Form>
                </>
              );
            }}
          </Formik>
        </div>
        {/* //TODO: To implement a save function */}
        <Link
          to={`/models/${modelId}/task-list/`}
          className="display-flex flex-align-center margin-bottom-6"
        >
          <IconArrowBack className="margin-right-1" aria-hidden />
          {h('saveAndReturn')}
        </Link>
        <PageNumber
          currentPage={3}
          totalPages={3}
          className="margin-bottom-10"
        />
      </div>
    </MainContent>
  );
};

export default Milestones;
