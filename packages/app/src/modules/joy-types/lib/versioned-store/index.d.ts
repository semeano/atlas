import { u16, Text, bool as Bool } from '@polkadot/types';
import { Vec as Vector } from '@polkadot/types/codec';
import { JoyStruct } from '../JoyStruct';
import PropertyType from './PropertyType';
import PropertyValue from './PropertyValue';
import ClassId from './ClassId';
import EntityId from './EntityId';
export { ClassId, EntityId, PropertyType, PropertyValue };
export declare type InputValidationLengthConstraintType = {
    min: u16;
    max_min_diff: u16;
};
export declare class InputValidationLengthConstraint extends JoyStruct<InputValidationLengthConstraintType> {
    constructor(value: InputValidationLengthConstraintType);
    get min(): u16;
    get max_min_diff(): u16;
    get max(): u16;
}
export declare type PropertyTsType = {
    prop_type: PropertyType;
    required: Bool;
    name: Text;
    description: Text;
};
export declare class Property extends JoyStruct<PropertyTsType> {
    constructor(value: PropertyTsType);
    get prop_type(): PropertyType;
    get required(): boolean;
    get name(): string;
    get description(): string;
}
declare const VecProperty_base: import("@polkadot/types/types").Constructor<Vector<Property>>;
export declare class VecProperty extends VecProperty_base {
}
declare const VecU16_base: import("@polkadot/types/types").Constructor<Vector<u16>>;
export declare class VecU16 extends VecU16_base {
}
export declare type ClassSchemaType = {
    properties: VecU16;
};
export declare class ClassSchema extends JoyStruct<ClassSchemaType> {
    constructor(value: ClassSchemaType);
    get properties(): VecU16;
}
declare const VecClassSchema_base: import("@polkadot/types/types").Constructor<Vector<ClassSchema>>;
export declare class VecClassSchema extends VecClassSchema_base {
}
export declare type ClassPropertyValueType = {
    in_class_index: u16;
    value: PropertyValue;
};
export declare class ClassPropertyValue extends JoyStruct<ClassPropertyValueType> {
    constructor(value: ClassPropertyValueType);
    get in_class_index(): u16;
    get value(): PropertyValue;
}
declare const VecClassPropertyValue_base: import("@polkadot/types/types").Constructor<Vector<ClassPropertyValue>>;
export declare class VecClassPropertyValue extends VecClassPropertyValue_base {
}
export declare type ClassType = {
    id: ClassId;
    properties: VecProperty;
    schemas: VecClassSchema;
    name: Text;
    description: Text;
};
export declare class Class extends JoyStruct<ClassType> {
    constructor(value: ClassType);
    get id(): ClassId;
    get properties(): VecProperty;
    get schemas(): VecClassSchema;
    get name(): string;
    get description(): string;
}
export declare type EntityType = {
    id: EntityId;
    class_id: ClassId;
    in_class_schema_indexes: VecU16;
    values: VecClassPropertyValue;
};
export declare class Entity extends JoyStruct<EntityType> {
    constructor(value: EntityType);
    get id(): EntityId;
    get class_id(): ClassId;
    get in_class_schema_indexes(): VecU16;
    /** NOTE: Renamed to `entity_values` because `values` is already in use. */
    get entity_values(): VecClassPropertyValue;
}
export interface ClassIdByNameMap {
    ContentLicense?: ClassId;
    CurationStatus?: ClassId;
    FeaturedContent?: ClassId;
    Language?: ClassId;
    MediaObject?: ClassId;
    MusicAlbum?: ClassId;
    MusicGenre?: ClassId;
    MusicMood?: ClassId;
    MusicTheme?: ClassId;
    MusicTrack?: ClassId;
    PublicationStatus?: ClassId;
    Video?: ClassId;
    VideoCategory?: ClassId;
}
export declare type ClassName = keyof ClassIdByNameMap;
export declare function unifyClassName(className: string): ClassName;
export declare function unifyPropName(propName: string): string;
export declare function registerVersionedStoreTypes(): void;
