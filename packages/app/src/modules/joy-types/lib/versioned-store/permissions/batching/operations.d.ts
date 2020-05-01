import ClassId from "../../ClassId";
import { JoyStruct } from '../../../JoyStruct';
import { ParametrizedEntity } from "./parametrized-entity";
import { Vec, u16 } from "@polkadot/types";
import ParametrizedClassPropertyValue from "./ParametrizedClassPropertyValue";
declare const ParameterizedClassPropertyValues_base: import("@polkadot/types/types").Constructor<Vec<ParametrizedClassPropertyValue>>;
export declare class ParameterizedClassPropertyValues extends ParameterizedClassPropertyValues_base {
}
export declare type ICreateEntityOperation = {
    class_id: ClassId;
};
export declare type IUpdatePropertyValuesOperation = {
    entity_id: ParametrizedEntity;
    parametrized_property_values: ParameterizedClassPropertyValues;
};
export declare type IAddSchemaSupportToEntityOperation = {
    entity_id: ParametrizedEntity;
    schema_id: u16;
    parametrized_property_values: ParameterizedClassPropertyValues;
};
export declare class CreateEntityOperation extends JoyStruct<ICreateEntityOperation> {
    constructor(value: ICreateEntityOperation);
    get class_id(): ClassId;
}
export declare class UpdatePropertyValuesOperation extends JoyStruct<IUpdatePropertyValuesOperation> {
    constructor(value: IUpdatePropertyValuesOperation);
    get entity_id(): ParametrizedEntity;
    get property_values(): ParameterizedClassPropertyValues;
}
export declare class AddSchemaSupportToEntityOperation extends JoyStruct<IAddSchemaSupportToEntityOperation> {
    constructor(value: IAddSchemaSupportToEntityOperation);
    get entity_id(): ParametrizedEntity;
    get property_values(): ParameterizedClassPropertyValues;
    get schema_id(): u16;
}
export {};
