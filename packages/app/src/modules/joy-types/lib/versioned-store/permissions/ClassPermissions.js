"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JoyStruct_1 = require("../../JoyStruct");
const types_1 = require("@polkadot/types");
const EntityPermissions_1 = __importDefault(require("./EntityPermissions"));
const credentials_1 = require("./credentials");
const reference_constraint_1 = require("./reference-constraint");
class ClassPermissionsType extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            entity_permissions: EntityPermissions_1.default,
            entities_can_be_created: types_1.bool,
            add_schemas: credentials_1.CredentialSet,
            create_entities: credentials_1.CredentialSet,
            reference_constraint: reference_constraint_1.ReferenceConstraint,
            admins: credentials_1.CredentialSet,
            last_permissions_update: types_1.u32,
        }, value);
    }
    get entity_permissions() {
        return this.getField('entity_permissions');
    }
    get entities_can_be_created() {
        return this.getField('entities_can_be_created');
    }
    get add_schemas() {
        return this.getField('add_schemas');
    }
    get create_entities() {
        return this.getField('create_entities');
    }
    get reference_constraint() {
        return this.getField('reference_constraint');
    }
    get admins() {
        return this.getField('admins');
    }
    get last_permissions_update() {
        return this.getField('last_permissions_update');
    }
}
exports.default = ClassPermissionsType;
