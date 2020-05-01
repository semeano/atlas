import { bool, u16, u32, u64, Text, Option, Vec as Vector } from '@polkadot/types';
import { AccountId, Moment, BlockNumber } from '@polkadot/types/interfaces';
import { JoyStruct } from './JoyStruct';
export declare type BlockchainTimestampType = {
    block: BlockNumber;
    time: Moment;
};
export declare class BlockchainTimestamp extends JoyStruct<BlockchainTimestampType> {
    constructor(value?: BlockchainTimestampType);
    get block(): BlockNumber;
    get time(): Moment;
    static newEmpty(): BlockchainTimestamp;
}
export declare type ModerationActionType = {
    moderated_at: BlockchainTimestamp;
    moderator_id: AccountId;
    rationale: Text;
};
export declare class ModerationAction extends JoyStruct<ModerationActionType> {
    constructor(value: ModerationActionType);
    get moderated_at(): BlockchainTimestamp;
    get moderator_id(): AccountId;
    get rationale(): string;
}
export declare type PostTextChangeType = {
    expired_at: BlockchainTimestamp;
    text: Text;
};
export declare class PostTextChange extends JoyStruct<PostTextChangeType> {
    constructor(value: PostTextChangeType);
    get expired_at(): BlockchainTimestamp;
    get text(): string;
}
declare const VecPostTextChange_base: import("@polkadot/types/types").Constructor<Vector<PostTextChange>>;
export declare class VecPostTextChange extends VecPostTextChange_base {
}
declare const OptionModerationAction_base: import("@polkadot/types/types").Constructor<Option<import("@polkadot/types/types").Codec>>;
export declare class OptionModerationAction extends OptionModerationAction_base {
}
export declare class CategoryId extends u64 {
}
declare const OptionCategoryId_base: import("@polkadot/types/types").Constructor<Option<import("@polkadot/types/types").Codec>>;
export declare class OptionCategoryId extends OptionCategoryId_base {
}
declare const VecCategoryId_base: import("@polkadot/types/types").Constructor<Vector<CategoryId>>;
export declare class VecCategoryId extends VecCategoryId_base {
}
export declare class ThreadId extends u64 {
}
declare const VecThreadId_base: import("@polkadot/types/types").Constructor<Vector<ThreadId>>;
export declare class VecThreadId extends VecThreadId_base {
}
export declare class PostId extends u64 {
}
declare const VecPostId_base: import("@polkadot/types/types").Constructor<Vector<PostId>>;
export declare class VecPostId extends VecPostId_base {
}
export declare class ReplyId extends u64 {
}
declare const VecReplyId_base: import("@polkadot/types/types").Constructor<Vector<ReplyId>>;
export declare class VecReplyId extends VecReplyId_base {
}
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
export declare type ChildPositionInParentCategoryType = {
    parent_id: CategoryId;
    child_nr_in_parent_category: u32;
};
export declare class ChildPositionInParentCategory extends JoyStruct<ChildPositionInParentCategoryType> {
    constructor(value: ChildPositionInParentCategoryType);
    get parent_id(): CategoryId;
    get child_nr_in_parent_category(): u32;
}
declare const OptionChildPositionInParentCategory_base: import("@polkadot/types/types").Constructor<Option<import("@polkadot/types/types").Codec>>;
export declare class OptionChildPositionInParentCategory extends OptionChildPositionInParentCategory_base {
}
export declare type CategoryType = {
    id: CategoryId;
    title: Text;
    description: Text;
    created_at: BlockchainTimestamp;
    deleted: bool;
    archived: bool;
    num_direct_subcategories: u32;
    num_direct_unmoderated_threads: u32;
    num_direct_moderated_threads: u32;
    position_in_parent_category: OptionChildPositionInParentCategory;
    moderator_id: AccountId;
};
export declare class Category extends JoyStruct<CategoryType> {
    constructor(value: CategoryType);
    static newEmpty(): Category;
    get id(): CategoryId;
    get title(): string;
    get description(): string;
    get created_at(): BlockchainTimestamp;
    get deleted(): boolean;
    get archived(): boolean;
    get num_direct_subcategories(): u32;
    get num_direct_unmoderated_threads(): u32;
    get num_direct_moderated_threads(): u32;
    get num_threads_created(): u32;
    get hasSubcategories(): boolean;
    get hasUnmoderatedThreads(): boolean;
    get position_in_parent_category(): Option<ChildPositionInParentCategory>;
    get parent_id(): CategoryId | undefined;
    get isRoot(): boolean;
    get nr_in_parent(): u32 | undefined;
    get moderator_id(): AccountId;
}
export declare type ThreadType = {
    id: ThreadId;
    title: Text;
    category_id: CategoryId;
    nr_in_category: u32;
    moderation: OptionModerationAction;
    num_unmoderated_posts: u32;
    num_moderated_posts: u32;
    created_at: BlockchainTimestamp;
    author_id: AccountId;
};
export declare class Thread extends JoyStruct<ThreadType> {
    constructor(value: ThreadType);
    static newEmpty(): Thread;
    get id(): ThreadId;
    get title(): string;
    get category_id(): CategoryId;
    get nr_in_category(): u32;
    get moderation(): ModerationAction | undefined;
    get moderated(): boolean;
    get num_unmoderated_posts(): u32;
    get num_moderated_posts(): u32;
    get num_posts_ever_created(): u32;
    get created_at(): BlockchainTimestamp;
    get author_id(): AccountId;
}
export declare type PostType = {
    id: PostId;
    thread_id: ThreadId;
    nr_in_thread: u32;
    current_text: Text;
    moderation: OptionModerationAction;
    text_change_history: VecPostTextChange;
    created_at: BlockchainTimestamp;
    author_id: AccountId;
};
export declare class Post extends JoyStruct<PostType> {
    constructor(value: PostType);
    static newEmpty(): Post;
    get id(): PostId;
    get thread_id(): ThreadId;
    get nr_in_thread(): u32;
    get current_text(): string;
    get moderation(): ModerationAction | undefined;
    get moderated(): boolean;
    get text_change_history(): VecPostTextChange;
    get created_at(): BlockchainTimestamp;
    get author_id(): AccountId;
}
export declare type ReplyType = {
    owner: AccountId;
    thread_id: ThreadId;
    text: Text;
    moderation: OptionModerationAction;
};
export declare class Reply extends JoyStruct<ReplyType> {
    constructor(value: ReplyType);
    get owner(): AccountId;
    get thread_id(): ThreadId;
    get text(): string;
    get moderation(): ModerationAction | undefined;
    get moderated(): boolean;
}
export declare function registerForumTypes(): void;
export {};
