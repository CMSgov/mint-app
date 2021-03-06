import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Route, Switch, useHistory, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import {
  Breadcrumb,
  BreadcrumbBar,
  BreadcrumbLink,
  Button,
  ComboBox,
  Fieldset,
  Grid,
  GridContainer,
  IconArrowBack,
  Label,
  Radio
} from '@trussworks/react-uswds';
import classNames from 'classnames';
import { Field, Form, Formik, FormikProps } from 'formik';

import AddNote from 'components/AddNote';
import AskAQuestion from 'components/AskAQuestion';
import MainContent from 'components/MainContent';
import PageHeading from 'components/PageHeading';
import PageNumber from 'components/PageNumber';
import AutoSave from 'components/shared/AutoSave';
import { ErrorAlert, ErrorAlertMessage } from 'components/shared/ErrorAlert';
import FieldErrorMsg from 'components/shared/FieldErrorMsg';
import FieldGroup from 'components/shared/FieldGroup';
import MultiSelect from 'components/shared/MultiSelect';
import TextAreaField from 'components/shared/TextAreaField';
import GetGeneralCharacteristics from 'queries/GeneralCharacteristics/GetGeneralCharacteristics';
import {
  GetGeneralCharacteristics as GetGeneralCharacteristicsType,
  GetGeneralCharacteristics_modelPlan_generalCharacteristics as GetGeneralCharacteristicsFormType,
  GetGeneralCharacteristicsVariables
} from 'queries/GeneralCharacteristics/types/GetGeneralCharacteristics';
import { UpdatePlanGeneralCharacteristicsVariables } from 'queries/GeneralCharacteristics/types/UpdatePlanGeneralCharacteristics';
import UpdatePlanGeneralCharacteristics from 'queries/GeneralCharacteristics/UpdatePlanGeneralCharacteristics';
import GetExistingModelPlans from 'queries/GetExistingModelPlans';
import GetDraftModelPlans from 'queries/GetModelPlans';
import { GetExistingModelPlans as ExistingModelPlanType } from 'queries/types/GetExistingModelPlans';
import { GetModelPlans as GetDraftModelPlansType } from 'queries/types/GetModelPlans';
import flattenErrors from 'utils/flattenErrors';
import { NotFoundPartial } from 'views/NotFound';

import Authority from './Authority';
import Involvements from './Involvements';
import KeyCharacteristics from './KeyCharacteristics';
import TargetsAndOptions from './TargetsAndOptions';

