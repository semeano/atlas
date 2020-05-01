"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bn_js_1 = __importDefault(require("bn.js"));
const types_1 = require("@polkadot/types");
const PV = __importStar(require("./PropertyValue"));
const PropertyValue_1 = require("./PropertyValue");
const _1 = require(".");
/**
 * Convert a Substrate value to a plain JavaScript value of a corresponding type
 * like string, number, boolean, etc.
 */
function substrateToPlain(x) {
    let res = undefined;
    if (x instanceof PV.None) {
        res = undefined;
    }
    else if (x instanceof types_1.Text) {
        res = x.toString();
    }
    else if (x instanceof bn_js_1.default) {
        res = x.toNumber();
    }
    else if (x instanceof types_1.bool) {
        res = x.valueOf();
    }
    else if (x instanceof types_1.Vec) {
        res = x.map(y => substrateToPlain(y));
    }
    else if (typeof x !== undefined && x !== null) {
        res = x.toString();
    }
    return res;
}
/**
 * Convert a plain JavaScript value of such type as string, number, boolean
 * to Substrate equivalent in Versioned Store module.
 *
 * Based on code of transformPropertyValue from another Joystream repo:
 * /versioned-store-js/src/transformPropertyValue.ts
 *
 * @throws Error
 */
function plainToSubstrate(propType, value) {
    const ok = (typeEnum) => {
        return new PropertyValue_1.PropertyValue({ [propType]: typeEnum });
    };
    const valueAsBool = () => {
        if (typeof value === 'string' || typeof value === 'number') {
            value = value.toString().toLowerCase();
            if (['true', 'yes', '1'].indexOf(value) >= 0) {
                return true;
            }
            return false;
        }
        else if (typeof value === 'boolean') {
            return value;
        }
        else {
            throw new Error('Unsupported representation of a boolean value: ' + value);
        }
    };
    const valueAsBoolArr = () => {
        return value.map(valueAsBool);
    };
    switch (propType) {
        // Primitives:
        case 'None': return ok(new PV.None());
        case 'Bool': return ok(new PV.Bool(valueAsBool()));
        case 'Uint16': return ok(new PV.Uint16(value));
        case 'Uint32': return ok(new PV.Uint32(value));
        case 'Uint64': return ok(new PV.Uint64(value));
        case 'Int16': return ok(new PV.Int16(value));
        case 'Int32': return ok(new PV.Int32(value));
        case 'Int64': return ok(new PV.Int64(value));
        case 'Text': return ok(new PV.Text(value));
        case 'Internal': return ok(new PV.Internal(value));
        // Vectors:
        case 'BoolVec': return ok(new PV.BoolVec(valueAsBoolArr()));
        case 'Uint16Vec': return ok(new PV.Uint16Vec(value));
        case 'Uint32Vec': return ok(new PV.Uint32Vec(value));
        case 'Uint64Vec': return ok(new PV.Uint64Vec(value));
        case 'Int16Vec': return ok(new PV.Int16Vec(value));
        case 'Int32Vec': return ok(new PV.Int32Vec(value));
        case 'Int64Vec': return ok(new PV.Int64Vec(value));
        case 'TextVec': return ok(new PV.TextVec(value));
        case 'InternalVec': return ok(new PV.InternalVec(value));
        default: {
            throw new Error(`Unknown property type name: ${propType}`);
        }
    }
}
function isInternalProp(field) {
    return field.type === 'Internal';
}
exports.isInternalProp = isInternalProp;
function isInternalVecProp(field) {
    return field.type === 'InternalVec';
}
exports.isInternalVecProp = isInternalVecProp;
class EntityCodecResolver {
    constructor(classes) {
        this.codecByClassIdMap = new Map();
        classes.forEach(c => {
            this.codecByClassIdMap.set(c.id.toString(), new AnyEntityCodec(c));
        });
    }
    getCodecByClassId(classId) {
        return this.codecByClassIdMap.get(classId.toString());
    }
}
exports.EntityCodecResolver = EntityCodecResolver;
class EntityCodec {
    constructor(entityClass) {
        this.propNameToMetaMap = new Map();
        this.propIndexToNameMap = new Map();
        entityClass.properties.map((p, index) => {
            const propName = _1.unifyPropName(p.name.toString());
            const propMeta = { index, type: p.prop_type.type.toString() };
            this.propNameToMetaMap.set(propName, propMeta);
            this.propIndexToNameMap.set(index, propName);
        });
    }
    inClassIndexOfProp(propName) {
        return this.propNameToMetaMap.get(propName)?.index;
    }
    /**
     * Converts an entity of Substrate codec type to a plain JS object.
     */
    async toPlainObject(entity, props = {}) {
        const { loadInternals, loadEntityById, loadChannelById } = props || {};
        const res = {
            classId: entity.class_id.toNumber(),
            inClassSchemaIndexes: entity.in_class_schema_indexes.map(x => x.toNumber()),
            id: entity.id.toNumber()
        };
        for (const v of entity.entity_values) {
            const propIdx = v.in_class_index.toNumber();
            const propName = this.propIndexToNameMap.get(propIdx);
            if (propName) {
                const propValue = v.value.value;
                let convertedValue;
                // Load a referred internal entity:
                if (loadInternals) {
                    if (propValue instanceof PV.Internal &&
                        typeof loadEntityById === 'function') {
                        convertedValue = await loadEntityById(propValue);
                    }
                    else if (propName === 'channelId' &&
                        typeof loadChannelById === 'function') {
                        res.channel = await loadChannelById(propValue);
                    }
                }
                // Just convert a Substrate codec value to JS plain object:
                if (!convertedValue) {
                    convertedValue = substrateToPlain(propValue);
                }
                res[propName] = convertedValue;
            }
        }
        return res;
    }
    /**
     * Converts an object with updated property values to a Substrate vector
     * that can be passed to the extrinsic `update_entity_property_values`
     * of Substrate runtime module `substrate-versioned-store`.
     */
    toSubstrateUpdate(updatedProps) {
        // TODO check required fields! save prop metadata in constructor?
        // console.log('propNameToMetaMap propNameToMetaMap', this.propNameToMetaMap)
        // console.log('toSubstrateUpdate updatedProps', updatedProps)
        const res = new _1.VecClassPropertyValue();
        Object.keys(updatedProps).map(propName => {
            const meta = this.propNameToMetaMap.get(propName);
            if (meta) {
                const propType = meta.type;
                const plainValue = updatedProps[propName];
                let codecValue;
                try {
                    codecValue = plainToSubstrate(propType, plainValue);
                }
                catch (err) {
                    console.error(`Failed to convert plain value '${plainValue}' to Substrate codec. Error:`, err);
                }
                if (codecValue) {
                    res.push(new _1.ClassPropertyValue({
                        in_class_index: new types_1.u16(meta.index),
                        value: codecValue
                    }));
                }
            }
        });
        return res;
    }
}
exports.EntityCodec = EntityCodec;
/** This class is created just to satisfy TypeScript in some cases */
class AnyEntityCodec extends EntityCodec {
}
exports.AnyEntityCodec = AnyEntityCodec;
