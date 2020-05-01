"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const JoyStruct_1 = require("../JoyStruct");
class StakeId extends types_1.u64 {
}
exports.StakeId = StakeId;
;
class SlashId extends types_1.u64 {
}
exports.SlashId = SlashId;
;
class Slash extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            started_at_block: types_1.u32,
            is_active: types_1.bool,
            blocks_remaining_in_active_period_for_slashing: types_1.u32,
            slash_amount: types_1.u128,
        }, value);
    }
}
exports.Slash = Slash;
;
class UnstakingState extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            started_at_block: types_1.u32,
            is_active: types_1.bool,
            blocks_remaining_in_active_period_for_unstaking: types_1.u32,
        }, value);
    }
}
exports.UnstakingState = UnstakingState;
;
class Normal extends types_1.Null {
}
exports.Normal = Normal;
;
class Unstaking extends UnstakingState {
}
exports.Unstaking = Unstaking;
;
class StakedStatus extends types_1.Enum {
    constructor(value, index) {
        super({
            Normal,
            Unstaking
        }, value, index);
    }
}
exports.StakedStatus = StakedStatus;
;
class StakedState extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            staked_amount: types_1.u128,
            staked_status: StakedStatus,
            next_slash_id: SlashId,
            ongoing_slashes: types_1.BTreeMap.with(SlashId, Slash),
        }, value);
    }
    get staked_amount() {
        return this.getField('staked_amount');
    }
}
exports.StakedState = StakedState;
;
class NotStaked extends types_1.Null {
}
exports.NotStaked = NotStaked;
;
class Staked extends StakedState {
}
exports.Staked = Staked;
;
class StakingStatus extends types_1.Enum {
    constructor(value, index) {
        super({
            NotStaked,
            Staked,
        }, value, index);
    }
}
exports.StakingStatus = StakingStatus;
;
class Stake extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            created: types_1.u32,
            staking_status: StakingStatus
        }, value);
    }
    get created() {
        return this.getField('created');
    }
    get staking_status() {
        return this.getField('staking_status');
    }
    get value() {
        switch (this.staking_status.type) {
            case "Staked":
                return this.staking_status.value.staked_amount;
        }
        return new types_1.u128(0);
    }
}
exports.Stake = Stake;
function registerStakeTypes() {
    try {
        types_1.getTypeRegistry().register({
            StakeId: 'u64',
            Stake,
        });
    }
    catch (err) {
        console.error('Failed to register custom types of stake module', err);
    }
}
exports.registerStakeTypes = registerStakeTypes;
