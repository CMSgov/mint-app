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
  Radio
} from '@trussworks/react-uswds';
import { Field, Form, Formik, FormikProps } from 'formik';
import {
  GetFrequencyQuery,
  TypedUpdateModelPlanBeneficiariesDocument,
  useGetFrequencyQuery
} from 'gql/gen/graphql';

import AddNote from 'components/AddNote';
import AskAQuestion from 'components/AskAQuestion';
import ConfirmLeave from 'components/ConfirmLeave';
import FrequencyForm from 'components/FrequencyForm';
import ITSolutionsWarning from 'components/ITSolutionsWarning';
import MutationErrorModal from 'components/MutationErrorModal';
import PageHeading from 'components/PageHeading';
import PageNumber from 'components/PageNumber';
import ReadyForReview from 'components/ReadyForReview';
import CheckboxField from 'components/shared/CheckboxField';
import { ErrorAlert, ErrorAlertMessage } from 'components/shared/ErrorAlert';
import FieldErrorMsg from 'components/shared/FieldErrorMsg';
import FieldGroup from 'components/shared/FieldGroup';
import TextAreaField from 'components/shared/TextAreaField';
import useHandleMutation from 'hooks/useHandleMutation';
import usePlanTranslation from 'hooks/usePlanTranslation';
import useScrollElement from 'hooks/useScrollElement';
import { getKeys } from 'types/translation';
import flattenErrors from 'utils/flattenErrors';
import { NotFoundPartial } from 'views/NotFound';

type FrequencyFormType = GetFrequencyQuery['modelPlan']['beneficiaries'];

// Omitting readyForReviewBy and readyForReviewDts from initialValues and getting submitted through Formik
type InitialValueType = Omit<
  FrequencyFormType,
  'readyForReviewByUserAccount' | 'readyForReviewDts'
>;

