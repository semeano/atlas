"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codec_1 = require("@polkadot/types/codec");
class JoyStruct extends codec_1.Struct {
    getField(name) {
        return super.get(name);
    }
    getString(name) {
        return this.getField(name).toString();
    }
    getBoolean(name) {
        return this.getField(name).valueOf();
    }
    getEnumAsString(name) {
        return this.getField(name).toString();
    }
    unwrapOrUndefined(name) {
        return this.getField(name).unwrapOr(undefined);
    }
    getOptionalString(name) {
        const text = this.unwrapOrUndefined(name);
        return text ? text.toString() : undefined;
    }
    cloneValues() {
        const objectClone = {};
        super.forEach((v, k) => {
            objectClone[k] = v; // shallow copy acceptable ?
        });
        return objectClone;
    }
}
exports.JoyStruct = JoyStruct;
