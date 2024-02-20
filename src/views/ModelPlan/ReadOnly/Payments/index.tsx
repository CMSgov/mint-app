import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  GetAllPaymentsQuery,
  PayType,
  useGetAllPaymentsQuery
} from 'gql/gen/graphql';

import usePlanTranslation from 'hooks/usePlanTranslation';
import { ModelInfoContext } from 'views/ModelInfoWrapper';
import { NotFoundPartial } from 'views/NotFound';

import ReadOnlyBody from '../_components/Body';
import { RelatedUnneededQuestions } from '../_components/ReadOnlySection';
import TitleAndStatus from '../_components/TitleAndStatus';
import { ReadOnlyProps } from '../ModelBasics';

const ReadOnlyPayments = ({
  modelID,
  clearance,
  filteredView
}: ReadOnlyProps) => {
  const { t: paymentsMiscT } = useTranslation('paymentsMisc');
  const { t: prepareForClearanceT } = useTranslation('prepareForClearance');

  const { modelName } = useContext(ModelInfoContext);

  const paymentsConfig = usePlanTranslation('payments');

  const { data, loading, error } = useGetAllPaymentsQuery({
    variables: {
      id: modelID
    }
  });

  if ((!loading && error) || (!loading && !data)) {
    return <NotFoundPartial />;
  }

  const allPaymentData = (data?.modelPlan.payments ||
    {}) as GetAllPaymentsQuery['modelPlan']['payments'];

  const paymentsConfigOne = {
    fundingSource: paymentsConfig.fundingSource,
    fundingSourceNote: paymentsConfig.fundingSourceNote,
    fundingSourceR: paymentsConfig.fundingSourceR,
    fundingSourceRNote: paymentsConfig.fundingSourceRNote,
    payRecipients: paymentsConfig.payRecipients,
    payRecipientsOtherSpecification:
      paymentsConfig.payRecipientsOtherSpecification,
    payRecipientsNote: paymentsConfig.payRecipientsNote,
    payType: paymentsConfig.payType,
    payTypeNote: paymentsConfig.payTypeNote
  };

  const claimsConfig = {
    payClaims: paymentsConfig.payClaims,
    payClaimsOther: paymentsConfig.payClaimsOther,
    payClaimsNote: paymentsConfig.payClaimsNote,
    shouldAnyProvidersExcludedFFSSystems:
      paymentsConfig.shouldAnyProvidersExcludedFFSSystems,
    shouldAnyProviderExcludedFFSSystemsNote:
      paymentsConfig.shouldAnyProviderExcludedFFSSystemsNote,
    changesMedicarePhysicianFeeSchedule:
      paymentsConfig.changesMedicarePhysicianFeeSchedule,
    changesMedicarePhysicianFeeScheduleNote:
      paymentsConfig.changesMedicarePhysicianFeeScheduleNote,
    affectsMedicareSecondaryPayerClaims:
      paymentsConfig.affectsMedicareSecondaryPayerClaims,
    affectsMedicareSecondaryPayerClaimsHow:
      paymentsConfig.affectsMedicareSecondaryPayerClaimsHow,
    affectsMedicareSecondaryPayerClaimsNote:
      paymentsConfig.affectsMedicareSecondaryPayerClaimsNote,
    payModelDifferentiation: paymentsConfig.payModelDifferentiation,
    creatingDependenciesBetweenServices:
      paymentsConfig.creatingDependenciesBetweenServices,
    creatingDependenciesBetweenServicesNote:
      paymentsConfig.creatingDependenciesBetweenServicesNote,
    needsClaimsDataCollection: paymentsConfig.needsClaimsDataCollection,
    needsClaimsDataCollectionNote: paymentsConfig.needsClaimsDataCollectionNote,
    providingThirdPartyFile: paymentsConfig.providingThirdPartyFile,
    isContractorAwareTestDataRequirements:
      paymentsConfig.isContractorAwareTestDataRequirements
  };

  const beneficiaryConfig = {
    beneficiaryCostSharingLevelAndHandling:
      paymentsConfig.beneficiaryCostSharingLevelAndHandling,
    waiveBeneficiaryCostSharingForAnyServices:
      paymentsConfig.waiveBeneficiaryCostSharingForAnyServices,
    waiveBeneficiaryCostSharingServiceSpecification:
      paymentsConfig.waiveBeneficiaryCostSharingServiceSpecification,
    waiverOnlyAppliesPartOfPayment:
      paymentsConfig.waiverOnlyAppliesPartOfPayment,
    waiveBeneficiaryCostSharingNote:
      paymentsConfig.waiveBeneficiaryCostSharingNote
  };

  const nonClaimsConfig = {
    nonClaimsPayments: paymentsConfig.nonClaimsPayments,
    nonClaimsPaymentsNote: paymentsConfig.nonClaimsPaymentsNote,
    nonClaimsPaymentOther: paymentsConfig.nonClaimsPaymentOther,
    paymentCalculationOwner: paymentsConfig.paymentCalculationOwner,
    numberPaymentsPerPayCycle: paymentsConfig.numberPaymentsPerPayCycle,
    numberPaymentsPerPayCycleNote: paymentsConfig.numberPaymentsPerPayCycleNote,
    sharedSystemsInvolvedAdditionalClaimPayment:
      paymentsConfig.sharedSystemsInvolvedAdditionalClaimPayment,
    sharedSystemsInvolvedAdditionalClaimPaymentNote:
      paymentsConfig.sharedSystemsInvolvedAdditionalClaimPaymentNote,
    planningToUseInnovationPaymentContractor:
      paymentsConfig.planningToUseInnovationPaymentContractor,
    planningToUseInnovationPaymentContractorNote:
      paymentsConfig.planningToUseInnovationPaymentContractorNote
  };

  const paymentsConfigTwo = {
    expectedCalculationComplexityLevel:
      paymentsConfig.expectedCalculationComplexityLevel,
    expectedCalculationComplexityLevelNote:
      paymentsConfig.expectedCalculationComplexityLevelNote,
    claimsProcessingPrecedence: paymentsConfig.claimsProcessingPrecedence,
    claimsProcessingPrecedenceOther:
      paymentsConfig.claimsProcessingPrecedenceOther,
    claimsProcessingPrecedenceNote:
      paymentsConfig.claimsProcessingPrecedenceNote,
    canParticipantsSelectBetweenPaymentMechanisms:
      paymentsConfig.canParticipantsSelectBetweenPaymentMechanisms,
    canParticipantsSelectBetweenPaymentMechanismsHow:
      paymentsConfig.canParticipantsSelectBetweenPaymentMechanismsHow,
    canParticipantsSelectBetweenPaymentMechanismsNote:
      paymentsConfig.canParticipantsSelectBetweenPaymentMechanismsNote,
    anticipatedPaymentFrequency: paymentsConfig.anticipatedPaymentFrequency,
    anticipatedPaymentFrequencyNote:
      paymentsConfig.anticipatedPaymentFrequencyNote,
    willRecoverPayments: paymentsConfig.willRecoverPayments,
    willRecoverPaymentsNote: paymentsConfig.willRecoverPaymentsNote,
    anticipateReconcilingPaymentsRetrospectively:
      paymentsConfig.anticipateReconcilingPaymentsRetrospectively,
    anticipateReconcilingPaymentsRetrospectivelyNote:
      paymentsConfig.anticipateReconcilingPaymentsRetrospectivelyNote,
    paymentReconciliationFrequency:
      paymentsConfig.paymentReconciliationFrequency,
    paymentReconciliationFrequencyNote:
      paymentsConfig.paymentReconciliationFrequencyNote,
    paymentDemandRecoupmentFrequency:
      paymentsConfig.paymentDemandRecoupmentFrequency,
    paymentDemandRecoupmentFrequencyNote:
      paymentsConfig.paymentDemandRecoupmentFrequencyNote,
    paymentStartDate: paymentsConfig.paymentStartDate,
    paymentStartDateNote: paymentsConfig.paymentStartDateNote
  };

  return (
    <div
      className="read-only-model-plan--payments"
      data-testid="read-only-model-plan--payments"
    >
      <TitleAndStatus
        clearance={clearance}
        clearanceTitle={paymentsMiscT('clearanceHeading')}
        heading={paymentsMiscT('heading')}
        isViewingFilteredView={!!filteredView}
        status={allPaymentData.status}
      />

      {clearance && (
        <p className="font-body-lg margin-top-neg-2 margin-bottom-6">
          {prepareForClearanceT('forModelPlan', {
            modelName
          })}
        </p>
      )}

      {/* First few sections of Payments data that can be automated */}
      <ReadOnlyBody
        data={allPaymentData}
        config={paymentsConfigOne}
        filteredView={filteredView}
      />

      {/* Claims-based payments */}
      <div
        className={`${
          filteredView
            ? ''
            : 'margin-top-4 padding-top-4 border-top-1px border-base-light'
        }`}
      >
        {!filteredView && (
          <h3 className="margin-top-0">{paymentsMiscT('claims')}</h3>
        )}

        <RelatedUnneededQuestions
          id="claims-questions"
          config={paymentsConfig.payType}
          value={allPaymentData.payType}
          singleChildCheck={PayType.CLAIMS_BASED_PAYMENTS}
          hideAlert={false}
        />

        <ReadOnlyBody
          data={allPaymentData}
          config={claimsConfig}
          filteredView={filteredView}
        />
      </div>

      {/* Beneficiary cost-sharing */}
      <div
        className={`${
          filteredView
            ? ''
            : 'margin-top-4 padding-top-4 border-top-1px border-base-light'
        }`}
      >
        {!filteredView && (
          <h3 className="margin-top-0">
            {paymentsMiscT('beneficiaryCostSharing')}
          </h3>
        )}

        <RelatedUnneededQuestions
          id="cost-sharing-questions"
          config={paymentsConfig.payClaims}
          value={allPaymentData.payClaims}
          hideAlert={false}
        />

        <ReadOnlyBody
          data={allPaymentData}
          config={beneficiaryConfig}
          filteredView={filteredView}
        />
      </div>

      {/* Non claims-based payments */}
      <div
        className={`${
          filteredView
            ? ''
            : 'margin-top-4 padding-top-4 border-top-1px border-base-light'
        }`}
      >
        {!filteredView && (
          <h3 className="margin-top-0">{paymentsMiscT('nonClaims')}</h3>
        )}

        <RelatedUnneededQuestions
          id="cost-sharing-questions"
          config={paymentsConfig.payType}
          value={allPaymentData.payType}
          singleChildCheck={PayType.NON_CLAIMS_BASED_PAYMENTS}
          hideAlert={false}
        />

        <ReadOnlyBody
          data={allPaymentData}
          config={nonClaimsConfig}
          filteredView={filteredView}
        />
      </div>

      <ReadOnlyBody
        data={allPaymentData}
        config={paymentsConfigTwo}
        filteredView={filteredView}
      />
    </div>
  );
};

export default ReadOnlyPayments;
