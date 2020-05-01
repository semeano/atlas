"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const index_1 = require("./index");
const AccountId_1 = __importDefault(require("@polkadot/types/primitive/Generic/AccountId"));
const JoyStruct_1 = require("./JoyStruct");
class MemberId extends types_1.u64 {
}
exports.MemberId = MemberId;
class PaidTermId extends types_1.u64 {
}
exports.PaidTermId = PaidTermId;
class SubscriptionId extends types_1.u64 {
}
exports.SubscriptionId = SubscriptionId;
class ActorId extends types_1.u64 {
}
exports.ActorId = ActorId;
class Paid extends PaidTermId {
}
exports.Paid = Paid;
class Screening extends types_1.GenericAccountId {
}
exports.Screening = Screening;
class Genesis extends types_1.Null {
}
exports.Genesis = Genesis;
class EntryMethod extends types_1.Enum {
    constructor(value, index) {
        super({
            Paid,
            Screening,
            Genesis,
        }, value, index);
    }
}
exports.EntryMethod = EntryMethod;
var RoleKeys;
(function (RoleKeys) {
    RoleKeys["StorageProvider"] = "StorageProvider";
    RoleKeys["ChannelOwner"] = "ChannelOwner";
    RoleKeys["CuratorLead"] = "CuratorLead";
    RoleKeys["Curator"] = "Curator";
})(RoleKeys = exports.RoleKeys || (exports.RoleKeys = {}));
class Role extends types_1.Enum {
    constructor(value, index) {
        super([
            RoleKeys.StorageProvider,
            RoleKeys.ChannelOwner,
            RoleKeys.CuratorLead,
            RoleKeys.Curator,
        ], value, index);
    }
}
exports.Role = Role;
class Profile extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            handle: types_1.Text,
            avatar_uri: types_1.Text,
            about: types_1.Text,
            registered_at_block: types_1.u32,
            registered_at_time: types_1.u64,
            entry: EntryMethod,
            suspended: types_1.bool,
            subscription: types_1.Option.with(SubscriptionId),
            root_account: AccountId_1.default,
            controller_account: AccountId_1.default,
            roles: types_1.Vec.with(ActorInRole),
        }, value);
    }
    get handle() {
        return this.get('handle');
    }
    get avatar_uri() {
        return this.get('avatar_uri');
    }
    get about() {
        return this.get('about');
    }
    get registered_at_block() {
        return this.get('registered_at_block');
    }
    get registered_at_time() {
        return this.get('registered_at_time');
    }
    get entry() {
        return this.get('entry');
    }
    get suspended() {
        return this.get('suspended');
    }
    get subscription() {
        return this.get('subscription');
    }
    get root_account() {
        return this.get('root_account');
    }
    get controller_account() {
        return this.get('controller_account');
    }
    get roles() {
        return this.get('roles');
    }
}
exports.Profile = Profile;
class ActorInRole extends types_1.Struct {
    constructor(value) {
        super({
            role: Role,
            actor_id: ActorId,
        }, value);
    }
    get role() {
        return this.get('role');
    }
    get actor_id() {
        return this.get('actor_id');
    }
    get isContentLead() {
        return this.role.eq(RoleKeys.CuratorLead);
    }
    get isCurator() {
        return this.role.eq(RoleKeys.Curator);
    }
}
exports.ActorInRole = ActorInRole;
;
class UserInfo extends types_1.Struct {
    constructor(value) {
        super({
            handle: index_1.OptionText,
            avatar_uri: index_1.OptionText,
            about: index_1.OptionText
        }, value);
    }
}
exports.UserInfo = UserInfo;
class PaidMembershipTerms extends types_1.Struct {
    constructor(value) {
        super({
            fee: types_1.u128,
            text: types_1.Text
        }, value);
    }
    get fee() {
        return this.get('fee');
    }
    get text() {
        return this.get('text');
    }
}
exports.PaidMembershipTerms = PaidMembershipTerms;
function registerMembershipTypes() {
    try {
        const typeRegistry = types_1.getTypeRegistry();
        typeRegistry.register({
            EntryMethod,
            MemberId,
            PaidTermId,
            SubscriptionId,
            Profile,
            UserInfo,
            CheckedUserInfo: {
                handle: 'Text',
                avatar_uri: 'Text',
                about: 'Text'
            },
            PaidMembershipTerms: {
                fee: 'BalanceOf',
                text: 'Text'
            },
            Role,
            ActorId,
            ActorInRole,
        });
    }
    catch (err) {
        console.error('Failed to register custom types of membership module', err);
    }
}
exports.registerMembershipTypes = registerMembershipTypes;
