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
-- Data for Name: model_plan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.model_plan (id, model_name, model_category, cms_centers, cms_other, cmmi_groups, archived, status, created_by, created_dts, modified_by, modified_dts) FROM stdin;
53054496-6d1f-47f5-b6a0-1edaf73b935e	Empty Plan	\N	\N	\N	\N	f	PLAN_DRAFT	MINT	2022-06-03 17:41:40.83519+00	\N	\N
95399697-8c37-4225-b09d-7ca4fd0ad2b0	Plan With Collaborators	\N	\N	\N	\N	f	PLAN_DRAFT	MINT	2022-06-03 17:41:40.870533+00	\N	\N
ce3405a0-3399-4e3a-88d7-3cfc613d2905	Complete Plan	ACCOUNTABLE_CARE	{CENTER_FOR_MEDICARE}	\N	\N	f	PLAN_DRAFT	MINT	2022-06-03 17:41:40.907249+00	MINT	2022-06-03 17:41:40.941225+00
9371fdb5-3b05-4f58-aeec-f3f1739a8ab4	Plan With Discussions	\N	\N	\N	\N	f	PLAN_DRAFT	MINT	2022-06-03 17:41:41.006393+00	\N	\N
6e224030-09d5-46f7-ad04-4bb851b36eab	PM Butler's great plan	PRIMARY_CARE_TRANSFORMATION	{CENTER_FOR_MEDICARE,OTHER}	The Center for Awesomeness	{STATE_INNOVATIONS_GROUP,POLICY_AND_PROGRAMS_GROUP}	f	PLAN_COMPLETE	MINT	2022-06-03 19:32:24.356021+00	MINT	2022-06-03 20:56:30.06897+00
12897703-dac0-4e65-be7f-4907232eb176	Plan With Documents	\N	\N	\N	\N	f	PLAN_DRAFT	MINT	2022-06-06 13:10:45.719925+00	\N	\N
\.


--
-- Data for Name: plan_discussion; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plan_discussion (id, model_plan_id, content, status, created_by, created_dts, modified_by, modified_dts) FROM stdin;
b092aaa9-a3a7-4802-ac10-0a5d58fb5d70	9371fdb5-3b05-4f58-aeec-f3f1739a8ab4	Why will nobody answer this!?	UNANSWERED	MINT	2022-06-03 17:41:41.030799+00	\N	\N
e847939b-dda7-48b8-88bc-99442017b0c2	9371fdb5-3b05-4f58-aeec-f3f1739a8ab4	Can someone please answer this?	ANSWERED	MINT	2022-06-03 17:41:41.033957+00	MINT	2022-06-03 17:41:41.048593+00
550dfb5f-b730-4e7f-a991-aca280f0298b	6e224030-09d5-46f7-ad04-4bb851b36eab	What is the purpose of this plan?	ANSWERED	JAKE	2022-06-03 19:32:24.416474+00	\N	\N
\.


--
-- Data for Name: discussion_reply; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.discussion_reply (id, discussion_id, content, resolution, created_by, created_dts, modified_by, modified_dts) FROM stdin;
825db0ea-d62a-4c7b-a4a2-37105bc118d6	e847939b-dda7-48b8-88bc-99442017b0c2	Sure thing! The answer is 42.	t	MINT	2022-06-03 17:41:41.040032+00	\N	\N
\.


