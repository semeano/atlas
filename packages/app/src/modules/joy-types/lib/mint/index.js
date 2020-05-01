"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const JoyStruct_1 = require("../JoyStruct");
class MintId extends types_1.u64 {
}
exports.MintId = MintId;
;
class Setting extends types_1.u128 {
}
exports.Setting = Setting;
;
class Adding extends types_1.u128 {
}
exports.Adding = Adding;
;
class Reducing extends types_1.u128 {
}
exports.Reducing = Reducing;
;
class AdjustCapacityBy extends types_1.Enum {
    constructor(value, index) {
        super({
            Setting,
            Adding,
            Reducing
        }, value, index);
    }
}
exports.AdjustCapacityBy = AdjustCapacityBy;
;
class AdjustOnInterval extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            block_interval: types_1.u32,
            adjustment_type: AdjustCapacityBy,
        }, value);
    }
}
exports.AdjustOnInterval = AdjustOnInterval;
;
class NextAdjustment extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            adjustment: AdjustOnInterval,
            at_block: types_1.u32,
        }, value);
    }
}
exports.NextAdjustment = NextAdjustment;
;
class Mint extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            capacity: types_1.u128,
            next_adjustment: types_1.Option.with(NextAdjustment),
            created_at: types_1.u32,
            total_minted: types_1.u128,
        }, value);
    }
}
exports.Mint = Mint;
;
function registerMintTypes() {
    try {
        types_1.getTypeRegistry().register({
            MintId: 'u64',
            Mint,
            'minting::BalanceOf': 'Balance'
        });
    }
    catch (err) {
        console.error('Failed to register custom types of mint module', err);
    }
}
exports.registerMintTypes = registerMintTypes;
