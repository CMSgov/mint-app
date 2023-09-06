export type Flags = {
  hideITLeadExperience: boolean;
  downgradeAssessmentTeam: boolean;
  hideGroupView: boolean;
  shareExportEnabled: boolean;
  helpScoutEnabled: boolean;
};

export type FlagsState = {
  flags: Flags;
  isLoaded: boolean;
  error?: string;
};
