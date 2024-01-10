INSERT INTO plan_beneficiaries(
    id,
    model_plan_id,
    beneficiaries,
    beneficiaries_other,
    beneficiaries_note,
    disease_specific_group,
    treat_dual_elligible_different,
    treat_dual_elligible_different_how,
    treat_dual_elligible_different_note,
    exclude_certain_characteristics,
    exclude_certain_characteristics_criteria,
    exclude_certain_characteristics_note,
    number_people_impacted,
    estimate_confidence,
    confidence_note,
    beneficiary_selection_method,
    beneficiary_selection_other,
    beneficiary_selection_note,
    beneficiary_selection_frequency,
    beneficiary_selection_frequency_continually,
    beneficiary_selection_frequency_other,
    beneficiary_selection_frequency_note,
    beneficiary_overlap,
    beneficiary_overlap_note,
    precedence_rules,
    precedence_rules_yes,
    precedence_rules_no,
    precedence_rules_note,
    created_by,
    modified_by,
    ready_for_review_by,
    ready_for_review_dts,
    ready_for_clearance_by,
    ready_for_clearance_dts,
    status
)
VALUES (
    :id,
    :model_plan_id,
    :beneficiaries,
    :beneficiaries_other,
    :beneficiaries_note,
    :disease_specific_group,
    :treat_dual_elligible_different,
    :treat_dual_elligible_different_how,
    :treat_dual_elligible_different_note,
    :exclude_certain_characteristics,
    :exclude_certain_characteristics_criteria,
    :exclude_certain_characteristics_note,
    :number_people_impacted,
    :estimate_confidence,
    :confidence_note,
    :beneficiary_selection_method,
    :beneficiary_selection_other,
    :beneficiary_selection_note,
    :beneficiary_selection_frequency,
    :beneficiary_selection_frequency_continually,
    :beneficiary_selection_frequency_other,
    :beneficiary_selection_frequency_note,
    :beneficiary_overlap,
    :beneficiary_overlap_note,
    :precedence_rules,
    :precedence_rules_yes,
    :precedence_rules_no,
    :precedence_rules_note,
    :created_by,
    :modified_by,
    :ready_for_review_by,
    :ready_for_review_dts,
    :ready_for_clearance_by,
    :ready_for_clearance_dts,
    :status
)
RETURNING id,
model_plan_id,
beneficiaries,
beneficiaries_other,
beneficiaries_note,
disease_specific_group,
treat_dual_elligible_different,
treat_dual_elligible_different_how,
treat_dual_elligible_different_note,
exclude_certain_characteristics,
exclude_certain_characteristics_criteria,
exclude_certain_characteristics_note,
number_people_impacted,
estimate_confidence,
confidence_note,
beneficiary_selection_method,
beneficiary_selection_other,
beneficiary_selection_note,
beneficiary_selection_frequency,
beneficiary_selection_frequency_continually,
beneficiary_selection_frequency_other,
beneficiary_selection_frequency_note,
beneficiary_overlap,
beneficiary_overlap_note,
precedence_rules,
precedence_rules_yes,
precedence_rules_no,
precedence_rules_note,
created_by,
created_dts,
modified_by,
modified_dts,
ready_for_review_by,
ready_for_review_dts,
ready_for_clearance_by,
ready_for_clearance_dts,
status;
