"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const PropertyValue_1 = require("../../PropertyValue");
const parametrized_entity_1 = require("./parametrized-entity");
class PropertyValue extends PropertyValue_1.PropertyValue {
}
exports.PropertyValue = PropertyValue;
class InternalEntityJustAdded extends types_1.u32 {
}
exports.InternalEntityJustAdded = InternalEntityJustAdded;
class InternalEntityVec extends types_1.Vec.with(parametrized_entity_1.ParametrizedEntity) {
}
exports.InternalEntityVec = InternalEntityVec;
class ParametrizedPropertyValue extends types_1.Enum {
    constructor(value, index) {
        super({
            PropertyValue,
            InternalEntityJustAdded,
            InternalEntityVec,
        }, value, index);
    }
    static PropertyValue(value) {
        return new ParametrizedPropertyValue({ 'PropertyValue': new PropertyValue_1.PropertyValue(value) });
    }
    static InternalEntityJustAdded(index) {
        return new ParametrizedPropertyValue({ 'InternalEntityJustAdded': new InternalEntityJustAdded(index) });
    }
    static InternalEntityVec(entities) {
        return new ParametrizedPropertyValue({ 'InternalEntityVec': new InternalEntityVec(entities) });
    }
}
exports.ParametrizedPropertyValue = ParametrizedPropertyValue;
