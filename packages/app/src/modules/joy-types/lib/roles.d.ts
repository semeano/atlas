import { Struct } from '@polkadot/types/codec';
import { u32 } from '@polkadot/types';
import { BlockNumber, AccountId, Balance } from '@polkadot/types/interfaces';
import { MemberId, Role } from './members';
export { Role } from './members';
export declare class Actor extends Struct {
    constructor(value?: any);
    get member_id(): MemberId;
    get role(): Role;
    get account(): AccountId;
    get joined_at(): BlockNumber;
}
export declare type Request = [AccountId, MemberId, Role, BlockNumber];
export declare type Requests = Array<Request>;
export declare class RoleParameters extends Struct {
    constructor(value?: any);
    get min_stake(): Balance;
    get max_actors(): u32;
    get min_actors(): u32;
    get reward(): Balance;
    get reward_period(): BlockNumber;
    get unbonding_period(): BlockNumber;
    get bonding_period(): BlockNumber;
    get min_service_period(): BlockNumber;
    get startup_grace_period(): BlockNumber;
    get entry_request_fee(): Balance;
}
export declare function registerRolesTypes(): void;
