"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
class Credential extends types_1.u64 {
}
exports.Credential = Credential;
class CredentialSet extends types_1.Vec.with(Credential) {
} // BtreeSet ?
exports.CredentialSet = CredentialSet;