--
-- Data for Name: plan_basics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plan_basics (id, model_plan_id, model_type, problem, goal, test_inventions, note, created_by, created_dts, modified_by, modified_dts, status) FROM stdin;
1c12315a-5647-49cb-9371-8a0a2fa409a4	53054496-6d1f-47f5-b6a0-1edaf73b935e	\N	\N	\N	\N	\N	MINT	2022-06-03 17:41:40.847303+00	\N	\N	READY
f31f832d-b744-40b5-b881-dd264a3cd9f6	95399697-8c37-4225-b09d-7ca4fd0ad2b0	\N	\N	\N	\N	\N	MINT	2022-06-03 17:41:40.880114+00	\N	\N	READY
6680c61b-81cf-425c-adb1-d9e2ea356d9a	ce3405a0-3399-4e3a-88d7-3cfc613d2905	VOLUNTARY	The problem	The goal	The interventions	\N	MINT	2022-06-03 17:41:40.914497+00	MINT	2022-06-03 17:41:40.956661+00	COMPLETE
92a17c2e-4629-4b34-a0b0-2df0694d9113	9371fdb5-3b05-4f58-aeec-f3f1739a8ab4	\N	\N	\N	\N	\N	MINT	2022-06-03 17:41:41.012522+00	\N	\N	READY
4132e334-4a10-4e8e-9ef1-a72fe910dc82	6e224030-09d5-46f7-ad04-4bb851b36eab	MANDATORY	There is not enough candy	To get more candy	The great candy machine	The machine doesn't work yet	MINT	2022-06-03 19:32:24.411254+00	MINT	2022-06-03 20:54:20.096083+00	COMPLETE
7cda2186-0141-4c7e-bcf4-9b041ea0b9a5	12897703-dac0-4e65-be7f-4907232eb176	\N	\N	\N	\N	\N	MINT	2022-06-06 13:10:45.72351+00	\N	\N	READY
\.


--
-- Data for Name: plan_beneficiaries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plan_beneficiaries (id, model_plan_id, beneficiaries, beneficiaries_other, beneficiaries_note, treat_dual_elligible_different, treat_dual_elligible_different_how, treat_dual_elligible_different_note, exclude_certain_characteristics, exclude_certain_characteristics_criteria, exclude_certain_characteristics_note, number_people_impacted, estimate_confidence, confidence_note, beneficiary_selection_method, beneficiary_selection_other, beneficiary_selection_note, beneficiary_selection_frequency, beneficiary_selection_frequency_other, beneficiary_selection_frequency_note, beneficiary_overlap, beneficiary_overlap_note, precedence_rules, created_by, created_dts, modified_by, modified_dts, status) FROM stdin;
d3795217-240c-4d53-8219-7e618eecb19b	53054496-6d1f-47f5-b6a0-1edaf73b935e	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	MINT	2022-06-03 17:41:40.864778+00	\N	\N	READY
03733612-10f7-4d8f-ac3c-4d331bec2e1a	95399697-8c37-4225-b09d-7ca4fd0ad2b0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	MINT	2022-06-03 17:41:40.898432+00	\N	\N	READY
c74858a1-1148-4bfc-a3fb-24f4e48f166f	ce3405a0-3399-4e3a-88d7-3cfc613d2905	\N	\N	\N	YES	\N	\N	TBD	\N	\N	500	NOT_AT_ALL	\N	\N	\N	\N	QUARTERLY	\N	\N	YES_NEED_POLICIES	\N	\N	MINT	2022-06-03 17:41:40.931363+00	MINT	2022-06-03 17:41:41.001616+00	COMPLETE
691e52f7-1964-47ff-b8d4-00f7c2c159c7	9371fdb5-3b05-4f58-aeec-f3f1739a8ab4	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	MINT	2022-06-03 17:41:41.027163+00	\N	\N	READY
b7aa2c9f-9e38-4e95-92d9-60bd791e8c59	6e224030-09d5-46f7-ad04-4bb851b36eab	{MEDICARE_FFS,DISEASE_SPECIFIC,OTHER}	The Gumdrop Kids	The disease is kidney failure	YES	Priority given to kidney failure	Can be overridden by vice-presidential order	YES	Exclude any individuals who qualify for 5 other models	Exceptions can be made by presidential order	25	SLIGHTLY	This is probably correct	{PROVIDER_SIGN_UP,OTHER}	Competitive wrestling, elimination style	Priority given to provider sign up	ANNUALLY	On February 29th when it occurs	Also as needed	YES_NEED_POLICIES	This will likely overlap	This takes precendence over all other models	MINT	2022-06-03 19:32:24.432349+00	\N	\N	READY
5b50b7f3-a407-4e78-a3be-8ab6e55f8dbd	12897703-dac0-4e65-be7f-4907232eb176	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	MINT	2022-06-06 13:10:45.729635+00	\N	\N	READY
\.


