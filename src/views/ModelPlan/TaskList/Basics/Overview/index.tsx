import React, { Fragment, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbBar,
  BreadcrumbLink,
  Button,
  Fieldset,
  Icon,
  Label
} from '@trussworks/react-uswds';
import { Field, Form, Formik, FormikProps } from 'formik';
import {
  GetOverviewQuery,
  useGetOverviewQuery,
  useUpdateBasicsMutation
} from 'gql/gen/graphql';

import AddNote from 'components/AddNote';
import AskAQuestion from 'components/AskAQuestion';
import PageHeading from 'components/PageHeading';
import PageNumber from 'components/PageNumber';
import AutoSave from 'components/shared/AutoSave';
import CheckboxField from 'components/shared/CheckboxField';
import { ErrorAlert, ErrorAlertMessage } from 'components/shared/ErrorAlert';
import FieldErrorMsg from 'components/shared/FieldErrorMsg';
import FieldGroup from 'components/shared/FieldGroup';
import TextAreaField from 'components/shared/TextAreaField';
import usePlanTranslation from 'hooks/usePlanTranslation';
import { getKeys } from 'types/translation';
import flattenErrors from 'utils/flattenErrors';
import { dirtyInput } from 'utils/formDiff';
import { NotFoundPartial } from 'views/NotFound';

type BasicsFormType = GetOverviewQuery['modelPlan']['basics'];

const Overview = () => {
  const { t: basicsT } = useTranslation('basics');
  const { t: basicsMiscT } = useTranslation('basicsMisc');
  const { t: miscellaneousT } = useTranslation('miscellaneous');

  const { modelType: modelTypeConfig } = usePlanTranslation('basics');

  const { modelID } = useParams<{ modelID: string }>();

  const formikRef = useRef<FormikProps<BasicsFormType>>(null);
  const history = useHistory();

  const { data, loading, error } = useGetOverviewQuery({
    variables: {
      id: modelID
    }
  });

  const { modelName } = data?.modelPlan || {};

  const {
    id,
    modelType,
    modelTypeOther,
    problem,
    goal,
    testInterventions,
    note
  } = (data?.modelPlan?.basics || {}) as BasicsFormType;

  const [update] = useUpdateBasicsMutation();

  const handleFormSubmit = (redirect?: 'next' | 'back' | 'task-list') => {
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
            history.push(`/models/${modelID}/task-list/basics/milestones`);
          } else if (redirect === 'back') {
            history.push(`/models/${modelID}/task-list/basics`);
          } else if (redirect === 'task-list') {
            history.push(`/models/${modelID}/task-list/`);
          }
        }
      })
      .catch(errors => {
        formikRef?.current?.setErrors(errors);
      });
  };

  const initialValues: BasicsFormType = {
    __typename: 'PlanBasics',
    id: id ?? '',
    modelType: modelType ?? [],
    modelTypeOther: modelTypeOther ?? '',
    problem: problem ?? '',
    goal: goal ?? '',
    testInterventions: testInterventions ?? '',
    note: note ?? ''
  };

  if ((!loading && error) || (!loading && !data?.modelPlan)) {
    return <NotFoundPartial />;
  }

  return (
    <div data-testid="model-plan-overview">
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
        <Breadcrumb current>{basicsMiscT('breadcrumb')}</Breadcrumb>
      </BreadcrumbBar>
      <PageHeading className="margin-top-4 margin-bottom-1">
        {basicsMiscT('heading')}
      </PageHeading>

      <p
        className="margin-top-0 margin-bottom-1 font-body-lg"
        data-testid="model-plan-name"
      >
        {miscellaneousT('for')} {modelName}
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
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
        innerRef={formikRef}
      >
        {(formikProps: FormikProps<BasicsFormType>) => {
          const {
            dirty,
            errors,
            handleSubmit,
            isValid,
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

              <Form
                className="tablet:grid-col-6 margin-top-6"
                onSubmit={e => {
                  handleSubmit(e);
                  window.scrollTo(0, 0);
                }}
              >
                <Fieldset disabled={!!error || loading}>
                  <FieldGroup
                    scrollElement="modelType"
                    error={!!flatErrors.modelType}
                    className="margin-top-4"
                  >
                    <Label htmlFor="modelType">
                      {basicsT('modelType.label')}
                    </Label>

                    <FieldErrorMsg>{flatErrors.modelType}</FieldErrorMsg>

                    <Fieldset>
                      {getKeys(modelTypeConfig.options).map(key => (
                        <Fragment key={key}>
                          <Field
                            as={CheckboxField}
                            id={`ModelType-${key}`}
                            name="modelType"
                            label={modelTypeConfig.options[key]}
                            value={key}
                            checked={values.modelType.includes(key)}
                          />
                        </Fragment>
                      ))}
                    </Fieldset>
                  </FieldGroup>

                  <FieldGroup
                    scrollElement="problem"
                    error={!!flatErrors.problem}
                    className="margin-top-4"
                  >
                    <Field
                      as={TextAreaField}
                      error={flatErrors.problem}
                      id="ModelType-Problem"
                      data-testid="ModelType-Problem"
                      name="problem"
                      label={basicsT('problem.label')}
                    />
                  </FieldGroup>

                  <FieldGroup
                    scrollElement="goal"
                    error={!!flatErrors.goal}
                    className="margin-top-4"
                  >
                    <Field
                      as={TextAreaField}
                      error={flatErrors.goal}
                      id="ModelType-Goal"
                      name="goal"
                      hint={basicsT('goal.sublabel')}
                      label={basicsT('goal.label')}
                    />
                  </FieldGroup>

                  <FieldGroup
                    scrollElement="testInterventions"
                    error={!!flatErrors.testInterventions}
                    className="margin-top-4"
                  >
                    <Field
                      as={TextAreaField}
                      error={flatErrors.testInterventions}
                      id="ModelType-testInterventions"
                      name="testInterventions"
                      label={basicsT('testInterventions.label')}
                    />
                  </FieldGroup>

                  <AddNote id="ModelType-note" field="note" />

                  <div className="margin-top-6 margin-bottom-3">
                    <Button
                      type="button"
                      className="usa-button usa-button--outline margin-bottom-1"
                      onClick={() => handleFormSubmit('back')}
                    >
                      {miscellaneousT('back')}
                    </Button>

                    <Button
                      type="submit"
                      disabled={!(dirty || isValid)}
                      className=""
                      onClick={() => setErrors({})}
                    >
                      {miscellaneousT('next')}
                    </Button>
                  </div>
                  <Button
                    type="button"
                    className="usa-button usa-button--unstyled"
                    onClick={() => handleFormSubmit('task-list')}
                  >
                    <Icon.ArrowBack className="margin-right-1" aria-hidden />

                    {miscellaneousT('saveAndReturn')}
                  </Button>
                </Fieldset>
              </Form>

              {id && (
                <AutoSave
                  values={values}
                  onSave={() => {
                    if (getKeys(formikRef.current!.touched).length !== 0) {
                      handleFormSubmit();
                    }
                  }}
                  debounceDelay={3000}
                />
              )}
            </>
          );
        }}
      </Formik>

      <PageNumber currentPage={2} totalPages={3} className="margin-bottom-10" />
    </div>
  );
};

export default Overview;
