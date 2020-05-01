"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const operations_1 = require("./operations");
class CreateEntity extends operations_1.CreateEntityOperation {
}
exports.CreateEntity = CreateEntity;
class UpdatePropertyValues extends operations_1.UpdatePropertyValuesOperation {
}
exports.UpdatePropertyValues = UpdatePropertyValues;
class AddSchemaSupportToEntity extends operations_1.AddSchemaSupportToEntityOperation {
}
exports.AddSchemaSupportToEntity = AddSchemaSupportToEntity;
class OperationType extends types_1.Enum {
    constructor(value, index) {
        super({
            CreateEntity,
            UpdatePropertyValues,
            AddSchemaSupportToEntity,
        }, value, index);
    }
    static CreateEntity(class_id) {
        let value = new CreateEntity({ class_id });
        return new OperationType({ 'CreateEntity': value });
    }
    static UpdatePropertyValues(entity_id, parametrized_property_values) {
        let value = new UpdatePropertyValues({
            entity_id,
            parametrized_property_values,
        });
        return new OperationType({ 'UpdatePropertyValues': value });
    }
    static AddSchemaSupportToEntity(entity_id, schema_id, parametrized_property_values) {
        let value = new AddSchemaSupportToEntity({
            entity_id,
            schema_id,
            parametrized_property_values
        });
        return new OperationType({ 'AddSchemaSupportToEntity': value });
    }
}
exports.OperationType = OperationType;
