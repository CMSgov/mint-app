const sixPageMeeting = {
  title: 'How to have a successful 6-pager meeting',
  description:
    'Once CMMI Front Office (FO) approves the 2-page model concept, model teams can begin developing the 6-pager. Use this article to ensure you’re fully prepared for your 6-page concept review meeting with CMMI FO.',
  summaryBox: {
    title: 'Recommendations',
    listItem: {
      create: 'Create your Model Plan within MINT',
      draft: 'Draft your 6-page concept paper',
      determine: 'Determine additional resources needed',
      review: 'The review meeting'
    }
  },
  create: {
    paragraph:
      'If you haven’t already created a Model Plan within MINT, you should start one now. By this point, many of the details of your model concept are beginning to take shape. The operational details in your 6-page concept paper are captured within the Model Plan. Additionally, you will be working with various cross-cutting groups as you plan and refine your model, so it will be helpful to everyone involved if you update your Model Plan as you iterate.'
  },
  startSummaryBox: {
    title: 'Haven’t started a Model Plan yet?',
    body: 'Create a Model Plan now →'
  },
  crossCuttingGroupsSummaryBox: {
    title: 'Cross-cutting groups',
    item: {
      one: 'Business Services Group (BSG) – for feasibility criteria',
      two: 'CMMI Front Office (FO) – for health equity',
      ldg: 'Learning and Diffusion Group (LDG)',
      learning: ' – for learning',
      four:
        'Policy and Programs Group (PPG) – for quality and stakeholder engagement type things',
      five: 'Research and Rapid Cycle Evaluation Group (RREG) – for evaluation'
    }
  },
  tipsSummaryBox: {
    heading: 'Tips to learn more about health equity',
    items: {
      view: 'View the ',
      one: 'Health Equity Resources on the Quality Vertical SharePoint',
      two: 'CMS Framework for Health Equity',
      three: 'Work with CMMI FO'
    }
  },
  conceptPaper: {
    introParagraph:
      'The 6-page model overview should address all relevant elements outlined below and should reflect consultation with the cross-cutting groups listed.',
    stepOne: {
      heading: '1. Model overview and goals',
      items: [
        'Describe the need for the model, the challenges the target population faces, the related cost and quality/outcomes challenges, and any gaps in CMMI’s portfolio this model might address.',
        'Briefly describe the theory of change for the model (i.e., the problem the model is trying to solve and the anticipated impacts the model may have).',
        'Provide information on how this model may interact with other CMMI models.',
        'In addition to the statutory requirements, consider other potential outcomes following the model test (e.g., spread to Medicare, Medicaid or commercial payers, next-generation model, etc.)'
      ]
    },
    stepTwo: {
      heading: '2. Description of model elements',
      item: 'Provide an overview of key model design elements including',
      subitems: [
        'Target population, including underserved populations',
        'Beneficiary attribution or alignment to model',
        'Target provider types, including safety net providers',
        'Participation eligibility requirements for providers or entities',
        'Payment approach, including any precedent for approach (i.e., CMMI, CM, Medicaid, commercial)',
        'Quality/performance measurement(s)'
      ]
    },
    stepThree: {
      heading:
        '3. Analysis of the proposed model relative to selection criteria',
      alignment: {
        bold: 'Alignment: ',
        text:
          'Describe how the proposed model would support or advance one (or more) of the ',
        link: 'strategy refresh pillars',
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
        text: 'The model’s anticipated impact on the following dimensions:',
        list: [
          'Participation – number of providers, percent of providers within relevant specialty, beneficiaries, Medicare spending and/or Medicaid spending (federal and state)',
          'Transformation – reduction in health spending, quality and outcomes improvements, advancements in equity and reduction in disparities, delivery system change, and multi-payer alignment, market impacts '
        ]
      },
      feasibility: {
        bold: 'Feasibility: ',
        text:
          'Likelihood of successful execution of the model including any operations or feasibility limitations and potential for adoption and scaling by non-participants (i.e., spillover effects).'
      },
      innovation: {
        bold: 'Innovation: ',
        text:
          'The model provides innovation in a particular dimension – payment approach, provider type, patient population, mechanisms of transformation'
      }
    },
    stepFour: {
      heading: '4. Impacts and opportunities to advance health equity',
      items: [
        'Provide a brief overview of health disparities, differences in access to care among different populations, and affordability or other challenges related to the proposed model’s target population.',
        'Discuss in greater detail the potential impacts of the models on increasing participation among safety net providers, in closing disparities and addressing gaps in care for historically underserved populations, and contributions to research and improved understanding of health status and needs of underserved populations.'
      ]
    },
    stepFive: {
      heading: '5. Evaluability of the model',
      items: [
        'Discuss the evaluability of the proposed model and general approaches to studying design.',
        'Describe how evaluation could assess progress on CMMI’s strategic pillars and broader transformation metrics.',
        'Discuss the potential for adoption and scaling by non-participants, particularly in light of the likelihood that the evaluation findings would be generalizable.'
      ]
    },
    stepSix: {
      heading: '6. Stakeholder reactions/issues',
      items: [
        'Provide a brief overview of constituencies affected by the model, including those likely to support or voice opposition to or concerns with the proposed model.',
        'Discuss what may be known regarding supporters/partners across the government – CMS, HHS, OMB, DPC, Congress – as well as areas of government that may voice concern with the proposed model.'
      ]
    },
    stepSeven: {
      heading: '7. Operational and financial considerations',
      paragraph:
        'Discuss any details related to possible operational and financial needs, such as:',
      items: [
        'Potential staffing and contractor needs to support model',
        'Overlap issues with existing models and how potential overlap or conflict could be resolved',
        'Opportunity or need for cross-CMMI collaboration and staffing',
        'Legal considerations',
        'Anticipated contracting and technology needs '
      ]
    },

    exampleSummaryBox: {
      heading: 'Example 6-pagers',
      paragraph:
        'While all models are different, and therefore the content within a 6-pager will vary drastically, it might be helpful to see examples of what other teams have put together for their models in the past.',
      items: {
        one: 'AHEAD 6-pager',
        two: 'Enhancing Oncology Model 6-pager',
        three: 'Making Care Primary 6-pager'
      },
      footer: {
        copy: 'To view the links above, you will need access to the ',
        link: 'Model Resources area of SharePoint'
      }
    }
  },
  additionalResources: {
    intro:
      'You may have already spoken with CMMI FO about potential contractor support during the 2-pager meeting. If not, you should generally have a better idea of the support you will need during the model concept and design phase since your 6-pager should also address contractor support. Below are some things to consider.',
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
          'Before the meeting, attach your 6-page concept paper to the calendar invite for your meeting with CMMI FO. We also recommend uploading your concept paper to your Model Plan within MINT.',
          'Come prepared to discuss your model concept.',
          'If you think you’ll need a pipeline contractor, and haven’t already spoken to CMMI FO about this, definitely flag this during the meeting. As mentioned above, they will need to approve the request.',
          'If CMMI FO has not requested many revisions to the 6-pager and approves the forward progress, it might be a good to have thought through a general mock up of a timeframe with proposed approximate dates for ICIP draft, potential clearance, etc.'
        ]
      },
      outcomes: {
        text: 'Possible outcomes',
        paragraph: [
          'CMMI FO may have suggestions for the team to iterate on. In this case, model teams may be asked to come back for another 6-pager review after they’ve had time to ideate and address their considerations. Some concepts require multiple rounds of iteration, so don’t be discouraged if your concept isn’t approved the first time around. Additionally, if CMMI FO determines the concept isn’t a path they’re comfortable exploring, the concept may be shelved.',
          'If during the meeting CMMI FO decides the model concept is feasible, they will approve the 6-pager. Model teams will then continue to refine and solidify aspects of their model and can start writing their ICIP paper. As you work through and refine the details of your model, make sure you’re updating your Model Plan within MINT.'
        ]
      }
    }
  },
  footerSummaryBox: {
    title: 'Need help?',
    body: 'Contact the MINT team at <1>MINTTeam@cms.hhs.gov</1>'
  }
};

export default sixPageMeeting;
