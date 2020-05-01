import { Enum, Option, Struct, Vec } from '@polkadot/types/codec';
import { Text } from '@polkadot/types';
import { BlockNumber, AccountId, Balance, Hash } from '@polkadot/types/interfaces';
import { u32 } from '@polkadot/types/primitive';
import { Codec } from '@polkadot/types/types';
export declare function getTextPropAsString(struct: Struct, fieldName: string): string;
export declare function getBoolPropAsBoolean(struct: Struct, fieldName: string): boolean;
export declare function getOptionPropOrUndefined<T extends Codec>(struct: Struct, fieldName: string): T | undefined;
declare const OptionText_base: import("@polkadot/types/types").Constructor<Option<Codec>>;
export declare class OptionText extends OptionText_base {
    static none(): OptionText;
    static some(text: string): OptionText;
}
export declare type TransferableStake = {
    seat: Balance;
    backing: Balance;
};
export declare type Stake = {
    new: Balance;
    transferred: Balance;
};
export declare type Backer = {
    member: AccountId;
    stake: Balance;
};
export declare type Seat = {
    member: AccountId;
    stake: Balance;
    backers: Backer[];
};
export declare type SealedVote = {
    voter: AccountId;
    commitment: Hash;
    stake: Stake;
    vote: Option<AccountId>;
};
export declare type Proposal = {
    id: u32;
    proposer: AccountId;
    stake: Balance;
    name: Text;
    description: Text;
    wasm_hash: Hash;
    proposed_at: BlockNumber;
    status: ProposalStatus;
};
export declare type ProposalVote = {
    voter: AccountId;
    kind: VoteKind;
};
export declare type TallyResult = {
    proposal_id: u32;
    abstentions: u32;
    approvals: u32;
    rejections: u32;
    slashes: u32;
    status: ProposalStatus;
    finalized_at: BlockNumber;
};
export declare class Announcing extends u32 {
}
export declare class Voting extends u32 {
}
export declare class Revealing extends u32 {
}
export declare class ElectionStage extends Enum {
    constructor(value?: any, index?: number);
    /** Create a new Announcing stage. */
    static Announcing(endsAt: BlockNumber | number): ElectionStage;
    /** Create a new Voting stage. */
    static Voting(endsAt: BlockNumber | number): ElectionStage;
    /** Create a new Revealing stage. */
    static Revealing(endsAt: BlockNumber | number): ElectionStage;
    static newElectionStage(stageName: string, endsAt: BlockNumber | number): ElectionStage;
}
export declare type AnyElectionStage = Announcing | Voting | Revealing;
export declare const ProposalStatuses: {
    [key: string]: string;
};
export declare class ProposalStatus extends Enum {
    constructor(value?: any);
}
export declare const VoteKinds: {
    [key: string]: string;
};
export declare class VoteKind extends Enum {
    constructor(value?: any);
}
export declare type ProposalVotes = [AccountId, VoteKind][];
export declare class BTreeSet<T extends Codec> extends Vec<T> {
}
export declare function registerJoystreamTypes(): void;
export {};
