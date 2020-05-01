"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codec_1 = require("@polkadot/types/codec");
const types_1 = require("@polkadot/types");
const primitive_1 = require("@polkadot/types/primitive");
const forum_1 = require("./forum");
const media_1 = require("./media");
const members_1 = require("./members");
const roles_1 = require("./roles");
const discovery_1 = require("./discovery");
const hiring_1 = require("./hiring");
const versioned_store_1 = require("./versioned-store");
const permissions_1 = require("./versioned-store/permissions");
const stake_1 = require("./stake");
const mint_1 = require("./mint");
const recurring_rewards_1 = require("./recurring-rewards");
const content_working_group_1 = require("./content-working-group");
function getTextPropAsString(struct, fieldName) {
    return struct.get(fieldName).toString();
}
exports.getTextPropAsString = getTextPropAsString;
function getBoolPropAsBoolean(struct, fieldName) {
    return struct.get(fieldName).valueOf();
}
exports.getBoolPropAsBoolean = getBoolPropAsBoolean;
function getOptionPropOrUndefined(struct, fieldName) {
    return struct.get(fieldName).unwrapOr(undefined);
}
exports.getOptionPropOrUndefined = getOptionPropOrUndefined;
class OptionText extends codec_1.Option.with(types_1.Text) {
    static none() {
        return new codec_1.Option(types_1.Text, null);
    }
    static some(text) {
        return new codec_1.Option(types_1.Text, text);
    }
}
exports.OptionText = OptionText;
class Announcing extends primitive_1.u32 {
}
exports.Announcing = Announcing;
;
class Voting extends primitive_1.u32 {
}
exports.Voting = Voting;
;
class Revealing extends primitive_1.u32 {
}
exports.Revealing = Revealing;
;
class ElectionStage extends codec_1.Enum {
    constructor(value, index) {
        super({
            Announcing,
            Voting,
            Revealing
        }, value, index);
    }
    /** Create a new Announcing stage. */
    static Announcing(endsAt) {
        return this.newElectionStage('Announcing', endsAt);
    }
    /** Create a new Voting stage. */
    static Voting(endsAt) {
        return this.newElectionStage('Voting', endsAt);
    }
    /** Create a new Revealing stage. */
    static Revealing(endsAt) {
        return this.newElectionStage('Revealing', endsAt);
    }
    static newElectionStage(stageName, endsAt) {
        return new ElectionStage({ [stageName]: endsAt });
    }
}
exports.ElectionStage = ElectionStage;
exports.ProposalStatuses = {
    Active: 'Active',
    Cancelled: 'Cancelled',
    Expired: 'Expired',
    Approved: 'Approved',
    Rejected: 'Rejected',
    Slashed: 'Slashed'
};
class ProposalStatus extends codec_1.Enum {
    constructor(value) {
        super([
            'Active',
            'Cancelled',
            'Expired',
            'Approved',
            'Rejected',
            'Slashed'
        ], value);
    }
}
exports.ProposalStatus = ProposalStatus;
exports.VoteKinds = {
    Abstain: 'Abstain',
    Approve: 'Approve',
    Reject: 'Reject',
    Slash: 'Slash'
};
class VoteKind extends codec_1.Enum {
    constructor(value) {
        super([
            'Abstain',
            'Approve',
            'Reject',
            'Slash'
        ], value);
    }
}
exports.VoteKind = VoteKind;
// Treat a BTreeSet as a Vec since it is encoded in the same way.
class BTreeSet extends codec_1.Vec {
}
exports.BTreeSet = BTreeSet;
;
// TODO Refactor: split this function and move to corresponding modules: election and proposals.
function registerElectionAndProposalTypes() {
    try {
        const typeRegistry = types_1.getTypeRegistry();
        // Is this enough?
        typeRegistry.register({
            BTreeSet
        });
        typeRegistry.register({
            MemoText: 'Text'
        });
        // Register parametrized enum ElectionStage:
        typeRegistry.register({
            ElectionStage
        });
        typeRegistry.register({
            ProposalStatus,
            VoteKind
        });
        typeRegistry.register({
            'ElectionStake': {
                'new': 'Balance',
                'transferred': 'Balance'
            },
            'Backer': {
                member: 'AccountId',
                stake: 'Balance'
            },
            'Seat': {
                member: 'AccountId',
                stake: 'Balance',
                backers: 'Vec<Backer>'
            },
            'Seats': 'Vec<Seat>',
            'SealedVote': {
                'voter': 'AccountId',
                'commitment': 'Hash',
                'stake': 'ElectionStake',
                'vote': 'Option<AccountId>'
            },
            'TransferableStake': {
                'seat': 'Balance',
                'backing': 'Balance'
            },
            'RuntimeUpgradeProposal': {
                'id': 'u32',
                'proposer': 'AccountId',
                'stake': 'Balance',
                'name': 'Text',
                'description': 'Text',
                'wasm_hash': 'Hash',
                'proposed_at': 'BlockNumber',
                'status': 'ProposalStatus'
            },
            'TallyResult<BlockNumber>': {
                'proposal_id': 'u32',
                'abstentions': 'u32',
                'approvals': 'u32',
                'rejections': 'u32',
                'slashes': 'u32',
                'status': 'ProposalStatus',
                'finalized_at': 'BlockNumber'
            }
        });
    }
    catch (err) {
        console.error('Failed to register custom types of Joystream node', err);
    }
}
function registerJoystreamTypes() {
    members_1.registerMembershipTypes();
    roles_1.registerRolesTypes();
    media_1.registerMediaTypes();
    forum_1.registerForumTypes();
    registerElectionAndProposalTypes();
    discovery_1.registerDiscoveryTypes();
    versioned_store_1.registerVersionedStoreTypes();
    permissions_1.registerVersionedStorePermissionsTypes();
    stake_1.registerStakeTypes();
    mint_1.registerMintTypes();
    recurring_rewards_1.registerRecurringRewardsTypes();
    hiring_1.registerHiringTypes();
    content_working_group_1.registerContentWorkingGroupTypes();
}
exports.registerJoystreamTypes = registerJoystreamTypes;
