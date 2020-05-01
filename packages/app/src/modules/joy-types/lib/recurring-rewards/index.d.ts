import { u64, u128, Option } from '@polkadot/types';
import { AccountId, Balance, BlockNumber } from '@polkadot/types/interfaces';
import { JoyStruct } from '../JoyStruct';
import { MintId } from '../mint';
export declare class RecipientId extends u64 {
}
export declare class RewardRelationshipId extends u64 {
}
export declare type IRecipient = {
    total_reward_received: Balance;
    total_reward_missed: Balance;
};
export declare class Recipient extends JoyStruct<IRecipient> {
    constructor(value?: IRecipient);
    get total_reward_received(): u128;
    get total_reward_missed(): u128;
}
export declare type IRewardRelationship = {
    recipient: RecipientId;
    mint_id: MintId;
    account: AccountId;
    amount_per_payout: Balance;
    next_payment_at_block: Option<BlockNumber>;
    payout_interval: Option<BlockNumber>;
    total_reward_received: Balance;
    total_reward_missed: Balance;
};
export declare class RewardRelationship extends JoyStruct<IRewardRelationship> {
    constructor(value?: IRecipient);
    get recipient(): RecipientId;
}
export declare function registerRecurringRewardsTypes(): void;
