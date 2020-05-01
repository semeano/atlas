"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const types_2 = require("@polkadot/types");
const util_crypto_1 = require("@polkadot/util-crypto");
const keyring_1 = require("@polkadot/keyring");
// import { u8aToString, stringToU8a } from '@polkadot/util';
class ContentId extends types_1.H256 {
    static generate() {
        // randomAsU8a uses https://www.npmjs.com/package/tweetnacl#random-bytes-generation
        return new ContentId(util_crypto_1.randomAsU8a());
    }
    static decode(contentId) {
        return new ContentId(keyring_1.decodeAddress(contentId));
    }
    static encode(contentId) {
        // console.log('contentId:', Buffer.from(contentId).toString('hex'))
        return keyring_1.encodeAddress(contentId);
    }
    encode() {
        return ContentId.encode(this);
    }
}
exports.ContentId = ContentId;
class DataObjectTypeId extends types_2.u64 {
}
exports.DataObjectTypeId = DataObjectTypeId;
class DataObjectStorageRelationshipId extends types_2.u64 {
}
exports.DataObjectStorageRelationshipId = DataObjectStorageRelationshipId;
class SchemaId extends types_2.u64 {
}
exports.SchemaId = SchemaId;
class DownloadSessionId extends types_2.u64 {
}
exports.DownloadSessionId = DownloadSessionId;
class BlockAndTime extends types_1.Struct {
    constructor(value) {
        super({
            block: types_2.u32,
            time: types_2.u64,
        }, value);
    }
    get block() {
        return this.get('block');
    }
    get time() {
        return this.get('time');
    }
}
exports.BlockAndTime = BlockAndTime;
class ContentVisibility extends types_1.Enum {
    constructor(value) {
        super([
            'Draft',
            'Public'
        ], value);
    }
}
exports.ContentVisibility = ContentVisibility;
class VecContentId extends types_1.Vec.with(ContentId) {
}
exports.VecContentId = VecContentId;
class OptionVecContentId extends types_1.Option.with(VecContentId) {
}
exports.OptionVecContentId = OptionVecContentId;
class OptionSchemaId extends types_1.Option.with(SchemaId) {
}
exports.OptionSchemaId = OptionSchemaId;
class OptionContentVisibility extends types_1.Option.with(ContentVisibility) {
}
exports.OptionContentVisibility = OptionContentVisibility;
class LiaisonJudgement extends types_1.Enum {
    constructor(value) {
        super([
            'Pending',
            'Accepted',
            'Rejected'
        ], value);
    }
}
exports.LiaisonJudgement = LiaisonJudgement;
class DataObject extends types_1.Struct {
    constructor(value) {
        super({
            owner: types_2.GenericAccountId,
            added_at: BlockAndTime,
            type_id: DataObjectTypeId,
            size: types_2.u64,
            liaison: types_2.GenericAccountId,
            liaison_judgement: LiaisonJudgement,
            ipfs_content_id: types_2.Text,
        }, value);
    }
    get owner() {
        return this.get('owner');
    }
    get added_at() {
        return this.get('added_at');
    }
    get type_id() {
        return this.get('type_id');
    }
    /** Actually it's 'size', but 'size' is already reserved by a parent class. */
    get size_in_bytes() {
        return this.get('size');
    }
    get liaison() {
        return this.get('liaison');
    }
    get liaison_judgement() {
        return this.get('liaison_judgement');
    }
    get ipfs_content_id() {
        return this.get('ipfs_content_id');
    }
}
exports.DataObject = DataObject;
class DataObjectStorageRelationship extends types_1.Struct {
    constructor(value) {
        super({
            content_id: ContentId,
            storage_provider: types_2.GenericAccountId,
            ready: types_2.bool
        }, value);
    }
    get content_id() {
        return this.get('content_id');
    }
    get storage_provider() {
        return this.get('storage_provider');
    }
    get ready() {
        return this.get('ready');
    }
}
exports.DataObjectStorageRelationship = DataObjectStorageRelationship;
class DataObjectType extends types_1.Struct {
    constructor(value) {
        super({
            description: types_2.Text,
            active: types_2.bool
        }, value);
    }
    get description() {
        return this.get('description');
    }
    get active() {
        return this.get('active');
    }
}
exports.DataObjectType = DataObjectType;
class DownloadState extends types_1.Enum {
    constructor(value) {
        super([
            'Started',
            'Ended'
        ], value);
    }
}
exports.DownloadState = DownloadState;
class DownloadSession extends types_1.Struct {
    constructor(value) {
        super({
            content_id: ContentId,
            consumer: types_2.GenericAccountId,
            distributor: types_2.GenericAccountId,
            initiated_at_block: types_2.u32,
            initiated_at_time: types_2.u64,
            state: DownloadState,
            transmitted_bytes: types_2.u64
        }, value);
    }
    get content_id() {
        return this.get('content_id');
    }
    get consumer() {
        return this.get('consumer');
    }
    get distributor() {
        return this.get('distributor');
    }
    get initiated_at_block() {
        return this.get('initiated_at_block');
    }
    get initiated_at_time() {
        return this.get('initiated_at_time');
    }
    get state() {
        return this.get('state');
    }
    get transmitted_bytes() {
        return this.get('transmitted_bytes');
    }
}
exports.DownloadSession = DownloadSession;
function registerMediaTypes() {
    try {
        types_2.getTypeRegistry().register({
            '::ContentId': ContentId,
            '::DataObjectTypeId': DataObjectTypeId,
            // SchemaId, // This isn't required? (its what caused issue with type mismatch in permissions module!)
            ContentId,
            ContentVisibility,
            LiaisonJudgement,
            DataObject,
            DataObjectStorageRelationshipId,
            DataObjectStorageRelationship,
            DataObjectTypeId,
            DataObjectType,
            DownloadState,
            DownloadSessionId,
            DownloadSession
        });
    }
    catch (err) {
        console.error('Failed to register custom types of media module', err);
    }
}
exports.registerMediaTypes = registerMediaTypes;
