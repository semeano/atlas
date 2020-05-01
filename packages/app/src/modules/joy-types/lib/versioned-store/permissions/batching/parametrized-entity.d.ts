import { Enum, u32 } from '@polkadot/types';
import EntityId from '../../EntityId';
export declare class InternalEntityJustAdded extends u32 {
}
export declare class ExistingEntity extends EntityId {
}
export declare type ParametrizedEntityVariant = InternalEntityJustAdded | ExistingEntity;
declare type ParametrizedEntityValue = {
    [typeName: string]: ParametrizedEntityVariant;
};
export declare class ParametrizedEntity extends Enum {
    constructor(value?: ParametrizedEntityValue, index?: number);
    static InternalEntityJustAdded(index: u32): ParametrizedEntity;
    static ExistingEntity(entity_id: EntityId): ParametrizedEntity;
}
export {};
