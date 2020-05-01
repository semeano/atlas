"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const credentials_1 = require("./credentials");
const EntityPermissions_1 = __importDefault(require("./EntityPermissions"));
const reference_constraint_1 = require("./reference-constraint");
const ClassPermissions_1 = __importDefault(require("./ClassPermissions"));
const batching_1 = require("./batching/");
function registerVersionedStorePermissionsTypes() {
    try {
        types_1.getTypeRegistry().register({
            Credential: credentials_1.Credential,
            CredentialSet: credentials_1.CredentialSet,
            EntityPermissions: EntityPermissions_1.default,
            ReferenceConstraint: reference_constraint_1.ReferenceConstraint,
            ClassPermissionsType: ClassPermissions_1.default,
            Operation: batching_1.Operation,
        });
    }
    catch (err) {
        console.error('Failed to register custom types of versioned store module', err);
    }
}
exports.registerVersionedStorePermissionsTypes = registerVersionedStorePermissionsTypes;
