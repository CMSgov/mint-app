--
-- PostgreSQL database dump
--

-- Dumped from database version 11.12 (Debian 11.12-1.pgdg90+1)
-- Dumped by pg_dump version 14.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: agency_or_state_help_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.agency_or_state_help_type AS ENUM (
    'YES_STATE',
    'YES_AGENCY_IDEAS',
    'YES_AGENCY_IAA',
    'NO',
    'OTHER'
);


ALTER TYPE public.agency_or_state_help_type OWNER TO postgres;

--
-- Name: agreement_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.agreement_type AS ENUM (
    'PARTICIPATION',
    'COOPERATIVE',
    'OTHER'
);


ALTER TYPE public.agreement_type OWNER TO postgres;

--
-- Name: alternative_payment_model_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.alternative_payment_model_type AS ENUM (
    'REGULAR',
    'MIPS',
    'ADVANCED'
);


ALTER TYPE public.alternative_payment_model_type OWNER TO postgres;

--
-- Name: authority_allowance; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.authority_allowance AS ENUM (
    'ACA',
    'CONGRESSIONALLY_MANDATED',
    'SSA_PART_B',
    'OTHER'
);


ALTER TYPE public.authority_allowance OWNER TO postgres;

--
-- Name: b_manage_beneficiary_overlap_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.b_manage_beneficiary_overlap_type AS ENUM (
    'MDM',
    'OTHER',
    'NA'
);


ALTER TYPE public.b_manage_beneficiary_overlap_type OWNER TO postgres;

--
-- Name: benchmark_for_performance_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.benchmark_for_performance_type AS ENUM (
    'YES_RECONCILE',
    'YES_NO_RECONCILE',
    'NO'
);


ALTER TYPE public.benchmark_for_performance_type OWNER TO postgres;

--
-- Name: beneficiaries_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.beneficiaries_type AS ENUM (
    'MEDICARE_FFS',
    'MEDICARE_ADVANTAGE',
    'MEDICARE_PART_D',
    'MEDICAID',
    'DUALLY_ELIGIBLE',
    'DISEASE_SPECIFIC',
    'OTHER',
    'NA'
);


ALTER TYPE public.beneficiaries_type OWNER TO postgres;

--
-- Name: ccm_involvment_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.ccm_involvment_type AS ENUM (
    'YES_EVALUATION',
    'YES__IMPLEMENTATION',
    'NO',
    'OTHER'
);


ALTER TYPE public.ccm_involvment_type OWNER TO postgres;

--
-- Name: cmmi_group; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.cmmi_group AS ENUM (
    'PATIENT_CARE_MODELS_GROUP',
    'POLICY_AND_PROGRAMS_GROUP',
    'PREVENTIVE_AND_POPULATION_HEALTH_CARE_MODELS_GROUP',
    'SEAMLESS_CARE_MODELS_GROUP',
    'STATE_INNOVATIONS_GROUP',
    'TBD'
);


ALTER TYPE public.cmmi_group OWNER TO postgres;

--
-- Name: cms_center; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.cms_center AS ENUM (
    'CMMI',
    'CENTER_FOR_MEDICARE',
    'FEDERAL_COORDINATED_HEALTH_CARE_OFFICE',
    'CENTER_FOR_CLINICAL_STANDARDS_AND_QUALITY',
    'CENTER_FOR_PROGRAM_INTEGRITY',
    'OTHER'
);


ALTER TYPE public.cms_center OWNER TO postgres;

--
-- Name: confidence_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.confidence_type AS ENUM (
    'NOT_AT_ALL',
    'SLIGHTLY',
    'FAIRLY',
    'COMPLETELY'
);


ALTER TYPE public.confidence_type OWNER TO postgres;

--
-- Name: contractor_support_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.contractor_support_type AS ENUM (
    'ONE',
    'MULTIPLE',
    'NONE',
    'OTHER'
);


ALTER TYPE public.contractor_support_type OWNER TO postgres;

--
-- Name: data_for_monitoring_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.data_for_monitoring_type AS ENUM (
    'SITE_VISITS',
    'MEDICARE_CLAIMS',
    'MEDICAID_CLAIMS',
    'ENCOUNTER_DATA',
    'NO_PAY_CLAIMS',
    'QUALITY_CLAIMS_BASED_MEASURES',
    'QUALITY_REPORTED_MEASURES',
    'CLINICAL_DATA',
    'NON_CLINICAL_DATA',
    'NON_MEDICAL_DATA',
    'OTHER',
    'NOT_PLANNING_TO_COLLECT_DATA'
);


ALTER TYPE public.data_for_monitoring_type OWNER TO postgres;

--
-- Name: data_frequency_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.data_frequency_type AS ENUM (
    'ANNUALLY',
    'BIANNUALLY',
    'QUARTERLY',
    'MONTHLY',
    'SEMI_MONTHLY',
    'WEEKLY',
    'DAILY',
    'OTHER',
    'NOT_PLANNING_TO_DO_THIS'
);


ALTER TYPE public.data_frequency_type OWNER TO postgres;

--
-- Name: data_full_time_or_incremental_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.data_full_time_or_incremental_type AS ENUM (
    'FULL_TIME',
    'INCREMENTAL'
);


ALTER TYPE public.data_full_time_or_incremental_type OWNER TO postgres;

--
-- Name: data_starts_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.data_starts_type AS ENUM (
    'DURING_APPLICATION_PERIOD',
    'SHORTLY_BEFORE_THE_START_DATE',
    'EARLY_IN_THE_FIRST_PERFORMANCE_YEAR',
    'LATER_IN_THE_FIRST_PERFORMANCE_YEAR',
    'IN_THE_SUBSEQUENT_PERFORMANCE_YEAR',
    'AT_SOME_OTHER_POINT_IN_TIME',
    'NOT_PLANNING_TO_DO_THIS',
    'OTHER'
);


ALTER TYPE public.data_starts_type OWNER TO postgres;

--
-- Name: data_to_send_participants_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.data_to_send_participants_type AS ENUM (
    'BASELINE_HISTORICAL_DATA',
    'CLAIMS_LEVEL_DATA',
    'BENEFICIARY_LEVEL_DATA',
    'PARTICIPANT_LEVEL_DATA',
    'PROVIDER_LEVEL_DATA',
    'OTHER_MIPS_DATA',
    'NOT_PLANNING_TO_SEND_DATA'
);


ALTER TYPE public.data_to_send_participants_type OWNER TO postgres;

--
-- Name: discussion_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.discussion_status AS ENUM (
    'ANSWERED',
    'WAITING_FOR_RESPONSE',
    'UNANSWERED'
);


ALTER TYPE public.discussion_status OWNER TO postgres;

--
-- Name: document_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.document_type AS ENUM (
    'CONCEPT_PAPER',
    'POLICY_PAPER',
    'ICIP_DRAFT',
    'MARKET_RESEARCH',
    'OTHER'
);


ALTER TYPE public.document_type OWNER TO postgres;

--
-- Name: eua_id; Type: DOMAIN; Schema: public; Owner: postgres
--

CREATE DOMAIN public.eua_id AS text
	CONSTRAINT check_valid_eua_id CHECK ((VALUE ~ '^[A-Z0-9]{4}$'::text));


ALTER DOMAIN public.eua_id OWNER TO postgres;