--
-- Data for Name: plan_collaborator; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plan_collaborator (id, model_plan_id, eua_user_id, full_name, team_role, created_by, created_dts, modified_by, modified_dts) FROM stdin;
b49e65fd-4767-4aed-b40e-3e1e5c20be57	53054496-6d1f-47f5-b6a0-1edaf73b935e	MINT	mint Doe	MODEL_LEAD	MINT	2022-06-03 17:41:40.840176+00	\N	\N
736b1d46-b2ac-4d76-89b2-4a231556b1c5	95399697-8c37-4225-b09d-7ca4fd0ad2b0	MINT	mint Doe	MODEL_LEAD	MINT	2022-06-03 17:41:40.874974+00	\N	\N
62f0908e-d50f-4b2f-a975-0742f46517a3	95399697-8c37-4225-b09d-7ca4fd0ad2b0	BTAL	Betty Alpha	LEADERSHIP	MINT	2022-06-03 17:41:40.903246+00	\N	\N
2f18ee4e-51d0-4e19-91fb-1660296ba9ad	ce3405a0-3399-4e3a-88d7-3cfc613d2905	MINT	mint Doe	MODEL_LEAD	MINT	2022-06-03 17:41:40.911047+00	\N	\N
e5540130-9d15-4cbd-82ec-d8d924dfc513	9371fdb5-3b05-4f58-aeec-f3f1739a8ab4	MINT	mint Doe	MODEL_LEAD	MINT	2022-06-03 17:41:41.008759+00	\N	\N
38a59d7a-fc37-4bda-acec-ffd44bf8b4d2	6e224030-09d5-46f7-ad04-4bb851b36eab	PBLR	PM Butler	MODEL_LEAD	MINT	2022-06-03 20:58:45.560727+00	MINT	2022-06-03 20:59:28.411263+00
f1b90915-c863-405a-b4ad-4558e01791f0	6e224030-09d5-46f7-ad04-4bb851b36eab	MINT	mint Doe	LEADERSHIP	MINT	2022-06-03 19:32:24.408045+00	MINT	2022-06-03 20:59:34.235474+00
2cd9fc52-294c-49cb-b78a-3e4a551b07c9	12897703-dac0-4e65-be7f-4907232eb176	MINT	mint Doe	MODEL_LEAD	MINT	2022-06-06 13:10:45.722141+00	\N	\N
\.


--
-- Data for Name: plan_document; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plan_document (id, model_plan_id, file_type, bucket, file_key, virus_scanned, virus_clean, file_name, file_size, document_type, other_type, optional_notes, deleted_at, created_by, created_dts, modified_by, modified_dts) FROM stdin;
13044089-956b-476e-8b86-a1a521ffde59	12897703-dac0-4e65-be7f-4907232eb176	application/pdf	mint-app-file-uploads	b23d964c-3e44-426b-8dcb-aa979adc07a2.pdf	f	f	sample.pdf	3028	CONCEPT_PAPER		Virus scan should be clean	\N	MINT	2022-06-06 13:11:01.286371+00	\N	\N
e2416f82-2847-4e12-a9c0-5ccea325ea92	12897703-dac0-4e65-be7f-4907232eb176	application/pdf	mint-app-file-uploads	3225ae75-8ca7-4b78-aa7e-ea2334226c07.pdf	f	f	sample.pdf	3028	MARKET_RESEARCH		Virus scan should be pending	\N	MINT	2022-06-06 13:11:13.342637+00	\N	\N
39536488-354e-4cd8-a8c6-1647f2a56c4e	12897703-dac0-4e65-be7f-4907232eb176	application/pdf	mint-app-file-uploads	25c81e5a-4940-45fe-85c7-fcbe37a3c317.pdf	f	f	sample.pdf	3028	OTHER	Sample Document	Virus scan should be infected	\N	MINT	2022-06-06 13:11:24.674723+00	\N	\N
\.


