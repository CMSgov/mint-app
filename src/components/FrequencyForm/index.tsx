import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Label, TextInput } from '@trussworks/react-uswds';
import classNames from 'classnames';
import { Field } from 'formik';
import { FrequencyTypeNew } from 'gql/gen/graphql';

import AddNote from 'components/AddNote';
import CheckboxField from 'components/shared/CheckboxField';
import FieldGroup from 'components/shared/FieldGroup';
import {
  getKeys,
  TranslationFieldPropertiesWithOptions,
  TranslationPlan
} from 'types/translation';

type FrequencyFormType = {
  field: string;
  values: FrequencyTypeNew[] | null | undefined;
  config: TranslationFieldPropertiesWithOptions<FrequencyTypeNew>;
  nameSpace: keyof TranslationPlan;
  label: string;
  id: string;
  disabled: boolean;
  className?: string;
};

/*
Form component for rendering generic FrenquencyType checkbox options
Additional renders additional TextInput component for selctions of Other and Continually
Additionally renders the AddNote component for all instances
*/

const FrequencyForm = ({
  field: fieldName,
  values,
  config,
  nameSpace,
  label,
  id,
  disabled = false,
  className
}: FrequencyFormType) => {
  const { t } = useTranslation();

  return (
    <FieldGroup scrollElement={fieldName} className={classNames(className)}>
      <Label htmlFor={id} className="maxw-none">
        {label}
      </Label>

      {getKeys(config.options).map(type => {
        return (
          <Fragment key={type}>
            <Field
              as={CheckboxField}
              id={`${id}-${type.toLowerCase()}`}
              name={fieldName}
              disabled={disabled}
              label={config.options[type]}
              value={type}
              checked={values?.includes(type)}
            />

            {type === FrequencyTypeNew.CONTINUALLY && values?.includes(type) && (
              <div className="margin-left-4">
                <Label
                  htmlFor={`${id}-continually`}
                  className="text-normal margin-top-1"
                >
                  {t(`${nameSpace}:${config.optionsRelatedInfo?.[type]}.label`)}
                </Label>

                <Field
                  as={TextInput}
                  id={`${id}-continually`}
                  data-testid={`${id}-continually`}
                  name={`${fieldName}Continually`}
                  disabled={disabled}
                />
              </div>
            )}

            {type === FrequencyTypeNew.OTHER && values?.includes(type) && (
              <div className="margin-left-4">
                <Label
                  htmlFor={`${id}-other`}
                  className="text-normal margin-top-1"
                >
                  {t(`${nameSpace}:${config.optionsRelatedInfo?.[type]}.label`)}
                </Label>

                <Field
                  as={TextInput}
                  id={`${id}-other`}
                  data-testid={`${id}-other`}
                  name={`${fieldName}Other`}
                  disabled={disabled}
                />
              </div>
            )}
          </Fragment>
        );
      })}

      <AddNote id={`${id}-note`} field={`${fieldName}Note`} />
    </FieldGroup>
  );
};

export default FrequencyForm;
