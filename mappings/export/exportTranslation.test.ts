import {
  filterUnneededField,
  mapOtherParentFieldToDBField,
  translationSections,
  unneededFields
} from './util';

describe('exportTranslation Util', () => {
  it('filters unneeded fields from an object based on a string array', () => {
    const translationPlanSections = { ...translationSections };
    expect(
      filterUnneededField(
        translationPlanSections.plan_basics.modelCategory,
        unneededFields
      )
    ).toEqual({
      gqlField: 'modelCategory',
      goField: 'ModelCategory',
      dbField: 'model_category',
      label: 'Primary model category',
      dataType: 'ENUM',
      formType: 'RADIO',
      options: {
        ACCOUNTABLE_CARE: 'Accountable Care',
        DISEASE_SPECIFIC_AND_EPISODIC: 'Disease-Specific & Episode-Based',
        HEALTH_PLAN: 'Health Plan',
        PRESCRIPTION_DRUG: 'Prescription Drug',
        STATE_BASED: 'State & Community-Based',
        STATUTORY: 'Statutory',
        TO_BE_DETERMINED: 'To be determined'
      }
    });
  });

  it('calls closures and replaces otherParentField gql field with db fields', () => {
    const translationPlanSections = { ...translationSections };
    expect(
      mapOtherParentFieldToDBField(translationPlanSections.plan_basics)
    ).toEqual({
      modelCategory: {
        gqlField: 'modelCategory',
        goField: 'ModelCategory',
        dbField: 'model_category',
        label: 'Primary model category',
        dataType: 'ENUM',
        formType: 'RADIO',
        options: {
          ACCOUNTABLE_CARE: 'Accountable Care',
          DISEASE_SPECIFIC_AND_EPISODIC: 'Disease-Specific & Episode-Based',
          HEALTH_PLAN: 'Health Plan',
          PRESCRIPTION_DRUG: 'Prescription Drug',
          STATE_BASED: 'State & Community-Based',
          STATUTORY: 'Statutory',
          TO_BE_DETERMINED: 'To be determined'
        }
      },
      additionalModelCategories: {
        gqlField: 'additionalModelCategories',
        goField: 'AdditionalModelCategories',
        dbField: 'additional_model_categories',
        label: 'Additional model categories',
        sublabel:
          'If your model doesn’t fall into any additional categories, you can skip this.',
        dataType: 'STRING',
        formType: 'CHECKBOX',
        options: {
          ACCOUNTABLE_CARE: 'Accountable Care',
          DISEASE_SPECIFIC_AND_EPISODIC: 'Disease-Specific & Episode-Based',
          HEALTH_PLAN: 'Health Plan',
          PRESCRIPTION_DRUG: 'Prescription Drug',
          STATE_BASED: 'State & Community-Based',
          STATUTORY: 'Statutory',
          TO_BE_DETERMINED: 'To be determined'
        }
      },
      amsModelID: {
        gqlField: 'amsModelID',
        goField: 'AmsModelID',
        dbField: 'ams_model_ID',
        label: 'Model ID',
        dataType: 'STRING',
        formType: 'TEXTAREA'
      },
      demoCode: {
        gqlField: 'demoCode',
        goField: 'DemoCode',
        dbField: 'demo_code',
        label: 'Demo code(s)',
        dataType: 'STRING',
        formType: 'TEXTAREA'
      },
      cmsCenters: {
        gqlField: 'cmsCenters',
        goField: 'CMSCenters',
        dbField: 'cms_centers',
        label: 'CMS component',
        dataType: 'ENUM',
        formType: 'CHECKBOX',
        options: {
          CMMI: 'Center for Medicare and Medicaid Innovation (CMMI)',
          CENTER_FOR_CLINICAL_STANDARDS_AND_QUALITY:
            'Center for Clinical Standards and Quality (CCSQ)',
          CENTER_FOR_MEDICAID_AND_CHIP_SERVICES:
            'Center for Medicaid and CHIP Services (CMCS)',
          CENTER_FOR_MEDICARE: 'Center for Medicare (CM)',
          FEDERAL_COORDINATED_HEALTH_CARE_OFFICE:
            'Federal Coordinated Health Care Office (FCHCO)',
          CENTER_FOR_PROGRAM_INTEGRITY: 'Center for Program Integrity (CPI)'
        }
      },
      cmmiGroups: {
        gqlField: 'cmmiGroups',
        goField: 'CMMIGroups',
        dbField: 'cmmi_groups',
        label: 'CMMI Group',
        sublabel:
          'You only need to select the CMMI group if CMMI is selected as the main CMS component.',
        dataType: 'ENUM',
        formType: 'CHECKBOX',
        options: {
          PATIENT_CARE_MODELS_GROUP: 'Patient Care Models Group (PCMG)',
          POLICY_AND_PROGRAMS_GROUP: 'Policy and Programs Group (PPG)',
          SEAMLESS_CARE_MODELS_GROUP: 'Seamless Care Models Group (SCMG)',
          STATE_AND_POPULATION_HEALTH_GROUP:
            'State and Population Health Group (SPHG)',
          TBD: 'To be determined'
        }
      },
      modelType: {
        gqlField: 'modelType',
        goField: 'ModelType',
        dbField: 'model_type',
        label: 'Model Type',
        dataType: 'ENUM',
        formType: 'CHECKBOX',
        options: {
          VOLUNTARY: 'Voluntary',
          MANDATORY_NATIONAL: 'Mandatory national',
          MANDATORY_REGIONAL_OR_STATE: 'Mandatory regional or state',
          OTHER: 'Other'
        }
      },
      modelTypeOther: {
        gqlField: 'modelTypeOther',
        goField: 'ModelTypeOther',
        dbField: 'model_type_other',
        label: 'Please specify',
        exportLabel: 'Please specify other',
        dataType: 'STRING',
        formType: 'TEXTAREA',
        isOtherType: true,
        otherParentField: 'model_type'
      },
      problem: {
        gqlField: 'problem',
        goField: 'Problem',
        dbField: 'problem',
        label: 'Problem statement',
        dataType: 'STRING',
        formType: 'TEXTAREA'
      },
      goal: {
        gqlField: 'goal',
        goField: 'Goal',
        dbField: 'goal',
        label: 'Goal',
        sublabel:
          'Please include the high level goal of the program and a description of the project.',
        dataType: 'STRING',
        formType: 'TEXTAREA'
      },
      testInterventions: {
        gqlField: 'testInterventions',
        goField: 'TestInterventions',
        dbField: 'test_interventions',
        label: 'Test Interventions',
        dataType: 'STRING',
        formType: 'TEXTAREA'
      },
      note: {
        gqlField: 'note',
        goField: 'Note',
        dbField: 'note',
        label: 'Notes',
        isNote: true,
        parentReferencesLabel: 'Model basics',
        dataType: 'STRING',
        formType: 'TEXTAREA'
      },
      completeICIP: {
        gqlField: 'completeICIP',
        goField: 'CompleteICIP',
        dbField: 'complete_icip',
        label: 'Complete ICIP',
        dataType: 'DATE',
        formType: 'DATEPICKER'
      },
      clearanceStarts: {
        gqlField: 'clearanceStarts',
        goField: 'ClearanceStarts',
        dbField: 'clearance_starts',
        label: 'Clearance start date',
        dataType: 'DATE',
        formType: 'DATEPICKER'
      },
      clearanceEnds: {
        gqlField: 'clearanceEnds',
        goField: 'ClearanceEnds',
        dbField: 'clearance_ends',
        label: 'Clearance end date',
        dataType: 'DATE',
        formType: 'DATEPICKER'
      },
      announced: {
        gqlField: 'announced',
        goField: 'Announced',
        dbField: 'announced',
        label: 'Announce model',
        dataType: 'DATE',
        formType: 'DATEPICKER'
      },
      applicationsStart: {
        gqlField: 'applicationsStart',
        goField: 'ApplicationsStart',
        dbField: 'applications_starts',
        label: 'Application start date',
        dataType: 'DATE',
        formType: 'DATEPICKER'
      },
      applicationsEnd: {
        gqlField: 'applicationsEnd',
        goField: 'ApplicationsEnd',
        dbField: 'applications_ends',
        label: 'Application end date',
        dataType: 'DATE',
        formType: 'DATEPICKER'
      },
      performancePeriodStarts: {
        gqlField: 'performancePeriodStarts',
        goField: 'PerformancePeriodStarts',
        dbField: 'performance_period_starts',
        label: 'Performance start date',
        dataType: 'DATE',
        formType: 'DATEPICKER'
      },
      performancePeriodEnds: {
        gqlField: 'performancePeriodEnds',
        goField: 'PerformancePeriodEnds',
        dbField: 'performance_period_ends',
        label: 'Performance end date',
        dataType: 'DATE',
        formType: 'DATEPICKER'
      },
      highLevelNote: {
        gqlField: 'highLevelNote',
        goField: 'HighLevelNote',
        dbField: 'high_level_note',
        label: 'Notes',
        isNote: true,
        parentReferencesLabel: 'Timeline',
        dataType: 'STRING',
        formType: 'TEXTAREA'
      },
      wrapUpEnds: {
        gqlField: 'wrapUpEnds',
        goField: 'WrapUpEnds',
        dbField: 'wrap_up_ends',
        label: 'Model wrap-up end date',
        dataType: 'DATE',
        formType: 'DATEPICKER'
      },
      phasedIn: {
        gqlField: 'phasedIn',
        goField: 'PhasedIn',
        dbField: 'phased_in',
        label:
          'If timelines are tight, might there be pieces of the model that can be phased in over time?',
        sublabel:
          'That is, the basic model would start at the earliest possible date but additional facets could be phased in at a later quarter.',
        dataType: 'BOOLEAN',
        formType: 'RADIO',
        options: {
          true: 'Yes',
          false: 'No'
        }
      },
      phasedInNote: {
        gqlField: 'phasedInNote',
        goField: 'PhasedInNote',
        dbField: 'phased_in_note',
        label: 'Notes',
        isNote: true,
        otherParentField: 'phased_in',
        dataType: 'STRING',
        formType: 'TEXTAREA'
      },
      readyForReviewBy: {
        gqlField: 'readyForReviewBy',
        goField: 'ReadyForReviewBy',
        dbField: 'ready_for_review_by',
        label:
          'This section of the Model Plan (Model basics) is ready for review.',
        dataType: 'UUID',
        formType: 'TEXT',
        tableReference: 'user_account',
        hideFromReadonly: true
      },
      readyForReviewDts: {
        gqlField: 'readyForReviewDts',
        goField: 'ReadyForReviewDts',
        dbField: 'ready_for_review_dts',
        label: 'Ready for review date',
        dataType: 'DATE',
        formType: 'DATEPICKER',
        hideFromReadonly: true
      },
      readyForClearanceBy: {
        gqlField: 'readyForClearanceBy',
        goField: 'ReadyForClearanceBy',
        dbField: 'ready_for_clearance_by',
        label:
          'This section of the Model Plan (Model basics) is ready for clearance.',
        dataType: 'UUID',
        formType: 'TEXT',
        tableReference: 'user_account',
        hideFromReadonly: true
      },
      readyForClearanceDts: {
        gqlField: 'readyForClearanceDts',
        goField: 'ReadyForClearanceDts',
        dbField: 'ready_for_clearance_dts',
        label: 'Ready for clearance date',
        dataType: 'DATE',
        formType: 'DATEPICKER',
        hideFromReadonly: true
      },
      status: {
        gqlField: 'status',
        goField: 'Status',
        dbField: 'status',
        label: 'Model Plan status',
        dataType: 'ENUM',
        formType: 'CHECKBOX',
        options: {
          READY: 'Ready',
          IN_PROGRESS: 'In progress',
          READY_FOR_REVIEW: 'Ready for review',
          READY_FOR_CLEARANCE: 'Ready for clearance'
        },
        hideFromReadonly: true
      }
    });
  });
});
