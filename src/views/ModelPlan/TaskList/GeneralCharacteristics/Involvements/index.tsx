import React, { useRef } from 'react';
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
  GetInvolvementsQuery,
  useGetInvolvementsQuery,
  useUpdatePlanGeneralCharacteristicsMutation
} from 'gql/gen/graphql';

import AddNote from 'components/AddNote';
import AskAQuestion from 'components/AskAQuestion';
import BooleanRadio from 'components/BooleanRadioForm';
import PageHeading from 'components/PageHeading';
import PageNumber from 'components/PageNumber';
import AutoSave from 'components/shared/AutoSave';
import { ErrorAlert, ErrorAlertMessage } from 'components/shared/ErrorAlert';
import FieldErrorMsg from 'components/shared/FieldErrorMsg';
import FieldGroup from 'components/shared/FieldGroup';
import TextAreaField from 'components/shared/TextAreaField';
import usePlanTranslation from 'hooks/usePlanTranslation';
import { getKeys } from 'types/translation';
import flattenErrors from 'utils/flattenErrors';
import { dirtyInput } from 'utils/formDiff';
import { NotFoundPartial } from 'views/NotFound';

type InvolvementsFormType = GetInvolvementsQuery['modelPlan']['generalCharacteristics'];

const Involvements = () => {
  const { t: generalCharacteristicsT } = useTranslation(
    'generalCharacteristics'
  );
  const { t: generalCharacteristicsMiscT } = useTranslation(
    'generalCharacteristicsMisc'
  );
  const { t: miscellaneousT } = useTranslation('miscellaneous');

  const {
    careCoordinationInvolved: careCoordinationInvolvedConfig,
    additionalServicesInvolved: additionalServicesInvolvedConfig,
    communityPartnersInvolved: communityPartnersInvolvedConfig
  } = usePlanTranslation('generalCharacteristics');

  const { modelID } = useParams<{ modelID: string }>();

  const formikRef = useRef<FormikProps<InvolvementsFormType>>(null);
  const history = useHistory();

  const { data, loading, error } = useGetInvolvementsQuery({
    variables: {
      id: modelID
    }
  });

  const modelName = data?.modelPlan?.modelName || '';

  const {
    id,
    careCoordinationInvolved,
    careCoordinationInvolvedDescription,
    careCoordinationInvolvedNote,
    additionalServicesInvolved,
    additionalServicesInvolvedDescription,
    additionalServicesInvolvedNote,
    communityPartnersInvolved,
    communityPartnersInvolvedDescription,
    communityPartnersInvolvedNote
  } = (data?.modelPlan?.generalCharacteristics || {}) as InvolvementsFormType;

  const [update] = useUpdatePlanGeneralCharacteristicsMutation();

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
            history.push(
              `/models/${modelID}/task-list/characteristics/targets-and-options`
            );
          } else if (redirect === 'back') {
            history.push(
              `/models/${modelID}/task-list/characteristics/key-characteristics`
            );
          } else if (redirect === 'task-list') {
            history.push(`/models/${modelID}/task-list`);
          }
        }
      })
      .catch(errors => {
        formikRef?.current?.setErrors(errors);
      });
  };

  const initialValues: InvolvementsFormType = {
    __typename: 'PlanGeneralCharacteristics',
    id: id ?? '',
    careCoordinationInvolved: careCoordinationInvolved ?? null,
    careCoordinationInvolvedDescription:
      careCoordinationInvolvedDescription ?? '',
    careCoordinationInvolvedNote: careCoordinationInvolvedNote ?? '',
    additionalServicesInvolved: additionalServicesInvolved ?? null,
    additionalServicesInvolvedDescription:
      additionalServicesInvolvedDescription ?? '',
    additionalServicesInvolvedNote: additionalServicesInvolvedNote ?? '',
    communityPartnersInvolved: communityPartnersInvolved ?? null,
    communityPartnersInvolvedDescription:
      communityPartnersInvolvedDescription ?? '',
    communityPartnersInvolvedNote: communityPartnersInvolvedNote ?? ''
  };

  if ((!loading && error) || (!loading && !data?.modelPlan)) {
    return <NotFoundPartial />;
  }

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
        <Breadcrumb current>
          {generalCharacteristicsMiscT('breadcrumb')}
        </Breadcrumb>
      </BreadcrumbBar>
      <PageHeading className="margin-top-4 margin-bottom-2">
        {generalCharacteristicsMiscT('heading')}
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
        onSubmit={values => {
          handleFormSubmit('next');
        }}
        enableReinitialize
        innerRef={formikRef}
      >
        {(formikProps: FormikProps<InvolvementsFormType>) => {
          const {
            errors,
            handleSubmit,
            setErrors,
            setFieldValue,
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
                className="desktop:grid-col-6 margin-top-6"
                data-testid="plan-characteristics-involvements-form"
                onSubmit={e => {
                  handleSubmit(e);
                }}
              >
                <Fieldset disabled={!!error || loading}>
                  <FieldGroup
                    scrollElement="careCoordinationInvolved"
                    error={!!flatErrors.careCoordinationInvolved}
                    className="margin-y-4"
                  >
                    <Label htmlFor="plan-characteristics-care-coordination-involved">
                      {generalCharacteristicsT(
                        'careCoordinationInvolved.label'
                      )}
                    </Label>

                    <FieldErrorMsg>
                      {flatErrors.careCoordinationInvolved}
                    </FieldErrorMsg>

                    <BooleanRadio
                      field="careCoordinationInvolved"
                      id="plan-characteristics-care-coordination-involved"
                      value={values.careCoordinationInvolved}
                      setFieldValue={setFieldValue}
                      options={careCoordinationInvolvedConfig.options}
                      childName="careCoordinationInvolvedDescription"
                    >
                      {values.careCoordinationInvolved === true ? (
                        <div className="display-flex margin-left-4 margin-bottom-1">
                          <FieldGroup
                            className="flex-1"
                            scrollElement="careCoordinationInvolvedDescription"
                            error={
                              !!flatErrors.careCoordinationInvolvedDescription
                            }
                          >
                            <Label
                              htmlFor="plan-characteristics-care-coordination-description"
                              className="margin-bottom-1 text-normal"
                            >
                              {generalCharacteristicsT(
                                'careCoordinationInvolvedDescription.label'
                              )}
                            </Label>

                            <FieldErrorMsg>
                              {flatErrors.careCoordinationInvolvedDescription}
                            </FieldErrorMsg>

                            <Field
                              as={TextAreaField}
                              error={
                                !!flatErrors.careCoordinationInvolvedDescription
                              }
                              className="margin-top-0 height-15"
                              id="plan-characteristics-care-coordination-description"
                              name="careCoordinationInvolvedDescription"
                            />
                          </FieldGroup>
                        </div>
                      ) : (
                        <></>
                      )}
                    </BooleanRadio>
                  </FieldGroup>

                  <AddNote
                    id="plan-characteristics-care-coordination-note"
                    field="careCoordinationInvolvedNote"
                  />

                  <FieldGroup
                    scrollElement="additionalServicesInvolved"
                    error={!!flatErrors.additionalServicesInvolved}
                    className="margin-y-4"
                  >
                    <Label htmlFor="plan-characteristics-additional-services">
                      {generalCharacteristicsT(
                        'additionalServicesInvolved.label'
                      )}
                    </Label>

                    <FieldErrorMsg>
                      {flatErrors.additionalServicesInvolved}
                    </FieldErrorMsg>

                    <BooleanRadio
                      field="additionalServicesInvolved"
                      id="plan-characteristics-additional-services"
                      value={values.additionalServicesInvolved}
                      setFieldValue={setFieldValue}
                      options={additionalServicesInvolvedConfig.options}
                      childName="additionalServicesInvolvedDescription"
                    >
                      {values.additionalServicesInvolved === true ? (
                        <div className="display-flex margin-left-4 margin-bottom-1">
                          <FieldGroup
                            className="flex-1"
                            scrollElement="additionalServicesInvolvedDescription"
                            error={
                              !!flatErrors.additionalServicesInvolvedDescription
                            }
                          >
                            <Label
                              htmlFor="plan-characteristics-additional-services-description"
                              className="margin-bottom-1 text-normal"
                            >
                              {generalCharacteristicsT(
                                'additionalServicesInvolvedDescription.label'
                              )}
                            </Label>

                            <FieldErrorMsg>
                              {flatErrors.additionalServicesInvolvedDescription}
                            </FieldErrorMsg>

                            <Field
                              as={TextAreaField}
                              error={
                                !!flatErrors.additionalServicesInvolvedDescription
                              }
                              className="margin-top-0 height-15"
                              data-testid="plan-characteristics-additional-services-description"
                              id="plan-characteristics-additional-services-description"
                              name="additionalServicesInvolvedDescription"
                            />
                          </FieldGroup>
                        </div>
                      ) : (
                        <></>
                      )}
                    </BooleanRadio>
                  </FieldGroup>

                  <AddNote
                    id="plan-characteristics-additional-services-note"
                    field="additionalServicesInvolvedNote"
                  />

                  <FieldGroup
                    scrollElement="communityPartnersInvolved"
                    error={!!flatErrors.communityPartnersInvolved}
                    className="margin-y-4"
                  >
                    <Label htmlFor="plan-characteristics-community-partners-involved">
                      {generalCharacteristicsT(
                        'communityPartnersInvolved.label'
                      )}
                    </Label>

                    <FieldErrorMsg>
                      {flatErrors.communityPartnersInvolved}
                    </FieldErrorMsg>

                    <BooleanRadio
                      field="communityPartnersInvolved"
                      id="plan-characteristics-community-partners-involved"
                      value={values.communityPartnersInvolved}
                      setFieldValue={setFieldValue}
                      options={communityPartnersInvolvedConfig.options}
                      childName="communityPartnersInvolvedDescription"
                    >
                      {values.communityPartnersInvolved === true ? (
                        <div className="display-flex margin-left-4 margin-bottom-1">
                          <FieldGroup
                            className="flex-1"
                            scrollElement="communityPartnersInvolvedDescription"
                            error={
                              !!flatErrors.communityPartnersInvolvedDescription
                            }
                          >
                            <Label
                              htmlFor="plan-characteristics-community-partners-description"
                              className="margin-bottom-1 text-normal"
                            >
                              {generalCharacteristicsT(
                                'communityPartnersInvolvedDescription.label'
                              )}
                            </Label>

                            <FieldErrorMsg>
                              {flatErrors.communityPartnersInvolvedDescription}
                            </FieldErrorMsg>

                            <Field
                              as={TextAreaField}
                              error={
                                !!flatErrors.communityPartnersInvolvedDescription
                              }
                              className="margin-top-0 height-15"
                              id="plan-characteristics-community-partners-description"
                              name="communityPartnersInvolvedDescription"
                            />
                          </FieldGroup>
                        </div>
                      ) : (
                        <></>
                      )}
                    </BooleanRadio>
                  </FieldGroup>

                  <AddNote
                    id="plan-characteristics-community-partners-note"
                    field="communityPartnersInvolvedNote"
                  />

                  <div className="margin-top-6 margin-bottom-3">
                    <Button
                      type="button"
                      className="usa-button usa-button--outline margin-bottom-1"
                      onClick={() => {
                        handleFormSubmit('back');
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
                    handleFormSubmit();
                  }}
                  debounceDelay={3000}
                />
              )}
            </>
          );
        }}
      </Formik>

      <PageNumber currentPage={3} totalPages={5} className="margin-y-6" />
    </>
  );
};

export default Involvements;
