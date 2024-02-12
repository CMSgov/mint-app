import React from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Icon } from '@trussworks/react-uswds';
import i18next from 'i18next';

import Alert from 'components/shared/Alert';
import CollapsableLink from 'components/shared/CollapsableLink';
import Tooltip from 'components/shared/Tooltip';
import {
  getKeys,
  TranslationFieldProperties,
  TranslationFieldPropertiesWithOptions,
  TranslationFieldPropertiesWithOptionsAndConditions,
  TranslationPlan
} from 'types/translation';

type ConfigType<T extends keyof T | string, C> =
  | TranslationFieldProperties
  | TranslationFieldPropertiesWithOptions<T>
  | TranslationFieldPropertiesWithOptionsAndConditions<T, C>;

const isTranslationFieldProperties = <T extends keyof T | string, C>(
  question: ConfigType<T, C>
): question is TranslationFieldPropertiesWithOptions<T> => {
  return !Object.hasOwn(question, 'options');
};

const isTranslationFieldPropertiesWithOptions = <T extends keyof T | string, C>(
  question: ConfigType<T, C>
): question is TranslationFieldPropertiesWithOptions<T> => {
  return Object.hasOwn(question, 'options');
};

const isTranslationFieldPropertiesWithOptionsAndConditions = <
  T extends keyof T | string,
  C
>(
  question: ConfigType<T, C>
): question is TranslationFieldPropertiesWithOptions<T> => {
  return (
    Object.hasOwn(question, 'parentRelation') &&
    Object.hasOwn(question, 'childRelation')
  );
};