--
-- Name: evaluation_approach_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.evaluation_approach_type AS ENUM (
    'CONTROL_INTERVENTION',
    'COMPARISON_MATCH',
    'INTERRUPTED_TIME',
    'NON_MEDICARE_DATA',
    'OTHER'
);


ALTER TYPE public.evaluation_approach_type OWNER TO postgres;

--
-- Name: frequency_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.frequency_type AS ENUM (
    'ANNUALLY',
    'BIANNUALLY',
    'QUARTERLY',
    'MONTHLY',
    'ROLLING',
    'OTHER'
);


ALTER TYPE public.frequency_type OWNER TO postgres;

--
-- Name: gc_collect_bids_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.gc_collect_bids_type AS ENUM (
    'HPMS',
    'OTHER'
);


ALTER TYPE public.gc_collect_bids_type OWNER TO postgres;

--
-- Name: gc_part_c_d_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.gc_part_c_d_type AS ENUM (
    'MARX',
    'OTHER'
);


ALTER TYPE public.gc_part_c_d_type OWNER TO postgres;

--
-- Name: gc_update_contract_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.gc_update_contract_type AS ENUM (
    'HPMS',
    'OTHER'
);


ALTER TYPE public.gc_update_contract_type OWNER TO postgres;

--
-- Name: geography_application; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.geography_application AS ENUM (
    'PARTICIPANTS',
    'PROVIDERS',
    'BENEFICIARIES',
    'OTHER'
);


ALTER TYPE public.geography_application OWNER TO postgres;

--
-- Name: geography_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.geography_type AS ENUM (
    'STATE',
    'REGION',
    'OTHER'
);


ALTER TYPE public.geography_type OWNER TO postgres;

--
-- Name: key_characteristic; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.key_characteristic AS ENUM (
    'EPISODE_BASED',
    'PART_C',
    'PART_D',
    'PAYMENT',
    'POPULATION_BASED',
    'PREVENTATIVE',
    'SERVICE_DELIVERY',
    'SHARED_SAVINGS',
    'OTHER'
);


ALTER TYPE public.key_characteristic OWNER TO postgres;

--
-- Name: model_category; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.model_category AS ENUM (
    'ACCOUNTABLE_CARE',
    'DEMONSTRATION',
    'EPISODE_BASED_PAYMENT_INITIATIVES',
    'INIT_MEDICAID_CHIP_POP',
    'INIT__MEDICARE_MEDICAID_ENROLLEES',
    'INIT_ACCEL_DEV_AND_TEST',
    'INIT_SPEED_ADOPT_BEST_PRACTICE',
    'PRIMARY_CARE_TRANSFORMATION',
    'UNKNOWN'
);


ALTER TYPE public.model_category OWNER TO postgres;

--
-- Name: model_learning_system_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.model_learning_system_type AS ENUM (
    'LEARNING_CONTRACTOR',
    'IT_PLATFORM_CONNECT',
    'PARTICIPANT_COLLABORATION',
    'EDUCATE_BENEFICIARIES',
    'OTHER',
    'NO_LEARNING_SYSTEM'
);


ALTER TYPE public.model_learning_system_type OWNER TO postgres;

--
-- Name: model_plan_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.model_plan_status AS ENUM (
    'PLAN_DRAFT',
    'PLAN_COMPLETE',
    'ICIP_COMPLETE',
    'INTERNAL_CMMI_CLEARANCE',
    'CMS_CLEARANCE',
    'HHS_CLEARANCE',
    'OMB_ASRF_CLEARANCE',
    'CLEARED',
    'ANNOUNCED'
);


ALTER TYPE public.model_plan_status OWNER TO postgres;

--
-- Name: model_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.model_type AS ENUM (
    'VOLUNTARY',
    'MANDATORY',
    'TBD'
);


ALTER TYPE public.model_type OWNER TO postgres;

--
-- Name: monitoring_file_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.monitoring_file_type AS ENUM (
    'BENEFICIARY',
    'PROVIDER',
    'PART_A',
    'PART_B',
    'OTHER'
);


ALTER TYPE public.monitoring_file_type OWNER TO postgres;

--
-- Name: oel_claims_based_measures_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.oel_claims_based_measures_type AS ENUM (
    'IDR',
    'CCW',
    'OTHER'
);


ALTER TYPE public.oel_claims_based_measures_type OWNER TO postgres;

--
-- Name: oel_collect_data_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.oel_collect_data_type AS ENUM (
    'IDR',
    'CCW',
    'IDOS',
    'ISP',
    'CONTRACTOR',
    'OTHER'
);


ALTER TYPE public.oel_collect_data_type OWNER TO postgres;

--
-- Name: oel_educate_beneficiaries_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.oel_educate_beneficiaries_type AS ENUM (
    'OC',
    'OTHER'
);


ALTER TYPE public.oel_educate_beneficiaries_type OWNER TO postgres;

--
-- Name: oel_evaluation_contractor_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.oel_evaluation_contractor_type AS ENUM (
    'RMDA',
    'OTHER'
);


ALTER TYPE public.oel_evaluation_contractor_type OWNER TO postgres;

--
-- Name: oel_helpdesk_support_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.oel_helpdesk_support_type AS ENUM (
    'CBOSC',
    'CONTRACTOR',
    'OTHER'
);


ALTER TYPE public.oel_helpdesk_support_type OWNER TO postgres;

--
-- Name: oel_learning_contractor_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.oel_learning_contractor_type AS ENUM (
    'RMADA',
    'CROSS_MODEL_CONTRACT',
    'OTHER'
);


ALTER TYPE public.oel_learning_contractor_type OWNER TO postgres;

--
-- Name: oel_manage_aco_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.oel_manage_aco_type AS ENUM (
    'ACO_OS',
    'ACO_UI',
    'INNOVATION',
    'OTHER'
);


ALTER TYPE public.oel_manage_aco_type OWNER TO postgres;

--
-- Name: oel_obtain_data_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.oel_obtain_data_type AS ENUM (
    'CCW',
    'IDOS',
    'ISP',
    'OTHER'
);


ALTER TYPE public.oel_obtain_data_type OWNER TO postgres;

--
-- Name: oel_participant_collaboration_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.oel_participant_collaboration_type AS ENUM (
    'CONNECT',
    'OTHER'
);


ALTER TYPE public.oel_participant_collaboration_type OWNER TO postgres;

--
-- Name: oel_performance_benchmark_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.oel_performance_benchmark_type AS ENUM (
    'IDR',
    'CCW',
    'OTHER'
);


ALTER TYPE public.oel_performance_benchmark_type OWNER TO postgres;

--
-- Name: oel_process_appeals_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.oel_process_appeals_type AS ENUM (
    'MEDICARE_APPEAL_SYSTEM',
    'OTHER'
);


ALTER TYPE public.oel_process_appeals_type OWNER TO postgres;

--
-- Name: oel_quality_scores_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.oel_quality_scores_type AS ENUM (
    'EXISTING_DATA_AND_PROCESS',
    'NEW_DATA_AND_CMMI_PROCESS',
    'OTHER',
    'NONE'
);


ALTER TYPE public.oel_quality_scores_type OWNER TO postgres;

--
-- Name: oel_send_reports_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.oel_send_reports_type AS ENUM (
    'IDOS',
    'RMADA',
    'INTERNAL_STAFF',
    'OTHER'
);