--
-- Data for Name: plan_general_characteristics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plan_general_characteristics (id, model_plan_id, is_new_model, existing_model, resembles_existing_model, resembles_existing_model_which, resembles_existing_model_how, resembles_existing_model_note, has_components_or_tracks, has_components_or_tracks_differ, has_components_or_tracks_note, alternative_payment_model, alternative_payment_model_types, alternative_payment_model_note, key_characteristics, key_characteristics_other, key_characteristics_note, collect_plan_bids, collect_plan_bids_note, manage_part_c_d_enrollment, manage_part_c_d_enrollment_note, plan_contact_updated, plan_contact_updated_note, care_coordination_involved, care_coordination_involved_description, care_coordination_involved_note, additional_services_involved, additional_services_involved_description, additional_services_involved_note, community_partners_involved, community_partners_involved_description, community_partners_involved_note, geographies_targeted, geographies_targeted_types, geographies_targeted_types_other, geographies_targeted_applied_to, geographies_targeted_applied_to_other, geographies_targeted_note, participation_options, participation_options_note, agreement_types, agreement_types_other, multiple_patricipation_agreements_needed, multiple_patricipation_agreements_needed_note, rulemaking_required, rulemaking_required_description, rulemaking_required_note, authority_allowances, authority_allowances_other, authority_allowances_note, waivers_required, waivers_required_types, waivers_required_note, created_by, created_dts, modified_by, modified_dts, status) FROM stdin;
27d00d3e-7829-480a-bef7-833b1d74dabd	53054496-6d1f-47f5-b6a0-1edaf73b935e	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	MINT	2022-06-03 17:41:40.859484+00	\N	\N	READY
33d7c52b-1343-4a68-abe8-5fad733990ae	95399697-8c37-4225-b09d-7ca4fd0ad2b0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	MINT	2022-06-03 17:41:40.893298+00	\N	\N	READY
7d390eb8-f647-4f6c-ab72-4bb7aff60f00	ce3405a0-3399-4e3a-88d7-3cfc613d2905	t	\N	f	\N	\N	\N	f	\N	\N	t	{REGULAR,MIPS}	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	f	\N	\N	t	Lots of additional services	\N	f	\N	\N	f	\N	\N	\N	\N	\N	f	\N	\N	\N	\N	\N	t	Lots of rules	\N	\N	\N	\N	f	\N	\N	MINT	2022-06-03 17:41:40.924851+00	MINT	2022-06-03 17:41:40.985636+00	COMPLETE
51e25d65-7d22-4f0e-98b5-2a1df252ab83	9371fdb5-3b05-4f58-aeec-f3f1739a8ab4	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	MINT	2022-06-03 17:41:41.022457+00	\N	\N	READY
68fad47f-31c7-479f-bc14-2740523083c1	12897703-dac0-4e65-be7f-4907232eb176	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	MINT	2022-06-06 13:10:45.727928+00	\N	\N	READY
41a11243-c0c8-4b6c-8a10-e8b0cbaa03b2	6e224030-09d5-46f7-ad04-4bb851b36eab	t	My Existing Model	t	{"Exist Model 1","Exist Model 2"}	They both have a similar approach to payment	Check the payment section of the existing models	t	One track does something one way, the other does it another way	Look at the tracks carefully	t	{MIPS,ADVANCED}	Has 2 APM types!	{PART_C,PART_D,OTHER}	It's got lots of class and character	other characteristics might still be discovered	t	It collects SOOO many plan bids you wouldn't even get it broh	f	It definitely will not manage Part C/D enrollment, are you crazy??	f	I forgot to update it, but will soon	t	It just is!	Just think about it	f	\N	\N	t	Very involved in the community	Check the community partners section	t	{STATE,OTHER}	The WORLD!	{PARTICIPANTS,OTHER}	All Humans	\N	t	Really anyone can participate	{OTHER}	A firm handshake	f	A firm handshake should be more than enough	t	The golden rule - target date of 05/08/2023	\N	{CONGRESSIONALLY_MANDATED}	\N	\N	t	{FRAUD_ABUSE}	The vertigo is gonna grow 'cause it's so dangerous, you'll have to sign a waiver	MINT	2022-06-03 19:32:24.429124+00	\N	\N	COMPLETE
\.


