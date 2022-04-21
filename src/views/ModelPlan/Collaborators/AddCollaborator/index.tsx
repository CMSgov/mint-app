import React, { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { Button, ComboBox, Dropdown, Label } from '@trussworks/react-uswds';
import { Field, Form, Formik, FormikProps } from 'formik';

import UswdsReactLink from 'components/LinkWrapper';
import MainContent from 'components/MainContent';
import PageHeading from 'components/PageHeading';
import Alert from 'components/shared/Alert';
// import AutoSave from 'components/shared/AutoSave';
import { DescriptionDefinition } from 'components/shared/DescriptionGroup';
import { ErrorAlert, ErrorAlertMessage } from 'components/shared/ErrorAlert';
import FieldErrorMsg from 'components/shared/FieldErrorMsg';
import FieldGroup from 'components/shared/FieldGroup';
import Spinner from 'components/Spinner';
import teamRoles from 'constants/enums/teamRoles';
import CreateModelPlanCollaborator from 'queries/CreateModelPlanCollaborator';
import GetCedarUser from 'queries/GetCedarUser';
// import GetModelPlanCollaborators from 'queries/GetModelCollaborators';
import {
  CreateModelPlanCollaborator as CreateCollaboratorsType,
  CreateModelPlanCollaborator_createPlanCollaborator as CollaboratorsType
} from 'queries/types/CreateModelPlanCollaborator';
import { GetCedarUser as GetCedarUserType } from 'queries/types/GetCedarUser';
// import {
//   GetModelCollaborators,
//   GetModelCollaborators_modelPlan_collaborators as GetCollaboratorsType
// } from 'queries/types/GetModelPlanCollaborator';
// import UpdateDraftModelPlan from 'queries/UpdateModelPlan';
import { CollaboratorForm } from 'types/collaborator';
import flattenErrors from 'utils/flattenErrors';
import translateTeamRole from 'utils/modelPlan';
import CollaboratorsValidationSchema from 'validations/modelPlanCollaborators';

const Collaborators = () => {
  const { modelId } = useParams<{ modelId: string }>();
  //   const { collaboratorId } = useParams<{ collaboratorId: string }>();
  const { t: h } = useTranslation('draftModelPlan');
  const { t } = useTranslation('newModel');
  const formikRef = useRef<FormikProps<CollaboratorForm>>(null);

  //   const [commonName, setCommonName] = useState('');
  //   const { data, loading, error } = useQuery(GetCedarUser, {
  //     variables: { commonName }
  //   });

  const history = useHistory();
  const [create] = useMutation<CreateCollaboratorsType>(
    CreateModelPlanCollaborator
  );
  //   const [update] = useMutation(UpdateDraftModelPlan);

  //   const { loading, error, data } = useQuery<GetModelCollaborators>(
  //     GetModelPlanCollaborators,
  //     {
  //       variables: { collaboratorId },
  //       skip: !collaboratorId
  //     }
  //   );

  //   const collaborator = (data?.collaborator ?? {}) as CollaboratorsType;

  const handleUpdateDraftModelPlan = (formikValues?: CollaboratorForm) => {
    const { fullName, teamRole, euaUserID } = formikValues || {};

    // if (collaboratorId) {
    //   update({
    //     variables: {
    //       input: {
    //         modelName,
    //         teamRole
    //       }
    //     }
    //   }).then(response => {
    //     if (!response?.errors) {
    //       history.push(`/models/new-plan/${modelId}/collaborators`);
    //     }
    //   });
    // } else {
    create({
      variables: {
        input: {
          fullName,
          teamRole,
          euaUserID,
          cmsCenter: 'CMMI',
          modelPlanID: modelId
        }
      }
    })
      .then(response => {
        if (!response?.errors) {
          history.push(`/models/new-plan/${modelId}/collaborators`);
        }
      })
      .catch(error => {
        formikRef?.current?.setErrors(error);
      });
    // }
  };

  // TODO: Replace mocked data with call to CEDAR for users
  const userMocks = useMemo(() => {
    return [
      {
        id: '123',
        fullName: 'John Doe',
        euaUserID: 'ABCD',
        teamRole: 'MODEL_LEAD'
      },
      {
        id: '456',
        fullName: 'Jane Oddball',
        euaUserID: 'WASD',
        teamRole: 'MODEL_LEAD'
      },
      {
        id: '789',
        fullName: 'Shelly CMS',
        euaUserID: 'TYUU',
        teamRole: 'LEADERSHIP'
      }
    ];
  }, []);

  const initialValues: CollaboratorForm = {
    euaUserID: '',
    fullName: '',
    teamRole: ''
  };

  // Convert user to obj for keying selected user in combobox
  const users = useMemo(() => {
    const userObj: any = {}; // TODO: Replace with CEDAR user type

    userMocks.forEach(user => {
      userObj[user.id] = user;
    });

    return userObj;
  }, [userMocks]);

  const projectComboBoxOptions = useMemo(() => {
    return (userMocks || []).map(user => {
      return {
        label: `${user.fullName} - ${user.euaUserID}`,
        value: user.id
      };
    });
  }, [userMocks]);

  //   if (loading) {
  //     return (
  //       <div className="text-center" data-testid="table-loading">
  //         <Spinner size="xl" />
  //       </div>
  //     );
  //   }

  //   if (error) {
  //     return <div>{JSON.stringify(error)}</div>;
  //   }

  return (
    <MainContent className="margin-bottom-5">
      <div className="grid-container">
        <div className="desktop:grid-col-6">
          <PageHeading className="margin-top-6 margin-bottom-2">
            {t('addATeamMember')}
          </PageHeading>
          <div className="margin-bottom-6 line-height-body-6">
            {t('searchTeamInfo')}
          </div>

          <Formik
            initialValues={initialValues}
            onSubmit={handleUpdateDraftModelPlan}
            validationSchema={CollaboratorsValidationSchema}
            validateOnBlur={false}
            validateOnChange={false}
            validateOnMount={false}
            innerRef={formikRef}
          >
            {(
              formikProps: FormikProps<{
                euaUserID: string;
                fullName: string;
                teamRole: string;
              }>
            ) => {
              const {
                errors,
                values,
                setErrors,
                setFieldValue,
                handleSubmit
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
                    onSubmit={e => {
                      handleSubmit(e);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <FieldGroup
                      scrollElement="fullName"
                      error={!!flatErrors.fullName}
                    >
                      <Label htmlFor="new-plan-model-name">
                        {t('teamMemberName')}
                      </Label>
                      <DescriptionDefinition
                        className="line-height-body-3 text-base-dark"
                        definition={t('teamNameInfo')}
                      />
                      <FieldErrorMsg>{flatErrors.fullName}</FieldErrorMsg>
                      <ComboBox
                        id="collaborator-user"
                        name="collaboratorComboBox"
                        inputProps={{
                          id: 'collaborator-user',
                          name: 'collaborator',
                          'aria-label': 'application',
                          'aria-describedby': 'Draft-Model-Plan-Collaborator'
                        }}
                        options={projectComboBoxOptions}
                        onChange={(user: any) => {
                          //   console.log(user);
                          //   setCommonName(user);
                          setFieldValue('euaUserID', users[user]?.euaUserID);
                          setFieldValue('fullName', users[user]?.fullName);
                        }}
                      />
                    </FieldGroup>

                    <FieldGroup
                      scrollElement="teamRole"
                      error={!!flatErrors.teamRole}
                    >
                      <Label htmlFor="IntakeForm-RequesterComponent">
                        {t('teamMemberRole')}
                      </Label>
                      <FieldErrorMsg>{flatErrors.teamRole}</FieldErrorMsg>
                      <Field
                        as={Dropdown}
                        id="collaborator-role"
                        name="role"
                        defaultValue=""
                        onChange={(e: any) => {
                          setFieldValue('teamRole', e.target.value);
                        }}
                      >
                        <option value="" key="default-select" disabled>
                          {`-${h('select')}-`}
                        </option>
                        {Object.keys(teamRoles).map(role => {
                          return (
                            <option
                              key={`Collaborator-Role-${translateTeamRole(
                                teamRoles[role]
                              )}`}
                              value={role}
                            >
                              {translateTeamRole(teamRoles[role])}
                            </option>
                          );
                        })}
                      </Field>
                    </FieldGroup>

                    <Alert
                      type="info"
                      slim
                      data-testid="mandatory-fields-alert"
                      className="margin-y-4"
                    >
                      <span className="mandatory-fields-alert__text">
                        {t('searchMemberInfo')}
                      </span>
                    </Alert>

                    <div className="margin-y-4 display-block">
                      <Button
                        type="submit"
                        disabled={!values.fullName || !values.teamRole}
                        onClick={() => setErrors({})}
                      >
                        {t('addTeamMemberButton')}
                      </Button>
                    </div>
                  </Form>
                  {/* <AutoSave
                    values={values}
                    onSave={() => {
                      handleUpdateDraftModelPlan(formikRef?.current?.values);
                    }}
                    debounceDelay={3000}
                  /> */}
                </>
              );
            }}
          </Formik>
          <UswdsReactLink to={`/models/new-plan/${modelId}/collaborators`}>
            <span>&larr; </span> {t('dontAddTeamMember')}
          </UswdsReactLink>
        </div>
      </div>
    </MainContent>
  );
};

export default Collaborators;
