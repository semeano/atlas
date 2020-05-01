import { Null, u128, u64, u32, Vec, Option, Text } from '@polkadot/types';
import { Enum } from '@polkadot/types/codec';
import { BlockNumber, Balance } from '@polkadot/types/interfaces';
import { StakeId } from '../stake';
import { JoyStruct } from '../JoyStruct';
import { GenericJoyStreamRoleSchema } from './schemas/role.schema.typings';
export declare class ApplicationId extends u64 {
}
export declare class OpeningId extends u64 {
}
export declare class CurrentBlock extends Null {
}
export declare class ExactBlock extends u32 {
}
export declare class ActivateOpeningAt extends Enum {
    constructor(value?: any, index?: number);
}
export declare enum ApplicationDeactivationCauseKeys {
    External = "External",
    Hired = "Hired",
    NotHired = "NotHired",
    CrowdedOut = "CrowdedOut",
    OpeningCancelled = "OpeningCancelled",
    ReviewPeriodExpired = "ReviewPeriodExpired",
    OpeningFilled = "OpeningFilled"
}
export declare class ApplicationDeactivationCause extends Enum {
    constructor(value?: any, index?: number);
}
export declare type UnstakingApplicationStageType = {
    deactivation_initiated: BlockNumber;
    cause: ApplicationDeactivationCause;
};
export declare class UnstakingApplicationStage extends JoyStruct<UnstakingApplicationStageType> {
    constructor(value?: UnstakingApplicationStageType);
    get cause(): ApplicationDeactivationCause;
}
export declare type InactiveApplicationStageType = {
    deactivation_initiated: BlockNumber;
    deactivated: BlockNumber;
    cause: ApplicationDeactivationCause;
};
export declare class InactiveApplicationStage extends JoyStruct<InactiveApplicationStageType> {
    constructor(value?: InactiveApplicationStageType);
    get cause(): ApplicationDeactivationCause;
}
export declare class ActiveApplicationStage extends Null {
}
export declare enum ApplicationStageKeys {
    Active = "Active",
    Unstaking = "Unstaking",
    Inactive = "Inactive"
}
export declare class ApplicationStage extends Enum {
    constructor(value?: any, index?: number);
}
export declare type IApplicationRationingPolicy = {
    max_active_applicants: u32;
};
export declare class ApplicationRationingPolicy extends JoyStruct<IApplicationRationingPolicy> {
    constructor(value?: IApplicationRationingPolicy);
    get max_active_applicants(): u32;
}
export declare type WaitingToBeingOpeningStageVariantType = {
    begins_at_block: BlockNumber;
};
export declare class WaitingToBeingOpeningStageVariant extends JoyStruct<WaitingToBeingOpeningStageVariantType> {
    constructor(value?: WaitingToBeingOpeningStageVariantType);
    get begins_at_block(): BlockNumber;
}
export declare enum OpeningDeactivationCauseKeys {
    CancelledBeforeActivation = "CancelledBeforeActivation",
    CancelledAcceptingApplications = "CancelledAcceptingApplications",
    CancelledInReviewPeriod = "CancelledInReviewPeriod",
    ReviewPeriodExpired = "ReviewPeriodExpired",
    Filled = "Filled"
}
export declare class OpeningDeactivationCause extends Enum {
    constructor(value?: any, index?: number);
}
export declare type IAcceptingApplications = {
    started_accepting_applicants_at_block: BlockNumber;
};
export declare class AcceptingApplications extends JoyStruct<IAcceptingApplications> {
    constructor(value?: IAcceptingApplications);
    get started_accepting_applicants_at_block(): BlockNumber;
}
export declare type IReviewPeriod = {
    started_accepting_applicants_at_block: BlockNumber;
    started_review_period_at_block: BlockNumber;
};
export declare class ReviewPeriod extends JoyStruct<IReviewPeriod> {
    constructor(value?: IReviewPeriod);
    get started_accepting_applicants_at_block(): BlockNumber;
    get started_review_period_at_block(): BlockNumber;
}
export declare type IDeactivated = {
    cause: OpeningDeactivationCause;
    deactivated_at_block: BlockNumber;
    started_accepting_applicants_at_block: BlockNumber;
    started_review_period_at_block: Option<BlockNumber>;
};
export declare class Deactivated extends JoyStruct<IDeactivated> {
    constructor(value?: IDeactivated);
    get cause(): OpeningDeactivationCause;
    get deactivated_at_block(): BlockNumber;
    get started_accepting_applicants_at_block(): BlockNumber;
    get started_review_period_at_block(): BlockNumber;
}
export declare enum ActiveOpeningStageKeys {
    AcceptingApplications = "AcceptingApplications",
    ReviewPeriod = "ReviewPeriod",
    Deactivated = "Deactivated"
}
export declare class ActiveOpeningStage extends Enum {
    constructor(value?: any, index?: number);
}
export declare type ActiveOpeningStageVariantType = {
    stage: ActiveOpeningStage;
    applications_added: Vec<ApplicationId>;
    active_application_count: u32;
    unstaking_application_count: u32;
    deactivated_application_count: u32;
};
export declare class ActiveOpeningStageVariant extends JoyStruct<ActiveOpeningStageVariantType> {
    constructor(value?: ActiveOpeningStageVariantType);
    get stage(): ActiveOpeningStage;
    get is_active(): boolean;
}
export declare enum OpeningStageKeys {
    WaitingToBegin = "WaitingToBegin",
    Active = "Active"
}
export declare class OpeningStage extends Enum {
    constructor(value?: any, index?: number);
}
export declare enum StakingAmountLimitModeKeys {
    AtLeast = "AtLeast",
    Exact = "Exact"
}
export declare class StakingAmountLimitMode extends Enum {
    constructor(value?: any, index?: number);
}
export declare type IStakingPolicy = {
    amount: Balance;
    amount_mode: StakingAmountLimitMode;
    crowded_out_unstaking_period_length: Option<BlockNumber>;
    review_period_expired_unstaking_period_length: Option<BlockNumber>;
};
export declare class StakingPolicy extends JoyStruct<IStakingPolicy> {
    constructor(value?: IStakingPolicy);
    get amount(): u128;
    get amount_mode(): StakingAmountLimitMode;
    get crowded_out_unstaking_period_length(): Option<u32>;
    get review_period_expired_unstaking_period_length(): Option<u32>;
}
export declare type IOpening = {
    created: BlockNumber;
    stage: OpeningStage;
    max_review_period_length: BlockNumber;
    application_rationing_policy: Option<ApplicationRationingPolicy>;
    application_staking_policy: Option<StakingPolicy>;
    role_staking_policy: Option<StakingPolicy>;
    human_readable_text: Text;
};
export declare class Opening extends JoyStruct<IOpening> {
    constructor(value?: IOpening);
    parse_human_readable_text(): GenericJoyStreamRoleSchema | string | undefined;
    get created(): BlockNumber;
    get stage(): OpeningStage;
    get max_review_period_length(): BlockNumber;
    get application_rationing_policy(): Option<ApplicationRationingPolicy>;
    get application_staking_policy(): Option<StakingPolicy>;
    get role_staking_policy(): Option<StakingPolicy>;
    get max_applicants(): number;
    get is_active(): boolean;
}
export declare type IApplication = {
    opening_id: OpeningId;
    application_index_in_opening: u32;
    add_to_opening_in_block: BlockNumber;
    active_role_staking_id: Option<StakeId>;
    active_application_staking_id: Option<StakeId>;
    stage: ApplicationStage;
    human_readable_text: Text;
};
export declare class Application extends JoyStruct<IApplication> {
    constructor(value?: IOpening);
    get stage(): ApplicationStage;
    get active_role_staking_id(): Option<StakeId>;
    get active_application_staking_id(): Option<StakeId>;
    get human_readable_text(): Text;
}
export declare function registerHiringTypes(): void;
