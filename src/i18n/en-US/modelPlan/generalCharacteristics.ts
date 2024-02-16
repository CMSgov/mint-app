import { ModelViewFilter } from 'gql/gen/graphql';

import { TranslationGeneralCharacteristics } from 'types/translation';

export const generalCharacteristics: TranslationGeneralCharacteristics = {
  isNewModel: {
    gqlField: 'isNewModel',
    goField: 'IsNewModel',
    dbField: 'is_new_model',
    label: 'Is this a new track of an existing model or a new model?',
    dataType: 'boolean',
    formType: 'radio',
    options: {
      true: 'New model',
      false: 'New track of an existing model'
    },
    childRelation: {
      false: [() => generalCharacteristics.existingModel]
    }
  },
  existingModel: {
    gqlField: 'existingModel',
    goField: 'ExistingModel',
    dbField: 'existing_model',
    label: 'Which existing model?',
    sublabel: 'Start typing the name of the model',
    dataType: 'string',
    formType: 'select',
    parentRelation: () => generalCharacteristics.isNewModel
  },
  resemblesExistingModel: {
    gqlField: 'resemblesExistingModel',
    goField: 'ResemblesExistingModel',
    dbField: 'resembles_existing_model',
    label: 'Does your proposed track/model resemble any existing models?',
    dataType: 'enum',
    formType: 'radio',
    options: {
      YES: 'Yes',
      NO: 'No',
      OTHER: 'Other'
    },
    optionsRelatedInfo: {
      OTHER: 'resemblesExistingModelOtherSpecify'
    },
    childRelation: {
      YES: [
        () => generalCharacteristics.resemblesExistingModelWhich,
        () => generalCharacteristics.resemblesExistingModelHow
      ],
      NO: [
        () => generalCharacteristics.resemblesExistingModelWhich,
        () => generalCharacteristics.resemblesExistingModelHow
      ]
    }
  },
  resemblesExistingModelWhyHow: {
    gqlField: 'resemblesExistingModelWhyHow',
    goField: 'ResemblesExistingModelWhyHow',
    dbField: 'resembles_existing_model_why_how',
    label: 'Explain why and how the model made this decision.',
    dataType: 'string',
    formType: 'textarea'
  },
  resemblesExistingModelWhich: {
    gqlField: 'resemblesExistingModelWhich',
    goField: 'ResemblesExistingModelWhich',
    dbField: 'resembles_existing_model_which',
    label:
      'Which existing models does your proposed track/model most closely resemble?',
    sublabel: 'Start typing the name of the model',
    multiSelectLabel: 'Selected models',
    dataType: 'string',
    formType: 'multiSelect',
    isArray: true,
    isModelLinks: true, // Used to designate if a field is a ExistingModelLinks type with nested fields - ex: names,
    parentRelation: () => generalCharacteristics.resemblesExistingModel,
    options: {
      Other: 'Other'
    },
    optionsRelatedInfo: {
      Other: 'resemblesExistingModelOtherOption'
    }
  },
  resemblesExistingModelHow: {
    gqlField: 'resemblesExistingModelHow',
    goField: 'ResemblesExistingModelHow',
    dbField: 'resembles_existing_model_how',
    label: 'In what way does the new model resemble the selected model(s)?',
    dataType: 'string',
    formType: 'textarea',
    parentRelation: () => generalCharacteristics.resemblesExistingModel
  },
  resemblesExistingModelOtherSpecify: {
    gqlField: 'resemblesExistingModelOtherSpecify',
    goField: 'ResemblesExistingModelOtherSpecify',
    dbField: 'resembles_existing_model_other_specify',
    label: 'Please specify',
    dataType: 'string',
    formType: 'text',
    isOtherType: true
  },
  // Not rendered in any form/ui
  resemblesExistingModelOtherSelected: {
    gqlField: 'resemblesExistingModelOtherSelected',
    goField: 'ResemblesExistingModelOtherSelected',
    dbField: 'resembles_existing_model_other_selected',
    label: '',
    dataType: 'boolean',
    formType: 'radio',
    isOtherType: true,
    options: {
      true: '',
      false: ''
    }
  },
  resemblesExistingModelOtherOption: {
    gqlField: 'resemblesExistingModelOtherOption',
    goField: 'ResemblesExistingModelOtherOption',
    dbField: 'resembles_existing_model_other_option',
    label: 'Please specify other',
    dataType: 'string',
    formType: 'text',
    isOtherType: true
  },
  resemblesExistingModelNote: {
    gqlField: 'resemblesExistingModelNote',
    goField: 'ResemblesExistingModelNote',
    dbField: 'resembles_existing_model_note',
    label: 'Note',
    dataType: 'string',
    formType: 'textarea'
  },
  participationInModelPrecondition: {
    gqlField: 'participationInModelPrecondition',
    goField: 'ParticipationInModelPrecondition',
    dbField: 'participation_in_model_precondition',
    label:
      'Is participation in another model a precondition for participation in this model?',
    dataType: 'enum',
    formType: 'radio',
    options: {
      YES: 'Yes',
      NO: 'No',
      OTHER: 'Other'
    },
    optionsRelatedInfo: {
      OTHER: 'participationInModelPreconditionOtherSpecify'
    },
    childRelation: {
      YES: [() => generalCharacteristics.participationInModelPreconditionWhich]
    }
  },
  participationInModelPreconditionOtherSpecify: {
    gqlField: 'participationInModelPreconditionOtherSpecify',
    goField: 'ParticipationInModelPreconditionOtherSpecify',
    dbField: 'participation_in_model_precondition_other_specify',
    label: 'Please specify',
    dataType: 'string',
    formType: 'text',
    isOtherType: true
  },
  participationInModelPreconditionWhich: {
    gqlField: 'participationInModelPreconditionWhich',
    goField: 'ParticipationInModelPreconditionWhich',
    dbField: 'participation_in_model_precondition_which',
    label: 'Which models?',
    sublabel: 'Start typing the name of the model',
    multiSelectLabel: 'Selected models',
    dataType: 'string',
    formType: 'multiSelect',
    isArray: true,
    isModelLinks: true, // Used to designate if a field is a ExistingModelLinks type with nested fields - ex: names
    parentRelation: () =>
      generalCharacteristics.participationInModelPrecondition,
    options: {
      Other: 'Other'
    },
    optionsRelatedInfo: {
      Other: 'participationInModelPreconditionOtherOption'
    }
  },
  // Not rendered in any form/ui
  participationInModelPreconditionOtherSelected: {
    gqlField: 'participationInModelPreconditionOtherSelected',
    goField: 'ParticipationInModelPreconditionOtherSelected',
    dbField: 'participation_in_model_precondition_other_selected',
    label: '',
    dataType: 'boolean',
    formType: 'radio',
    isOtherType: true,
    options: {
      true: '',
      false: ''
    }
  },
  participationInModelPreconditionOtherOption: {
    gqlField: 'participationInModelPreconditionOtherOption',
    goField: 'ParticipationInModelPreconditionOtherOption',
    dbField: 'participation_in_model_precondition_other_option',
    label: 'Please specify other',
    dataType: 'string',
    formType: 'text',
    isOtherType: true
  },
  participationInModelPreconditionWhyHow: {
    gqlField: 'participationInModelPreconditionWhyHow',
    goField: 'ParticipationInModelPreconditionWhyHow',
    dbField: 'participation_in_model_precondition_why_how',
    label: 'Explain any details including if it is just part of the model.',
    dataType: 'string',
    formType: 'textarea'
  },
  participationInModelPreconditionNote: {
    gqlField: 'participationInModelPreconditionNote',
    goField: 'ParticipationInModelPreconditionNote',
    dbField: 'participation_in_model_precondition_note',
    label: 'Note',
    dataType: 'string',
    formType: 'textarea'
  },
  hasComponentsOrTracks: {
    gqlField: 'hasComponentsOrTracks',
    goField: 'HasComponentsOrTracks',
    dbField: 'has_components_or_tracks',
    label: 'Are there different components/tracks?',
    readonlyLabel:
      'Are there different components/tracks? If so, how do the tracks differ?',
    dataType: 'boolean',
    formType: 'radio',
    options: {
      true: 'Yes',
      false: 'No'
    },
    optionsRelatedInfo: {
      true: 'hasComponentsOrTracksDiffer'
    }
  },
  hasComponentsOrTracksDiffer: {
    gqlField: 'hasComponentsOrTracksDiffer',
    goField: 'HasComponentsOrTracksDiffer',
    dbField: 'has_components_or_tracks_differ',
    label: 'How do the tracks differ?',
    dataType: 'string',
    formType: 'textarea',
    isOtherType: true
  },
  hasComponentsOrTracksNote: {
    gqlField: 'hasComponentsOrTracksNote',
    goField: 'HasComponentsOrTracksNote',
    dbField: 'has_components_or_tracks_note',
    label: 'Note',
    dataType: 'string',
    formType: 'textarea'
  },
  agencyOrStateHelp: {
    gqlField: 'agencyOrStateHelp',
    goField: 'AgencyOrStateHelp',
    dbField: 'agency_or_state_help',
    label:
      'Will another Agency or State help design/operate the model? Select all that apply.',
    readonlyLabel:
      'Will another Agency or State help design/operate the model?',
    dataType: 'enum',
    formType: 'checkbox',
    isPageStart: true,
    options: {
      YES_STATE: 'Yes, we will partner with states',
      YES_AGENCY_IDEAS: 'Yes, we will get ideas from another agency',
      YES_AGENCY_IAA:
        'Yes, we will get support from another agency through Inter Agency Agreement (IAA)',
      NO: 'No',
      OTHER: 'Other'
    },
    optionsRelatedInfo: {
      OTHER: 'agencyOrStateHelpOther'
    }
  },
  agencyOrStateHelpOther: {
    gqlField: 'agencyOrStateHelpOther',
    goField: 'AgencyOrStateHelpOther',
    dbField: 'agency_or_state_help_other',
    label: 'Please specify',
    dataType: 'string',
    formType: 'textarea',
    isOtherType: true
  },
  agencyOrStateHelpNote: {
    gqlField: 'agencyOrStateHelpNote',
    goField: 'AgencyOrStateHelpNote',
    dbField: 'agency_or_state_help_note',
    label: 'Notes',
    dataType: 'string',
    formType: 'textarea'
  },
  alternativePaymentModelTypes: {
    gqlField: 'alternativePaymentModelTypes',
    goField: 'AlternativePaymentModelTypes',
    dbField: 'alternative_payment_model_types',
    label:
      'What type of Alternative Payment Model (APM) do you think the model could be?',
    sublabel:
      'In order to be considered by the Quality Payment Program (QPP), and to be MIPS or Advanced APM, you will need to collect TINs and NPIs for providers.',
    dataType: 'enum',
    formType: 'checkbox',
    options: {
      ADVANCED: 'Advanced APM',
      MIPS: 'MIPS APM',
      REGULAR: 'Regular APM',
      NOT_APM: 'It is not an APM'
    },
    filterGroups: [ModelViewFilter.CMMI, ModelViewFilter.OACT]
  },
  alternativePaymentModelNote: {
    gqlField: 'alternativePaymentModelNote',
    goField: 'AlternativePaymentModelNote',
    dbField: 'alternative_payment_model_note',
    label: 'Notes',
    dataType: 'string',
    formType: 'textarea',
    filterGroups: [ModelViewFilter.CMMI, ModelViewFilter.OACT]
  },
  keyCharacteristics: {
    gqlField: 'keyCharacteristics',
    goField: 'KeyCharacteristics',
    dbField: 'key_characteristics',
    label: 'What are the model key characteristics? Select all that apply.',
    readonlyLabel: 'What are the model key characteristics?',
    dataType: 'enum',
    formType: 'multiSelect',
    multiSelectLabel: 'Selected key characteristics',
    options: {
      EPISODE_BASED: 'Episode-Based Model',
      MEDICAID_MODEL: 'Medicaid Model',
      PART_C: 'Medicare-Advantage (Part C) Model',
      MEDICARE_FFS_MODEL: 'Medicare Fee-for-Service (FFS) Model',
      PART_D: 'Medicare Prescription Drug (Part D) Model',
      PAYMENT: 'Payment Model',
      POPULATION_BASED: 'Population-based Model',
      PREVENTATIVE: 'Preventative Model',
      SERVICE_DELIVERY: 'Service Delivery Model',
      SHARED_SAVINGS: 'Shared Savings Model',
      OTHER: 'Other'
    },
    optionsRelatedInfo: {
      OTHER: 'keyCharacteristicsOther'
    },
    childRelation: {
      PART_C: [
        () => generalCharacteristics.collectPlanBids,
        () => generalCharacteristics.managePartCDEnrollment,
        () => generalCharacteristics.planContractUpdated
      ],
      PART_D: [
        () => generalCharacteristics.collectPlanBids,
        () => generalCharacteristics.managePartCDEnrollment,
        () => generalCharacteristics.planContractUpdated
      ]
    },
    filterGroups: [
      ModelViewFilter.CMMI,
      ModelViewFilter.IDDOC,
      ModelViewFilter.PBG
    ]
  },
  keyCharacteristicsOther: {
    gqlField: 'keyCharacteristicsOther',
    goField: 'KeyCharacteristicsOther',
    dbField: 'key_characteristics_other',
    label: 'Please describe the other key characteristics',
    dataType: 'string',
    formType: 'text',
    isOtherType: true
  },
  keyCharacteristicsNote: {
    gqlField: 'keyCharacteristicsNote',
    goField: 'KeyCharacteristicsNote',
    dbField: 'key_characteristics_note',
    label: 'Notes',
    dataType: 'string',
    formType: 'textarea',
    filterGroups: [
      ModelViewFilter.CMMI,
      ModelViewFilter.IDDOC,
      ModelViewFilter.PBG
    ]
  },
  collectPlanBids: {
    gqlField: 'collectPlanBids',
    goField: 'CollectPlanBids',
    dbField: 'collect_plan_bids',
    label: 'Will you review and collect plan bids?',
    dataType: 'boolean',
    formType: 'radio',
    options: {
      true: 'Yes',
      false: 'No'
    },
    parentRelation: () => generalCharacteristics.keyCharacteristics
  },
  collectPlanBidsNote: {
    gqlField: 'collectPlanBidsNote',
    goField: 'CollectPlanBidsNote',
    dbField: 'collect_plan_bids_note',
    label: 'Notes',
    dataType: 'string',
    formType: 'textarea'
  },
  managePartCDEnrollment: {
    gqlField: 'managePartCDEnrollment',
    goField: 'ManagePartCDEnrollment',
    dbField: 'manage_part_c_d_enrollment',
    label: 'Will you manage Part C/D enrollment?',
    dataType: 'boolean',
    formType: 'radio',
    options: {
      true: 'Yes',
      false: 'No'
    },
    parentRelation: () => generalCharacteristics.keyCharacteristics
  },
  managePartCDEnrollmentNote: {
    gqlField: 'managePartCDEnrollmentNote',
    goField: 'ManagePartCDEnrollmentNote',
    dbField: 'manage_part_c_d_enrollment_note',
    label: 'Notes',
    dataType: 'string',
    formType: 'textarea'
  },
  planContractUpdated: {
    gqlField: 'planContractUpdated',
    goField: 'PlanContractUpdated',
    dbField: 'plan_contract_updated',
    label: 'Have you updated the plan’s contract?',
    dataType: 'boolean',
    formType: 'radio',
    options: {
      true: 'Yes',
      false: 'No'
    },
    parentRelation: () => generalCharacteristics.keyCharacteristics
  },
  planContractUpdatedNote: {
    gqlField: 'planContractUpdatedNote',
    goField: 'PlanContractUpdatedNote',
    dbField: 'plan_contract_updated_note',
    label: 'Notes',
    dataType: 'string',
    formType: 'textarea'
  },
  careCoordinationInvolved: {
    gqlField: 'careCoordinationInvolved',
    goField: 'CareCoordinationInvolved',
    dbField: 'care_coordination_involved',
    label: 'Is care coordination involved?',
    readonlyLabel: 'Is care coordination involved? How so?',
    dataType: 'boolean',
    formType: 'radio',
    isPageStart: true,
    options: {
      true: 'Yes',
      false: 'No'
    }
  },
  careCoordinationInvolvedDescription: {
    gqlField: 'careCoordinationInvolvedDescription',
    goField: 'CareCoordinationInvolvedDescription',
    dbField: 'care_coordination_involved_description',
    label: 'How so?',
    dataType: 'string',
    formType: 'textarea',
    isOtherType: true
  },
  careCoordinationInvolvedNote: {
    gqlField: 'careCoordinationInvolvedNote',
    goField: 'CareCoordinationInvolvedNote',
    dbField: 'care_coordination_involved_note',
    label: 'Notes',
    dataType: 'string',
    formType: 'textarea'
  },
  additionalServicesInvolved: {
    gqlField: 'additionalServicesInvolved',
    goField: 'AdditionalServicesInvolved',
    dbField: 'additional_services_involved',
    label: 'Are additional services involved?',
    readonlyLabel: 'Are additional services involved? How so?',
    dataType: 'boolean',
    formType: 'radio',
    options: {
      true: 'Yes',
      false: 'No'
    }
  },
  additionalServicesInvolvedDescription: {
    gqlField: 'additionalServicesInvolvedDescription',
    goField: 'AdditionalServicesInvolvedDescription',
    dbField: 'additional_services_involved_description',
    label: 'How so?',
    dataType: 'string',
    formType: 'textarea',
    isOtherType: true
  },
  additionalServicesInvolvedNote: {
    gqlField: 'additionalServicesInvolvedNote',
    goField: 'AdditionalServicesInvolvedNote',
    dbField: 'additional_services_involved_note',
    label: 'Notes',
    dataType: 'string',
    formType: 'textarea'
  },
  communityPartnersInvolved: {
    gqlField: 'communityPartnersInvolved',
    goField: 'CommunityPartnersInvolved',
    dbField: 'community_partners_involved',
    label: 'Are community partners involved?',
    readonlyLabel: 'Are community partners involved? How so?',
    dataType: 'boolean',
    formType: 'radio',
    options: {
      true: 'Yes',
      false: 'No'
    }
  },
  communityPartnersInvolvedDescription: {
    gqlField: 'communityPartnersInvolvedDescription',
    goField: 'CommunityPartnersInvolvedDescription',
    dbField: 'community_partners_involved',
    label: 'How so?',
    dataType: 'string',
    formType: 'textarea',
    isOtherType: true
  },
  communityPartnersInvolvedNote: {
    gqlField: 'communityPartnersInvolvedNote',
    goField: 'CommunityPartnersInvolvedNote',
    dbField: 'community_partners_involved_note',
    label: 'Notes',
    dataType: 'string',
    formType: 'textarea'
  },
  geographiesTargeted: {
    gqlField: 'geographiesTargeted',
    goField: 'GeographiesTargeted',
    dbField: 'geographies_targeted',
    label: 'Is the model targeted at specific geographies?',
    dataType: 'boolean',
    formType: 'radio',
    isPageStart: true,
    options: {
      true: 'Yes',
      false: 'No'
    },
    childRelation: {
      true: [
        () => generalCharacteristics.geographiesTargetedTypes,
        () => generalCharacteristics.geographiesTargetedAppliedTo
      ]
    },
    filterGroups: [ModelViewFilter.IDDOC, ModelViewFilter.PBG]
  },
  geographiesTargetedTypes: {
    gqlField: 'geographiesTargetedTypes',
    goField: 'GeographiesTargetedTypes',
    dbField: 'geographies_targeted_types',
    label: 'Geography type is',
    dataType: 'enum',
    formType: 'checkbox',
    options: {
      STATE: 'States and territories',
      REGION: 'Region',
      OTHER: 'Other'
    },
    optionsRelatedInfo: {
      // STATE: 'geographiesStatesAndTerritories',
      // REGION: 'geographiesRegionTypes',
      OTHER: 'geographiesTargetedTypesOther'
    },
    parentRelation: () => generalCharacteristics.geographiesTargeted,
    childRelation: {
      STATE: [() => generalCharacteristics.geographiesStatesAndTerritories],
      REGION: [() => generalCharacteristics.geographiesRegionTypes]
    },
    filterGroups: [ModelViewFilter.IDDOC, ModelViewFilter.PBG]
  },
  geographiesStatesAndTerritories: {
    gqlField: 'geographiesStatesAndTerritories',
    goField: 'GeographiesStatesAndTerritories',
    dbField: 'geographies_states_and_territories',
    label: 'Which states and territories?',
    multiSelectLabel: 'States and territories',
    dataType: 'enum',
    formType: 'multiSelect',
    isOtherType: true,
    options: {
      AL: 'AL - Alabama',
      AK: 'AK - Alaska',
      AZ: 'AZ - Arizona',
      AR: 'AR - Arkansas',
      CA: 'CA - California',
      CO: 'CO - Colorado',
      CT: 'CT - Connecticut',
      DE: 'DE - Delaware',
      DC: 'DC - District of Columbia',
      FL: 'FL - Florida',
      GA: 'GA - Georgia',
      HI: 'HI - Hawaii',
      ID: 'ID - Idaho',
      IL: 'IL - Illinois',
      IN: 'IN - Indiana',
      IA: 'IA - Iowa',
      KS: 'KS - Kansas',
      KY: 'KY - Kentucky',
      LA: 'LA - Louisiana',
      ME: 'ME - Maine',
      MD: 'MD - Maryland',
      MA: 'MA - Massachusetts',
      MI: 'MI - Michigan',
      MN: 'MN - Minnesota',
      MS: 'MS - Mississippi',
      MO: 'MO - Missouri',
      MT: 'MT - Montana',
      NE: 'NE - Nebraska',
      NV: 'NV - Nevada',
      NH: 'NH - New Hampshire',
      NJ: 'NJ - New Jersey',
      NM: 'NM - New Mexico',
      NY: 'NY - New York',
      NC: 'NC - North Carolina',
      ND: 'ND - North Dakota',
      OH: 'OH - Ohio',
      OK: 'OK - Oklahoma',
      OR: 'OR - Oregon',
      PA: 'PA - Pennsylvania',
      RI: 'RI - Rhode Island',
      SC: 'SC - South Carolina',
      SD: 'SD - South Dakota',
      TN: 'TN - Tennessee',
      TX: 'TX - Texas',
      UT: 'UT - Utah',
      VT: 'VT - Vermont',
      VA: 'VA - Virginia',
      WA: 'WA - Washington',
      WV: 'WV - West Virginia',
      WI: 'WI - Wisconsin',
      WY: 'WY - Wyoming',
      AS: 'AS - American Samoa',
      GU: 'GU - Guam',
      MP: 'MP - Northern Mariana Islands',
      PR: 'PR - Puerto Rico',
      UM: 'UM - U.S. Minor Outlying Islands',
      VI: 'VI - U.S. Virgin Islands'
    },
    readonlyOptions: {
      AL: 'Alabama',
      AK: 'Alaska',
      AZ: 'Arizona',
      AR: 'Arkansas',
      CA: 'California',
      CO: 'Colorado',
      CT: 'Connecticut',
      DE: 'Delaware',
      DC: 'District of Columbia',
      FL: 'Florida',
      GA: 'Georgia',
      HI: 'Hawaii',
      ID: 'Idaho',
      IL: 'Illinois',
      IN: 'Indiana',
      IA: 'Iowa',
      KS: 'Kansas',
      KY: 'Kentucky',
      LA: 'Louisiana',
      ME: 'Maine',
      MD: 'Maryland',
      MA: 'Massachusetts',
      MI: 'Michigan',
      MN: 'Minnesota',
      MS: 'Mississippi',
      MO: 'Missouri',
      MT: 'Montana',
      NE: 'Nebraska',
      NV: 'Nevada',
      NH: 'New Hampshire',
      NJ: 'New Jersey',
      NM: 'New Mexico',
      NY: 'New York',
      NC: 'North Carolina',
      ND: 'North Dakota',
      OH: 'Ohio',
      OK: 'Oklahoma',
      OR: 'Oregon',
      PA: 'Pennsylvania',
      RI: 'Rhode Island',
      SC: 'South Carolina',
      SD: 'South Dakota',
      TN: 'Tennessee',
      TX: 'Texas',
      UT: 'Utah',
      VT: 'Vermont',
      VA: 'Virginia',
      WA: 'Washington',
      WV: 'West Virginia',
      WI: 'Wisconsin',
      WY: 'Wyoming',
      AS: 'American Samoa',
      GU: 'Guam',
      MP: 'Northern Mariana Islands',
      PR: 'Puerto Rico',
      UM: 'U.S. Minor Outlying Islands',
      VI: 'U.S. Virgin Islands'
    },
    parentRelation: () => generalCharacteristics.geographiesTargetedTypes,
    filterGroups: [ModelViewFilter.IDDOC, ModelViewFilter.PBG]
  },
  geographiesRegionTypes: {
    gqlField: 'geographiesRegionTypes',
    goField: 'GeographiesRegionTypes',
    dbField: 'geographies_region_types',
    label: 'Geography region types',
    dataType: 'enum',
    formType: 'checkbox',
    isOtherType: true,
    options: {
      CBSA: 'Core-based statistical areas (CBSAs)',
      HRR: 'Hospital Referral Regions (HRR)',
      MSA: 'Metropolitan Statistical Areas (MSAs)'
    },
    parentRelation: () => generalCharacteristics.geographiesTargetedTypes,
    filterGroups: [ModelViewFilter.IDDOC, ModelViewFilter.PBG]
  },
  geographiesTargetedTypesOther: {
    gqlField: 'geographiesTargetedTypesOther',
    goField: 'GeographiesTargetedTypesOther',
    dbField: 'geographies_targeted_types_other',
    label: 'Please specify what the other geography type is.',
    dataType: 'string',
    formType: 'text',
    isOtherType: true,
    filterGroups: [ModelViewFilter.IDDOC, ModelViewFilter.PBG]
  },
  geographiesTargetedAppliedTo: {
    gqlField: 'geographiesTargetedAppliedTo',
    goField: 'GeographiesTargetedAppliedTo',
    dbField: 'geographies_targeted_applied_to',
    label: 'Geographies are applied to',
    dataType: 'enum',
    formType: 'checkbox',
    options: {
      BENEFICIARIES: 'Beneficiaries',
      PARTICIPANTS: 'Participants',
      PROVIDERS: 'Providers',
      OTHER: 'Other'
    },
    parentRelation: () => generalCharacteristics.geographiesTargeted,
    filterGroups: [ModelViewFilter.IDDOC, ModelViewFilter.PBG]
  },
  geographiesTargetedAppliedToOther: {
    gqlField: 'geographiesTargetedAppliedToOther',
    goField: 'GeographiesTargetedAppliedToOther',
    dbField: 'geographies_targeted_applied_to_other',
    label: 'Please specify what the geographies are applied to.',
    dataType: 'string',
    formType: 'text',
    isOtherType: true,
    filterGroups: [ModelViewFilter.IDDOC, ModelViewFilter.PBG]
  },
  geographiesTargetedNote: {
    gqlField: 'geographiesTargetedNote',
    goField: 'GeographiesTargetedNote',
    dbField: 'geographies_targeted_note',
    label: 'Notes',
    dataType: 'boolean',
    formType: 'radio',
    filterGroups: [ModelViewFilter.IDDOC, ModelViewFilter.PBG]
  },
  participationOptions: {
    gqlField: 'participationOptions',
    goField: 'ParticipationOptions',
    dbField: 'participation_options',
    label: 'Does the model offer different options for participation?',
    dataType: 'boolean',
    formType: 'radio',
    options: {
      true: 'Yes',
      false: 'No'
    },
    filterGroups: [ModelViewFilter.CMMI]
  },
  participationOptionsNote: {
    gqlField: 'participationOptionsNote',
    goField: 'ParticipationOptionsNote',
    dbField: 'participation_options_note',
    label: 'Notes',
    dataType: 'boolean',
    formType: 'radio',
    filterGroups: [ModelViewFilter.CMMI]
  },
  agreementTypes: {
    gqlField: 'agreementTypes',
    goField: 'AgreementTypes',
    dbField: 'agreement_types',
    label: 'What is the agreement type?',
    sublabel:
      'Note: CMMI writes, Office of General Council (OGC) approves both types of agreements',
    dataType: 'boolean',
    formType: 'radio',
    options: {
      COOPERATIVE: 'Co-Operative Agreement/Grant',
      PARTICIPATION: 'Participation Agreement',
      OTHER: 'Other'
    },
    filterGroups: [ModelViewFilter.CMMI]
  },
  agreementTypesOther: {
    gqlField: 'agreementTypesOther',
    goField: 'AgreementTypesOther',
    dbField: 'agreement_types_other',
    label: 'Please specify',
    dataType: 'string',
    formType: 'text',
    filterGroups: [ModelViewFilter.CMMI]
  },
  multiplePatricipationAgreementsNeeded: {
    gqlField: 'multiplePatricipationAgreementsNeeded',
    goField: 'MultiplePatricipationAgreementsNeeded',
    dbField: 'multiple_patricipation_agreements_needed',
    label: 'Will more than one participation agreement be needed?',
    sublabel:
      'depending on awardee selections or characteristics such as risk/type/size',
    dataType: 'boolean',
    formType: 'radio',
    options: {
      true: 'Yes',
      false: 'No'
    },
    filterGroups: [ModelViewFilter.CMMI]
  },
  multiplePatricipationAgreementsNeededNote: {
    gqlField: 'multiplePatricipationAgreementsNeededNote',
    goField: 'MultiplePatricipationAgreementsNeededNote',
    dbField: 'multiple_patricipation_agreements_needed_note',
    label: 'Notes',
    dataType: 'string',
    formType: 'textarea',
    filterGroups: [ModelViewFilter.CMMI]
  },
  rulemakingRequired: {
    gqlField: 'rulemakingRequired',
    goField: 'RulemakingRequired',
    dbField: 'rulemaking_required',
    label: 'Is rulemaking required?',
    dataType: 'boolean',
    formType: 'radio',
    options: {
      true: 'Yes',
      false: 'No'
    },
    filterGroups: [
      ModelViewFilter.IDDOC,
      ModelViewFilter.IPC,
      ModelViewFilter.PBG
    ]
  },
  rulemakingRequiredDescription: {
    gqlField: 'multiplePatricipationAgreementsNeeded',
    goField: 'MultiplePatricipationAgreementsNeeded',
    dbField: 'multiple_patricipation_agreements_needed',
    label:
      'Which rule do you anticipate using and what is the target date of display for that regulation?',
    dataType: 'string',
    formType: 'textarea',
    filterGroups: [
      ModelViewFilter.IDDOC,
      ModelViewFilter.IPC,
      ModelViewFilter.PBG
    ]
  },
  rulemakingRequiredNote: {
    gqlField: 'rulemakingRequiredNote',
    goField: 'RulemakingRequiredNote',
    dbField: 'rulemaking_required_note',
    label: 'Notes',
    dataType: 'string',
    formType: 'textarea'
  },
  authorityAllowances: {
    gqlField: 'authorityAllowances',
    goField: 'AuthorityAllowances',
    dbField: 'authority_allowances',
    label: 'What authority allows CMMI to test the model?',
    dataType: 'enum',
    formType: 'checkbox',
    options: {
      ACA: '3021 Affordable Care Act (ACA)',
      CONGRESSIONALLY_MANDATED: 'Congressionally Mandated Demonstration',
      SSA_PART_B:
        'Section 1833(e) (Part B services) of the Social Security Act',
      OTHER: 'Other'
    },
    filterGroups: [ModelViewFilter.CMMI]
  },
  authorityAllowancesOther: {
    gqlField: 'authorityAllowancesOther',
    goField: 'AuthorityAllowancesOther',
    dbField: 'authority_allowances_other',
    label: 'Please specify',
    dataType: 'string',
    formType: 'textarea',
    filterGroups: [ModelViewFilter.CMMI]
  },
  authorityAllowancesNote: {
    gqlField: 'authorityAllowancesNote',
    goField: 'AuthorityAllowancesNote',
    dbField: 'authority_allowances_note',
    label: 'Notes',
    dataType: 'string',
    formType: 'textarea',
    filterGroups: [ModelViewFilter.CMMI]
  },
  waiversRequired: {
    gqlField: 'waiversRequired',
    goField: 'WaiversRequired',
    dbField: 'waivers_required',
    label: 'Are waivers required?',
    dataType: 'boolean',
    formType: 'radio',
    options: {
      true: 'Yes',
      false: 'No'
    },
    filterGroups: [ModelViewFilter.CMMI]
  },
  waiversRequiredTypes: {
    gqlField: 'waiversRequiredTypes',
    goField: 'WaiversRequiredTypes',
    dbField: 'waivers_required_types',
    label: 'Which types of waivers are required? Select all that apply.',
    readonlyLabel: 'Which types of waivers are required?',
    dataType: 'enum',
    formType: 'checkbox',
    options: {
      FRAUD_ABUSE: 'Fraud and Abuse',
      MEDICAID: 'Medicaid',
      PROGRAM_PAYMENT: 'Program/payment'
    },
    optionsLabels: {
      FRAUD_ABUSE: '(Note: Federal Waiver team writes)',
      MEDICAID: '(1115, other)',
      PROGRAM_PAYMENT:
        '(Note: CMMI writes, Office of General Council (OGC) adivses, full clearance process is required)'
    },
    filterGroups: [ModelViewFilter.CMMI]
  },
  waiversRequiredNote: {
    gqlField: 'waiversRequiredNote',
    goField: 'WaiversRequiredNote',
    dbField: 'waivers_required_note',
    label: 'Notes',
    dataType: 'string',
    formType: 'textarea',
    filterGroups: [ModelViewFilter.CMMI]
  },
  status: {
    gqlField: 'status',
    goField: 'Status',
    dbField: 'status',
    label: 'Model Plan status',
    dataType: 'enum',
    formType: 'checkbox',
    options: {
      READY: 'Ready',
      IN_PROGRESS: 'In progress',
      READY_FOR_REVIEW: 'Ready for review',
      READY_FOR_CLEARANCE: 'Ready for clearance'
    }
  }
};

export const generalCharacteristicsMisc: Record<string, string> = {
  heading: 'General characteristics',
  clearanceHeading: 'Review general characteristics',
  breadcrumb: 'General characteristics',
  specificQuestions: 'Key characteristic specific questions'
};

export default generalCharacteristics;
