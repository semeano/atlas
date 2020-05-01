"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JoyStruct_1 = require("../../../JoyStruct");
const operation_types_1 = require("./operation-types");
const types_1 = require("@polkadot/types");
const credentials_1 = require("../credentials");
class Operation extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            with_credential: types_1.Option.with(credentials_1.Credential),
            as_entity_maintainer: types_1.bool,
            operation_type: operation_types_1.OperationType,
        }, value);
    }
    get with_credential() {
        return this.getField('with_credential');
    }
    get as_entity_maintainer() {
        return this.getField('as_entity_maintainer');
    }
    get operation_type() {
        return this.getField('operation_type');
    }
}
exports.Operation = Operation;
