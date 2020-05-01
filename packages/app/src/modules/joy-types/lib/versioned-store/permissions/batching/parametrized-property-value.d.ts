import { Enum, u32, Vec } from '@polkadot/types';
import { PropertyValue as VersionedStorePropertyValue, PropertyValueEnumValue } from '../../PropertyValue';
import { ParametrizedEntity } from './parametrized-entity';
export declare class PropertyValue extends VersionedStorePropertyValue {
}
export declare class InternalEntityJustAdded extends u32 {
}
declare const InternalEntityVec_base: import("@polkadot/types/types").Constructor<Vec<ParametrizedEntity>>;
export declare class InternalEntityVec extends InternalEntityVec_base {
}
export declare type ParametrizedPropertyValueVariant = PropertyValue | InternalEntityJustAdded | InternalEntityVec;
declare type ParametrizedPropertyValueType = {
    [typeName: string]: ParametrizedPropertyValueVariant;
};
export declare class ParametrizedPropertyValue extends Enum {
    constructor(value?: ParametrizedPropertyValueType, index?: number);
    static PropertyValue(value: PropertyValueEnumValue): ParametrizedPropertyValue;
    static InternalEntityJustAdded(index: number | u32): ParametrizedPropertyValue;
    static InternalEntityVec(entities: ParametrizedEntity[] | Vec<ParametrizedEntity>): ParametrizedPropertyValue;
}
export {};