--
-- Data for Name: plan_milestones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plan_milestones (id, model_plan_id, complete_icip, clearance_starts, clearance_ends, announced, applications_starts, applications_ends, performance_period_starts, performance_period_ends, wrap_up_ends, high_level_note, phased_in, phased_in_note, created_by, created_dts, modified_by, modified_dts, status) FROM stdin;
14909481-bf4e-4fa0-95b1-e00fb456f5be	53054496-6d1f-47f5-b6a0-1edaf73b935e	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	MINT	2022-06-03 17:41:40.85375+00	\N	\N	READY
9e0b09cb-1b4b-4925-9bff-d54d251fdc0c	95399697-8c37-4225-b09d-7ca4fd0ad2b0	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	MINT	2022-06-03 17:41:40.88433+00	\N	\N	READY
8d3dc2df-2fa1-4aaf-a152-884045cdf420	ce3405a0-3399-4e3a-88d7-3cfc613d2905	2022-06-03 17:41:40.962968+00	2022-06-03 17:41:40.96297+00	2022-06-03 17:41:40.962971+00	2022-06-03 17:41:40.962971+00	2022-06-03 17:41:40.962971+00	2022-06-03 17:41:40.962971+00	2022-06-03 17:41:40.962972+00	2022-06-03 17:41:40.962972+00	2022-06-03 17:41:40.962972+00	\N	t	\N	MINT	2022-06-03 17:41:40.920295+00	MINT	2022-06-03 17:41:40.970924+00	COMPLETE
c0a8bed5-5594-413d-890e-44de11bb0a60	9371fdb5-3b05-4f58-aeec-f3f1739a8ab4	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	MINT	2022-06-03 17:41:41.017879+00	\N	\N	READY
08286528-6131-4d16-8162-eb2df66c046c	6e224030-09d5-46f7-ad04-4bb851b36eab	2022-06-03 19:32:24.412662+00	2022-06-03 19:32:24.412662+00	2022-06-03 19:32:24.412662+00	2022-06-03 19:32:24.412662+00	2022-06-03 19:32:24.412662+00	2022-06-03 19:32:24.412662+00	2022-06-03 19:32:24.412662+00	2022-06-03 19:32:24.412662+00	2022-06-03 19:32:24.412662+00	Theses are my best guess notes	f	This can't be phased in	MINT	2022-06-03 19:32:24.4141+00	\N	\N	COMPLETE
fb8602ce-eebc-46e8-b0ce-0b941c1adade	12897703-dac0-4e65-be7f-4907232eb176	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	MINT	2022-06-06 13:10:45.725912+00	\N	\N	READY
\.


