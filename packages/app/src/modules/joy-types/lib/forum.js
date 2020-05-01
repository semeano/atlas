"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const types_2 = require("@polkadot/types");
const JoyStruct_1 = require("./JoyStruct");
// Based on copypasta from joy-media/BlockAndTime
class BlockchainTimestamp extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            block: types_1.u32,
            time: types_1.u64,
        }, value);
    }
    get block() {
        return this.getField('block');
    }
    get time() {
        return this.getField('time');
    }
    static newEmpty() {
        return new BlockchainTimestamp({});
    }
}
exports.BlockchainTimestamp = BlockchainTimestamp;
class ModerationAction extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            moderated_at: BlockchainTimestamp,
            moderator_id: types_2.GenericAccountId,
            rationale: types_1.Text
        }, value);
    }
    get moderated_at() {
        return this.getField('moderated_at');
    }
    get moderator_id() {
        return this.getField('moderator_id');
    }
    get rationale() {
        return this.getString('rationale');
    }
}
exports.ModerationAction = ModerationAction;
class PostTextChange extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            expired_at: BlockchainTimestamp,
            text: types_1.Text
        }, value);
    }
    get expired_at() {
        return this.getField('expired_at');
    }
    get text() {
        return this.getString('text');
    }
}
exports.PostTextChange = PostTextChange;
class VecPostTextChange extends types_1.Vec.with(PostTextChange) {
}
exports.VecPostTextChange = VecPostTextChange;
class OptionModerationAction extends types_1.Option.with(ModerationAction) {
}
exports.OptionModerationAction = OptionModerationAction;
class CategoryId extends types_1.u64 {
}
exports.CategoryId = CategoryId;
class OptionCategoryId extends types_1.Option.with(CategoryId) {
}
exports.OptionCategoryId = OptionCategoryId;
class VecCategoryId extends types_1.Vec.with(CategoryId) {
}
exports.VecCategoryId = VecCategoryId;
class ThreadId extends types_1.u64 {
}
exports.ThreadId = ThreadId;
class VecThreadId extends types_1.Vec.with(ThreadId) {
}
exports.VecThreadId = VecThreadId;
class PostId extends types_1.u64 {
}
exports.PostId = PostId;
class VecPostId extends types_1.Vec.with(PostId) {
}
exports.VecPostId = VecPostId;
// TODO deprectated: replaced w/ PostId
class ReplyId extends types_1.u64 {
}
exports.ReplyId = ReplyId;
class VecReplyId extends types_1.Vec.with(ReplyId) {
}
exports.VecReplyId = VecReplyId;
class InputValidationLengthConstraint extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            min: types_1.u16,
            max_min_diff: types_1.u16
        }, value);
    }
    get min() {
        return this.getField('min');
    }
    get max_min_diff() {
        return this.getField('max_min_diff');
    }
    get max() {
        return new types_1.u16(this.min.add(this.max_min_diff));
    }
}
exports.InputValidationLengthConstraint = InputValidationLengthConstraint;
class ChildPositionInParentCategory extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            parent_id: CategoryId,
            child_nr_in_parent_category: types_1.u32
        }, value);
    }
    get parent_id() {
        return this.getField('parent_id');
    }
    get child_nr_in_parent_category() {
        return this.getField('child_nr_in_parent_category');
    }
}
exports.ChildPositionInParentCategory = ChildPositionInParentCategory;
class OptionChildPositionInParentCategory extends types_1.Option.with(ChildPositionInParentCategory) {
}
exports.OptionChildPositionInParentCategory = OptionChildPositionInParentCategory;
class Category extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            id: CategoryId,
            title: types_1.Text,
            description: types_1.Text,
            created_at: BlockchainTimestamp,
            deleted: types_1.bool,
            archived: types_1.bool,
            num_direct_subcategories: types_1.u32,
            num_direct_unmoderated_threads: types_1.u32,
            num_direct_moderated_threads: types_1.u32,
            position_in_parent_category: OptionChildPositionInParentCategory,
            moderator_id: types_2.GenericAccountId
        }, value);
    }
    static newEmpty() {
        return new Category({});
    }
    get id() {
        return this.getField('id');
    }
    get title() {
        return this.getString('title');
    }
    get description() {
        return this.getString('description');
    }
    get created_at() {
        return this.getField('created_at');
    }
    get deleted() {
        return this.getBoolean('deleted');
    }
    get archived() {
        return this.getBoolean('archived');
    }
    get num_direct_subcategories() {
        return this.getField('num_direct_subcategories');
    }
    get num_direct_unmoderated_threads() {
        return this.getField('num_direct_unmoderated_threads');
    }
    get num_direct_moderated_threads() {
        return this.getField('num_direct_moderated_threads');
    }
    get num_threads_created() {
        return new types_1.u32(this.num_direct_unmoderated_threads.add(this.num_direct_moderated_threads));
    }
    get hasSubcategories() {
        return !this.num_direct_subcategories.isZero();
    }
    get hasUnmoderatedThreads() {
        return !this.num_direct_unmoderated_threads.isZero();
    }
    get position_in_parent_category() {
        return this.getField('position_in_parent_category');
    }
    get parent_id() {
        const pos = this.position_in_parent_category;
        return pos.isSome ? pos.unwrap().parent_id : undefined;
    }
    get isRoot() {
        return this.parent_id === undefined;
    }
    get nr_in_parent() {
        const pos = this.position_in_parent_category;
        return pos.isSome ? pos.unwrap().child_nr_in_parent_category : undefined;
    }
    get moderator_id() {
        return this.getField('moderator_id');
    }
}
exports.Category = Category;
class Thread extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            id: ThreadId,
            title: types_1.Text,
            category_id: CategoryId,
            nr_in_category: types_1.u32,
            moderation: OptionModerationAction,
            num_unmoderated_posts: types_1.u32,
            num_moderated_posts: types_1.u32,
            created_at: BlockchainTimestamp,
            author_id: types_2.GenericAccountId
        }, value);
    }
    static newEmpty() {
        return new Thread({});
    }
    get id() {
        return this.getField('id');
    }
    get title() {
        return this.getString('title');
    }
    get category_id() {
        return this.getField('category_id');
    }
    get nr_in_category() {
        return this.getField('nr_in_category');
    }
    get moderation() {
        return this.unwrapOrUndefined('moderation');
    }
    get moderated() {
        return this.moderation !== undefined;
    }
    get num_unmoderated_posts() {
        return this.getField('num_unmoderated_posts');
    }
    get num_moderated_posts() {
        return this.getField('num_moderated_posts');
    }
    get num_posts_ever_created() {
        return new types_1.u32(this.num_unmoderated_posts.add(this.num_moderated_posts));
    }
    get created_at() {
        return this.getField('created_at');
    }
    get author_id() {
        return this.getField('author_id');
    }
}
exports.Thread = Thread;
// TODO deprectated: replaced w/ Post
class Post extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            id: PostId,
            thread_id: ThreadId,
            nr_in_thread: types_1.u32,
            current_text: types_1.Text,
            moderation: OptionModerationAction,
            text_change_history: VecPostTextChange,
            created_at: BlockchainTimestamp,
            author_id: types_2.GenericAccountId
        }, value);
    }
    static newEmpty() {
        return new Post({});
    }
    get id() {
        return this.getField('id');
    }
    get thread_id() {
        return this.getField('thread_id');
    }
    get nr_in_thread() {
        return this.getField('nr_in_thread');
    }
    get current_text() {
        return this.getString('current_text');
    }
    get moderation() {
        return this.unwrapOrUndefined('moderation');
    }
    get moderated() {
        return this.moderation !== undefined;
    }
    get text_change_history() {
        return this.getField('text_change_history');
    }
    get created_at() {
        return this.getField('created_at');
    }
    get author_id() {
        return this.getField('author_id');
    }
}
exports.Post = Post;
// TODO deprectated: replaced w/ Post
class Reply extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            owner: types_2.GenericAccountId,
            thread_id: ThreadId,
            text: types_1.Text,
            moderation: OptionModerationAction
        }, value);
    }
    get owner() {
        return this.getField('owner');
    }
    get thread_id() {
        return this.getField('thread_id');
    }
    get text() {
        return this.getString('text');
    }
    get moderation() {
        return this.unwrapOrUndefined('moderation');
    }
    get moderated() {
        return this.moderation !== undefined;
    }
}
exports.Reply = Reply;
function registerForumTypes() {
    try {
        types_1.getTypeRegistry().register({
            BlockchainTimestamp,
            PostTextChange,
            ModerationAction,
            InputValidationLengthConstraint,
            ChildPositionInParentCategory,
            CategoryId,
            Category,
            ThreadId,
            Thread,
            PostId,
            Post,
            ReplyId,
            Reply
        });
    }
    catch (err) {
        console.error('Failed to register custom types of forum module', err);
    }
}
exports.registerForumTypes = registerForumTypes;
