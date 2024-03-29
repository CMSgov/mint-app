const twoPageMeeting = {
  title: 'How to have a successful 2-pager meeting',
  description:
    'Use this article to ensure you’re fully prepared for your 2-page concept review meeting with CMMI Front Office (FO).',
  summaryBox: {
    title: 'Recommendations',
    listItem: {
      draft: 'Draft your 2-page concept paper',
      start: 'Start thinking about additional resources',
      review: 'The review meeting'
    }
  },
  conceptPaper: {
    introParagraph:
      'A 2-page overview of a model concept may or may not include all of the elements listed below. The following is intended as a guide. Teams can focus on the most relevant and impactful information to decide if a model concept should move to the next development phase.',
    stepOne: {
      heading: '1. Proposed model overview and goals',
      items: [
        'Briefly describe the need for the model, including the challenges the target population faces',
        'Describe the preliminary theory of change for the model',
        'Provide background or context on if the proposed model has been tested before or is a follow-on model, incorporates learnings from external stakeholders, and/or where the concept originated (e.g., private sector, academia, state or regional efforts)'
      ]
    },
    stepTwo: {
      heading: '2. High-level description of model elements',
      item:
        'Provide a high-level overview of key model design elements including target population, payment approach, and quality/performance measurement'
    },
    stepThree: {
      heading:
        '3. Preliminary analysis of the proposed model relative to selection criteria',
      italics:
        'Not all of these may be answerable early in model development/consideration',
      alignment: {
        bold: 'Alignment: ',
        text:
          'Describe how the model would advance one (or more) of the strategy refresh pillars, including, as relevant, how it will support strategy refresh drivers at a high level:',
        numberedList: [
          'Drive accountable care',
          'Advance health equity',
          'Support Innovation ',
          'Address affordability ',
          'Partner to achieve system transformation'
        ]
      },
      impact: {
        bold: 'Impact: ',
        text: 'Potential for the model to impact the following dimensions:',
        list: [
          'Participation – number of providers, beneficiaries, Medicare and Medicaid spending',
          'Transformation – cost reduction, quality and outcomes improvements, advancements in equity and reduction in disparities, and delivery system change'
        ]
      },
      feasibility: {
        bold: 'Feasibility: ',
        text:
          'Consider the likelihood of successful execution of the model including initial operational or feasibility limitations, and potential for scaling'
      },
      innovation: {
        bold: 'Innovation: ',
        text:
          'The model provides innovation in a particular dimension – payment approach, provider type, patient population, mechanisms of transformation'
      },
      stakeholders: {
        bold: 'Stakeholders: ',
        text:
          'Include a brief description of any stakeholder engagement in the model concept'
      }
    },
    exampleSummaryBox: {
      heading: 'Example 2-pagers',
      text:
        'While all models are different, and therefore the content within a 2-pager will vary drastically, it might be helpful to see examples of what other teams have put together for their models in the past.',
      list: {
        one: 'AHEAD 2-pager',
        two: 'Enhancing Oncology Model 2-pager',
        three: 'Innovation in Behavioral Health 2-pager',
        four: 'Making Care Primary 2-pager'
      },
      footer: 'To view the links above, you will need access to the ',
      footerLink: 'Model Resources area of SharePoint.'
    }
  },
  additionalResources: {
    intro:
      'This early in the process, it can be hard for model teams to know exactly what they’ll need regarding contractor support during the model concept and design phase. Not sure where to start? Below are some things to consider.',
    subheading: 'Things to consider',
    list: [
      'Do you need an in-house expert on data? ',
      'Do you need help crunching numbers? ',
      'Do you need analytics support?',
      'Do you need help drafting the Innovation Center Investment Proposal (ICIP) or other documents? ',
      'Do you need literature review support? ',
      'Do you need rule-writing support?',
      'Do you need a clinical specialist? ',
      'Do you need help on a specific aspect of your model? '
    ],
    paragraph: [
      'If the answer is yes to one or more of these questions, your model would likely benefit from utilizing a pipeline contractor. CMMI generally has 2 pipeline contractors available (currently MITRE and ARDS have pipeline contracts with CMMI) that can assist model teams with various needs leading up to clearance. It’s important to note, model teams need to get approval from CMMI FO to utilize one of these contractors.',
      'While it is fine to use pipeline support for 2-pager and 6-pager work and for developing ICIP content, after the ICIP clears, model teams can no longer use pipeline funding. It can take a few months to get implementation contractor support, so plan accordingly. Model teams should work with the Division of Central Contracts Services (DCCS), the Division of Systems Support, Operation & Security (DSSOS), and the Office of Acquisition and Grants Management (OAGM) for assistance with contracting needs.'
    ]
  },
  reviewMeeting: {
    intro:
      'After division and group leadership have reviewed and approved the 2-pager and the review meeting with CMMI FO is on the books, you may wonder, ',
    italicsNowWhat: 'now what?',
    subheading: {
      tip: {
        text: 'Tips for the meeting',
        list: [
          'Before the meeting, attach your 2-page concept paper to the calendar invite for your meeting with CMMI FO. We also recommend uploading your concept paper to your Model Plan within MINT.',
          'Come prepared to discuss your model concept.',
          'If you think you’ll need a pipeline contractor, flag this during the meeting. CMMI FO may have a preference for which contractor to use and will ultimately need to approve the request.'
        ]
      },
      outcomes: {
        text: 'Possible outcomes',
        paragraph: [
          'Since the 2-pager meeting is still pretty high level in terms of model design, CMMI FO may have suggestions for the team to iterate on. In this case, model teams may be asked to come back for another 2-pager review after they’ve had time to ideate and address their considerations. Some concepts require multiple rounds of iteration, so don’t be discouraged if your concept isn’t approved the first time around.',
          'If during the meeting CMMI FO decides the model concept is feasible, they will approve the 2-pager. Model teams will then work on ironing out additional details of their model design that will go into their 6-page concept paper. If you haven’t already started filling out a Model Plan within MINT, this would be a great time to do that. Many of the details that will go into the 6-pager concept paper are a part of the Model Plan.'
        ]
      }
    }
  },
  footerSummaryBox: {
    title: 'Need help?',
    body: 'Contact the MINT team at <1>MINTTeam@cms.hhs.gov</1>'
  }
};

export default twoPageMeeting;
