import * as Yup from 'yup';

const datePickerSchema = Yup.date()
  .min(new Date(), 'Date cannot be in the past')
  .required('Please enter a date');

const planBasicsSchema = {
  pageOneSchema: Yup.object().shape({
    modelName: Yup.string().trim().required('Enter the Model Name'),
    modelCategory: Yup.string().required('Enter the Model Category'),
    cmsCenters: Yup.array()
      .min(1, 'Select a CMS Component')
      .required('Select a CMS Component')
  }),

  pageOneSchemaWithCmmiGroup: Yup.object().shape({
    modelName: Yup.string().trim().required('Enter the Model Name'),
    modelCategory: Yup.string().required('Enter the Model Category'),
    cmsCenters: Yup.array()
      .min(1, 'Select a CMS Component')
      .required('Select a CMS Component'),
    cmmiGroup: Yup.array()
      .min(1, 'Select a CMMI Group')
      .required('Select a CMMI Group')
  }),

  pageTwoSchema: Yup.object().shape({
    modelType: Yup.string().required('A model type is required'),
    problem: Yup.string().trim().required('Tell us about the problem'),
    goal: Yup.string().trim().required('Tell us about the goal'),
    testInterventions: Yup.string()
      .trim()
      .required('Tell us about the test interventions')
  }),

  pageThreeSchema: Yup.object().shape({
    completeICIP: datePickerSchema,
    clearanceStarts: datePickerSchema,
    clearanceEnds: datePickerSchema,
    announced: datePickerSchema,
    applicationsStart: datePickerSchema,
    applicationsEnd: datePickerSchema,
    performancePeriodStarts: datePickerSchema,
    performancePeriodEnds: datePickerSchema,
    wrapUpEnds: datePickerSchema,
    phasedIn: Yup.string().required('Please answer question')
  })
};

export default planBasicsSchema;