export const CharacteristicsContent = () => {
  const { t } = useTranslation('generalCharacteristics');
  const { t: h } = useTranslation('draftModelPlan');
  const { modelID } = useParams<{ modelID: string }>();

  const formikRef = useRef<FormikProps<GetGeneralCharacteristicsFormType>>(
    null
  );
  const history = useHistory();

  const {
    data: modelData,
    error: modelError
  } = useQuery<GetDraftModelPlansType>(GetDraftModelPlans);

  const {
    data: existingModelData,
    error: existingModelError
  } = useQuery<ExistingModelPlanType>(GetExistingModelPlans);

  // Combined MINT models with existing models from DB.  Sorts them alphabetically and returns options for MultiSelect
  const modelPlanOptions = useMemo(() => {
    const combinedModels = [
      ...(modelData?.modelPlanCollection || []),
      ...(existingModelData?.existingModelCollection || [])
    ].sort((a, b) => ((a.modelName || '') > (b.modelName || '') ? 1 : -1));
    return combinedModels.map(model => {
      return {
        label: model!.modelName!,
        value: model!.id! as string
      };
    });
  }, [modelData, existingModelData]);

  const { data, loading, error } = useQuery<
    GetGeneralCharacteristicsType,
    GetGeneralCharacteristicsVariables
  >(GetGeneralCharacteristics, {
    variables: {
      id: modelID
    }
  });

  const {
    id,
    isNewModel,
    existingModel,
    resemblesExistingModel,
    resemblesExistingModelWhich,
    resemblesExistingModelHow,
    resemblesExistingModelNote,
    hasComponentsOrTracks,
    hasComponentsOrTracksDiffer,
    hasComponentsOrTracksNote
  } =
    data?.modelPlan?.generalCharacteristics ||
    ({} as GetGeneralCharacteristicsFormType);

  const modelName = data?.modelPlan?.modelName || '';

  const [update] = useMutation<UpdatePlanGeneralCharacteristicsVariables>(
    UpdatePlanGeneralCharacteristics
  );

  const handleFormSubmit = (
    formikValues: GetGeneralCharacteristicsFormType,
    redirect?: 'next' | 'back'
  ) => {
    const { id: updateId, __typename, ...changeValues } = formikValues;
    update({
      variables: {
        id,
        changes: changeValues
      }
    })
      .then(response => {
        if (!response?.errors) {
          if (redirect === 'next') {
            history.push(
              `/models/${modelID}/task-list/characteristics/key-characteristics`
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

  const initialValues: GetGeneralCharacteristicsFormType = {
    __typename: 'PlanGeneralCharacteristics',
    id: id ?? '',
    isNewModel: isNewModel ?? null,
    existingModel: existingModel ?? null,
    resemblesExistingModel: resemblesExistingModel ?? null,
    resemblesExistingModelWhich: resemblesExistingModelWhich ?? [],
    resemblesExistingModelHow: resemblesExistingModelHow ?? '',
    resemblesExistingModelNote: resemblesExistingModelNote ?? '',
    hasComponentsOrTracks: hasComponentsOrTracks ?? null,
    hasComponentsOrTracksDiffer: hasComponentsOrTracksDiffer ?? '',
    hasComponentsOrTracksNote: hasComponentsOrTracksNote ?? ''
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
        {h('for')} {modelName}
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
        {(formikProps: FormikProps<GetGeneralCharacteristicsFormType>) => {
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
              <Form
                className="tablet:grid-col-6 margin-top-6"
                data-testid="plan-characteristics-form"
                onSubmit={e => {
                  handleSubmit(e);
                }}
              >
                <FieldGroup
                  scrollElement="isNewModel"
                  error={!!flatErrors.isNewModel}
                  className="margin-y-4 margin-bottom-8"
                >
                  <Label htmlFor="plan-characteristics-is-new-model">
                    {t('isNewModel')}
                  </Label>
                  <FieldErrorMsg>{flatErrors.isNewModel}</FieldErrorMsg>
                  <Fieldset>
                    <Field
                      as={Radio}
                      id="plan-characteristics-is-new-model"
                      name="isNewModel"
                      label={t('newModel')}
                      value="TRUE"
                      checked={values.isNewModel === true}
                      onChange={() => {
                        setFieldValue('isNewModel', true);
                        setFieldValue('existingModel', '');
                      }}
                    />
                    <Field
                      as={Radio}
                      id="plan-characteristics-is-new-model-no"
                      name="isNewModel"
                      label={t('newTrack')}
                      value="FALSE"
                      checked={values.isNewModel === false}
                      onChange={() => {
                        setFieldValue('isNewModel', false);
                      }}
                    />
                  </Fieldset>
                  {values.isNewModel === false && (
                    <FieldGroup
                      scrollElement="existingModel"
                      error={!!flatErrors.existingModel}
                    >
                      <Label
                        htmlFor="plan-characteristics-existing-model"
                        className="margin-bottom-1 text-normal"
                      >
                        {t('whichExistingModel')}
                      </Label>
                      <p className="text-base margin-0">{t('startTypeing')}</p>
                      <FieldErrorMsg>{flatErrors.existingModel}</FieldErrorMsg>

                      <ComboBox
                        disabled={!!modelError || !!existingModelError}
                        data-test-id="plan-characteristics-existing-model"
                        id="plan-characteristics-existing-model"
                        name="existingModel"
                        className={classNames({
                          disabled: !!modelError || !!existingModelError
                        })}
                        inputProps={{
                          id: 'plan-characteristics-existing-model',
                          name: 'existingModel',
                          'aria-describedby':
                            'plan-characteristics-existing-model'
                        }}
                        options={modelPlanOptions}
                        defaultValue={
                          modelPlanOptions.find(
                            modelPlan => modelPlan.label === existingModel
                          )?.value || ''
                        }
                        onChange={modelPlanID => {
                          const model = modelPlanOptions.find(
                            modelPlan => modelPlan.value === modelPlanID
                          );
                          if (model) {
                            setFieldValue('existingModel', model.label);
                          } else {
                            setFieldValue('existingModel', '');
                          }
                        }}
                      />
                    </FieldGroup>
                  )}
                </FieldGroup>

                <FieldGroup
                  scrollElement="resemblesExistingModel"
                  error={!!flatErrors.resemblesExistingModel}
                  className="margin-y-4 margin-bottom-8"
                >
                  <Label htmlFor="plan-characteristics-resembles-existing-model">
                    {t('resembleModel')}
                  </Label>
                  <FieldErrorMsg>
                    {flatErrors.resemblesExistingModel}
                  </FieldErrorMsg>
                  <Fieldset>
                    <Field
                      as={Radio}
                      id="plan-characteristics-resembles-existing-model"
                      name="resemblesExistingModel"
                      label={h('yes')}
                      value="TRUE"
                      checked={values.resemblesExistingModel === true}
                      onChange={() => {
                        setFieldValue('resemblesExistingModel', true);
                      }}
                    />
                    <Field
                      as={Radio}
                      id="plan-characteristics-resembles-existing-model-no"
                      name="resemblesExistingModel"
                      label={h('no')}
                      value="FALSE"
                      checked={values.resemblesExistingModel === false}
                      onChange={() => {
                        setFieldValue('resemblesExistingModel', false);
                      }}
                    />
                  </Fieldset>
                  {values.resemblesExistingModel && (
                    <>
                      <FieldGroup
                        scrollElement="resemblesExistingModelWhich"
                        error={!!flatErrors.resemblesExistingModelWhich}
                        className="margin-top-4"
                      >
                        <Label
                          htmlFor="plan-characteristics-resembles-which-model"
                          className="text-normal"
                        >
                          {t('modelResemblance')}
                        </Label>
                        <p className="text-base margin-y-1">
                          {t('startTypeing')}
                        </p>
                        <FieldErrorMsg>
                          {flatErrors.resemblesExistingModelWhich}
                        </FieldErrorMsg>

                        <Field
                          as={MultiSelect}
                          id="plan-characteristics-resembles-which-model"
                          name="resemblesExistingModelWhich"
                          options={modelPlanOptions}
                          selectedLabel={t('selectedModels')}
                          onChange={(value: string[] | []) => {
                            setFieldValue('resemblesExistingModelWhich', value);
                          }}
                          initialValues={
                            initialValues.resemblesExistingModelWhich
                          }
                        />
                      </FieldGroup>
                      <FieldGroup
                        scrollElement="resemblesExistingModelHow"
                        error={!!flatErrors.resemblesExistingModelHow}
                        className="margin-top-4"
                      >
                        <Label
                          htmlFor="plan-characteristics-resembles-how-model"
                          className="text-normal"
                        >
                          {t('waysResembleModel')}
                        </Label>
                        <FieldErrorMsg>
                          {flatErrors.resemblesExistingModelHow}
                        </FieldErrorMsg>
                        <Field
                          as={TextAreaField}
                          className="height-15"
                          error={flatErrors.resemblesExistingModelHow}
                          id="plan-characteristics-resembles-how-model"
                          name="resemblesExistingModelHow"
                        />
                      </FieldGroup>

                      <AddNote
                        id="plan-characteristics-resemble-existing-note"
                        field="resemblesExistingModelNote"
                      />
                    </>
                  )}
                </FieldGroup>

                <FieldGroup
                  scrollElement="hasComponentsOrTracks"
                  error={!!flatErrors.hasComponentsOrTracks}
                  className="margin-y-4 margin-bottom-8"
                >
                  <Label htmlFor="plan-characteristics-has-component-or-tracks">
                    {t('differentComponents')}
                  </Label>
                  <FieldErrorMsg>
                    {flatErrors.hasComponentsOrTracks}
                  </FieldErrorMsg>
                  <Fieldset>
                    <Field
                      as={Radio}
                      id="plan-characteristics-has-component-or-tracks"
                      name="hasComponentsOrTracks"
                      label={h('yes')}
                      value="TRUE"
                      checked={values.hasComponentsOrTracks === true}
                      onChange={() => {
                        setFieldValue('hasComponentsOrTracks', true);
                        setFieldValue('hasComponentsOrTracksDiffer', '');
                      }}
                    />
                    {values.hasComponentsOrTracks === true && (
                      <div className="display-flex margin-left-4 margin-bottom-1">
                        <FieldGroup
                          className="flex-1"
                          scrollElement="hasComponentsOrTracksDiffer"
                          error={!!flatErrors.hasComponentsOrTracksDiffer}
                        >
                          <Label
                            htmlFor="plan-characteristics-tracks-differ-how"
                            className="margin-bottom-1 text-normal"
                          >
                            {t('tracksDiffer')}
                          </Label>
                          <FieldErrorMsg>
                            {flatErrors.hasComponentsOrTracksDiffer}
                          </FieldErrorMsg>
                          <Field
                            as={TextAreaField}
                            error={!!flatErrors.hasComponentsOrTracksDiffer}
                            className="margin-top-0 height-15"
                            data-testid="plan-characteristics-tracks-differ-how"
                            id="plan-characteristics-tracks-differ-how"
                            name="hasComponentsOrTracksDiffer"
                          />
                        </FieldGroup>
                      </div>
                    )}
                    <Field
                      as={Radio}
                      id="plan-characteristics-has-component-or-tracks-no"
                      name="hasComponentsOrTracks"
                      label={h('no')}
                      value="FALSE"
                      checked={values.hasComponentsOrTracks === false}
                      onChange={() => {
                        setFieldValue('hasComponentsOrTracks', false);
                      }}
                    />
                  </Fieldset>
                </FieldGroup>

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
      <PageNumber currentPage={1} totalPages={5} className="margin-y-6" />
    </>
  );
};

export const Characteristics = () => {
  return (
    <MainContent data-testid="model-characteristics">
      <GridContainer>
        <Grid desktop={{ col: 12 }}>
          <Switch>
            <Route
              path="/models/:modelID/task-list/characteristics"
              exact
              render={() => <CharacteristicsContent />}
            />
            <Route
              path="/models/:modelID/task-list/characteristics/key-characteristics"
              exact
              render={() => <KeyCharacteristics />}
            />
            <Route
              path="/models/:modelID/task-list/characteristics/involvements"
              exact
              render={() => <Involvements />}
            />
            <Route
              path="/models/:modelID/task-list/characteristics/targets-and-options"
              exact
              render={() => <TargetsAndOptions />}
            />
            <Route
              path="/models/:modelID/task-list/characteristics/authority"
              exact
              render={() => <Authority />}
            />
            <Route path="*" render={() => <NotFoundPartial />} />
          </Switch>
        </Grid>
      </GridContainer>
    </MainContent>
  );
};

export default Characteristics;
