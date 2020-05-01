"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parametrized_property_value_1 = require("./parametrized-property-value");
const JoyStruct_1 = require("../../../JoyStruct");
const types_1 = require("@polkadot/types");
class ParametrizedClassPropertyValue extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            in_class_index: types_1.u16,
            value: parametrized_property_value_1.ParametrizedPropertyValue
        }, value);
    }
    get in_class_index() {
        return this.getField('in_class_index');
    }
    get value() {
        return this.getField('value');
    }
}
exports.default = ParametrizedClassPropertyValue;
