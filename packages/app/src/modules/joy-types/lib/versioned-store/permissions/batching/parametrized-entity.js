"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const EntityId_1 = __importDefault(require("../../EntityId"));
class InternalEntityJustAdded extends types_1.u32 {
}
exports.InternalEntityJustAdded = InternalEntityJustAdded;
class ExistingEntity extends EntityId_1.default {
}
exports.ExistingEntity = ExistingEntity;
class ParametrizedEntity extends types_1.Enum {
    constructor(value, index) {
        super({
            InternalEntityJustAdded,
            ExistingEntity,
        }, value, index);
    }
    static InternalEntityJustAdded(index) {
        return new ParametrizedEntity({ 'InternalEntityJustAdded': new InternalEntityJustAdded(index) });
    }
    static ExistingEntity(entity_id) {
        return new ParametrizedEntity({ 'ExistingEntity': new ExistingEntity(entity_id) });
    }
}
exports.ParametrizedEntity = ParametrizedEntity;
