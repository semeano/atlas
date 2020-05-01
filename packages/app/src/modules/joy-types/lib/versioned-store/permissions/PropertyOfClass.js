"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JoyStruct_1 = require("../../JoyStruct");
const ClassId_1 = __importDefault(require("../ClassId"));
const types_1 = require("@polkadot/types");
class PropertyOfClass extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            class_id: ClassId_1.default,
            property_index: types_1.u16
        }, value);
    }
    get class_id() {
        return this.getField('class_id');
    }
    get property_index() {
        return this.getField('property_index');
    }
}
exports.default = PropertyOfClass;
