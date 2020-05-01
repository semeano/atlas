import { u32, u64, u128, Enum, Null, BTreeMap, bool } from '@polkadot/types';
import { JoyStruct } from '../JoyStruct';
import { BlockNumber, Balance } from '@polkadot/types/interfaces';
export declare class StakeId extends u64 {
}
export declare class SlashId extends u64 {
}
export declare type ISlash = {
    started_at_block: BlockNumber;
    is_active: bool;
    blocks_remaining_in_active_period_for_slashing: BlockNumber;
    slash_amount: Balance;
};
export declare class Slash extends JoyStruct<ISlash> {
    constructor(value?: ISlash);
}
export declare type IUnstakingState = {
    started_at_block: BlockNumber;
    is_active: bool;
    blocks_remaining_in_active_period_for_unstaking: BlockNumber;
};
export declare class UnstakingState extends JoyStruct<IUnstakingState> {
    constructor(value?: IUnstakingState);
}
export declare class Normal extends Null {
}
export declare class Unstaking extends UnstakingState {
}
export declare class StakedStatus extends Enum {
    constructor(value?: any, index?: number);
}
export declare type IStakedState = {
    staked_amount: Balance;
    staked_status: StakedStatus;
    next_slash_id: SlashId;
    ongoing_slashes: BTreeMap<SlashId, Slash>;
};
export declare class StakedState extends JoyStruct<IStakedState> {
    constructor(value?: IStakedState);
    get staked_amount(): u128;
}
export declare class NotStaked extends Null {
}
export declare class Staked extends StakedState {
}
export declare class StakingStatus extends Enum {
    constructor(value?: any, index?: number);
}
export declare type IStake = {
    created: BlockNumber;
    staking_status: StakingStatus;
};
export declare class Stake extends JoyStruct<IStake> {
    constructor(value?: IStake);
    get created(): u32;
    get staking_status(): StakingStatus;
    get value(): Balance;
}
export declare function registerStakeTypes(): void;
