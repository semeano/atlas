"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JoyStruct_1 = require("../../JoyStruct");
const types_1 = require("@polkadot/types");
const credentials_1 = require("./credentials");
class EntityPermissions extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            update: credentials_1.CredentialSet,
            maintainer_has_all_permissions: types_1.bool
        }, value);
    }
    get update() {
        return this.getField('update');
    }
    get maintainer_has_all_permissions() {
        return this.getField('maintainer_has_all_permissions');
    }
}
exports.default = EntityPermissions;
