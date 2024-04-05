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

  it('replaces otherParentField gql field with db fields', () => {
    const translationPlanSections = { ...translationSections };
    expect(
      mapOtherParentFieldToDBField(translationPlanSections.plan_basics)
    ).toEqual({
      modelCategory: {
        gqlField: 'modelCategory',
        goField: 'ModelCategory',
        dbField: 'model_category',
        label: 'Primary model category',
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
        label: 'Model ID'
      },
      demoCode: {
        gqlField: 'demoCode',
        goField: 'DemoCode',
        dbField: 'demo_code',
        label: 'Demo code(s)'
      },
      cmsCenters: {
        gqlField: 'cmsCenters',
        goField: 'CMSCenters',
        dbField: 'cms_centers',
        label: 'CMS component',
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
        isOtherType: true,
        otherParentField: 'model_type'
      },
      problem: {
        gqlField: 'problem',
        goField: 'Problem',
        dbField: 'problem',
        label: 'Problem statement'
      },
      goal: {
        gqlField: 'goal',
        goField: 'Goal',
        dbField: 'goal',
        label: 'Goal',
        sublabel:
          'Please include the high level goal of the program and a description of the project.'
      },
      testInterventions: {
        gqlField: 'testInterventions',
        goField: 'TestInterventions',
        dbField: 'test_interventions',
        label: 'Test Interventions'
      },
      note: {
        gqlField: 'note',
        goField: 'Note',
        dbField: 'note',
        label: 'Notes'
      },
      completeICIP: {
        gqlField: 'completeICIP',
        goField: 'CompleteICIP',
        dbField: 'complete_icip',
        label: 'Complete ICIP'
      },
      clearanceStarts: {
        gqlField: 'clearanceStarts',
        goField: 'ClearanceStarts',
        dbField: 'clearance_starts',
        label: 'Clearance start date'
      },
      clearanceEnds: {
        gqlField: 'clearanceEnds',
        goField: 'ClearanceEnds',
        dbField: 'clearance_ends',
        label: 'Clearance end date'
      },
      announced: {
        gqlField: 'announced',
        goField: 'Announced',
        dbField: 'announced',
        label: 'Announce model'
      },
      applicationsStart: {
        gqlField: 'applicationsStart',
        goField: 'ApplicationsStart',
        dbField: 'applications_starts',
        label: 'Application start date'
      },
      applicationsEnd: {
        gqlField: 'applicationsEnd',
        goField: 'ApplicationsEnd',
        dbField: 'applications_ends',
        label: 'Application end date'
      },
      performancePeriodStarts: {
        gqlField: 'performancePeriodStarts',
        goField: 'PerformancePeriodStarts',
        dbField: 'performance_period_starts',
        label: 'Performance start date'
      },
      performancePeriodEnds: {
        gqlField: 'performancePeriodEnds',
        goField: 'PerformancePeriodEnds',
        dbField: 'performance_period_ends',
        label: 'Performance end date'
      },
      highLevelNote: {
        gqlField: 'highLevelNote',
        goField: 'HighLevelNote',
        dbField: 'high_level_note',
        label: 'Notes'
      },
      wrapUpEnds: {
        gqlField: 'wrapUpEnds',
        goField: 'WrapUpEnds',
        dbField: 'wrap_up_ends',
        label: 'Model wrap-up end date'
      },
      phasedIn: {
        gqlField: 'phasedIn',
        goField: 'PhasedIn',
        dbField: 'phased_in',
        label:
          'If timelines are tight, might there be pieces of the model that can be phased in over time?',
        sublabel:
          'That is, the basic model would start at the earliest possible date but additional facets could be phased in at a later quarter.',
        options: {
          true: 'Yes',
          false: 'No'
        }
      },
      phasedInNote: {
        gqlField: 'phasedInNote',
        goField: 'PhasedInNote',
        dbField: 'phased_in_note',
        label: 'Notes'
      },
      status: {
        gqlField: 'status',
        goField: 'Status',
        dbField: 'status',
        label: 'Model Plan status',
        options: {
          READY: 'Ready',
          IN_PROGRESS: 'In progress',
          READY_FOR_REVIEW: 'Ready for review',
          READY_FOR_CLEARANCE: 'Ready for clearance'
        }
      }
    });
  });
});
