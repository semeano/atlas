import { Enum, Struct, Option, Vec as Vector, H256 } from '@polkadot/types';
import { u64, bool, Text } from '@polkadot/types';
import { BlockNumber, Moment, AccountId } from '@polkadot/types/interfaces';
export declare class ContentId extends H256 {
    static generate(): ContentId;
    static decode(contentId: string): ContentId;
    static encode(contentId: Uint8Array): string;
    encode(): string;
}
export declare class DataObjectTypeId extends u64 {
}
export declare class DataObjectStorageRelationshipId extends u64 {
}
export declare class SchemaId extends u64 {
}
export declare class DownloadSessionId extends u64 {
}
export declare type BlockAndTimeType = {
    block: BlockNumber;
    time: Moment;
};
export declare class BlockAndTime extends Struct {
    constructor(value?: BlockAndTimeType);
    get block(): BlockNumber;
    get time(): Moment;
}
export declare type ContentVisibilityKey = 'Draft' | 'Public';
export declare class ContentVisibility extends Enum {
    constructor(value?: ContentVisibilityKey);
}
declare const VecContentId_base: import("@polkadot/types/types").Constructor<Vector<ContentId>>;
export declare class VecContentId extends VecContentId_base {
}
declare const OptionVecContentId_base: import("@polkadot/types/types").Constructor<Option<import("@polkadot/types/types").Codec>>;
export declare class OptionVecContentId extends OptionVecContentId_base {
}
declare const OptionSchemaId_base: import("@polkadot/types/types").Constructor<Option<import("@polkadot/types/types").Codec>>;
export declare class OptionSchemaId extends OptionSchemaId_base {
}
declare const OptionContentVisibility_base: import("@polkadot/types/types").Constructor<Option<import("@polkadot/types/types").Codec>>;
export declare class OptionContentVisibility extends OptionContentVisibility_base {
}
export declare type LiaisonJudgementKey = 'Pending' | 'Accepted' | 'Rejected';
export declare class LiaisonJudgement extends Enum {
    constructor(value?: LiaisonJudgementKey);
}
export declare class DataObject extends Struct {
    constructor(value?: any);
    get owner(): AccountId;
    get added_at(): BlockAndTime;
    get type_id(): DataObjectTypeId;
    /** Actually it's 'size', but 'size' is already reserved by a parent class. */
    get size_in_bytes(): u64;
    get liaison(): AccountId;
    get liaison_judgement(): LiaisonJudgement;
    get ipfs_content_id(): Text;
}
export declare class DataObjectStorageRelationship extends Struct {
    constructor(value?: any);
    get content_id(): ContentId;
    get storage_provider(): AccountId;
    get ready(): bool;
}
export declare class DataObjectType extends Struct {
    constructor(value?: any);
    get description(): Text;
    get active(): bool;
}
export declare type DownloadStateKey = 'Started' | 'Ended';
export declare class DownloadState extends Enum {
    constructor(value?: DownloadStateKey);
}
export declare class DownloadSession extends Struct {
    constructor(value?: any);
    get content_id(): ContentId;
    get consumer(): AccountId;
    get distributor(): AccountId;
    get initiated_at_block(): BlockNumber;
    get initiated_at_time(): Moment;
    get state(): DownloadState;
    get transmitted_bytes(): u64;
}
export declare function registerMediaTypes(): void;
export {};
