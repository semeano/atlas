import { Vec as Vector, Text as PolkaText, bool as PolkaBool, Null, u16, u32, u64, i16, i32, i64 } from '@polkadot/types';
import { Enum } from '@polkadot/types/codec';
import EntityId from './EntityId';
export declare class None extends Null {
}
export declare class Bool extends PolkaBool {
}
export declare class Uint16 extends u16 {
}
export declare class Uint32 extends u32 {
}
export declare class Uint64 extends u64 {
}
export declare class Int16 extends i16 {
}
export declare class Int32 extends i32 {
}
export declare class Int64 extends i64 {
}
export declare class Text extends PolkaText {
}
export declare class Internal extends EntityId {
}
declare const BoolVec_base: import("@polkadot/types/types").Constructor<Vector<PolkaBool>>;
export declare class BoolVec extends BoolVec_base {
}
declare const Uint16Vec_base: import("@polkadot/types/types").Constructor<Vector<u16>>;
export declare class Uint16Vec extends Uint16Vec_base {
}
declare const Uint32Vec_base: import("@polkadot/types/types").Constructor<Vector<u32>>;
export declare class Uint32Vec extends Uint32Vec_base {
}
declare const Uint64Vec_base: import("@polkadot/types/types").Constructor<Vector<u64>>;
export declare class Uint64Vec extends Uint64Vec_base {
}
declare const Int16Vec_base: import("@polkadot/types/types").Constructor<Vector<i16>>;
export declare class Int16Vec extends Int16Vec_base {
}
declare const Int32Vec_base: import("@polkadot/types/types").Constructor<Vector<i32>>;
export declare class Int32Vec extends Int32Vec_base {
}
declare const Int64Vec_base: import("@polkadot/types/types").Constructor<Vector<i64>>;
export declare class Int64Vec extends Int64Vec_base {
}
declare const TextVec_base: import("@polkadot/types/types").Constructor<Vector<PolkaText>>;
export declare class TextVec extends TextVec_base {
}
declare const InternalVec_base: import("@polkadot/types/types").Constructor<Vector<EntityId>>;
export declare class InternalVec extends InternalVec_base {
}
export declare type PropertyValueEnum = None | Bool | Uint16 | Uint32 | Uint64 | Int16 | Int32 | Int64 | Text | Internal | BoolVec | Uint16Vec | Uint32Vec | Uint64Vec | Int16Vec | Int32Vec | Int64Vec | TextVec | InternalVec;
export declare type PropertyValueEnumValue = {
    [typeName: string]: PropertyValueEnum;
};
export declare class PropertyValue extends Enum {
    constructor(value?: PropertyValueEnumValue, index?: number);
}
export default PropertyValue;
