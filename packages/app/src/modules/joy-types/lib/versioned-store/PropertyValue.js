"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const codec_1 = require("@polkadot/types/codec");
const EntityId_1 = __importDefault(require("./EntityId"));
class None extends types_1.Null {
}
exports.None = None;
// Single values:
class Bool extends types_1.bool {
}
exports.Bool = Bool;
class Uint16 extends types_1.u16 {
}
exports.Uint16 = Uint16;
class Uint32 extends types_1.u32 {
}
exports.Uint32 = Uint32;
class Uint64 extends types_1.u64 {
}
exports.Uint64 = Uint64;
class Int16 extends types_1.i16 {
}
exports.Int16 = Int16;
class Int32 extends types_1.i32 {
}
exports.Int32 = Int32;
class Int64 extends types_1.i64 {
}
exports.Int64 = Int64;
class Text extends types_1.Text {
}
exports.Text = Text;
class Internal extends EntityId_1.default {
}
exports.Internal = Internal;
// Vectors:
class BoolVec extends types_1.Vec.with(types_1.bool) {
}
exports.BoolVec = BoolVec;
class Uint16Vec extends types_1.Vec.with(types_1.u16) {
}
exports.Uint16Vec = Uint16Vec;
class Uint32Vec extends types_1.Vec.with(types_1.u32) {
}
exports.Uint32Vec = Uint32Vec;
class Uint64Vec extends types_1.Vec.with(types_1.u64) {
}
exports.Uint64Vec = Uint64Vec;
class Int16Vec extends types_1.Vec.with(types_1.i16) {
}
exports.Int16Vec = Int16Vec;
class Int32Vec extends types_1.Vec.with(types_1.i32) {
}
exports.Int32Vec = Int32Vec;
class Int64Vec extends types_1.Vec.with(types_1.i64) {
}
exports.Int64Vec = Int64Vec;
class TextVec extends types_1.Vec.with(types_1.Text) {
}
exports.TextVec = TextVec;
class InternalVec extends types_1.Vec.with(EntityId_1.default) {
}
exports.InternalVec = InternalVec;
class PropertyValue extends codec_1.Enum {
    constructor(value, index) {
        super({
            None,
            // Single values:
            Bool,
            Uint16,
            Uint32,
            Uint64,
            Int16,
            Int32,
            Int64,
            Text,
            Internal,
            // Vectors:
            BoolVec,
            Uint16Vec,
            Uint32Vec,
            Uint64Vec,
            Int16Vec,
            Int32Vec,
            Int64Vec,
            TextVec,
            InternalVec
        }, value, index);
    }
}
exports.PropertyValue = PropertyValue;
exports.default = PropertyValue;
