import React, { Fragment, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {
  Breadcrumb,
  BreadcrumbBar,
  BreadcrumbLink,
  Button,
  IconArrowBack,
  Label
} from '@trussworks/react-uswds';
import { Field, FieldArray, Form, Formik, FormikProps } from 'formik';

import AddNote from 'components/AddNote';
import AskAQuestion from 'components/AskAQuestion';
import BooleanRadio from 'components/BooleanRadioForm';
import ITSolutionsWarning from 'components/ITSolutionsWarning';
import PageHeading from 'components/PageHeading';
import PageNumber from 'components/PageNumber';
import AutoSave from 'components/shared/AutoSave';
import CheckboxField from 'components/shared/CheckboxField';
import { ErrorAlert, ErrorAlertMessage } from 'components/shared/ErrorAlert';
import FieldErrorMsg from 'components/shared/FieldErrorMsg';
import FieldGroup from 'components/shared/FieldGroup';
import TextAreaField from 'components/shared/TextAreaField';
import usePlanTranslation from 'hooks/usePlanTranslation';
import useScrollElement from 'hooks/useScrollElement';
import GetCoordination from 'queries/ParticipantsAndProviders/GetCoordination';
import {
  GetCoordination as GetCoordinationType,
  GetCoordination_modelPlan_participantsAndProviders as CoordinationFormType,
  GetCoordinationVariables
} from 'queries/ParticipantsAndProviders/types/GetCoordination';
import { UpdatePlanParticipantsAndProvidersVariables } from 'queries/ParticipantsAndProviders/types/UpdatePlanParticipantsAndProviders';
import UpdatePlanParticipantsAndProviders from 'queries/ParticipantsAndProviders/UpdatePlanParticipantsAndProviders';
import { ParticipantsIDType } from 'types/graphql-global-types';
import { getKeys } from 'types/translation';
import flattenErrors from 'utils/flattenErrors';
import { dirtyInput } from 'utils/formDiff';
import { NotFoundPartial } from 'views/NotFound';

export const Coordination = () => {
  const { t: participantsAndProvidersT } = useTranslation(
    'participantsAndProviders'
  );
  const { t: participantsAndProvidersMiscT } = useTranslation(
    'participantsAndProvidersMisc'
  );
  const { t: miscellaneousT } = useTranslation('miscellaneous');

  const {
    coordinateWork: coordinateWorkConfig,
    gainsharePayments: gainsharePaymentsConfig,
    gainsharePaymentsTrack: gainsharePaymentsTrackConfig,
    participantsIds: participantsIdsConfig
  } = usePlanTranslation('participantsAndProviders');

  const { modelID } = useParams<{ modelID: string }>();

  const formikRef = useRef<FormikProps<CoordinationFormType>>(null);
  const history = useHistory();

  const { data, loading, error } = useQuery<
    GetCoordinationType,
    GetCoordinationVariables
  >(GetCoordination, {
    variables: {
      id: modelID
    }
  });

  const {
    id,
    coordinateWork,
    coordinateWorkNote,
    gainsharePayments,
    gainsharePaymentsTrack,
    gainsharePaymentsNote,
    participantsIds,
    participantsIdsOther,
    participantsIDSNote
  } = data?.modelPlan?.participantsAndProviders || ({} as CoordinationFormType);

  const modelName = data?.modelPlan?.modelName || '';

  const itSolutionsStarted: boolean = !!data?.modelPlan.operationalNeeds.find(
    need => need.modifiedDts
  );

  // If redirected from IT Solutions, scrolls to the relevant question
  useScrollElement(!loading);

  const [update] = useMutation<UpdatePlanParticipantsAndProvidersVariables>(
    UpdatePlanParticipantsAndProviders
  );

  const handleFormSubmit = (redirect?: string) => {
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
              `/models/${modelID}/task-list/participants-and-providers/provider-options`
            );
          } else if (redirect === 'back') {
            history.push(
              `/models/${modelID}/task-list/participants-and-providers/communication`
            );
          } else if (redirect === 'task-list') {
            history.push(`/models/${modelID}/task-list`);
          } else if (redirect) {
            history.push(redirect);
          }
        }
      })
      .catch(errors => {
        formikRef?.current?.setErrors(errors);
      });
  };

  const initialValues: CoordinationFormType = {
    __typename: 'PlanParticipantsAndProviders',
    id: id ?? '',
    coordinateWork: coordinateWork ?? null,
    coordinateWorkNote: coordinateWorkNote ?? '',
    gainsharePayments: gainsharePayments ?? null,
    gainsharePaymentsTrack: gainsharePaymentsTrack ?? null,
    gainsharePaymentsNote: gainsharePaymentsNote ?? '',
    participantsIds: participantsIds ?? [],
    participantsIdsOther: participantsIdsOther ?? '',
    participantsIDSNote: participantsIDSNote ?? ''
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
          {participantsAndProvidersMiscT('breadcrumb')}
        </Breadcrumb>
      </BreadcrumbBar>
      <PageHeading className="margin-top-4 margin-bottom-2">
        {participantsAndProvidersMiscT('heading')}
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
        innerRef={formikRef}
      >
        {(formikProps: FormikProps<CoordinationFormType>) => {
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
                data-testid="participants-and-providers-coordination-form"
                onSubmit={e => {
                  handleSubmit(e);
                }}
              >
                <FieldGroup
                  scrollElement="coordinateWork"
                  error={!!flatErrors.coordinateWork}
                  className="margin-y-4 margin-bottom-8"
                >
                  <Label htmlFor="participants-and-providers-coordniate-work">
                    {participantsAndProvidersT('coordinateWork.question')}
                  </Label>

                  <p className="text-base margin-0 line-height-body-3">
                    {participantsAndProvidersT('coordinateWork.hint')}
                  </p>

                  <FieldErrorMsg>{flatErrors.coordinateWork}</FieldErrorMsg>

                  <BooleanRadio
                    field="coordinateWork"
                    id="participants-and-providers-coordniate-work"
                    value={values.coordinateWork}
                    setFieldValue={setFieldValue}
                    options={coordinateWorkConfig.options}
                  />

                  <AddNote
                    id="participants-and-providers-coordniate-work-note"
                    field="coordinateWorkNote"
                  />
                </FieldGroup>

                <FieldGroup
                  scrollElement="gainsharePayments"
                  error={!!flatErrors.gainsharePayments}
                  className="margin-y-4 margin-bottom-8"
                >
                  <Label htmlFor="participants-and-providers-gainshare-payment">
                    {participantsAndProvidersT('gainsharePayments.question')}
                  </Label>

                  <FieldErrorMsg>{flatErrors.gainsharePayments}</FieldErrorMsg>

                  <BooleanRadio
                    field="gainsharePayments"
                    id="participants-and-providers-gainshare-payment"
                    value={values.gainsharePayments}
                    setFieldValue={setFieldValue}
                    options={gainsharePaymentsConfig.options}
                  />

                  {values.gainsharePayments && (
                    <>
                      <Label
                        htmlFor="participants-and-providers-gainshare-track"
                        className="text-normal"
                      >
                        {participantsAndProvidersT(
                          'gainsharePaymentsTrack.question'
                        )}
                      </Label>

                      <FieldErrorMsg>
                        {flatErrors.gainsharePaymentsTrack}
                      </FieldErrorMsg>

                      <BooleanRadio
                        field="gainsharePaymentsTrack"
                        id="participants-and-providers-gainshare-track"
                        value={values.gainsharePaymentsTrack}
                        setFieldValue={setFieldValue}
                        options={gainsharePaymentsTrackConfig.options}
                      />
                    </>
                  )}
                  <AddNote
                    id="participants-and-providers-gainshare-payment-note"
                    field="gainsharePaymentsNote"
                  />
                </FieldGroup>

                <FieldGroup
                  scrollElement="participantsIds"
                  error={!!flatErrors.participantsIds}
                >
                  <FieldArray
                    name="participantsIds"
                    render={arrayHelpers => (
                      <>
                        <legend className="usa-label">
                          {participantsAndProvidersT(
                            'participantsIds.question'
                          )}
                        </legend>

                        {itSolutionsStarted && (
                          <ITSolutionsWarning
                            id="ops-eval-and-learning-data-needed-warning"
                            onClick={() =>
                              handleFormSubmit(
                                `/models/${modelID}/task-list/it-solutions`
                              )
                            }
                          />
                        )}

                        <p className="text-base margin-0 line-height-body-3">
                          {participantsAndProvidersT('participantsIds.hint')}
                        </p>

                        <FieldErrorMsg>
                          {flatErrors.participantsIds}
                        </FieldErrorMsg>

                        {getKeys(participantsIdsConfig.options).map(type => {
                          return (
                            <Fragment key={type}>
                              <Field
                                as={CheckboxField}
                                id={`participants-and-providers-participant-id-${type}`}
                                name="participantsIds"
                                label={participantsIdsConfig.options[type]}
                                value={type}
                                checked={values?.participantsIds.includes(type)}
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => {
                                  if (e.target.checked) {
                                    arrayHelpers.push(e.target.value);
                                  } else {
                                    const idx = values.participantsIds.indexOf(
                                      e.target.value as ParticipantsIDType
                                    );
                                    arrayHelpers.remove(idx);
                                  }
                                }}
                              />

                              {type === ParticipantsIDType.OTHER &&
                                values.participantsIds.includes(type) && (
                                  <div className="margin-left-4">
                                    <Label
                                      htmlFor="participants-and-providers-participant-id-other"
                                      className="text-normal margin-top-1"
                                    >
                                      {participantsAndProvidersT(
                                        'participantsIdsOther.question'
                                      )}
                                    </Label>

                                    <FieldErrorMsg>
                                      {flatErrors.participantsIdsOther}
                                    </FieldErrorMsg>

                                    <Field
                                      as={TextAreaField}
                                      className="maxw-none mint-textarea"
                                      id="participants-and-providers-participant-id-other"
                                      data-testid="participants-and-providers-participant-id-other"
                                      maxLength={5000}
                                      name="participantsIdsOther"
                                    />
                                  </div>
                                )}
                            </Fragment>
                          );
                        })}
                        <AddNote
                          id="participants-and-providers-participant-id-note"
                          field="participantsIDSNote"
                        />
                      </>
                    )}
                  />
                </FieldGroup>

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
                  <IconArrowBack className="margin-right-1" aria-hidden />

                  {miscellaneousT('saveAndReturn')}
                </Button>
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

      <PageNumber currentPage={4} totalPages={5} className="margin-y-6" />
    </>
  );
};

export default Coordination;