ALTER TYPE public.oel_send_reports_type OWNER TO postgres;

--
-- Name: overlap_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.overlap_type AS ENUM (
    'YES_NEED_POLICIES',
    'YES_NO_ISSUES',
    'NO'
);


ALTER TYPE public.overlap_type OWNER TO postgres;

--
-- Name: p_inform_ffs_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.p_inform_ffs_type AS ENUM (
    'FFS_COMPETENCY_CENTER',
    'OTHER'
);


ALTER TYPE public.p_inform_ffs_type OWNER TO postgres;

--
-- Name: p_make_claims_payments_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.p_make_claims_payments_type AS ENUM (
    'SHARED_SYSTEMS',
    'HIGLAS',
    'OTHER'
);


ALTER TYPE public.p_make_claims_payments_type OWNER TO postgres;

--
-- Name: p_non_claims_based_payments_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.p_non_claims_based_payments_type AS ENUM (
    'APPS',
    'HIGLAS',
    'IPC',
    'MAC',
    'OTHER'
);


ALTER TYPE public.p_non_claims_based_payments_type OWNER TO postgres;

--
-- Name: p_recover_payments_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.p_recover_payments_type AS ENUM (
    'APPS',
    'IPC',
    'MAC',
    'OTHER'
);


ALTER TYPE public.p_recover_payments_type OWNER TO postgres;

--
-- Name: p_shared_savings_plan_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.p_shared_savings_plan_type AS ENUM (
    'RMADA',
    'OTHER'
);


ALTER TYPE public.p_shared_savings_plan_type OWNER TO postgres;

--
-- Name: participant_communication_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.participant_communication_type AS ENUM (
    'MASS_EMAIL',
    'IT_TOOL',
    'OTHER',
    'NO_COMMUNICATION'
);


ALTER TYPE public.participant_communication_type OWNER TO postgres;

--
-- Name: participant_risk_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.participant_risk_type AS ENUM (
    'TWO_SIDED',
    'ONE_SIDED',
    'CAPITATION',
    'OTHER'
);


ALTER TYPE public.participant_risk_type OWNER TO postgres;

--
-- Name: participant_selection_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.participant_selection_type AS ENUM (
    'MODEL_TEAM_REVIEW_APPLICATIONS',
    'SUPPORT_FROM_CMMI',
    'CMS_COMPONENT_OR_PROCESS',
    'APPLICATION_REVIEW_AND_SCORING_TOOL',
    'APPLICATION_SUPPORT_CONTRACTOR',
    'BASIC_CRITERIA',
    'OTHER',
    'NO_SELECTING_PARTICIPANTS'
);


ALTER TYPE public.participant_selection_type OWNER TO postgres;

--
-- Name: participants_id_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.participants_id_type AS ENUM (
    'TINS',
    'NPIS',
    'CCNS',
    'OTHER',
    'NO_IDENTIFIERS'
);


ALTER TYPE public.participants_id_type OWNER TO postgres;

--
-- Name: participants_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.participants_type AS ENUM (
    'MEDICARE_PROVIDERS',
    'ENTITIES',
    'CONVENER',
    'MEDICARE_ADVANTAGE_PLANS',
    'STANDALONE_PART_D_PLANS',
    'MEDICARE_ADVANTAGE_PRESCRIPTION_DRUG_PLANS',
    'STATE_MEDICAID_AGENCIES',
    'MEDICAID_MANAGED_CARE_ORGANIZATIONS',
    'MEDICAID_PROVIDERS',
    'STATES',
    'COMMUNITY_BASED_ORGANIZATIONS',
    'NON_PROFIT_ORGANIZATIONS',
    'COMMERCIAL_PAYERS',
    'OTHER'
);


ALTER TYPE public.participants_type OWNER TO postgres;

--
-- Name: pp_anticipated_payment_frequency_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.pp_anticipated_payment_frequency_type AS ENUM (
    'ANNUALLY',
    'BIANNUALLY',
    'QUARTERLY',
    'MONTHLY',
    'SEMI-MONTHLY',
    'WEEKLY',
    'DAILY',
    'OTHER'
);


ALTER TYPE public.pp_anticipated_payment_frequency_type OWNER TO postgres;

--
-- Name: pp_app_support_contractor_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.pp_app_support_contractor_type AS ENUM (
    'RMDA',
    'OTHER'
);


ALTER TYPE public.pp_app_support_contractor_type OWNER TO postgres;

--
-- Name: pp_claims_based_pay_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.pp_claims_based_pay_type AS ENUM (
    'ADJUSTMENTS_TO_FFS_PAYMENTS',
    'CARE_MANAGEMENT_HOME_VISITS',
    'SNF_CLAIMS_WITHOUT_3DAY_HOSPITAL_ADMISSIONS',
    'TELEHEALTH_SERVICES_NOT_TRADITIONAL_MEDICARE',
    'OTHER'
);


ALTER TYPE public.pp_claims_based_pay_type OWNER TO postgres;

--
-- Name: pp_collect_score_review_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.pp_collect_score_review_type AS ENUM (
    'RFA',
    'ARS',
    'GRANT_SOLUTIONS',
    'OTHER'
);


ALTER TYPE public.pp_collect_score_review_type OWNER TO postgres;

--
-- Name: pp_communicate_with_participant_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.pp_communicate_with_participant_type AS ENUM (
    'OUTLOOK_MAILBOX',
    'GOV_DELIVERY',
    'SALESFORCE_PORTAL',
    'OTHER'
);


ALTER TYPE public.pp_communicate_with_participant_type OWNER TO postgres;

--
-- Name: pp_complexity_calculation_level_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.pp_complexity_calculation_level_type AS ENUM (
    'LOW',
    'MIDDLE',
    'HIGH'
);


ALTER TYPE public.pp_complexity_calculation_level_type OWNER TO postgres;

--
-- Name: pp_funding_source; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.pp_funding_source AS ENUM (
    'PATIENT_PROTECTION_AFFORDABLE_CARE_ACT',
    'TRUST_FUND',
    'OTHER'
);


ALTER TYPE public.pp_funding_source OWNER TO postgres;

--
-- Name: pp_manage_provider_overlap_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.pp_manage_provider_overlap_type AS ENUM (
    'MDM',
    'OTHER',
    'NA'
);


ALTER TYPE public.pp_manage_provider_overlap_type OWNER TO postgres;

--
-- Name: pp_non_claim_based_payment_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.pp_non_claim_based_payment_type AS ENUM (
    'ADVANCED_PAYMENT',
    'BUNDLED_EPISODE_OF_CARE',
    'CAPITATION_POPULATION_BASED_FULL',
    'CAPITATION_POPULATION_BASED_PARTIAL',
    'CARE_COORDINATION_MANAGEMENT_FEE',
    'GLOBAL_BUDGET',
    'GRANTS',
    'INCENTIVE_PAYMENT',
    'MAPD_SHARED_SAVINGS',
    'SHARED_SAVINGS',
    'OTHER'
);


ALTER TYPE public.pp_non_claim_based_payment_type OWNER TO postgres;

--
-- Name: pp_pay_recipient; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.pp_pay_recipient AS ENUM (
    'PROVIDERS',
    'BENEFICIARIES',
    'PARTICIPANTS',
    'STATES',
    'OTHER'
);


