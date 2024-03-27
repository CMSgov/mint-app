/*
  Util for formatting and transforming Typescript translation file to JSON
  Output filename/directory - /mappings/translations/model_plan_translations.json
  For BE use for storing translated data to database
*/
import * as fs from 'fs';

import basics from './i18n/en-US/modelPlan/basics';
import beneficiaries from './i18n/en-US/modelPlan/beneficiaries';
import collaborators from './i18n/en-US/modelPlan/collaborators';
import generalCharacteristics from './i18n/en-US/modelPlan/generalCharacteristics';
import modelPlan from './i18n/en-US/modelPlan/modelPlan';
import opsEvalAndLearning from './i18n/en-US/modelPlan/opsEvalAndLearning';
import participantsAndProviders from './i18n/en-US/modelPlan/participantsAndProviders';
import payments from './i18n/en-US/modelPlan/payments';

const translationSections = {
  modelPlan,
  basics,
  generalCharacteristics,
  participantsAndProviders,
  beneficiaries,
  opsEvalAndLearning,
  payments,
  collaborators
};
// Restructures translations to key off db_field rather than gql_field
const mapDBFieldToKey = translations => {
  const formattedTranslation = {};

  Object.keys(translations).forEach(section => {
    formattedTranslation[section] = {};

    Object.keys(translations[section]).forEach(field => {
      const fieldObj = translations[section][field];

      formattedTranslation[section][fieldObj.dbField] = fieldObj;
    });
  });

  return formattedTranslation;
};

function parseTranslationFileToJSON() {
  const formattedTranslations = mapDBFieldToKey(translationSections);

  const outputFile = './mappings/translations/model_plan_translations.json';

  const jsonString = JSON.stringify(
    JSON.parse(JSON.stringify(formattedTranslations)),
    null,
    2
  );
  fs.writeFileSync(outputFile, jsonString);
}

parseTranslationFileToJSON();
