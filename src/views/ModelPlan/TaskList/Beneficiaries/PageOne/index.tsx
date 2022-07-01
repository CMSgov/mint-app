import React, { useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {
  Breadcrumb,
  BreadcrumbBar,
  BreadcrumbLink,
  Fieldset,
  Grid,
  GridContainer,
  Label,
  Radio
} from '@trussworks/react-uswds';
import { Field, Form, Formik, FormikProps } from 'formik';

import AddNote from 'components/AddNote';
import AskAQuestion from 'components/AskAQuestion';
import PageHeading from 'components/PageHeading';
import PageNumber from 'components/PageNumber';
import Alert from 'components/shared/Alert';
import AutoSave from 'components/shared/AutoSave';
import { ErrorAlert, ErrorAlertMessage } from 'components/shared/ErrorAlert';
import FieldErrorMsg from 'components/shared/FieldErrorMsg';
import FieldGroup from 'components/shared/FieldGroup';
import MultiSelect from 'components/shared/MultiSelect';
import TextAreaField from 'components/shared/TextAreaField';
import TextField from 'components/shared/TextField';
import GetModelPlanBeneficiaries from 'queries/GetModelPlanBeneficiaries';
import {
  GetModelPlanBeneficiaries as GetModelPlanBeneficiariesType,
  GetModelPlanBeneficiaries_modelPlan_beneficiaries as ModelPlanBeneficiariesFormType
} from 'queries/types/GetModelPlanBeneficiaries';
import { UpdateModelPlanBeneficiariesVariables } from 'queries/types/UpdateModelPlanBeneficiaries';
import UpdateModelPlanBeneficiaries from 'queries/UpdateModelPlanBeneficiaries';
import { BeneficiariesType, TriStateAnswer } from 'types/graphql-global-types';
import flattenErrors from 'utils/flattenErrors';
import { sortOtherEnum, translateBeneficiariesType } from 'utils/modelPlan';

const BeneficiariesPageOne = () => {
  const { t } = useTranslation('beneficiaries');
  const { t: h } = useTranslation('draftModelPlan');
  const { modelID } = useParams<{ modelID: string }>();

  const formikRef = useRef<FormikProps<ModelPlanBeneficiariesFormType>>(null);
  const history = useHistory();

  const { data } = useQuery<GetModelPlanBeneficiariesType>(
    GetModelPlanBeneficiaries,
    {
      variables: {
        id: modelID
      }
    }
  );

  const {
    id,
    beneficiaries,
    beneficiariesOther,
    beneficiariesNote,
    treatDualElligibleDifferent,
    treatDualElligibleDifferentHow,
    treatDualElligibleDifferentNote,
    excludeCertainCharacteristics,
    excludeCertainCharacteristicsCriteria,
    excludeCertainCharacteristicsNote
  } = data?.modelPlan?.beneficiaries || ({} as ModelPlanBeneficiariesFormType);

  const modelName = data?.modelPlan?.modelName || '';

  const [update] = useMutation<UpdateModelPlanBeneficiariesVariables>(
    UpdateModelPlanBeneficiaries
  );

  const handleFormSubmit = (
    formikValues: ModelPlanBeneficiariesFormType,
    redirect?: 'next' | 'back'
  ) => {
    update({
      variables: {
        id,
        changes: formikValues
      }
    })
      .then(response => {
        if (!response?.errors) {
          if (redirect === 'next') {
            history.push(
              `/models/${modelID}/task-list/beneficiaries/participants-options`
            );
          } else if (redirect === 'back') {
            history.push(`/models/${modelID}/task-list/`);
          }
        }
      })
      .catch(errors => {
        formikRef?.current?.setErrors(errors);
      });
  };

  const mappedBeneficiariesType = Object.keys(BeneficiariesType)
    .sort(sortOtherEnum)
    .map(key => ({
      value: key,
      label: translateBeneficiariesType(key)
    }));

  const initialValues = {
    beneficiaries: beneficiaries ?? '',
    beneficiariesOther: beneficiariesOther ?? '',
    beneficiariesNote: beneficiariesNote ?? '',
    treatDualElligibleDifferent: treatDualElligibleDifferent ?? '',
    treatDualElligibleDifferentHow: treatDualElligibleDifferentHow ?? '',
    treatDualElligibleDifferentNote: treatDualElligibleDifferentNote ?? '',
    excludeCertainCharacteristics: excludeCertainCharacteristics ?? '',
    excludeCertainCharacteristicsCriteria:
      excludeCertainCharacteristicsCriteria ?? '',
    excludeCertainCharacteristicsNote: excludeCertainCharacteristicsNote ?? ''
  } as ModelPlanBeneficiariesFormType;

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
        {(formikProps: FormikProps<ModelPlanBeneficiariesFormType>) => {
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
                <Grid row gap className="beneficiaries__info">
                  <Grid desktop={{ col: 6 }}>
                    <Form
                      className="margin-top-6"
                      data-testid="beneficiaries-form"
                      onSubmit={e => {
                        handleSubmit(e);
                      }}
                    >
                      <FieldGroup
                        scrollElement="beneficiaries"
                        error={!!flatErrors.beneficiaries}
                        className="margin-top-4"
                      >
                        <Label htmlFor="beneficiaries-beneficiaries">
                          {t('beneficiaries')}
                        </Label>
                        <FieldErrorMsg>
                          {flatErrors.beneficiaries}
                        </FieldErrorMsg>

                        <Field
                          as={MultiSelect}
                          id="beneficiaries-beneficiaries"
                          name="beneficiaries"
                          options={mappedBeneficiariesType}
                          selectedLabel={t('selectedGroup')}
                          onChange={(value: string[] | []) => {
                            setFieldValue('beneficiaries', value);
                          }}
                          initialValues={initialValues.beneficiaries}
                        />

                        {(values?.beneficiaries || []).includes(
                          'OTHER' as BeneficiariesType
                        ) && (
                          <FieldGroup
                            scrollElement="beneficiariesOther"
                            error={!!flatErrors.beneficiariesOther}
                          >
                            <Label
                              htmlFor="beneficiaries-other"
                              className="text-normal"
                            >
                              {t('beneficiariesOther')}
                            </Label>
                            <FieldErrorMsg>
                              {flatErrors.beneficiariesOther}
                            </FieldErrorMsg>
                            <Field
                              as={TextField}
                              error={flatErrors.beneficiariesOther}
                              id="beneficiaries-other"
                              data-testid="beneficiaries-other"
                              name="participantsOther"
                            />
                          </FieldGroup>
                        )}

                        {(values?.beneficiaries || []).includes(
                          'NA' as BeneficiariesType
                        ) && (
                          <Alert type="info" slim>
                            {t('beneficiariesNA')}
                          </Alert>
                        )}

                        <AddNote
                          id="beneficiaries-note"
                          field="beneficiariesNote"
                        />
                      </FieldGroup>

                      <FieldGroup
                        scrollElement="treatDualElligibleDifferent"
                        error={!!flatErrors.treatDualElligibleDifferent}
                        className="margin-y-4 margin-bottom-8"
                      >
                        <Label htmlFor="beneficiaries-dual-eligibility">
                          {t('dualEligibility')}
                        </Label>
                        <FieldErrorMsg>
                          {flatErrors.treatDualElligibleDifferent}
                        </FieldErrorMsg>
                        <Fieldset>
                          <Field
                            as={Radio}
                            id="beneficiaries-dual-eligibility"
                            name="treatDualElligibleDifferent"
                            label={h('yes')}
                            value="TRUE"
                            checked={
                              values.treatDualElligibleDifferent === 'YES'
                            }
                            onChange={() => {
                              setFieldValue(
                                'treatDualElligibleDifferent',
                                'YES'
                              );
                            }}
                          />
                          {values?.treatDualElligibleDifferent!.includes(
                            'YES' as TriStateAnswer
                          ) && (
                            <FieldGroup
                              className="margin-left-4 margin-y-1"
                              scrollElement="treatDualElligibleDifferentHow"
                              error={
                                !!flatErrors.treatDualElligibleDifferentHow
                              }
                            >
                              <Label
                                htmlFor="beneficiaries-dual-eligibility-how"
                                className="text-normal"
                              >
                                {h('howSo')}
                              </Label>
                              <FieldErrorMsg>
                                {flatErrors.treatDualElligibleDifferentHow}
                              </FieldErrorMsg>
                              <Field
                                as={TextAreaField}
                                className="height-15"
                                error={
                                  flatErrors.treatDualElligibleDifferentHow
                                }
                                id="beneficiaries-dual-eligibility-how"
                                data-testid="beneficiaries-dual-eligibility-how"
                                name="beneficiaries-dual-eligibility-how"
                              />
                            </FieldGroup>
                          )}
                          <Field
                            as={Radio}
                            id="beneficiaries-dual-eligibility-no"
                            name="treatDualElligibleDifferent"
                            label={h('no')}
                            value="FALSE"
                            checked={
                              values.treatDualElligibleDifferent === 'NO'
                            }
                            onChange={() => {
                              setFieldValue(
                                'treatDualElligibleDifferent',
                                'NO'
                              );
                            }}
                          />
                          <Field
                            as={Radio}
                            id="beneficiaries-dual-eligibility-tbd"
                            name="treatDualElligibleDifferent"
                            label={t('beneficiariesOptions.na')}
                            value="TBD"
                            checked={
                              values.treatDualElligibleDifferent === 'TBD'
                            }
                            onChange={() => {
                              setFieldValue(
                                'treatDualElligibleDifferent',
                                'TBD'
                              );
                            }}
                          />
                        </Fieldset>
                        <AddNote
                          id="beneficiaries-dual-eligibility-note"
                          field="treatDualElligibleDifferentNote"
                        />
                      </FieldGroup>

                      <FieldGroup
                        scrollElement="excludeCertainCharacteristics"
                        error={!!flatErrors.excludeCertainCharacteristics}
                        className="margin-y-4 margin-bottom-8"
                      >
                        <Label htmlFor="beneficiaries-exclude">
                          {t('excluded')}
                        </Label>
                        <FieldErrorMsg>
                          {flatErrors.excludeCertainCharacteristics}
                        </FieldErrorMsg>
                        <Fieldset>
                          <Field
                            as={Radio}
                            id="beneficiaries-exclude"
                            name="excludeCertainCharacteristics"
                            label={h('yes')}
                            value="TRUE"
                            checked={
                              values.excludeCertainCharacteristics === 'YES'
                            }
                            onChange={() => {
                              setFieldValue(
                                'excludeCertainCharacteristics',
                                'YES'
                              );
                            }}
                          />
                          <Field
                            as={Radio}
                            id="beneficiaries-exclude-no"
                            name="excludeCertainCharacteristics"
                            label={h('no')}
                            value="FALSE"
                            checked={
                              values.excludeCertainCharacteristics === 'NO'
                            }
                            onChange={() => {
                              setFieldValue(
                                'excludeCertainCharacteristics',
                                'NO'
                              );
                            }}
                          />
                          <Field
                            as={Radio}
                            id="beneficiaries-exclude-tbd"
                            name="excludeCertainCharacteristics"
                            label={t('beneficiariesOptions.na')}
                            value="TBD"
                            checked={
                              values.excludeCertainCharacteristics === 'TBD'
                            }
                            onChange={() => {
                              setFieldValue(
                                'excludeCertainCharacteristics',
                                'TBD'
                              );
                            }}
                          />
                        </Fieldset>
                        <AddNote
                          id="beneficiaries-exclude-note"
                          field="excludeCertainCharacteristicsNote"
                        />
                      </FieldGroup>
                    </Form>
                  </Grid>
                </Grid>
              </GridContainer>
              {/* TODO: Comment to stop obnoxious errors */}
              {/* {id && (
                <AutoSave
                  values={values}
                  onSave={() => {
                    handleFormSubmit(formikRef.current!.values);
                  }}
                  debounceDelay={3000}
                />
              )} */}
            </>
          );
        }}
      </Formik>
      <PageNumber currentPage={1} totalPages={3} className="margin-y-6" />
    </>
  );
};

export default BeneficiariesPageOne;
