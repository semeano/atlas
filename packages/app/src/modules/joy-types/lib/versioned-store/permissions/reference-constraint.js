"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const PropertyOfClass_1 = __importDefault(require("./PropertyOfClass"));
class NoReferencingAllowed extends types_1.Null {
}
exports.NoReferencingAllowed = NoReferencingAllowed;
class NoConstraint extends types_1.Null {
}
exports.NoConstraint = NoConstraint;
class Restricted extends types_1.Vec.with(PropertyOfClass_1.default) {
} // BtreeSet ?
exports.Restricted = Restricted;
class ReferenceConstraint extends types_1.Enum {
    constructor(value, index) {
        super({
            NoReferencingAllowed,
            NoConstraint,
            Restricted,
        }, value, index);
    }
    static NoReferencingAllowed() {
        return new ReferenceConstraint({ 'NoReferencingAllowed': new NoReferencingAllowed() });
    }
    static NoConstraint() {
        return new ReferenceConstraint({ 'NoConstraint': new NoConstraint() });
    }
    static Restricted(restrictions) {
        return new ReferenceConstraint({ 'Restricted': new Restricted(restrictions) });
    }
}
exports.ReferenceConstraint = ReferenceConstraint;
