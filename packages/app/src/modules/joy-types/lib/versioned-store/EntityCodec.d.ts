import { Class, Entity, VecClassPropertyValue, EntityId, ClassId } from '.';
import { ChannelId } from '../content-working-group';
interface HasTypeField {
    type: string;
}
export declare function isInternalProp(field: HasTypeField): boolean;
export declare function isInternalVecProp(field: HasTypeField): boolean;
export declare type PlainEntity = {
    classId: number;
    inClassSchemaIndexes: number[];
    id: number;
    [propName: string]: any;
};
export declare type TextValueEntity = PlainEntity & {
    value: string;
};
export declare class EntityCodecResolver {
    private codecByClassIdMap;
    constructor(classes: Class[]);
    getCodecByClassId<C extends EntityCodec<any>>(classId: ClassId): C | undefined;
}
declare type EntityType = any;
declare type ChannelEntity = any;
export interface ToPlainObjectProps {
    loadInternals?: boolean;
    loadEntityById?: (id: EntityId) => Promise<EntityType | undefined>;
    loadChannelById?: (id: ChannelId) => Promise<ChannelEntity | undefined>;
}
export declare abstract class EntityCodec<T extends PlainEntity> {
    private propNameToMetaMap;
    private propIndexToNameMap;
    constructor(entityClass: Class);
    inClassIndexOfProp(propName: string): number | undefined;
    /**
     * Converts an entity of Substrate codec type to a plain JS object.
     */
    toPlainObject(entity: Entity, props?: ToPlainObjectProps): Promise<T | undefined>;
    /**
     * Converts an object with updated property values to a Substrate vector
     * that can be passed to the extrinsic `update_entity_property_values`
     * of Substrate runtime module `substrate-versioned-store`.
     */
    toSubstrateUpdate(updatedProps: Partial<{
        [propName: string]: any;
    }>): VecClassPropertyValue;
}
/** This class is created just to satisfy TypeScript in some cases */
export declare class AnyEntityCodec extends EntityCodec<any> {
}
export {};
