const beneficiaries = {
  heading: 'Beneficiaries',
  beneficiaries:
    'Who are the beneficiaries of this model? Select all that apply.',
  beneficiariesOther:
    'Please describe the other groups this model will impact.',
  beneficiariesOptions: {
    diseaseSpecific: 'Disease-specific',
    duallyEligible: 'Dually-eligible beneficiaries',
    medicaid: 'Medicaid',
    medicareAdvantage: 'Medicare Advantage',
    medicareFfs: 'Medicare FFS beneficiaries',
    medicarePartD: 'Medicare Part D',
    na: 'Not applicable',
    other: 'Other'
  },
  selectedGroup: 'Selected groups',
  beneficiariesNA:
    'If you will not have beneficiaries, you can skip the rest of the questions in this section. Feel free to add any additional notes or details that would be helpful to others.',
  dualEligibility:
    'Should dual-eligible beneficiaries be treated differently than non-dually eligibles?',
  excluded:
    'Should beneficiaries with certain characteristics or enrollments be excluded?',
  excludedNestedQuestion: 'What are the exclusionary criteria?',
  howManyImpacted:
    'How many people do you think will be impacted by this model?',
  numberOfPeopleImpacted: 'Number of people',
  zero: '0',
  tenThousand: '10,000+',
  levelOfConfidence: 'What is your level of confidence on this estimate?',
  confidenceOptions: {
    not: 'Not at all confident',
    slightly: 'Slightly confident',
    fairly: 'Fairly confident',
    completely: 'Completely confident'
  },
  chooseBeneficiaries:
    'How will you choose beneficiaries? Select all that apply.',
  beneficiaryFrequency: 'How frequently are beneficiaries chosen?',
  beneficiaryFrequencyOptions: {
    annually: 'Annually',
    biannually: 'Biannually',
    quarterly: 'Quarterly',
    monthly: 'Monthly',
    rolling: 'Rolling'
  }
};

export default beneficiaries;