ALTER TYPE public.pp_pay_recipient OWNER TO postgres;

--
-- Name: pp_pay_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.pp_pay_type AS ENUM (
    'CLAIMS_BASED_PAYMENTS',
    'NON_CLAIMS_BASED_PAYMENTS',
    'GRANTS'
);


ALTER TYPE public.pp_pay_type OWNER TO postgres;

--
-- Name: pp_to_advertise_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.pp_to_advertise_type AS ENUM (
    'SALESFORCE',
    'GRANT_SOLUTIONS',
    'OTHER'
);


ALTER TYPE public.pp_to_advertise_type OWNER TO postgres;

--
-- Name: provider_add_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.provider_add_type AS ENUM (
    'PROSPECTIVELY',
    'RETROSPECTIVELY',
    'VOLUNTARILY',
    'MANDATORILY',
    'ONLINE_TOOLS',
    'OTHER',
    'NA'
);


ALTER TYPE public.provider_add_type OWNER TO postgres;

--
-- Name: provider_leave_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.provider_leave_type AS ENUM (
    'VOLUNTARILY_WITHOUT_IMPLICATIONS',
    'AFTER_A_CERTAIN_WITH_IMPLICATIONS',
    'VARIES_BY_TYPE_OF_PROVIDER',
    'NOT_ALLOWED_TO_LEAVE',
    'OTHER',
    'NOT_APPLICABLE'
);


ALTER TYPE public.provider_leave_type OWNER TO postgres;

--
-- Name: recruitment_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.recruitment_type AS ENUM (
    'LOI',
    'RFA',
    'NOFO',
    'OTHER',
    'NA'
);


ALTER TYPE public.recruitment_type OWNER TO postgres;

--
-- Name: selection_method_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.selection_method_type AS ENUM (
    'HISTORICAL',
    'PROSPECTIVE',
    'RETROSPECTIVE',
    'VOLUNTARY',
    'PROVIDER_SIGN_UP',
    'OTHER',
    'NA'
);


ALTER TYPE public.selection_method_type OWNER TO postgres;

--
-- Name: stakeholders_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.stakeholders_type AS ENUM (
    'BENEFICIARIES',
    'COMMUNITY_ORGANIZATIONS',
    'PARTICIPANTS',
    'PROFESSIONAL_ORGANIZATIONS',
    'PROVIDERS',
    'STATES',
    'OTHER'
);


ALTER TYPE public.stakeholders_type OWNER TO postgres;

--
-- Name: task_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.task_status AS ENUM (
    'READY',
    'IN_PROGRESS',
    'COMPLETE'
);


ALTER TYPE public.task_status OWNER TO postgres;

--
-- Name: team_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.team_role AS ENUM (
    'MODEL_LEAD',
    'MODEL_TEAM',
    'LEADERSHIP',
    'LEARNING',
    'EVALUATION'
);


ALTER TYPE public.team_role OWNER TO postgres;

--
-- Name: tri_state_answer; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.tri_state_answer AS ENUM (
    'YES',
    'NO',
    'TBD'
);


ALTER TYPE public.tri_state_answer OWNER TO postgres;

--
-- Name: waiver_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.waiver_type AS ENUM (
    'FRAUD_ABUSE',
    'PROGRAM_PAYMENT',
    'MEDICAID'
);


ALTER TYPE public.waiver_type OWNER TO postgres;

--
-- Name: zero_string; Type: DOMAIN; Schema: public; Owner: postgres
--

CREATE DOMAIN public.zero_string AS text
	CONSTRAINT zero_string_check CHECK ((length(VALUE) > 0));


ALTER DOMAIN public.zero_string OWNER TO postgres;

