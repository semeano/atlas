import { Struct } from '@polkadot/types/codec';
import { Text } from '@polkadot/types';
import { BlockNumber } from '@polkadot/types/interfaces';
export declare class IPNSIdentity extends Text {
}
export declare class Url extends Text {
}
export declare class AccountInfo extends Struct {
    constructor(value?: any);
    get identity(): IPNSIdentity;
    get expires_at(): BlockNumber;
}
export declare function registerDiscoveryTypes(): void;