--
-- Data for Name: plan_participants_and_providers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.plan_participants_and_providers (id, model_plan_id, participants, medicare_provider_type, states_engagement, participants_other, participants_note, participants_currently_in_models, participants_currently_in_models_note, model_application_level, expected_number_of_participants, estimate_confidence, confidence_note, recruitment_method, recruitment_other, recruitment_note, selection_method, selection_other, selection_note, communication_method, communication_note, participant_assume_risk, risk_type, risk_other, risk_note, will_risk_change, will_risk_change_note, coordinate_work, coordinate_work_note, gainshare_payments, gainshare_payments_track, gainshare_payments_note, participants_ids, participants_ids_other, participants_ids_note, provider_addition_frequency, provider_addition_frequency_other, provider_addition_frequency_note, provider_add_method, provider_add_method_other, provider_add_method_note, provider_leave_method, provider_leave_method_other, provider_leave_method_note, provider_overlap, provider_overlap_hierarchy, provider_overlap_note, created_by, created_dts, modified_by, modified_dts, status) FROM stdin;
da79bad2-b4ce-4975-80bf-bd6e71ae300f	ce3405a0-3399-4e3a-88d7-3cfc613d2905	{MEDICARE_PROVIDERS,STATES,OTHER}	Oncology Providers	States will determine administration specific to the state	The candy people	Additional participants might join at a later date	t	A good number of candy people participate in other models	 c92.00 and c92.01	26	SLIGHTLY	Confidence will increase as the year progresses	OTHER	We will put up signs throughout the kingdom	We will hire a contractor to put up the signs	{MODEL_TEAM_REVIEW_APPLICATIONS,OTHER}	Anyone who shows up to the open house on friday will automatically be selected	Open houses will be on a by weekly reoccurring basis	{MASS_EMAIL,OTHER}	If needed we will send text messages	t	OTHER	Programmatic Risk	This is specifically dependant on external factors 	t	Less risky as time goes on	t	Weekly meetings will be held	t	t	This only applies to the first 50 participants	{TINS,OTHER}	Candy Kingdom Operations Number	SSN can e used if the other ids are not avaialble	ANNUALLY	every other leap year	Exceptions can be made	{PROSPECTIVELY,OTHER}	Competitive ball-room dancing, free for all	Priority given to prospectively	{VOLUNTARILY_WITHOUT_IMPLICATIONS,OTHER}	When demanded by law	We don't expect this to be required by law in very many locations	YES_NEED_POLICIES	When overlap occurs, this model will be a secondary model	Extenuating circumstances can allow this model to be the dominate model	MINT	2022-06-03 17:41:41.053902+00	\N	\N	COMPLETE
b18d2f8c-e77b-4cbb-b992-25b43bec9d4f	6e224030-09d5-46f7-ad04-4bb851b36eab	{MEDICARE_PROVIDERS,STATES,OTHER}	Oncology Providers	States will determine administration specific to the state	The candy people	Additional participants might join at a later date	t	A good number of candy people participate in other models	c92.00 and c92.01	26	SLIGHTLY	Confidence will increase as the year progresses	OTHER	We will put up signs throughout the kingdom	We will hire a contractor to put up the signs	{MODEL_TEAM_REVIEW_APPLICATIONS,OTHER}	Anyone who shows up to the open house on friday will automatically be selected	Open houses will be on a by weekly reoccurring basis	{MASS_EMAIL,OTHER}	If needed we will send text messages	t	OTHER	Programmatic Risk	This is specifically dependant on external factors	t	Less risky as time goes on	t	Weekly meetings will be held	t	t	This only applies to the first 50 participants	{TINS,OTHER}	Candy Kingdom Operations Number	SSN can e used if the other ids are not avaialble	ANNUALLY	every other leap year	Exceptions can be made	{PROSPECTIVELY,OTHER}	Competitive ball-room dancing, free for all	Priority given to prospectively	{VOLUNTARILY_WITHOUT_IMPLICATIONS,OTHER}	When demanded by law	We don't expect this to be required by law in very many locations	YES_NEED_POLICIES	When overlap occurs, this model will be a secondary model	Extenuating circumstances can allow this model to be the dominate model	MINT	2022-06-03 19:32:24.434587+00	\N	\N	COMPLETE
5292bd87-2e21-4eff-9b04-3db41e8a209d	12897703-dac0-4e65-be7f-4907232eb176	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	MINT	2022-06-06 13:10:45.731559+00	\N	\N	READY
\.


--
-- PostgreSQL database dump complete
--
