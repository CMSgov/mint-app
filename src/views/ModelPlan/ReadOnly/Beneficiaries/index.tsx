import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';

import GetAllBeneficiaries from 'queries/ReadOnly/GetAllBeneficiaries';
import { GetAllBeneficiaries as AllBeneficiariesTypes } from 'queries/ReadOnly/types/GetAllBeneficiaries';
import { FrequencyType, TriStateAnswer } from 'types/graphql-global-types';
import {
  translateBeneficiariesType,
  translateConfidenceType,
  translateFrequencyType,
  translateOverlapType,
  translateSelectionMethodType,
  translateTriStateAnswer
} from 'utils/modelPlan';
import { ModelInfoContext } from 'views/ModelInfoWrapper';
import { NotFoundPartial } from 'views/NotFound';

import { checkGroupMap } from '../_components/FilterView/util';
import ReadOnlySection from '../_components/ReadOnlySection';
import SideBySideReadOnlySection from '../_components/SideBySideReadOnlySection';
import TitleAndStatus from '../_components/TitleAndStatus';
import { ReadOnlyProps } from '../ModelBasics';

const ReadOnlyBeneficiaries = ({
  modelID,
  clearance,
  isViewingFilteredView,
  filteredQuestions
}: ReadOnlyProps) => {
  const { t } = useTranslation('beneficiaries');
  const { t: h } = useTranslation('draftModelPlan');
  const { t: p } = useTranslation('prepareForClearance');

  const { modelName } = useContext(ModelInfoContext);

  const { data, loading, error } = useQuery<AllBeneficiariesTypes>(
    GetAllBeneficiaries,
    {
      variables: {
        id: modelID
      }
    }
  );

  if ((!loading && error) || (!loading && !data?.modelPlan)) {
    return <NotFoundPartial />;
  }

  const {
    beneficiaries,
    beneficiariesOther,
    beneficiariesNote,
    treatDualElligibleDifferent,
    treatDualElligibleDifferentHow,
    treatDualElligibleDifferentNote,
    excludeCertainCharacteristics,
    excludeCertainCharacteristicsCriteria,
    excludeCertainCharacteristicsNote,
    numberPeopleImpacted,
    estimateConfidence,
    confidenceNote,
    beneficiarySelectionMethod,
    beneficiarySelectionOther,
    beneficiarySelectionNote,
    beneficiarySelectionFrequency,
    beneficiarySelectionFrequencyOther,
    beneficiarySelectionFrequencyNote,
    beneficiaryOverlap,
    beneficiaryOverlapNote,
    precedenceRules,
    status
  } = data?.modelPlan.beneficiaries || {};

  return (
    <div
      className="read-only-model-plan--beneficiaries"
      data-testid="read-only-model-plan--beneficiaries"
    >
      <TitleAndStatus
        clearance={clearance}
        clearanceTitle={t('clearanceHeading')}
        heading={t('heading')}
        isViewingFilteredView={isViewingFilteredView}
        status={status}
      />

      {clearance && (
        <p className="font-body-lg margin-top-neg-2 margin-bottom-6">
          {p('forModelPlan', {
            modelName
          })}
        </p>
      )}

      <div
        className={`${
          isViewingFilteredView
            ? ''
            : 'margin-bottom-4 padding-bottom-2 border-bottom-1px border-base-light'
        }`}
      >
        {checkGroupMap(
          isViewingFilteredView,
          filteredQuestions,
          'beneficiaries',
          <ReadOnlySection
            heading={t('beneficiariesQuestion')}
            list
            listItems={beneficiaries?.map(translateBeneficiariesType)}
            listOtherItem={beneficiariesOther}
            notes={beneficiariesNote}
          />
        )}

        {checkGroupMap(
          isViewingFilteredView,
          filteredQuestions,
          'treatDualElligibleDifferent',
          <SideBySideReadOnlySection
            firstSection={{
              heading: t('dualEligibility'),
              copy:
                treatDualElligibleDifferent &&
                translateTriStateAnswer(treatDualElligibleDifferent)
            }}
            secondSection={
              treatDualElligibleDifferent === TriStateAnswer.YES && {
                heading: h('howSo'),
                copy: treatDualElligibleDifferentHow
              }
            }
          />
        )}
        {treatDualElligibleDifferentNote &&
          checkGroupMap(
            isViewingFilteredView,
            filteredQuestions,
            'treatDualElligibleDifferent',
            <ReadOnlySection
              heading={t('basics:notes')}
              copy={treatDualElligibleDifferentNote}
            />
          )}

        {checkGroupMap(
          isViewingFilteredView,
          filteredQuestions,
          'excludeCertainCharacteristics',
          <SideBySideReadOnlySection
            firstSection={{
              heading: t('excluded'),
              copy:
                excludeCertainCharacteristics &&
                translateTriStateAnswer(excludeCertainCharacteristics)
            }}
            secondSection={
              excludeCertainCharacteristics === TriStateAnswer.YES && {
                heading: t('excludedNestedQuestion'),
                copy: excludeCertainCharacteristicsCriteria
              }
            }
          />
        )}

        {excludeCertainCharacteristicsNote &&
          checkGroupMap(
            isViewingFilteredView,
            filteredQuestions,
            'excludeCertainCharacteristics',
            <ReadOnlySection
              heading={t('basics:notes')}
              copy={excludeCertainCharacteristicsNote}
            />
          )}
      </div>

      <div
        className={`${
          isViewingFilteredView
            ? ''
            : 'margin-bottom-4 padding-bottom-2 border-bottom-1px border-base-light'
        }`}
      >
        {isViewingFilteredView &&
          checkGroupMap(
            isViewingFilteredView,
            filteredQuestions,
            'numberPeopleImpacted',
            <SideBySideReadOnlySection
              firstSection={{
                heading: t('howManyImpacted'),
                copy: numberPeopleImpacted?.toString(),
                notes: confidenceNote
              }}
              secondSection={{
                heading: t('levelOfConfidence'),
                copy:
                  estimateConfidence &&
                  translateConfidenceType(estimateConfidence)
              }}
            />
          )}

        {!isViewingFilteredView && (
          <>
            <ReadOnlySection
              heading={t('howManyImpacted')}
              copy={numberPeopleImpacted?.toString()}
            />

            <ReadOnlySection
              heading={t('levelOfConfidence')}
              copy={
                estimateConfidence &&
                translateConfidenceType(estimateConfidence)
              }
              notes={confidenceNote}
            />
          </>
        )}

        {checkGroupMap(
          isViewingFilteredView,
          filteredQuestions,
          'beneficiarySelectionMethod',
          <ReadOnlySection
            heading={t('chooseBeneficiariesQuestion')}
            list
            listItems={beneficiarySelectionMethod?.map(
              translateSelectionMethodType
            )}
            listOtherItem={beneficiarySelectionOther}
            notes={beneficiarySelectionNote}
          />
        )}
      </div>

      <div>
        {/* If "Other", then display "Other — Lorem ipsum." */}
        {/* Else just display content, i.e. "LOI (Letter of interest)" */}
        {checkGroupMap(
          isViewingFilteredView,
          filteredQuestions,
          'beneficiarySelectionFrequency',
          <ReadOnlySection
            heading={t('beneficiaryFrequency')}
            copy={
              beneficiarySelectionFrequency &&
              (beneficiarySelectionFrequency === FrequencyType.OTHER
                ? `${translateFrequencyType(
                    beneficiarySelectionFrequency
                  )} \u2014  ${beneficiarySelectionFrequencyOther}`
                : translateFrequencyType(beneficiarySelectionFrequency))
            }
            notes={beneficiarySelectionFrequencyNote}
          />
        )}

        {checkGroupMap(
          isViewingFilteredView,
          filteredQuestions,
          'beneficiaryOverlap',
          <ReadOnlySection
            heading={t('beneficiaryOverlap')}
            copy={
              beneficiaryOverlap && translateOverlapType(beneficiaryOverlap)
            }
            notes={beneficiaryOverlapNote}
          />
        )}

        {checkGroupMap(
          isViewingFilteredView,
          filteredQuestions,
          'precedenceRules',
          <ReadOnlySection
            heading={t('benficiaryPrecedence')}
            copy={precedenceRules}
          />
        )}
      </div>
    </div>
  );
};

export default ReadOnlyBeneficiaries;
