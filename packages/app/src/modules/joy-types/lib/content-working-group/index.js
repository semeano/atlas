"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const members_1 = require("../members");
const index_1 = require("../hiring/index");
const credentials_1 = require("../versioned-store/permissions/credentials");
const recurring_rewards_1 = require("../recurring-rewards");
const stake_1 = require("../stake");
const JoyStruct_1 = require("../JoyStruct");
const __1 = require("../");
class ChannelId extends members_1.ActorId {
}
exports.ChannelId = ChannelId;
;
class CuratorId extends members_1.ActorId {
}
exports.CuratorId = CuratorId;
;
class CuratorOpeningId extends index_1.OpeningId {
}
exports.CuratorOpeningId = CuratorOpeningId;
;
class CuratorApplicationId extends index_1.ApplicationId {
}
exports.CuratorApplicationId = CuratorApplicationId;
;
class LeadId extends members_1.ActorId {
}
exports.LeadId = LeadId;
;
class PrincipalId extends credentials_1.Credential {
}
exports.PrincipalId = PrincipalId;
;
class OptionalText extends types_1.Option.with(types_1.Text) {
}
exports.OptionalText = OptionalText;
;
exports.ChannelContentTypeAllValues = [
    'Video',
    'Music',
    'Ebook'
];
class ChannelContentType extends types_1.Enum {
    constructor(value, index) {
        super(exports.ChannelContentTypeAllValues, value, index);
    }
}
exports.ChannelContentType = ChannelContentType;
;
exports.ChannelPublicationStatusAllValues = [
    'Public',
    'Unlisted'
];
class ChannelPublicationStatus extends types_1.Enum {
    constructor(value, index) {
        super(exports.ChannelPublicationStatusAllValues, value, index);
    }
}
exports.ChannelPublicationStatus = ChannelPublicationStatus;
;
exports.ChannelCurationStatusAllValues = [
    'Normal',
    'Censored'
];
class ChannelCurationStatus extends types_1.Enum {
    constructor(value, index) {
        super(exports.ChannelCurationStatusAllValues, value, index);
    }
}
exports.ChannelCurationStatus = ChannelCurationStatus;
;
class Channel extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            verified: types_1.bool,
            handle: types_1.Text,
            title: OptionalText,
            description: OptionalText,
            avatar: OptionalText,
            banner: OptionalText,
            content: ChannelContentType,
            owner: members_1.MemberId,
            role_account: types_1.GenericAccountId,
            publication_status: ChannelPublicationStatus,
            curation_status: ChannelCurationStatus,
            created: types_1.u32,
            principal_id: PrincipalId,
        }, value);
    }
}
exports.Channel = Channel;
;
class CurationActor extends types_1.Enum {
    constructor(value, index) {
        super({
            Lead: types_1.Null,
            Curator: CuratorId
        }, value, index);
    }
}
exports.CurationActor = CurationActor;
;
class Principal extends types_1.Enum {
    constructor(value, index) {
        super({
            Lead: types_1.Null,
            Curator: CuratorId,
            ChannelOwner: ChannelId
        }, value, index);
    }
}
exports.Principal = Principal;
;
class CuratorRoleStakeProfile extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            stake_id: stake_1.StakeId,
            termination_unstaking_period: types_1.Option.with(types_1.u32),
            exit_unstaking_period: types_1.Option.with(types_1.u32),
        }, value);
    }
    get stake_id() {
        return this.getField('stake_id');
    }
}
exports.CuratorRoleStakeProfile = CuratorRoleStakeProfile;
;
class CuratorExitInitiationOrigin extends types_1.Enum {
    constructor(value, index) {
        super({
            Lead: types_1.Null,
            Curator: types_1.Null,
        }, value, index);
    }
}
exports.CuratorExitInitiationOrigin = CuratorExitInitiationOrigin;
class CuratorExitSummary extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            origin: CuratorExitInitiationOrigin,
            initiated_at_block_number: types_1.u32,
            rationale_text: types_1.Text,
        }, value);
    }
}
exports.CuratorExitSummary = CuratorExitSummary;
;
var CuratorRoleStakeKeys;
(function (CuratorRoleStakeKeys) {
    CuratorRoleStakeKeys["Active"] = "Active";
    CuratorRoleStakeKeys["Unstaking"] = "Unstaking";
    CuratorRoleStakeKeys["Exited"] = "Exited";
})(CuratorRoleStakeKeys = exports.CuratorRoleStakeKeys || (exports.CuratorRoleStakeKeys = {}));
class CuratorRoleStage extends types_1.Enum {
    constructor(value, index) {
        super({
            [CuratorRoleStakeKeys.Active]: types_1.Null,
            [CuratorRoleStakeKeys.Unstaking]: CuratorExitSummary,
            [CuratorRoleStakeKeys.Exited]: CuratorExitSummary,
        }, value, index);
    }
}
exports.CuratorRoleStage = CuratorRoleStage;
;
class CuratorInduction extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            lead: LeadId,
            curator_application_id: CuratorApplicationId,
            at_block: types_1.u32,
        }, value);
    }
    get lead() {
        return this.getField('lead');
    }
    get curator_application_id() {
        return this.getField('curator_application_id');
    }
    get at_block() {
        return this.getField('at_block');
    }
}
exports.CuratorInduction = CuratorInduction;
;
class Curator extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            role_account: types_1.GenericAccountId,
            reward_relationship: types_1.Option.with(recurring_rewards_1.RewardRelationshipId),
            role_stake_profile: types_1.Option.with(CuratorRoleStakeProfile),
            stage: CuratorRoleStage,
            induction: CuratorInduction,
            principal_id: PrincipalId,
        }, value);
    }
    get role_account() {
        return this.getField('role_account');
    }
    get reward_relationship() {
        return this.getField('reward_relationship');
    }
    get role_stake_profile() {
        return this.getField('role_stake_profile');
    }
    get stage() {
        return this.getField('stage');
    }
    get induction() {
        return this.getField('induction');
    }
    get principal_id() {
        return this.getField('principal_id');
    }
    get is_active() {
        return (this.stage.type == CuratorRoleStakeKeys.Active);
    }
}
exports.Curator = Curator;
;
class CuratorApplication extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            role_account: types_1.GenericAccountId,
            curator_opening_id: CuratorOpeningId,
            member_id: members_1.MemberId,
            application_id: index_1.ApplicationId,
        }, value);
    }
    get role_account() {
        return this.getField('role_account');
    }
    get curator_opening_id() {
        return this.getField('curator_opening_id');
    }
    get member_id() {
        return this.getField('member_id');
    }
    get application_id() {
        return this.getField('application_id');
    }
}
exports.CuratorApplication = CuratorApplication;
;
class SlashableTerms extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            max_count: types_1.u16,
            max_percent_pts_per_time: types_1.u16,
        }, value);
    }
}
exports.SlashableTerms = SlashableTerms;
;
class SlashingTerms extends types_1.Enum {
    constructor(value, index) {
        super({
            Unslashable: types_1.Null,
            Slashable: SlashableTerms,
        }, value, index);
    }
}
exports.SlashingTerms = SlashingTerms;
;
class OpeningPolicyCommitment extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            application_rationing_policy: types_1.Option.with(index_1.ApplicationRationingPolicy),
            max_review_period_length: types_1.u32,
            application_staking_policy: types_1.Option.with(index_1.StakingPolicy),
            role_staking_policy: types_1.Option.with(index_1.StakingPolicy),
            role_slashing_terms: SlashingTerms,
            fill_opening_successful_applicant_application_stake_unstaking_period: types_1.Option.with(types_1.u32),
            fill_opening_failed_applicant_application_stake_unstaking_period: types_1.Option.with(types_1.u32),
            fill_opening_failed_applicant_role_stake_unstaking_period: types_1.Option.with(types_1.u32),
            terminate_curator_application_stake_unstaking_period: types_1.Option.with(types_1.u32),
            terminate_curator_role_stake_unstaking_period: types_1.Option.with(types_1.u32),
            exit_curator_role_application_stake_unstaking_period: types_1.Option.with(types_1.u32),
            exit_curator_role_stake_unstaking_period: types_1.Option.with(types_1.u32),
        }, value);
    }
    get application_rationing_policy() {
        return this.getField('application_rationing_policy');
    }
    get max_review_period_length() {
        return this.getField('max_review_period_length');
    }
    get application_staking_policy() {
        return this.getField('application_staking_policy');
    }
    get role_staking_policy() {
        return this.getField('role_staking_policy');
    }
    get role_slashing_terms() {
        return this.getField('role_slashing_terms');
    }
    get fill_opening_successful_applicant_application_stake_unstaking_period() {
        return this.getField('fill_opening_successful_applicant_application_stake_unstaking_period');
    }
    get fill_opening_failed_applicant_application_stake_unstaking_period() {
        return this.getField('fill_opening_failed_applicant_application_stake_unstaking_period');
    }
    get fill_opening_failed_applicant_role_stake_unstaking_period() {
        return this.getField('fill_opening_failed_applicant_role_stake_unstaking_period');
    }
    get terminate_curator_application_stake_unstaking_period() {
        return this.getField('terminate_curator_application_stake_unstaking_period');
    }
    get terminate_curator_role_stake_unstaking_period() {
        return this.getField('terminate_curator_role_stake_unstaking_period');
    }
    get exit_curator_role_application_stake_unstaking_period() {
        return this.getField('exit_curator_role_application_stake_unstaking_period');
    }
    get exit_curator_role_stake_unstaking_period() {
        return this.getField('exit_curator_role_stake_unstaking_period');
    }
}
exports.OpeningPolicyCommitment = OpeningPolicyCommitment;
;
class CuratorOpening extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            opening_id: index_1.OpeningId,
            curator_applications: __1.BTreeSet.with(CuratorApplicationId),
            policy_commitment: OpeningPolicyCommitment,
        }, value);
    }
    get opening_id() {
        return this.getField('opening_id');
    }
}
exports.CuratorOpening = CuratorOpening;
;
class ExitedLeadRole extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            initiated_at_block_number: types_1.u32,
        }, value);
    }
}
exports.ExitedLeadRole = ExitedLeadRole;
;
class LeadRoleState extends types_1.Enum {
    constructor(value, index) {
        super({
            Active: types_1.Null,
            Exited: ExitedLeadRole,
        }, value, index);
    }
}
exports.LeadRoleState = LeadRoleState;
class Lead extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            role_account: types_1.GenericAccountId,
            reward_relationship: types_1.Option.with(recurring_rewards_1.RewardRelationshipId),
            inducted: types_1.u32,
            stage: LeadRoleState,
        }, value);
    }
    get role_account() {
        return this.getField('role_account');
    }
    get reward_relationship() {
        return this.getField('reward_relationship');
    }
    get stage() {
        return this.getField('stage');
    }
}
exports.Lead = Lead;
;
class WorkingGroupUnstaker extends types_1.Enum {
    constructor(value, index) {
        super({
            Lead: LeadId,
            Curator: CuratorId,
        }, value, index);
    }
}
exports.WorkingGroupUnstaker = WorkingGroupUnstaker;
class CuratorApplicationIdToCuratorIdMap extends types_1.BTreeMap {
    constructor(value, index) {
        super(index_1.ApplicationId, CuratorId, value);
    }
}
exports.CuratorApplicationIdToCuratorIdMap = CuratorApplicationIdToCuratorIdMap;
class RewardPolicy extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            amount_per_payout: types_1.u128,
            next_payment_at_block: types_1.u32,
            payout_interval: types_1.Option.with(types_1.u32),
        }, value);
    }
}
exports.RewardPolicy = RewardPolicy;
;
function registerContentWorkingGroupTypes() {
    try {
        types_1.getTypeRegistry().register({
            ChannelId: 'u64',
            CuratorId: 'u64',
            CuratorOpeningId: 'u64',
            CuratorApplicationId: 'u64',
            LeadId: 'u64',
            PrincipalId: 'u64',
            OptionalText,
            Channel,
            ChannelContentType,
            ChannelCurationStatus,
            ChannelPublicationStatus,
            CurationActor,
            Curator,
            CuratorApplication,
            CuratorOpening,
            Lead,
            OpeningPolicyCommitment,
            Principal,
            WorkingGroupUnstaker,
            CuratorApplicationIdToCuratorIdMap,
            CuratorApplicationIdSet: types_1.Vec.with(CuratorApplicationId),
            RewardPolicy,
        });
    }
    catch (err) {
        console.error('Failed to register custom types of content working group module', err);
    }
}
exports.registerContentWorkingGroupTypes = registerContentWorkingGroupTypes;