const ReadOnlySectionNew = <T extends keyof T | string, C>({
  config,
  value,
  values,
  field
}: {
  config: ConfigType<T, C>;
  value: any;
  values: any;
  field: string;
}) => {
  const { t: miscellaneousT } = useTranslation('miscellaneous');
  const { t: readOnlyT } = useTranslation('generalReadOnly');

  const heading = config.readonlyLabel || config.label;

  const sectionName = heading
    .toLowerCase()
    .replace(/\W*$/g, '')
    .replace(/\W/g, '-');

  const isElement = (
    element: string | number | React.ReactElement | React.ReactNode
  ) => {
    return React.isValidElement(element);
  };

  // Legacy function to render "Other" option or translation for other not specifed
  const renderListItemOther = (otherSelection: string | null | undefined) => {
    if (otherSelection) {
      return (
        <li className="font-sans-md line-height-sans-4">{otherSelection}</li>
      );
    }
    return (
      <li className="font-sans-md line-height-sans-4">
        <em className="text-base">
          {miscellaneousT('noAdditionalInformation')}
        </em>
      </li>
    );
  };

  // Can render a single "Other" option or multiple additional information options
  // as well as default text for both if not specified
  const renderListItemOthers = (index: number) => {
    if (listOtherItems) {
      if (listOtherItems[index] === undefined) {
        return null;
      }
      if (listOtherItems[index]) {
        return (
          <li className="font-sans-md line-height-sans-4">
            {listOtherItems[index]}
          </li>
        );
      }
      return (
        <li className="font-sans-md line-height-sans-4 ">
          <em className="text-base">
            {miscellaneousT('noAdditionalInformation')}
          </em>
        </li>
      );
    }
    return null;
  };

  const renderCopyOrList = () => {
    if (isTranslationFieldProperties(config)) {
      return (
        <div className="margin-y-0 font-body-md line-height-sans-4 text-pre-line">
          {value || (
            <em className="text-base">
              {miscellaneousT('noAdditionalInformation')}
            </em>
          )}
        </div>
      );
    }

    if (
      isTranslationFieldPropertiesWithOptions(config) &&
      config.formType === 'radio'
    ) {
      if (
        value &&
        config.otherKey &&
        value === config.options[config.otherKey] &&
        config.hasOther
      ) {
        const childField = values[config.hasOther];

        return (
          <p className="margin-y-0 font-body-md line-height-sans-4 text-pre-line">
            {value} {childField && <span>- {childField}</span>}{' '}
            {!childField && (
              <i className="text-base">
                - {miscellaneousT('noAdditionalInformation')}
              </i>
            )}
          </p>
        );
      }

      return (
        <p className="margin-y-0 font-body-md line-height-sans-4 text-pre-line">
          {value || (
            <em className="text-base">
              {miscellaneousT('noAdditionalInformation')}
            </em>
          )}
        </p>
      );
    }

    const listItems = isTranslationFieldPropertiesWithOptions(config)
      ? formatListItems(config, value)
      : [];

    return (
      <ul>
        {listItems.map((item, index) => (
          <React.Fragment
            key={
              isElement(listItems[index]) ? index : `${sectionName}--${item}`
            }
          >
            <li className="font-sans-md line-height-sans-4">
              {item}
              {tooltips && tooltips[index] && (
                <span className="top-2px position-relative">
                  <Tooltip
                    label={tooltips[index]!}
                    position="right"
                    className="margin-left-05"
                  >
                    <Icon.Info className="text-base-light" />
                  </Tooltip>
                </span>
              )}
            </li>
            {(item === 'Other' || listOtherItems) && (
              <ul data-testid="other-entry">
                {!listOtherItems && renderListItemOther(listOtherItem)}
                {listOtherItems && renderListItemOthers(index)}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
    );
  };

  // If no notes are written, do not render
  if (heading === miscellaneousT('notes') && !copy) {
    return null;
  }

  return (
    <Grid desktop={{ col: 12 }}>
      <div
        className={`read-only-section read-only-section--${sectionName} margin-bottom-3`}
      >
        <p className="text-bold margin-y-0 font-body-sm line-height-sans-4 text-pre-line">
          {heading}
        </p>
        {renderCopyOrList()}
      </div>
      {notes && (
        <ReadOnlySection heading={miscellaneousT('notes')} copy={notes} />
      )}
      {!!relatedConditions?.length && (
        <>
          <Alert type="info" slim className="margin-bottom-3">
            {readOnlyT('questionNotApplicable', {
              count: relatedConditions.length
            })}
          </Alert>

          <CollapsableLink
            id={heading}
            label={readOnlyT('showOtherQuestions')}
            closeLabel={readOnlyT('hideOtherQuestions')}
            styleLeftBar={false}
            className="margin-bottom-3"
          >
            <ul className="margin-y-0">
              {relatedConditions.map(question => (
                <li key={question} className="text-bold margin-bottom-1">
                  {question}
                </li>
              ))}
            </ul>
          </CollapsableLink>
        </>
      )}
    </Grid>
  );
};

/*
  Util function for prepping data to listItems prop of ReadOnlySection
  Using translation config instead of raw data allows us to ensure a predetermined order of render
*/
export const formatListItems = <T extends string | keyof T>(
  config: TranslationFieldPropertiesWithOptions<T>, // Translation config
  value: T[] | undefined // field value/enum array
): string[] => {
  return getKeys(config.options)
    .filter(option => value?.includes(option))
    .map((option): string => config.options[option]);
};

/*
  Util function for prepping data to listOtherItems prop of ReadOnlySection
  Using translation config instead of raw data allows us to ensure a predetermined order of render
*/
export const formatListOtherItems = <T extends string | keyof T>(
  config: TranslationFieldPropertiesWithOptions<T>, // Translation config
  value: T[] | undefined, // field value/enum array
  values: any // All data for the task list section returned from query
): (string | null | undefined)[] => {
  return getKeys(config.options)
    .filter(option => value?.includes(option))
    .map((option): string | null | undefined => {
      return values[config.optionsRelatedInfo?.[option]];
    });
};

/*
  Util function for getting related child questions that do not need to be rendered
  Using to render a toggle alert to show list of questions
*/
export const getRelatedUneededQuestions = <T extends string | keyof T, C>(
  config:
    | TranslationFieldPropertiesWithOptions<T>
    | TranslationFieldPropertiesWithOptionsAndConditions<T, C>, // Translation config
  value: T[] | undefined, // field value/enum array,
  translationKey: keyof TranslationPlan
): (string | null | undefined)[] | null => {
  if (!config.childRelation) return null;
  const hiddenQuestions: string[] = [];
  getKeys(config.childRelation)
    .filter(option => config.childRelation?.[option].length)
    .forEach(option => {
      if (!value?.includes(option)) {
        config.childRelation?.[option].forEach(childField => {
          hiddenQuestions.push(
            i18next.t<string>(`${translationKey}:${childField}.label`)
          );
        });
      }
    });
  return hiddenQuestions;
};

export default ReadOnlySectionNew;
