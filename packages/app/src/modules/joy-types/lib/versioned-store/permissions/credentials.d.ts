import { u64, Vec } from '@polkadot/types';
export declare class Credential extends u64 {
}
declare const CredentialSet_base: import("@polkadot/types/types").Constructor<Vec<Credential>>;
export declare class CredentialSet extends CredentialSet_base {
}
export {};