const Frequency = () => {
  const { t: beneficiariesT } = useTranslation('beneficiaries');
  const { t: beneficiariesMiscT } = useTranslation('beneficiariesMisc');
  const { t: miscellaneousT } = useTranslation('miscellaneous');

  const {
    beneficiarySelectionFrequency: beneficiarySelectionFrequencyConfig,
    beneficiaryRemovalFrequency: beneficiaryRemovalFrequencyConfig,
    beneficiaryOverlap: beneficiaryOverlapConfig,
    precedenceRules: beneficiaryPrecedenceConfig
  } = usePlanTranslation('beneficiaries');

  const { modelID } = useParams<{ modelID: string }>();

  const formikRef = useRef<FormikProps<InitialValueType>>(null);
  const history = useHistory();

  const { data, loading, error } = useGetFrequencyQuery({
    variables: {
      id: modelID
    },
    fetchPolicy: 'network-only'
  });

  const {
    id,
    beneficiarySelectionFrequency,
    beneficiarySelectionFrequencyContinually,
    beneficiarySelectionFrequencyNote,
    beneficiarySelectionFrequencyOther,
    beneficiaryRemovalFrequency,
    beneficiaryRemovalFrequencyContinually,
    beneficiaryRemovalFrequencyNote,
    beneficiaryRemovalFrequencyOther,
    beneficiaryOverlap,
    beneficiaryOverlapNote,
    precedenceRules,
    precedenceRulesYes,
    precedenceRulesNo,
    precedenceRulesNote,
    readyForReviewByUserAccount,
    readyForReviewDts,
    status
  } = (data?.modelPlan?.beneficiaries || {}) as FrequencyFormType;

  const modelName = data?.modelPlan?.modelName || '';

  const itSolutionsStarted: boolean = !!data?.modelPlan.operationalNeeds.find(
    need => need.modifiedDts
  );

  useScrollElement(!loading);

  const { mutationError } = useHandleMutation(
    TypedUpdateModelPlanBeneficiariesDocument,
    {
      id,
      formikRef
    }
  );

  const initialValues: InitialValueType = {
    __typename: 'PlanBeneficiaries',
    id: id ?? '',
    beneficiarySelectionFrequency: beneficiarySelectionFrequency ?? [],
    beneficiarySelectionFrequencyContinually:
      beneficiarySelectionFrequencyContinually ?? '',
    beneficiarySelectionFrequencyNote: beneficiarySelectionFrequencyNote ?? '',
    beneficiarySelectionFrequencyOther:
      beneficiarySelectionFrequencyOther ?? '',
    beneficiaryRemovalFrequency: beneficiaryRemovalFrequency ?? [],
    beneficiaryRemovalFrequencyContinually:
      beneficiaryRemovalFrequencyContinually ?? '',
    beneficiaryRemovalFrequencyNote: beneficiaryRemovalFrequencyNote ?? '',
    beneficiaryRemovalFrequencyOther: beneficiaryRemovalFrequencyOther ?? '',
    beneficiaryOverlap: beneficiaryOverlap ?? null,
    beneficiaryOverlapNote: beneficiaryOverlapNote ?? '',
    precedenceRules: precedenceRules ?? [],
    precedenceRulesYes: precedenceRulesYes ?? '',
    precedenceRulesNo: precedenceRulesNo ?? '',
    precedenceRulesNote: precedenceRulesNote ?? '',
    status
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
        <Breadcrumb current>{beneficiariesMiscT('breadcrumb')}</Breadcrumb>
      </BreadcrumbBar>
      <PageHeading className="margin-top-4 margin-bottom-2">
        {beneficiariesMiscT('heading')}
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
        {miscellaneousT('helpText')}
      </p>

      <AskAQuestion modelID={modelID} />

      <Formik
        initialValues={initialValues}
        onSubmit={() => {
          history.push(`/models/${modelID}/task-list/ops-eval-and-learning`);
        }}
        enableReinitialize
        innerRef={formikRef}
      >
        {(formikProps: FormikProps<InitialValueType>) => {
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
              <ConfirmLeave />

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
                      data-testid="beneficiaries-frequency-form"
                      onSubmit={e => {
                        handleSubmit(e);
                      }}
                    >
                      <FrequencyForm
                        field="beneficiarySelectionFrequency"
                        values={values.beneficiarySelectionFrequency}
                        config={beneficiarySelectionFrequencyConfig}
                        nameSpace="beneficiaries"
                        id="beneficiary-selection-frequency"
                        label={beneficiariesT(
                          'beneficiarySelectionFrequency.label'
                        )}
                        disabled={loading}
                      />

                      <FrequencyForm
                        field="beneficiaryRemovalFrequency"
                        values={values.beneficiaryRemovalFrequency}
                        config={beneficiaryRemovalFrequencyConfig}
                        nameSpace="beneficiaries"
                        id="beneficiary-removal-frequency"
                        label={beneficiariesT(
                          'beneficiaryRemovalFrequency.label'
                        )}
                        disabled={loading}
                      />

                      <FieldGroup
                        scrollElement="beneficiaryOverlap"
                        error={!!flatErrors.beneficiaryOverlap}
                      >
                        <Label htmlFor="beneficiaries-overlap">
                          {beneficiariesT('beneficiaryOverlap.label')}
                        </Label>

                        {itSolutionsStarted && (
                          <ITSolutionsWarning
                            id="beneficiaries-overlap-warning"
                            onClick={() => {
                              history.push(
                                `/models/${modelID}/task-list/it-solutions`
                              );
                            }}
                          />
                        )}

                        <FieldErrorMsg>
                          {flatErrors.beneficiaryOverlap}
                        </FieldErrorMsg>

                        <Fieldset>
                          {getKeys(beneficiaryOverlapConfig.options).map(
                            key => (
                              <Fragment key={key}>
                                <Field
                                  as={Radio}
                                  id={`beneficiaries-overlap-${key}`}
                                  name="beneficiariesOverlap"
                                  label={beneficiaryOverlapConfig.options[key]}
                                  value={key}
                                  checked={values.beneficiaryOverlap === key}
                                  onChange={() => {
                                    setFieldValue('beneficiaryOverlap', key);
                                  }}
                                />
                              </Fragment>
                            )
                          )}
                        </Fieldset>

                        <AddNote
                          id="beneficiaries-overlap-note"
                          field="beneficiaryOverlapNote"
                        />
                      </FieldGroup>

                      <FieldGroup
                        scrollElement="precedenceRules"
                        error={!!flatErrors.precedenceRules}
                      >
                        <Label htmlFor="precedenceRules">
                          {beneficiariesT('precedenceRules.label')}
                        </Label>

                        <p className="text-base margin-top-1 margin-bottom-0 line-height-body-3">
                          {beneficiariesT('precedenceRules.sublabel')}
                        </p>

                        <FieldErrorMsg>
                          {flatErrors.precedenceRules}
                        </FieldErrorMsg>

                        {getKeys(beneficiaryPrecedenceConfig.options).map(
                          key => (
                            <Fragment key={key}>
                              <Field
                                as={CheckboxField}
                                id={`beneficiaries-precedence-rules-${key}`}
                                data-testid={`beneficiaries-precedence-rules-${key}`}
                                name="precedenceRules"
                                label={beneficiaryPrecedenceConfig.options[key]}
                                value={key}
                                checked={values.precedenceRules.includes(key)}
                              />

                              {values.precedenceRules?.includes(key) && (
                                <div className="margin-left-4">
                                  <span>
                                    {beneficiariesT(
                                      `precedenceRules${beneficiaryPrecedenceConfig.options[key]}.label`
                                    )}
                                  </span>
                                  <Field
                                    as={TextAreaField}
                                    className="height-15"
                                    id={`beneficiaries-precedence-rules-${key}-note`}
                                    data-testid={`beneficiaries-precedence-rules-${key}-note`}
                                    name={`precedenceRules${beneficiaryPrecedenceConfig.options[key]}`}
                                  />
                                </div>
                              )}
                            </Fragment>
                          )
                        )}

                        <AddNote
                          id="beneficiaries-precedence-note"
                          field="precedenceRulesNote"
                        />
                      </FieldGroup>

                      {!loading && values.status && (
                        <ReadyForReview
                          id="beneficiaries-status"
                          field="status"
                          sectionName={beneficiariesMiscT('heading')}
                          status={values.status}
                          setFieldValue={setFieldValue}
                          readyForReviewBy={
                            readyForReviewByUserAccount?.commonName
                          }
                          readyForReviewDts={readyForReviewDts}
                        />
                      )}

                      <div className="margin-top-6 margin-bottom-3">
                        <Button
                          type="button"
                          className="usa-button usa-button--outline margin-bottom-1"
                          onClick={() => {
                            history.push(
                              `/models/${modelID}/task-list/beneficiaries/people-impact`
                            );
                          }}
                        >
                          {miscellaneousT('back')}
                        </Button>

                        <Button type="submit" onClick={() => setErrors({})}>
                          {miscellaneousT('saveAndStartNext')}
                        </Button>
                      </div>

                      <Button
                        type="button"
                        className="usa-button usa-button--unstyled"
                        onClick={() =>
                          history.push(`/models/${modelID}/task-list/`)
                        }
                      >
                        <Icon.ArrowBack
                          className="margin-right-1"
                          aria-hidden
                        />

                        {miscellaneousT('saveAndReturn')}
                      </Button>
                    </Form>
                  </Grid>
                </Grid>
              </GridContainer>
            </>
          );
        }}
      </Formik>

      <PageNumber currentPage={3} totalPages={3} className="margin-y-6" />
    </>
  );
};

export default Frequency;
