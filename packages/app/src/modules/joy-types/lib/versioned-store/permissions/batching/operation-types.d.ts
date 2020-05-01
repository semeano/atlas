import { Enum, u16 } from '@polkadot/types';
import { CreateEntityOperation, UpdatePropertyValuesOperation, AddSchemaSupportToEntityOperation, ParameterizedClassPropertyValues } from './operations';
import ClassId from '../../ClassId';
import { ParametrizedEntity } from './parametrized-entity';
export declare class CreateEntity extends CreateEntityOperation {
}
export declare class UpdatePropertyValues extends UpdatePropertyValuesOperation {
}
export declare class AddSchemaSupportToEntity extends AddSchemaSupportToEntityOperation {
}
export declare type OperationTypeVariant = CreateEntity | UpdatePropertyValues | AddSchemaSupportToEntity;
declare type OperationTypeVariantValue = {
    [typeName: string]: OperationTypeVariant;
};
export declare class OperationType extends Enum {
    constructor(value?: OperationTypeVariantValue, index?: number);
    static CreateEntity(class_id: ClassId): OperationType;
    static UpdatePropertyValues(entity_id: ParametrizedEntity, parametrized_property_values: ParameterizedClassPropertyValues): OperationType;
    static AddSchemaSupportToEntity(entity_id: ParametrizedEntity, schema_id: u16, parametrized_property_values: ParameterizedClassPropertyValues): OperationType;
}
export {};