--
-- Name: collaborator_role_check_trigger(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.collaborator_role_check_trigger() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- This is used in a before trigger, so we say <2 to check the existing count
    -- before allowing the change, vs making the change and rolling back
    IF (
        SELECT count(*)
        FROM plan_collaborator
        WHERE team_role = 'MODEL_LEAD' and model_plan_id = OLD.model_plan_id 
    ) <2 THEN
        RAISE EXCEPTION 'There must be at least one MODEL_LEAD assigned to each model plan';
    END IF;
    IF (TG_OP = 'DELETE') THEN
        RETURN OLD;
    ELSE
        RETURN NEW;
    END IF;
END
$$;


ALTER FUNCTION public.collaborator_role_check_trigger() OWNER TO postgres;

SET default_tablespace = '';

--
-- Name: discussion_reply; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.discussion_reply (
    id uuid NOT NULL,
    discussion_id uuid NOT NULL,
    content public.zero_string NOT NULL,
    resolution boolean NOT NULL,
    created_by public.eua_id NOT NULL,
    created_dts timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_by public.eua_id,
    modified_dts timestamp with time zone
);


ALTER TABLE public.discussion_reply OWNER TO postgres;

--
-- Name: model_plan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.model_plan (
    id uuid NOT NULL,
    model_name public.zero_string NOT NULL,
    model_category public.model_category,
    cms_centers public.cms_center[],
    cms_other public.zero_string,
    cmmi_groups public.cmmi_group[],
    archived boolean DEFAULT false NOT NULL,
    status public.model_plan_status NOT NULL,
    created_by public.eua_id NOT NULL,
    created_dts timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_by public.eua_id,
    modified_dts timestamp with time zone
);


ALTER TABLE public.model_plan OWNER TO postgres;

--
-- Name: plan_basics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan_basics (
    id uuid NOT NULL,
    model_plan_id uuid NOT NULL,
    model_type public.model_type,
    problem public.zero_string,
    goal public.zero_string,
    test_interventions public.zero_string,
    note public.zero_string,
    created_by public.eua_id NOT NULL,
    created_dts timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_by public.eua_id,
    modified_dts timestamp with time zone,
    status public.task_status DEFAULT 'READY'::public.task_status NOT NULL
);


ALTER TABLE public.plan_basics OWNER TO postgres;

--
-- Name: plan_beneficiaries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan_beneficiaries (
    id uuid NOT NULL,
    model_plan_id uuid NOT NULL,
    beneficiaries public.beneficiaries_type[],
    beneficiaries_other public.zero_string,
    beneficiaries_note public.zero_string,
    treat_dual_elligible_different public.tri_state_answer,
    treat_dual_elligible_different_how public.zero_string,
    treat_dual_elligible_different_note public.zero_string,
    exclude_certain_characteristics public.tri_state_answer,
    exclude_certain_characteristics_criteria public.zero_string,
    exclude_certain_characteristics_note public.zero_string,
    number_people_impacted integer,
    estimate_confidence public.confidence_type,
    confidence_note public.zero_string,
    beneficiary_selection_method public.selection_method_type[],
    beneficiary_selection_other public.zero_string,
    beneficiary_selection_note public.zero_string,
    beneficiary_selection_frequency public.frequency_type,
    beneficiary_selection_frequency_other public.zero_string,
    beneficiary_selection_frequency_note public.zero_string,
    beneficiary_overlap public.overlap_type,
    beneficiary_overlap_note public.zero_string,
    precedence_rules public.zero_string,
    created_by public.eua_id NOT NULL,
    created_dts timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_by public.eua_id,
    modified_dts timestamp with time zone,
    status public.task_status DEFAULT 'READY'::public.task_status NOT NULL
);


ALTER TABLE public.plan_beneficiaries OWNER TO postgres;

--
-- Name: plan_collaborator; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan_collaborator (
    id uuid NOT NULL,
    model_plan_id uuid NOT NULL,
    eua_user_id public.eua_id NOT NULL,
    full_name public.zero_string NOT NULL,
    team_role public.team_role NOT NULL,
    created_by public.eua_id NOT NULL,
    created_dts timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_by public.eua_id,
    modified_dts timestamp with time zone
);


ALTER TABLE public.plan_collaborator OWNER TO postgres;

--
-- Name: plan_discussion; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan_discussion (
    id uuid NOT NULL,
    model_plan_id uuid NOT NULL,
    content public.zero_string NOT NULL,
    status public.discussion_status DEFAULT 'UNANSWERED'::public.discussion_status NOT NULL,
    created_by public.eua_id NOT NULL,
    created_dts timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_by public.eua_id,
    modified_dts timestamp with time zone
);


ALTER TABLE public.plan_discussion OWNER TO postgres;

--
-- Name: plan_document; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan_document (
    id uuid NOT NULL,
    model_plan_id uuid NOT NULL,
    file_type public.zero_string NOT NULL,
    bucket public.zero_string NOT NULL,
    file_key public.zero_string NOT NULL,
    virus_scanned boolean NOT NULL,
    virus_clean boolean NOT NULL,
    file_name public.zero_string NOT NULL,
    file_size integer NOT NULL,
    document_type public.document_type NOT NULL,
    other_type public.zero_string,
    optional_notes public.zero_string,
    deleted_at timestamp with time zone,
    created_by public.eua_id NOT NULL,
    created_dts timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_by public.eua_id,
    modified_dts timestamp with time zone
);


ALTER TABLE public.plan_document OWNER TO postgres;

--
-- Name: plan_general_characteristics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan_general_characteristics (
    id uuid NOT NULL,
    model_plan_id uuid NOT NULL,
    is_new_model boolean,
    existing_model public.zero_string,
    resembles_existing_model boolean,
    resembles_existing_model_which public.zero_string[],
    resembles_existing_model_how public.zero_string,
    resembles_existing_model_note public.zero_string,
    has_components_or_tracks boolean,
    has_components_or_tracks_differ public.zero_string,
    has_components_or_tracks_note public.zero_string,
    alternative_payment_model boolean,
    alternative_payment_model_types public.alternative_payment_model_type[],
    alternative_payment_model_note public.zero_string,
    key_characteristics public.key_characteristic[],
    key_characteristics_other public.zero_string,
    key_characteristics_note public.zero_string,
    collect_plan_bids boolean,
    collect_plan_bids_note public.zero_string,
    manage_part_c_d_enrollment boolean,
    manage_part_c_d_enrollment_note public.zero_string,
    plan_contact_updated boolean,
    plan_contact_updated_note public.zero_string,
    care_coordination_involved boolean,
    care_coordination_involved_description public.zero_string,
    care_coordination_involved_note public.zero_string,
    additional_services_involved boolean,
    additional_services_involved_description public.zero_string,
    additional_services_involved_note public.zero_string,
    community_partners_involved boolean,
    community_partners_involved_description public.zero_string,
    community_partners_involved_note public.zero_string,
    geographies_targeted boolean,
    geographies_targeted_types public.geography_type[],
    geographies_targeted_types_other public.zero_string,
    geographies_targeted_applied_to public.geography_application[],
    geographies_targeted_applied_to_other public.zero_string,
    geographies_targeted_note public.zero_string,
    participation_options boolean,
    participation_options_note public.zero_string,
    agreement_types public.agreement_type[],
    agreement_types_other public.zero_string,
    multiple_patricipation_agreements_needed boolean,
    multiple_patricipation_agreements_needed_note public.zero_string,
    rulemaking_required boolean,
    rulemaking_required_description public.zero_string,
    rulemaking_required_note public.zero_string,
    authority_allowances public.authority_allowance[],
    authority_allowances_other public.zero_string,
    authority_allowances_note public.zero_string,
    waivers_required boolean,
    waivers_required_types public.waiver_type[],
    waivers_required_note public.zero_string,
    created_by public.eua_id NOT NULL,
    created_dts timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_by public.eua_id,
    modified_dts timestamp with time zone,
    status public.task_status DEFAULT 'READY'::public.task_status NOT NULL
);


ALTER TABLE public.plan_general_characteristics OWNER TO postgres;

--
-- Name: plan_it_tools; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan_it_tools (
    id uuid NOT NULL,
    model_plan_id uuid NOT NULL,
    gc_part_c_d public.gc_part_c_d_type[],
    gc_part_c_d_other public.zero_string,
    gc_part_c_d_note public.zero_string,
    gc_collect_bids public.gc_collect_bids_type[],
    gc_collect_bids_other public.zero_string,
    gc_collect_bids_note public.zero_string,
    gc_update_contract public.gc_update_contract_type[],
    gc_update_contract_other public.zero_string,
    gc_update_contract_note public.zero_string,
    pp_to_advertise public.pp_to_advertise_type[],
    pp_to_advertise_other public.zero_string,
    pp_to_advertise_note public.zero_string,
    pp_collect_score_review public.pp_collect_score_review_type[],
    pp_collect_score_review_other public.zero_string,
    pp_collect_score_review_note public.zero_string,
    pp_app_support_contractor public.pp_app_support_contractor_type[],
    pp_app_support_contractor_other public.zero_string,
    pp_app_support_contractor_note public.zero_string,
    pp_communicate_with_participant public.pp_communicate_with_participant_type[],
    pp_communicate_with_participant_other public.zero_string,
    pp_communicate_with_participant_note public.zero_string,
    pp_manage_provider_overlap public.pp_manage_provider_overlap_type[],
    pp_manage_provider_overlap_other public.zero_string,
    pp_manage_provider_overlap_note public.zero_string,
    b_manage_beneficiary_overlap public.b_manage_beneficiary_overlap_type[],
    b_manage_beneficiary_overlap_other public.zero_string,
    b_manage_beneficiary_overlap_note public.zero_string,
    oel_helpdesk_support public.oel_helpdesk_support_type[],
    oel_helpdesk_support_other public.zero_string,
    oel_helpdesk_support_note public.zero_string,
    oel_manage_aco public.oel_manage_aco_type[],
    oel_manage_aco_other public.zero_string,
    oel_manage_aco_note public.zero_string,
    oel_performance_benchmark public.oel_performance_benchmark_type[],
    oel_performance_benchmark_other public.zero_string,
    oel_performance_benchmark_note public.zero_string,
    oel_process_appeals public.oel_process_appeals_type[],
    oel_process_appeals_other public.zero_string,
    oel_process_appeals_note public.zero_string,
    oel_evaluation_contractor public.oel_evaluation_contractor_type[],
    oel_evaluation_contractor_other public.zero_string,
    oel_evaluation_contractor_note public.zero_string,
    oel_collect_data public.oel_collect_data_type[],
    oel_collect_data_other public.zero_string,
    oel_collect_data_note public.zero_string,
    oel_obtain_data public.oel_obtain_data_type[],
    oel_obtain_data_other public.zero_string,
    oel_obtain_data_note public.zero_string,
    oel_claims_based_measures public.oel_claims_based_measures_type[],
    oel_claims_based_measures_other public.zero_string,
    oel_claims_based_measures_note public.zero_string,
    oel_quality_scores public.oel_quality_scores_type[],
    oel_quality_scores_other public.zero_string,
    oel_quality_scores_note public.zero_string,
    oel_send_reports public.oel_send_reports_type[],
    oel_send_reports_other public.zero_string,
    oel_send_reports_note public.zero_string,
    oel_learning_contractor public.oel_learning_contractor_type[],
    oel_learning_contractor_other public.zero_string,
    oel_learning_contractor_note public.zero_string,
    oel_participant_collaboration public.oel_participant_collaboration_type[],
    oel_participant_collaboration_other public.zero_string,
    oel_participant_collaboration_note public.zero_string,
    oel_educate_beneficiaries public.oel_educate_beneficiaries_type[],
    oel_educate_beneficiaries_other public.zero_string,
    oel_educate_beneficiaries_note public.zero_string,
    p_make_claims_payments public.p_make_claims_payments_type[],
    p_make_claims_payments_other public.zero_string,
    p_make_claims_payments_note public.zero_string,
    p_inform_ffs public.p_inform_ffs_type[],
    p_inform_ffs_other public.zero_string,
    p_inform_ffs_note public.zero_string,
    p_non_claims_based_payments public.p_non_claims_based_payments_type[],
    p_non_claims_based_payments_other public.zero_string,
    p_non_claims_based_payments_note public.zero_string,
    p_shared_savings_plan public.p_shared_savings_plan_type[],
    p_shared_savings_plan_other public.zero_string,
    p_shared_savings_plan_note public.zero_string,
    p_recover_payments public.p_recover_payments_type[],
    p_recover_payments_other public.zero_string,
    p_recover_payments_note public.zero_string,
    created_by public.eua_id NOT NULL,
    created_dts timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_by public.eua_id,
    modified_dts timestamp with time zone,
    status public.task_status DEFAULT 'READY'::public.task_status NOT NULL
);


ALTER TABLE public.plan_it_tools OWNER TO postgres;

--
-- Name: plan_milestones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan_milestones (
    id uuid NOT NULL,
    model_plan_id uuid NOT NULL,
    complete_icip timestamp with time zone,
    clearance_starts timestamp with time zone,
    clearance_ends timestamp with time zone,
    announced timestamp with time zone,
    applications_starts timestamp with time zone,
    applications_ends timestamp with time zone,
    performance_period_starts timestamp with time zone,
    performance_period_ends timestamp with time zone,
    wrap_up_ends timestamp with time zone,
    high_level_note public.zero_string,
    phased_in boolean,
    phased_in_note public.zero_string,
    created_by public.eua_id NOT NULL,
    created_dts timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_by public.eua_id,
    modified_dts timestamp with time zone,
    status public.task_status DEFAULT 'READY'::public.task_status NOT NULL
);


ALTER TABLE public.plan_milestones OWNER TO postgres;

--
-- Name: plan_ops_eval_and_learning; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan_ops_eval_and_learning (
    id uuid NOT NULL,
    model_plan_id uuid NOT NULL,
    agency_or_state_help public.agency_or_state_help_type[],
    agency_or_state_help_other public.zero_string,
    agency_or_state_help_note public.zero_string,
    stakeholders public.stakeholders_type[],
    stakeholders_other public.zero_string,
    stakeholders_note public.zero_string,
    helpdesk_use boolean,
    helpdesk_use_note public.zero_string,
    contractor_support public.contractor_support_type[],
    contractor_support_other public.zero_string,
    contractor_support_how public.zero_string,
    contractor_support_note public.zero_string,
    iddoc_support boolean,
    iddoc_support_note public.zero_string,
    technical_contacts_identified boolean,
    technical_contacts_identified_detail public.zero_string,
    technical_contacts_identified_note public.zero_string,
    capture_participant_info boolean,
    capture_participant_info_note public.zero_string,
    icd_owner public.zero_string,
    draft_icd_due_date timestamp with time zone,
    icd_note public.zero_string,
    uat_needs public.zero_string,
    stc_needs public.zero_string,
    testing_timelines public.zero_string,
    testing_note public.zero_string,
    data_monitoring_file_types public.monitoring_file_type[],
    data_monitoring_file_other public.zero_string,
    data_response_type public.zero_string,
    data_response_file_frequency public.zero_string,
    data_full_time_or_incremental public.data_full_time_or_incremental_type,
    eft_set_up boolean,
    unsolicited_adjustments_included boolean,
    data_flow_diagrams_needed boolean,
    produce_benefit_enhancement_files boolean,
    file_naming_conventions public.zero_string,
    data_monitoring_note public.zero_string,
    benchmark_for_performance public.benchmark_for_performance_type,
    benchmark_for_performance_note public.zero_string,
    compute_performance_scores boolean,
    compute_performance_scores_note public.zero_string,
    risk_adjust_performance boolean,
    risk_adjust_feedback boolean,
    risk_adjust_payments boolean,
    risk_adjust_other boolean,
    risk_adjust_note public.zero_string,
    appeal_performance boolean,
    appeal_feedback boolean,
    appeal_payments boolean,
    appeal_other boolean,
    appeal_note public.zero_string,
    evaluation_approaches public.evaluation_approach_type[],
    evaluation_approach_other public.zero_string,
    evalutaion_approach_note public.zero_string,
    ccm_involvment public.ccm_involvment_type[],
    ccm_involvment_other public.zero_string,
    ccm_involvment_note public.zero_string,
    data_needed_for_monitoring public.data_for_monitoring_type[],
    data_needed_for_monitoring_other public.zero_string,
    data_needed_for_monitoring_note public.zero_string,
    data_to_send_particicipants public.data_to_send_participants_type[],
    data_to_send_particicipants_other public.zero_string,
    data_to_send_particicipants_note public.zero_string,
    share_cclf_data boolean,
    share_cclf_data_note public.zero_string,
    send_files_between_ccw boolean,
    send_files_between_ccw_note public.zero_string,
    app_to_send_files_to_known boolean,
    app_to_send_files_to_which public.zero_string,
    app_to_send_files_to_note public.zero_string,
    use_ccw_for_file_distribiution_to_participants boolean,
    use_ccw_for_file_distribiution_to_participants_note public.zero_string,
    develop_new_quality_measures boolean,
    develop_new_quality_measures_note public.zero_string,
    quality_performance_impacts_payment boolean,
    quality_performance_impacts_payment_note public.zero_string,
    data_sharing_starts public.data_starts_type,
    data_sharing_starts_other public.zero_string,
    data_sharing_frequency public.data_frequency_type[],
    data_sharing_frequency_other public.zero_string,
    data_sharing_starts_note public.zero_string,
    data_collection_starts public.data_starts_type,
    data_collection_starts_other public.zero_string,
    data_collection_frequency public.data_frequency_type[],
    data_collection_frequency_other public.zero_string,
    data_collection_frequency_note public.zero_string,
    quality_reporting_starts public.data_starts_type,
    quality_reporting_starts_other public.zero_string,
    quality_reporting_starts_note public.zero_string,
    model_learning_systems public.model_learning_system_type[],
    model_learning_systems_other public.zero_string,
    model_learning_systems_note public.zero_string,
    anticipated_challenges public.zero_string,
    created_by public.eua_id NOT NULL,
    created_dts timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_by public.eua_id,
    modified_dts timestamp with time zone,
    status public.task_status DEFAULT 'READY'::public.task_status NOT NULL
);


ALTER TABLE public.plan_ops_eval_and_learning OWNER TO postgres;

--
-- Name: plan_participants_and_providers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan_participants_and_providers (
    id uuid NOT NULL,
    model_plan_id uuid NOT NULL,
    participants public.participants_type[],
    medicare_provider_type public.zero_string,
    states_engagement public.zero_string,
    participants_other public.zero_string,
    participants_note public.zero_string,
    participants_currently_in_models boolean,
    participants_currently_in_models_note public.zero_string,
    model_application_level public.zero_string,
    expected_number_of_participants integer,
    estimate_confidence public.confidence_type,
    confidence_note public.zero_string,
    recruitment_method public.recruitment_type,
    recruitment_other public.zero_string,
    recruitment_note public.zero_string,
    selection_method public.participant_selection_type[],
    selection_other public.zero_string,
    selection_note public.zero_string,
    communication_method public.participant_communication_type[],
    communication_method_other public.zero_string,
    communication_note public.zero_string,
    participant_assume_risk boolean,
    risk_type public.participant_risk_type,
    risk_other public.zero_string,
    risk_note public.zero_string,
    will_risk_change boolean,
    will_risk_change_note public.zero_string,
    coordinate_work boolean,
    coordinate_work_note public.zero_string,
    gainshare_payments boolean,
    gainshare_payments_track boolean,
    gainshare_payments_note public.zero_string,
    participants_ids public.participants_id_type[],
    participants_ids_other public.zero_string,
    participants_ids_note public.zero_string,
    provider_addition_frequency public.frequency_type,
    provider_addition_frequency_other public.zero_string,
    provider_addition_frequency_note public.zero_string,
    provider_add_method public.provider_add_type[],
    provider_add_method_other public.zero_string,
    provider_add_method_note public.zero_string,
    provider_leave_method public.provider_leave_type[],
    provider_leave_method_other public.zero_string,
    provider_leave_method_note public.zero_string,
    provider_overlap public.overlap_type,
    provider_overlap_hierarchy public.zero_string,
    provider_overlap_note public.zero_string,
    created_by public.eua_id NOT NULL,
    created_dts timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_by public.eua_id,
    modified_dts timestamp with time zone,
    status public.task_status DEFAULT 'READY'::public.task_status NOT NULL
);


ALTER TABLE public.plan_participants_and_providers OWNER TO postgres;

--
-- Name: plan_payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plan_payments (
    id uuid NOT NULL,
    model_plan_id uuid NOT NULL,
    funding_source public.pp_funding_source[],
    funding_source_trust_fund public.zero_string,
    funding_source_other public.zero_string,
    funding_source_note public.zero_string,
    funding_source_r public.pp_funding_source[],
    funding_source_r_trust_fund public.zero_string,
    funding_source_r_other public.zero_string,
    funding_source_r_note public.zero_string,
    pay_recipients public.pp_pay_recipient[],
    pay_recipients_other_specification public.zero_string,
    pay_recipients_note public.zero_string,
    pay_type public.pp_pay_type[],
    pay_type_note public.zero_string,
    pay_claims public.pp_claims_based_pay_type[],
    pay_claims_other public.zero_string,
    pay_claims_note public.zero_string,
    should_any_providers_excluded_ffs_systems boolean,
    should_any_providers_excluded_ffs_systems_note public.zero_string,
    changes_medicare_physician_fee_schedule boolean,
    changes_medicare_physician_fee_schedule_note public.zero_string,
    affects_medicare_secondary_payer_claims boolean,
    affects_medicare_secondary_payer_claims_how public.zero_string,
    affects_medicare_secondary_payer_claims_note public.zero_string,
    pay_model_differentiation public.zero_string,
    creating_dependencies_between_services boolean,
    creating_dependencies_between_services_note public.zero_string,
    needs_claims_data_collection boolean,
    needs_claims_data_collection_note public.zero_string,
    providing_third_party_file boolean,
    is_contractor_aware_test_data_requirements boolean,
    beneficiary_cost_sharing_level_and_handling public.zero_string,
    waive_beneficiary_cost_sharing_for_any_services boolean,
    waive_beneficiary_cost_sharing_service_specification public.zero_string,
    waiver_only_applies_part_of_payment boolean,
    waive_beneficiary_cost_sharing_note public.zero_string,
    non_claims_payments public.pp_non_claim_based_payment_type[],
    non_claims_payments_other public.zero_string,
    payment_calculation_owner public.zero_string,
    number_payments_per_pay_cycle public.zero_string,
    number_payments_per_pay_cycle_note public.zero_string,
    shared_systems_involved_additional_claim_payment boolean,
    shared_systems_involved_additional_claim_payment_note public.zero_string,
    planning_to_use_innovation_payment_contractor boolean,
    planning_to_use_innovation_payment_contractor_note public.zero_string,
    funding_structure public.zero_string,
    expected_calculation_complexity_level public.pp_complexity_calculation_level_type,
    expected_calculation_complexity_level_note public.zero_string,
    can_participants_select_between_payment_mechanisms boolean,
    can_participants_select_between_payment_mechanisms_how public.zero_string,
    can_participants_select_between_payment_mechanisms_note public.zero_string,
    anticipated_payment_frequency public.pp_anticipated_payment_frequency_type[],
    anticipated_payment_frequency_other public.zero_string,
    anticipated_payment_frequency_note public.zero_string,
    will_recover_payments boolean,
    will_recover_payments_note public.zero_string,
    anticipate_reconciling_payments_retrospectively boolean,
    anticipate_reconciling_payments_retrospectively_note public.zero_string,
    payment_start_date timestamp with time zone,
    payment_start_date_note public.zero_string,
    created_by public.eua_id NOT NULL,
    created_dts timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_by public.eua_id,
    modified_dts timestamp with time zone,
    status public.task_status DEFAULT 'READY'::public.task_status NOT NULL
);


ALTER TABLE public.plan_payments OWNER TO postgres;

--
-- Name: discussion_reply discussion_reply_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discussion_reply
    ADD CONSTRAINT discussion_reply_pkey PRIMARY KEY (id);


--
-- Name: model_plan model_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.model_plan
    ADD CONSTRAINT model_plan_pkey PRIMARY KEY (id);


--
-- Name: plan_basics plan_basics_model_plan_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_basics
    ADD CONSTRAINT plan_basics_model_plan_id_key UNIQUE (model_plan_id);


--
-- Name: plan_basics plan_basics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_basics
    ADD CONSTRAINT plan_basics_pkey PRIMARY KEY (id);


--
-- Name: plan_beneficiaries plan_beneficiaries_model_plan_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_beneficiaries
    ADD CONSTRAINT plan_beneficiaries_model_plan_id_key UNIQUE (model_plan_id);


--
-- Name: plan_beneficiaries plan_beneficiaries_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_beneficiaries
    ADD CONSTRAINT plan_beneficiaries_pkey PRIMARY KEY (id);


--
-- Name: plan_collaborator plan_collaborator_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_collaborator
    ADD CONSTRAINT plan_collaborator_pkey PRIMARY KEY (id);


--
-- Name: plan_discussion plan_discussion_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_discussion
    ADD CONSTRAINT plan_discussion_pkey PRIMARY KEY (id);


--
-- Name: plan_document plan_document_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_document
    ADD CONSTRAINT plan_document_pkey PRIMARY KEY (id);


--
-- Name: plan_general_characteristics plan_general_characteristics_model_plan_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_general_characteristics
    ADD CONSTRAINT plan_general_characteristics_model_plan_id_key UNIQUE (model_plan_id);


--
-- Name: plan_general_characteristics plan_general_characteristics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_general_characteristics
    ADD CONSTRAINT plan_general_characteristics_pkey PRIMARY KEY (id);


--
-- Name: plan_it_tools plan_it_tools_model_plan_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_it_tools
    ADD CONSTRAINT plan_it_tools_model_plan_id_key UNIQUE (model_plan_id);


--
-- Name: plan_it_tools plan_it_tools_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_it_tools
    ADD CONSTRAINT plan_it_tools_pkey PRIMARY KEY (id);


--
-- Name: plan_milestones plan_milestones_model_plan_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_milestones
    ADD CONSTRAINT plan_milestones_model_plan_id_key UNIQUE (model_plan_id);


--
-- Name: plan_milestones plan_milestones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_milestones
    ADD CONSTRAINT plan_milestones_pkey PRIMARY KEY (id);


--
-- Name: plan_ops_eval_and_learning plan_ops_eval_and_learning_model_plan_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_ops_eval_and_learning
    ADD CONSTRAINT plan_ops_eval_and_learning_model_plan_id_key UNIQUE (model_plan_id);


--
-- Name: plan_ops_eval_and_learning plan_ops_eval_and_learning_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_ops_eval_and_learning
    ADD CONSTRAINT plan_ops_eval_and_learning_pkey PRIMARY KEY (id);


--
-- Name: plan_participants_and_providers plan_participants_and_providers_model_plan_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_participants_and_providers
    ADD CONSTRAINT plan_participants_and_providers_model_plan_id_key UNIQUE (model_plan_id);


--
-- Name: plan_participants_and_providers plan_participants_and_providers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_participants_and_providers
    ADD CONSTRAINT plan_participants_and_providers_pkey PRIMARY KEY (id);


--
-- Name: plan_payments plan_payments_model_plan_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_payments
    ADD CONSTRAINT plan_payments_model_plan_id_key UNIQUE (model_plan_id);


--
-- Name: plan_payments plan_payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_payments
    ADD CONSTRAINT plan_payments_pkey PRIMARY KEY (id);


--
-- Name: plan_collaborator unique_collaborator_per_plan; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_collaborator
    ADD CONSTRAINT unique_collaborator_per_plan UNIQUE (model_plan_id, eua_user_id);


--
-- Name: plan_collaborator collaborator_lead_req_delete; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER collaborator_lead_req_delete BEFORE DELETE ON public.plan_collaborator FOR EACH ROW WHEN ((old.team_role = 'MODEL_LEAD'::public.team_role)) EXECUTE PROCEDURE public.collaborator_role_check_trigger();


--
-- Name: plan_collaborator collaborator_lead_req_update; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER collaborator_lead_req_update BEFORE UPDATE ON public.plan_collaborator FOR EACH ROW WHEN (((old.team_role = 'MODEL_LEAD'::public.team_role) AND (new.team_role <> 'MODEL_LEAD'::public.team_role))) EXECUTE PROCEDURE public.collaborator_role_check_trigger();


--
-- Name: plan_basics fk_basics_plan; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_basics
    ADD CONSTRAINT fk_basics_plan FOREIGN KEY (model_plan_id) REFERENCES public.model_plan(id);


--
-- Name: plan_beneficiaries fk_beneficiaries_plan; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_beneficiaries
    ADD CONSTRAINT fk_beneficiaries_plan FOREIGN KEY (model_plan_id) REFERENCES public.model_plan(id);


--
-- Name: plan_general_characteristics fk_characteristics_plan; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_general_characteristics
    ADD CONSTRAINT fk_characteristics_plan FOREIGN KEY (model_plan_id) REFERENCES public.model_plan(id);


--
-- Name: plan_collaborator fk_collaborator_plan; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_collaborator
    ADD CONSTRAINT fk_collaborator_plan FOREIGN KEY (model_plan_id) REFERENCES public.model_plan(id);


--
-- Name: plan_discussion fk_discussion_plan; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_discussion
    ADD CONSTRAINT fk_discussion_plan FOREIGN KEY (model_plan_id) REFERENCES public.model_plan(id);


--
-- Name: plan_document fk_document_plan; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_document
    ADD CONSTRAINT fk_document_plan FOREIGN KEY (model_plan_id) REFERENCES public.model_plan(id);


--
-- Name: plan_it_tools fk_it_tools_plan; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_it_tools
    ADD CONSTRAINT fk_it_tools_plan FOREIGN KEY (model_plan_id) REFERENCES public.model_plan(id);


--
-- Name: plan_milestones fk_milestones_plan; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_milestones
    ADD CONSTRAINT fk_milestones_plan FOREIGN KEY (model_plan_id) REFERENCES public.model_plan(id);


--
-- Name: plan_ops_eval_and_learning fk_ops_eval_and_learning_plan; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_ops_eval_and_learning
    ADD CONSTRAINT fk_ops_eval_and_learning_plan FOREIGN KEY (model_plan_id) REFERENCES public.model_plan(id);


--
-- Name: plan_participants_and_providers fk_participants_and_providers_plan; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_participants_and_providers
    ADD CONSTRAINT fk_participants_and_providers_plan FOREIGN KEY (model_plan_id) REFERENCES public.model_plan(id);


--
-- Name: plan_payments fk_plan_payments; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plan_payments
    ADD CONSTRAINT fk_plan_payments FOREIGN KEY (model_plan_id) REFERENCES public.model_plan(id);


--
-- Name: discussion_reply fk_reply_discussion; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discussion_reply
    ADD CONSTRAINT fk_reply_discussion FOREIGN KEY (discussion_id) REFERENCES public.plan_discussion(id);


--
-- Name: TABLE discussion_reply; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.discussion_reply TO crud;


--
-- Name: TABLE model_plan; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.model_plan TO crud;


--
-- Name: TABLE plan_basics; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.plan_basics TO crud;


--
-- Name: TABLE plan_beneficiaries; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.plan_beneficiaries TO crud;


--
-- Name: TABLE plan_collaborator; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.plan_collaborator TO crud;


--
-- Name: TABLE plan_discussion; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.plan_discussion TO crud;


--
-- Name: TABLE plan_document; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.plan_document TO crud;


--
-- Name: TABLE plan_general_characteristics; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.plan_general_characteristics TO crud;


--
-- Name: TABLE plan_it_tools; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.plan_it_tools TO crud;


--
-- Name: TABLE plan_milestones; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.plan_milestones TO crud;


--
-- Name: TABLE plan_ops_eval_and_learning; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.plan_ops_eval_and_learning TO crud;


--
-- Name: TABLE plan_participants_and_providers; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.plan_participants_and_providers TO crud;


--
-- Name: TABLE plan_payments; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE public.plan_payments TO crud;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT USAGE,UPDATE ON SEQUENCES  TO crud;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES  TO crud;


--
-- PostgreSQL database dump complete
--
