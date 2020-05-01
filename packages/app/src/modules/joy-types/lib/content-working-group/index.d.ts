import { BTreeMap, Enum, bool, u8, u32, Text, GenericAccountId, Option, Vec, u16 } from '@polkadot/types';
import { BlockNumber, AccountId, Balance } from '@polkadot/types/interfaces';
import { ActorId, MemberId } from '../members';
import { OpeningId, ApplicationId, ApplicationRationingPolicy, StakingPolicy } from '../hiring/index';
import { Credential } from '../versioned-store/permissions/credentials';
import { RewardRelationshipId } from '../recurring-rewards';
import { StakeId } from '../stake';
import { JoyStruct } from '../JoyStruct';
import { BTreeSet } from '../';
export declare class ChannelId extends ActorId {
}
export declare class CuratorId extends ActorId {
}
export declare class CuratorOpeningId extends OpeningId {
}
export declare class CuratorApplicationId extends ApplicationId {
}
export declare class LeadId extends ActorId {
}
export declare class PrincipalId extends Credential {
}
declare const OptionalText_base: import("@polkadot/types/types").Constructor<Option<import("@polkadot/types/types").Codec>>;
export declare class OptionalText extends OptionalText_base {
}
export declare type ChannelContentTypeValue = 'Video' | 'Music' | 'Ebook';
export declare const ChannelContentTypeAllValues: ChannelContentTypeValue[];
export declare class ChannelContentType extends Enum {
    constructor(value?: ChannelContentTypeValue, index?: number);
}
export declare type ChannelPublicationStatusValue = 'Public' | 'Unlisted';
export declare const ChannelPublicationStatusAllValues: ChannelPublicationStatusValue[];
export declare class ChannelPublicationStatus extends Enum {
    constructor(value?: ChannelPublicationStatusValue, index?: number);
}
export declare type ChannelCurationStatusValue = 'Normal' | 'Censored';
export declare const ChannelCurationStatusAllValues: ChannelCurationStatusValue[];
export declare class ChannelCurationStatus extends Enum {
    constructor(value?: ChannelCurationStatusValue, index?: number);
}
export declare type IChannel = {
    verified: bool;
    handle: Text;
    title: OptionalText;
    description: OptionalText;
    avatar: OptionalText;
    banner: OptionalText;
    content: ChannelContentType;
    owner: MemberId;
    role_account: AccountId;
    publication_status: ChannelPublicationStatus;
    curation_status: ChannelCurationStatus;
    created: BlockNumber;
    principal_id: PrincipalId;
};
export declare class Channel extends JoyStruct<IChannel> {
    constructor(value?: IChannel);
}
export declare class CurationActor extends Enum {
    constructor(value?: any, index?: number);
}
export declare class Principal extends Enum {
    constructor(value?: any, index?: number);
}
export declare type ICuratorRoleStakeProfile = {
    stake_id: StakeId;
    termination_unstaking_period: Option<BlockNumber>;
    exit_unstaking_period: Option<BlockNumber>;
};
export declare class CuratorRoleStakeProfile extends JoyStruct<ICuratorRoleStakeProfile> {
    constructor(value?: ICuratorRoleStakeProfile);
    get stake_id(): StakeId;
}
export declare class CuratorExitInitiationOrigin extends Enum {
    constructor(value?: any, index?: number);
}
export declare type ICuratorExitSummary = {
    origin: CuratorExitInitiationOrigin;
    initiated_at_block_number: BlockNumber;
    rationale_text: Vec<u8>;
};
export declare class CuratorExitSummary extends JoyStruct<ICuratorExitSummary> {
    constructor(value?: ICuratorExitSummary);
}
export declare enum CuratorRoleStakeKeys {
    Active = "Active",
    Unstaking = "Unstaking",
    Exited = "Exited"
}
export declare class CuratorRoleStage extends Enum {
    constructor(value?: any, index?: number);
}
export declare type ICuratorInduction = {
    lead: LeadId;
    curator_application_id: CuratorApplicationId;
    at_block: BlockNumber;
};
export declare class CuratorInduction extends JoyStruct<ICuratorInduction> {
    constructor(value?: ICuratorInduction);
    get lead(): LeadId;
    get curator_application_id(): CuratorApplicationId;
    get at_block(): u32;
}
export declare type ICurator = {
    role_account: AccountId;
    reward_relationship: Option<RewardRelationshipId>;
    role_stake_profile: Option<CuratorRoleStakeProfile>;
    stage: CuratorRoleStage;
    induction: CuratorInduction;
    principal_id: PrincipalId;
};
export declare class Curator extends JoyStruct<ICurator> {
    constructor(value?: ICurator);
    get role_account(): GenericAccountId;
    get reward_relationship(): Option<RewardRelationshipId>;
    get role_stake_profile(): Option<CuratorRoleStakeProfile>;
    get stage(): CuratorRoleStage;
    get induction(): CuratorInduction;
    get principal_id(): PrincipalId;
    get is_active(): boolean;
}
export declare type ICuratorApplication = {
    role_account: AccountId;
    curator_opening_id: CuratorOpeningId;
    member_id: MemberId;
    application_id: ApplicationId;
};
export declare class CuratorApplication extends JoyStruct<ICuratorApplication> {
    constructor(value?: ICuratorApplication);
    get role_account(): GenericAccountId;
    get curator_opening_id(): CuratorOpeningId;
    get member_id(): MemberId;
    get application_id(): ApplicationId;
}
export declare type ISlashableTerms = {
    max_count: u16;
    max_percent_pts_per_time: u16;
};
export declare class SlashableTerms extends JoyStruct<ISlashableTerms> {
    constructor(value?: ISlashableTerms);
}
export declare class SlashingTerms extends Enum {
    constructor(value?: any, index?: number);
}
export declare type IOpeningPolicyCommitment = {
    application_rationing_policy: Option<ApplicationRationingPolicy>;
    max_review_period_length: BlockNumber;
    application_staking_policy: Option<StakingPolicy>;
    role_staking_policy: Option<StakingPolicy>;
    role_slashing_terms: SlashingTerms;
    fill_opening_successful_applicant_application_stake_unstaking_period: Option<BlockNumber>;
    fill_opening_failed_applicant_application_stake_unstaking_period: Option<BlockNumber>;
    fill_opening_failed_applicant_role_stake_unstaking_period: Option<BlockNumber>;
    terminate_curator_application_stake_unstaking_period: Option<BlockNumber>;
    terminate_curator_role_stake_unstaking_period: Option<BlockNumber>;
    exit_curator_role_application_stake_unstaking_period: Option<BlockNumber>;
    exit_curator_role_stake_unstaking_period: Option<BlockNumber>;
};
export declare class OpeningPolicyCommitment extends JoyStruct<IOpeningPolicyCommitment> {
    constructor(value?: IOpeningPolicyCommitment);
    get application_rationing_policy(): Option<ApplicationRationingPolicy>;
    get max_review_period_length(): u32;
    get application_staking_policy(): Option<StakingPolicy>;
    get role_staking_policy(): Option<StakingPolicy>;
    get role_slashing_terms(): SlashingTerms;
    get fill_opening_successful_applicant_application_stake_unstaking_period(): Option<u32>;
    get fill_opening_failed_applicant_application_stake_unstaking_period(): Option<u32>;
    get fill_opening_failed_applicant_role_stake_unstaking_period(): Option<u32>;
    get terminate_curator_application_stake_unstaking_period(): Option<u32>;
    get terminate_curator_role_stake_unstaking_period(): Option<u32>;
    get exit_curator_role_application_stake_unstaking_period(): Option<u32>;
    get exit_curator_role_stake_unstaking_period(): Option<u32>;
}
export declare type ICuratorOpening = {
    opening_id: OpeningId;
    curator_applications: BTreeSet<CuratorApplicationId>;
    policy_commitment: OpeningPolicyCommitment;
};
export declare class CuratorOpening extends JoyStruct<ICuratorOpening> {
    constructor(value?: ICuratorOpening);
    get opening_id(): OpeningId;
}
export declare type IExitedLeadRole = {
    initiated_at_block_number: BlockNumber;
};
export declare class ExitedLeadRole extends JoyStruct<IExitedLeadRole> {
    constructor(value?: IExitedLeadRole);
}
export declare class LeadRoleState extends Enum {
    constructor(value?: any, index?: number);
}
export declare type ILead = {
    role_account: AccountId;
    reward_relationship: Option<RewardRelationshipId>;
    inducted: BlockNumber;
    stage: LeadRoleState;
};
export declare class Lead extends JoyStruct<ILead> {
    constructor(value?: ILead);
    get role_account(): GenericAccountId;
    get reward_relationship(): Option<RewardRelationshipId>;
    get stage(): LeadRoleState;
}
export declare class WorkingGroupUnstaker extends Enum {
    constructor(value?: any, index?: number);
}
export declare class CuratorApplicationIdToCuratorIdMap extends BTreeMap<ApplicationId, CuratorId> {
    constructor(value?: any, index?: number);
}
export declare type IRewardPolicy = {
    amount_per_payout: Balance;
    next_payment_at_block: BlockNumber;
    payout_interval: Option<BlockNumber>;
};
export declare class RewardPolicy extends JoyStruct<IRewardPolicy> {
    constructor(value?: IRewardPolicy);
}
export declare function registerContentWorkingGroupTypes(): void;
export {};
