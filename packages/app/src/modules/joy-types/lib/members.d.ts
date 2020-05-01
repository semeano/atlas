import { Enum, Option, Struct, Null, bool, u32, u64, Text, GenericAccountId, Vec } from '@polkadot/types';
import { BlockNumber, Moment, BalanceOf } from '@polkadot/types/interfaces';
import AccountId from '@polkadot/types/primitive/Generic/AccountId';
import { JoyStruct } from './JoyStruct';
export declare class MemberId extends u64 {
}
export declare class PaidTermId extends u64 {
}
export declare class SubscriptionId extends u64 {
}
export declare class ActorId extends u64 {
}
export declare class Paid extends PaidTermId {
}
export declare class Screening extends GenericAccountId {
}
export declare class Genesis extends Null {
}
export declare class EntryMethod extends Enum {
    constructor(value?: any, index?: number);
}
export declare enum RoleKeys {
    StorageProvider = "StorageProvider",
    ChannelOwner = "ChannelOwner",
    CuratorLead = "CuratorLead",
    Curator = "Curator"
}
export declare class Role extends Enum {
    constructor(value?: any, index?: number);
}
export declare type IProfile = {
    handle: Text;
    avatar_uri: Text;
    about: Text;
    registered_at_block: BlockNumber;
    registered_at_time: Moment;
    entry: EntryMethod;
    suspended: bool;
    subscription: Option<SubscriptionId>;
    root_account: AccountId;
    controller_account: AccountId;
    roles: Vec<ActorInRole>;
};
export declare class Profile extends JoyStruct<IProfile> {
    constructor(value?: IProfile);
    get handle(): Text;
    get avatar_uri(): Text;
    get about(): Text;
    get registered_at_block(): u32;
    get registered_at_time(): u64;
    get entry(): EntryMethod;
    get suspended(): bool;
    get subscription(): Option<SubscriptionId>;
    get root_account(): AccountId;
    get controller_account(): AccountId;
    get roles(): Vec<ActorInRole>;
}
export declare class ActorInRole extends Struct {
    constructor(value?: any);
    get role(): Role;
    get actor_id(): ActorId;
    get isContentLead(): boolean;
    get isCurator(): boolean;
}
export declare class UserInfo extends Struct {
    constructor(value?: any);
}
export declare type CheckedUserInfo = {
    handle: Text;
    avatar_uri: Text;
    about: Text;
};
export declare class PaidMembershipTerms extends Struct {
    constructor(value?: any);
    get fee(): BalanceOf;
    get text(): Text;
}
export declare function registerMembershipTypes(): void;
