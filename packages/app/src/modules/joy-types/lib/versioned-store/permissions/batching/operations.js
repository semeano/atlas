"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClassId_1 = __importDefault(require("../../ClassId"));
const JoyStruct_1 = require("../../../JoyStruct");
const parametrized_entity_1 = require("./parametrized-entity");
const types_1 = require("@polkadot/types");
const ParametrizedClassPropertyValue_1 = __importDefault(require("./ParametrizedClassPropertyValue"));
// TODO Rename to ParametrizedClassPropertyValue
class ParameterizedClassPropertyValues extends types_1.Vec.with(ParametrizedClassPropertyValue_1.default) {
}
exports.ParameterizedClassPropertyValues = ParameterizedClassPropertyValues;
class CreateEntityOperation extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            class_id: ClassId_1.default,
        }, value);
    }
    get class_id() {
        return this.getField('class_id');
    }
}
exports.CreateEntityOperation = CreateEntityOperation;
class UpdatePropertyValuesOperation extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            entity_id: parametrized_entity_1.ParametrizedEntity,
            parametrized_property_values: ParameterizedClassPropertyValues
        }, value);
    }
    get entity_id() {
        return this.getField('entity_id');
    }
    get property_values() {
        return this.getField('parametrized_property_values');
    }
}
exports.UpdatePropertyValuesOperation = UpdatePropertyValuesOperation;
class AddSchemaSupportToEntityOperation extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            entity_id: parametrized_entity_1.ParametrizedEntity,
            schema_id: types_1.u16,
            parametrized_property_values: ParameterizedClassPropertyValues
        }, value);
    }
    get entity_id() {
        return this.getField('entity_id');
    }
    get property_values() {
        return this.getField('parametrized_property_values');
    }
    get schema_id() {
        return this.getField('schema_id');
    }
}
exports.AddSchemaSupportToEntityOperation = AddSchemaSupportToEntityOperation;
