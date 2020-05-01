"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const JoyStruct_1 = require("../JoyStruct");
const mint_1 = require("../mint");
class RecipientId extends types_1.u64 {
}
exports.RecipientId = RecipientId;
;
class RewardRelationshipId extends types_1.u64 {
}
exports.RewardRelationshipId = RewardRelationshipId;
;
class Recipient extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            total_reward_received: types_1.u128,
            total_reward_missed: types_1.u128,
        }, value);
    }
    get total_reward_received() {
        return this.getField('total_reward_received');
    }
    get total_reward_missed() {
        return this.getField('total_reward_missed');
    }
}
exports.Recipient = Recipient;
;
class RewardRelationship extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            recipient: RecipientId,
            mint_id: mint_1.MintId,
            account: types_1.GenericAccountId,
            amount_per_payout: types_1.u128,
            next_payment_at_block: types_1.Option.with(types_1.u32),
            payout_interval: types_1.Option.with(types_1.u32),
            total_reward_received: types_1.u128,
            total_reward_missed: types_1.u128,
        }, value);
    }
    get recipient() {
        return this.getField('recipient');
    }
}
exports.RewardRelationship = RewardRelationship;
;
function registerRecurringRewardsTypes() {
    try {
        types_1.getTypeRegistry().register({
            RecipientId: 'u64',
            RewardRelationshipId: 'u64',
            Recipient,
            RewardRelationship
        });
    }
    catch (err) {
        console.error('Failed to register custom types of recurring rewards module', err);
    }
}
exports.registerRecurringRewardsTypes = registerRecurringRewardsTypes;
