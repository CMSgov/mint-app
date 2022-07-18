UPDATE plan_beneficiaries
SET
    beneficiaries = :beneficiaries,
    beneficiaries_other = :beneficiaries_other,
    beneficiaries_note = :beneficiaries_note,
    treat_dual_elligible_different = :treat_dual_elligible_different,
    treat_dual_elligible_different_how = :treat_dual_elligible_different_how,
    treat_dual_elligible_different_note = :treat_dual_elligible_different_note,
    exclude_certain_characteristics = :exclude_certain_characteristics,
    exclude_certain_characteristics_criteria = :exclude_certain_characteristics_criteria,
    exclude_certain_characteristics_note = :exclude_certain_characteristics_note,
    number_people_impacted = :number_people_impacted,
    estimate_confidence = :estimate_confidence,
    confidence_note = :confidence_note,
    beneficiary_selection_method = :beneficiary_selection_method,
    beneficiary_selection_other = :beneficiary_selection_other,
    beneficiary_selection_note = :beneficiary_selection_note,
    beneficiary_selection_frequency = :beneficiary_selection_frequency,
    beneficiary_selection_frequency_other = :beneficiary_selection_frequency_other,
    beneficiary_selection_frequency_note = :beneficiary_selection_frequency_note,
    beneficiary_overlap = :beneficiary_overlap,
    beneficiary_overlap_note = :beneficiary_overlap_note,
    precedence_rules = :precedence_rules,
    modified_by = :modified_by,
    modified_dts = CURRENT_TIMESTAMP,
    status = :status
WHERE plan_beneficiaries.id = :id
RETURNING id,
model_plan_id,
beneficiaries,
beneficiaries_other,
beneficiaries_note,
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
beneficiary_selection_frequency_other,
beneficiary_selection_frequency_note,
beneficiary_overlap,
beneficiary_overlap_note,
precedence_rules,
created_by,
created_dts,
modified_by,
modified_dts,
ready_for_review_by,
ready_for_review_dts,
status;
