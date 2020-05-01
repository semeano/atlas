"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const codec_1 = require("@polkadot/types/codec");
const JoyStruct_1 = require("../JoyStruct");
const PropertyType_1 = __importDefault(require("./PropertyType"));
exports.PropertyType = PropertyType_1.default;
const PropertyValue_1 = __importDefault(require("./PropertyValue"));
exports.PropertyValue = PropertyValue_1.default;
const ClassId_1 = __importDefault(require("./ClassId"));
exports.ClassId = ClassId_1.default;
const EntityId_1 = __importDefault(require("./EntityId"));
exports.EntityId = EntityId_1.default;
const lodash_1 = require("lodash");
class InputValidationLengthConstraint extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            min: types_1.u16,
            max_min_diff: types_1.u16
        }, value);
    }
    get min() {
        return this.getField('min');
    }
    get max_min_diff() {
        return this.getField('max_min_diff');
    }
    get max() {
        return new types_1.u16(this.min.add(this.max_min_diff));
    }
}
exports.InputValidationLengthConstraint = InputValidationLengthConstraint;
class Property extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            prop_type: PropertyType_1.default,
            required: types_1.bool,
            name: types_1.Text,
            description: types_1.Text
        }, value);
    }
    get prop_type() {
        return this.getField('prop_type');
    }
    get required() {
        return this.getBoolean('required');
    }
    get name() {
        return this.getString('name');
    }
    get description() {
        return this.getString('description');
    }
}
exports.Property = Property;
class VecProperty extends codec_1.Vec.with(Property) {
}
exports.VecProperty = VecProperty;
class VecU16 extends codec_1.Vec.with(types_1.u16) {
}
exports.VecU16 = VecU16;
class ClassSchema extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            properties: VecU16
        }, value);
    }
    get properties() {
        return this.getField('properties');
    }
}
exports.ClassSchema = ClassSchema;
class VecClassSchema extends codec_1.Vec.with(ClassSchema) {
}
exports.VecClassSchema = VecClassSchema;
class ClassPropertyValue extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            in_class_index: types_1.u16,
            value: PropertyValue_1.default
        }, value);
    }
    get in_class_index() {
        return this.getField('in_class_index');
    }
    get value() {
        return this.getField('value');
    }
}
exports.ClassPropertyValue = ClassPropertyValue;
class VecClassPropertyValue extends codec_1.Vec.with(ClassPropertyValue) {
}
exports.VecClassPropertyValue = VecClassPropertyValue;
class Class extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            id: ClassId_1.default,
            properties: VecProperty,
            schemas: VecClassSchema,
            name: types_1.Text,
            description: types_1.Text
        }, value);
    }
    get id() {
        return this.getField('id');
    }
    get properties() {
        return this.getField('properties');
    }
    get schemas() {
        return this.getField('schemas');
    }
    get name() {
        return this.getString('name');
    }
    get description() {
        return this.getString('description');
    }
}
exports.Class = Class;
class Entity extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            id: EntityId_1.default,
            class_id: ClassId_1.default,
            in_class_schema_indexes: VecU16,
            values: VecClassPropertyValue
        }, value);
    }
    get id() {
        return this.getField('id');
    }
    get class_id() {
        return this.getField('class_id');
    }
    get in_class_schema_indexes() {
        return this.getField('in_class_schema_indexes');
    }
    /** NOTE: Renamed to `entity_values` because `values` is already in use. */
    get entity_values() {
        return this.getField('values');
    }
}
exports.Entity = Entity;
function unifyClassName(className) {
    return lodash_1.upperFirst(lodash_1.camelCase(className));
}
exports.unifyClassName = unifyClassName;
function unifyPropName(propName) {
    return lodash_1.camelCase(propName);
}
exports.unifyPropName = unifyPropName;
function registerVersionedStoreTypes() {
    try {
        types_1.getTypeRegistry().register({
            InputValidationLengthConstraint,
            ClassId: 'u64',
            EntityId: 'u64',
            Class,
            Entity,
            ClassSchema,
            Property,
            PropertyType: PropertyType_1.default,
            PropertyValue: PropertyValue_1.default,
            ClassPropertyValue
        });
    }
    catch (err) {
        console.error('Failed to register custom types of Versioned Store module', err);
    }
}
exports.registerVersionedStoreTypes = registerVersionedStoreTypes;
