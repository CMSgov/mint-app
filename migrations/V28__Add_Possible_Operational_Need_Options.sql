INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(1, 'Manage Part C/D enrollment', 'MANAGE_CD', 'plan_general_characteristics', 'manage_part_c_d_enrollment', '{true}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(2, 'Review and collect plan bids', 'REV_COL_BIDS', 'plan_general_characteristics', 'collect_plan_bids', '{true}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(3, 'Update the plan’s contract', 'UPDATE_CONTRACT', 'plan_general_characteristics', 'collect_plan_bids', '{true}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(4, 'Advertise the model', 'ADVERTISE_MODEL', 'plan_participants_and_providers', 'recruitment_method', '{LOI, NOFO}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(5, 'Collect, review, and score applications', 'COL_REV_SCORE_APP', 'plan_participants_and_providers', 'selection_method', '{APPLICATION_REVIEW_AND_SCORING_TOOL}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(6, 'Obtain an application support contractor', 'APP_SUPPORT_CON', 'plan_participants_and_providers', 'selection_method', '{APPLICATION_SUPPORT_CONTRACTOR}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(7, 'Communicate with participants', 'COMM_W_PART', 'plan_participants_and_providers', 'communication_method', '{MASS_EMAIL, IT_TOOL}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(8, 'Manage provider overlaps', 'MANAGE_PROV_OVERLAP', 'plan_participants_and_providers', 'provider_overlap', '{YES_NEED_POLICIES, YES_NO_ISSUES}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(9, 'Manage beneficiary overlaps', 'MANAGE_BEN_OVERLAP', 'plan_beneficiaries', 'beneficiary_overlap', '{YES_NEED_POLICIES, YES_NO_ISSUES}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(10, 'Helpdesk support', 'HELPDESK_SUPPORT', 'plan_ops_eval_and_learning', 'helpdesk_use', '{true}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(11, 'IDDOC support', 'IDDOC_SUPPORT', 'plan_ops_eval_and_learning', 'iddoc_support', '{true}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(12, 'Establish a benchmark with participants', 'ESTABLISH_BENCH', 'plan_ops_eval_and_learning', 'benchmark_for_performance', '{YES_RECONCILE, YES_NO_RECONCILE}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(13, 'Process participant appeals', 'PROCESS_PART_APPEALS', 'plan_ops_eval_and_learning', '{appeal_performance, appeal_feedback, appeal_payments, appeal_other, appeal_note}', '{true}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(14, 'Acquire an evaluation contractor', 'ACQUIRE_AN_EVAL_CONT', 'plan_ops_eval_and_learning', 'evaluation_approaches', '{CONTROL_INTERVENTION, COMPARISON_MATCH, INTERRUPTED_TIME, NON_MEDICARE_DATA}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(15, 'Data to monitor the model', 'DATA_TO_MONITOR', 'plan_ops_eval_and_learning', 'data_needed_for_monitoring', '{SITE_VISITS, MEDICARE_CLAIMS, MEDICAID_CLAIMS, ENCOUNTER_DATA, NO_PAY_CLAIMS, QUALITY_CLAIMS_BASED_MEASURES, QUALITY_REPORTED_MEASURES, CLINICAL_DATA, NON_CLINICAL_DATA, NON_MEDICAL_DATA, OTHER}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(16, 'Data to support model evaluation', 'DATA_TO_SUPPORT_EVAL', 'plan_ops_eval_and_learning', 'data_needed_for_monitoring', '{SITE_VISITS, MEDICARE_CLAIMS, MEDICAID_CLAIMS, ENCOUNTER_DATA, NO_PAY_CLAIMS, QUALITY_CLAIMS_BASED_MEASURES, QUALITY_REPORTED_MEASURES, CLINICAL_DATA, NON_CLINICAL_DATA, NON_MEDICAL_DATA, OTHER}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(17, 'Claims-based measures', 'CLAIMS_BASED_MEASURES', 'plan_ops_eval_and_learning', 'data_needed_for_monitoring', '{QUALITY_CLAIMS_BASED_MEASURES}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(18, 'Quality performance scores', 'QUALITY_PERFORMANCE_SCORES', 'plan_ops_eval_and_learning', 'data_needed_for_monitoring', '{QUALITY_REPORTED_MEASURES}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(19, 'Send reports/data to participants', 'SEND_REPDATA_TO_PART', 'plan_ops_eval_and_learning', 'data_to_send_particicipants', '{BASELINE_HISTORICAL_DATA, CLAIMS_LEVEL_DATA, BENEFICIARY_LEVEL_DATA, PARTICIPANT_LEVEL_DATA, PROVIDER_LEVEL_DATA, OTHER_MIPS_DATA}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(20, 'Acquire a learning contractor', 'ACQUIRE_A_LEARN_CONT', 'plan_ops_eval_and_learning', 'model_learning_systems', '{LEARNING_CONTRACTOR}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(21, 'Participant-to-participant collaboration', 'PART_TO_PART_COLLAB', 'plan_ops_eval_and_learning', 'model_learning_systems', '{PARTICIPANT_COLLABORATION}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(22, 'Educate beneficiaries', 'EDUCATE_BENEF', 'plan_ops_eval_and_learning', 'model_learning_systems', '{EDUCATE_BENEFICIARIES}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(23, 'Adjust how FFS claims are paid', 'ADJUST_FFS_CLAIMS', 'plan_payments', 'pay_type', '{CLAIMS_BASED_PAYMENTS}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(24, 'Manage FFS excluded payments', 'MANAGE_FFS_EXCL_PAYMENTS', 'plan_payments', 'should_any_providers_excluded_ffs_systems', '{true}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(25, 'Make non-claims based payments', 'MAKE_NON_CLAIMS_BASED_PAYMENTS', 'plan_payments', 'pay_type', '{NON_CLAIMS_BASED_PAYMENTS}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(26, 'Compute shared savings payment', 'COMPUTE_SHARED_SAVINGS_PAYMENT', 'plan_payments', 'non_claims_payments', '{SHARED_SAVINGS}', 'MINT');
INSERT INTO "public"."possible_operational_need"("id", "need_name", "need_key", "trigger_table", "trigger_col", "trigger_vals", "created_by") VALUES(27, 'Recover payments', 'RECOVER_PAYMENTS', 'plan_payments', 'will_recover_payments', '{true}', 'MINT');
