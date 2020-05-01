import { u64, u128, Option, Enum } from '@polkadot/types';
import { Balance, BlockNumber } from '@polkadot/types/interfaces';
import { JoyStruct } from '../JoyStruct';
export declare class MintId extends u64 {
}
export declare class Setting extends u128 {
}
export declare class Adding extends u128 {
}
export declare class Reducing extends u128 {
}
export declare class AdjustCapacityBy extends Enum {
    constructor(value?: any, index?: number);
}
export declare type IAdjustOnInterval = {
    block_interval: BlockNumber;
    adjustment_type: AdjustCapacityBy;
};
export declare class AdjustOnInterval extends JoyStruct<IAdjustOnInterval> {
    constructor(value?: IAdjustOnInterval);
}
export declare type INextAdjustment = {
    adjustment: AdjustOnInterval;
    at_block: BlockNumber;
};
export declare class NextAdjustment extends JoyStruct<INextAdjustment> {
    constructor(value?: INextAdjustment);
}
export declare type IMint = {
    capacity: Balance;
    next_adjustment: Option<NextAdjustment>;
    created_at: BlockNumber;
    total_minted: Balance;
};
export declare class Mint extends JoyStruct<IMint> {
    constructor(value?: IMint);
}
export declare function registerMintTypes(): void;
