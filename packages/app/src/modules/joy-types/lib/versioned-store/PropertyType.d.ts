import { u16, Null } from '@polkadot/types';
import { Enum, Tuple } from '@polkadot/types/codec';
import ClassId from './ClassId';
export declare class None extends Null {
}
export declare class Bool extends Null {
}
export declare class Uint16 extends Null {
}
export declare class Uint32 extends Null {
}
export declare class Uint64 extends Null {
}
export declare class Int16 extends Null {
}
export declare class Int32 extends Null {
}
export declare class Int64 extends Null {
}
export declare class Text extends u16 {
}
export declare class Internal extends ClassId {
}
export declare class BoolVec extends u16 {
}
export declare class Uint16Vec extends u16 {
}
export declare class Uint32Vec extends u16 {
}
export declare class Uint64Vec extends u16 {
}
export declare class Int16Vec extends u16 {
}
export declare class Int32Vec extends u16 {
}
export declare class Int64Vec extends u16 {
}
declare const TextVec_base: import("@polkadot/types/types").Constructor<Tuple>;
export declare class TextVec extends TextVec_base {
    static newTypesafe(maxItems: u16 | number, maxTextLength: u16 | number): TextVec;
}
declare const InternalVec_base: import("@polkadot/types/types").Constructor<Tuple>;
export declare class InternalVec extends InternalVec_base {
    static newTypesafe(maxItems: u16 | number, classId: ClassId | number): InternalVec;
}
export declare type PropertyTypeEnum = None | Bool | Uint16 | Uint32 | Uint64 | Int16 | Int32 | Int64 | Text | Internal | BoolVec | Uint16Vec | Uint32Vec | Uint64Vec | Int16Vec | Int32Vec | Int64Vec | TextVec | InternalVec;
declare type PropertyTypeEnumValue = {
    [typeName: string]: PropertyTypeEnum;
};
export declare class PropertyType extends Enum {
    constructor(value?: PropertyTypeEnumValue, index?: number);
}
export default PropertyType;
