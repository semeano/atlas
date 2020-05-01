"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@polkadot/types");
const codec_1 = require("@polkadot/types/codec");
const stake_1 = require("../stake");
const JoyStruct_1 = require("../JoyStruct");
const ajv_1 = __importDefault(require("ajv"));
class ApplicationId extends types_1.u64 {
}
exports.ApplicationId = ApplicationId;
;
class OpeningId extends types_1.u64 {
}
exports.OpeningId = OpeningId;
;
class CurrentBlock extends types_1.Null {
}
exports.CurrentBlock = CurrentBlock;
;
class ExactBlock extends types_1.u32 {
}
exports.ExactBlock = ExactBlock;
; // BlockNumber
class ActivateOpeningAt extends codec_1.Enum {
    constructor(value, index) {
        super({
            CurrentBlock,
            ExactBlock,
        }, value, index);
    }
}
exports.ActivateOpeningAt = ActivateOpeningAt;
var ApplicationDeactivationCauseKeys;
(function (ApplicationDeactivationCauseKeys) {
    ApplicationDeactivationCauseKeys["External"] = "External";
    ApplicationDeactivationCauseKeys["Hired"] = "Hired";
    ApplicationDeactivationCauseKeys["NotHired"] = "NotHired";
    ApplicationDeactivationCauseKeys["CrowdedOut"] = "CrowdedOut";
    ApplicationDeactivationCauseKeys["OpeningCancelled"] = "OpeningCancelled";
    ApplicationDeactivationCauseKeys["ReviewPeriodExpired"] = "ReviewPeriodExpired";
    ApplicationDeactivationCauseKeys["OpeningFilled"] = "OpeningFilled";
})(ApplicationDeactivationCauseKeys = exports.ApplicationDeactivationCauseKeys || (exports.ApplicationDeactivationCauseKeys = {}));
class ApplicationDeactivationCause extends codec_1.Enum {
    constructor(value, index) {
        super([
            ApplicationDeactivationCauseKeys.External,
            ApplicationDeactivationCauseKeys.Hired,
            ApplicationDeactivationCauseKeys.NotHired,
            ApplicationDeactivationCauseKeys.CrowdedOut,
            ApplicationDeactivationCauseKeys.OpeningCancelled,
            ApplicationDeactivationCauseKeys.ReviewPeriodExpired,
            ApplicationDeactivationCauseKeys.OpeningFilled,
        ], value, index);
    }
}
exports.ApplicationDeactivationCause = ApplicationDeactivationCause;
;
class UnstakingApplicationStage extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            deactivation_initiated: types_1.u32,
            cause: ApplicationDeactivationCause,
        }, value);
    }
    get cause() {
        return this.getField('cause');
    }
}
exports.UnstakingApplicationStage = UnstakingApplicationStage;
;
class InactiveApplicationStage extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            deactivation_initiated: types_1.u32,
            deactivated: types_1.u32,
            cause: ApplicationDeactivationCause,
        }, value);
    }
    get cause() {
        return this.getField('cause');
    }
}
exports.InactiveApplicationStage = InactiveApplicationStage;
;
class ActiveApplicationStage extends types_1.Null {
}
exports.ActiveApplicationStage = ActiveApplicationStage;
;
var ApplicationStageKeys;
(function (ApplicationStageKeys) {
    ApplicationStageKeys["Active"] = "Active";
    ApplicationStageKeys["Unstaking"] = "Unstaking";
    ApplicationStageKeys["Inactive"] = "Inactive";
})(ApplicationStageKeys = exports.ApplicationStageKeys || (exports.ApplicationStageKeys = {}));
class ApplicationStage extends codec_1.Enum {
    constructor(value, index) {
        super({
            [ApplicationStageKeys.Active]: types_1.Null,
            [ApplicationStageKeys.Unstaking]: UnstakingApplicationStage,
            [ApplicationStageKeys.Inactive]: InactiveApplicationStage,
        }, value, index);
    }
}
exports.ApplicationStage = ApplicationStage;
class ApplicationRationingPolicy extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            max_active_applicants: types_1.u32,
        }, value);
    }
    get max_active_applicants() {
        return this.getField('max_active_applicants');
    }
}
exports.ApplicationRationingPolicy = ApplicationRationingPolicy;
;
class WaitingToBeingOpeningStageVariant extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            begins_at_block: types_1.u32,
        }, value);
    }
    get begins_at_block() {
        return this.getField('begins_at_block');
    }
}
exports.WaitingToBeingOpeningStageVariant = WaitingToBeingOpeningStageVariant;
;
var OpeningDeactivationCauseKeys;
(function (OpeningDeactivationCauseKeys) {
    OpeningDeactivationCauseKeys["CancelledBeforeActivation"] = "CancelledBeforeActivation";
    OpeningDeactivationCauseKeys["CancelledAcceptingApplications"] = "CancelledAcceptingApplications";
    OpeningDeactivationCauseKeys["CancelledInReviewPeriod"] = "CancelledInReviewPeriod";
    OpeningDeactivationCauseKeys["ReviewPeriodExpired"] = "ReviewPeriodExpired";
    OpeningDeactivationCauseKeys["Filled"] = "Filled";
})(OpeningDeactivationCauseKeys = exports.OpeningDeactivationCauseKeys || (exports.OpeningDeactivationCauseKeys = {}));
class OpeningDeactivationCause extends codec_1.Enum {
    constructor(value, index) {
        super([
            OpeningDeactivationCauseKeys.CancelledBeforeActivation,
            OpeningDeactivationCauseKeys.CancelledAcceptingApplications,
            OpeningDeactivationCauseKeys.CancelledInReviewPeriod,
            OpeningDeactivationCauseKeys.ReviewPeriodExpired,
            OpeningDeactivationCauseKeys.Filled,
        ], value, index);
    }
}
exports.OpeningDeactivationCause = OpeningDeactivationCause;
;
class AcceptingApplications extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            started_accepting_applicants_at_block: types_1.u32,
        }, value);
    }
    get started_accepting_applicants_at_block() {
        return this.getField('started_accepting_applicants_at_block');
    }
}
exports.AcceptingApplications = AcceptingApplications;
;
class ReviewPeriod extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            started_accepting_applicants_at_block: types_1.u32,
            started_review_period_at_block: types_1.u32,
        }, value);
    }
    get started_accepting_applicants_at_block() {
        return this.getField('started_accepting_applicants_at_block');
    }
    get started_review_period_at_block() {
        return this.getField('started_review_period_at_block');
    }
}
exports.ReviewPeriod = ReviewPeriod;
;
class Deactivated extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            cause: OpeningDeactivationCause,
            deactivated_at_block: types_1.u32,
            started_accepting_applicants_at_block: types_1.u32,
            started_review_period_at_block: types_1.Option.with(types_1.u32),
        }, value);
    }
    get cause() {
        return this.getField('cause');
    }
    get deactivated_at_block() {
        return this.getField('deactivated_at_block');
    }
    get started_accepting_applicants_at_block() {
        return this.getField('started_accepting_applicants_at_block');
    }
    get started_review_period_at_block() {
        return this.getField('started_review_period_at_block');
    }
}
exports.Deactivated = Deactivated;
;
var ActiveOpeningStageKeys;
(function (ActiveOpeningStageKeys) {
    ActiveOpeningStageKeys["AcceptingApplications"] = "AcceptingApplications";
    ActiveOpeningStageKeys["ReviewPeriod"] = "ReviewPeriod";
    ActiveOpeningStageKeys["Deactivated"] = "Deactivated";
})(ActiveOpeningStageKeys = exports.ActiveOpeningStageKeys || (exports.ActiveOpeningStageKeys = {}));
class ActiveOpeningStage extends codec_1.Enum {
    constructor(value, index) {
        super({
            [ActiveOpeningStageKeys.AcceptingApplications]: AcceptingApplications,
            [ActiveOpeningStageKeys.ReviewPeriod]: ReviewPeriod,
            [ActiveOpeningStageKeys.Deactivated]: Deactivated,
        }, value, index);
    }
}
exports.ActiveOpeningStage = ActiveOpeningStage;
class ActiveOpeningStageVariant extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            stage: ActiveOpeningStage,
            applications_added: types_1.Vec.with(ApplicationId),
            active_application_count: types_1.u32,
            unstaking_application_count: types_1.u32,
            deactivated_application_count: types_1.u32,
        }, value);
    }
    get stage() {
        return this.getField('stage');
    }
    get is_active() {
        switch (this.stage.type) {
            case ActiveOpeningStageKeys.AcceptingApplications:
                return true;
        }
        return false;
    }
}
exports.ActiveOpeningStageVariant = ActiveOpeningStageVariant;
var OpeningStageKeys;
(function (OpeningStageKeys) {
    OpeningStageKeys["WaitingToBegin"] = "WaitingToBegin";
    OpeningStageKeys["Active"] = "Active";
})(OpeningStageKeys = exports.OpeningStageKeys || (exports.OpeningStageKeys = {}));
class OpeningStage extends codec_1.Enum {
    constructor(value, index) {
        super({
            [OpeningStageKeys.WaitingToBegin]: WaitingToBeingOpeningStageVariant,
            [OpeningStageKeys.Active]: ActiveOpeningStageVariant,
        }, value, index);
    }
}
exports.OpeningStage = OpeningStage;
;
var StakingAmountLimitModeKeys;
(function (StakingAmountLimitModeKeys) {
    StakingAmountLimitModeKeys["AtLeast"] = "AtLeast";
    StakingAmountLimitModeKeys["Exact"] = "Exact";
})(StakingAmountLimitModeKeys = exports.StakingAmountLimitModeKeys || (exports.StakingAmountLimitModeKeys = {}));
class StakingAmountLimitMode extends codec_1.Enum {
    constructor(value, index) {
        super([
            StakingAmountLimitModeKeys.AtLeast,
            StakingAmountLimitModeKeys.Exact,
        ], value, index);
    }
}
exports.StakingAmountLimitMode = StakingAmountLimitMode;
;
class StakingPolicy extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            amount: types_1.u128,
            amount_mode: StakingAmountLimitMode,
            crowded_out_unstaking_period_length: types_1.Option.with(types_1.u32),
            review_period_expired_unstaking_period_length: types_1.Option.with(types_1.u32),
        }, value);
    }
    get amount() {
        return this.getField('amount');
    }
    get amount_mode() {
        return this.getField('amount_mode');
    }
    get crowded_out_unstaking_period_length() {
        return this.getField('crowded_out_unstaking_period_length');
    }
    get review_period_expired_unstaking_period_length() {
        return this.getField('review_period_expired_unstaking_period_length');
    }
}
exports.StakingPolicy = StakingPolicy;
;
const role_schema_json = __importStar(require("./schemas/role.schema.json"));
const schemaValidator = new ajv_1.default({ allErrors: true }).compile(role_schema_json);
class Opening extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            created: types_1.u32,
            stage: OpeningStage,
            max_review_period_length: types_1.u32,
            application_rationing_policy: types_1.Option.with(ApplicationRationingPolicy),
            application_staking_policy: types_1.Option.with(StakingPolicy),
            role_staking_policy: types_1.Option.with(StakingPolicy),
            human_readable_text: types_1.Text,
        }, value);
    }
    parse_human_readable_text() {
        const hrt = this.getField('human_readable_text');
        if (!hrt) {
            return undefined;
        }
        const str = hrt.toString();
        try {
            const obj = JSON.parse(str);
            if (schemaValidator(obj) === true) {
                return obj;
            }
        }
        catch (e) {
            console.log("JSON schema validation failed:", e.toString());
        }
        return str;
    }
    get created() {
        return this.getField('created');
    }
    get stage() {
        return this.getField('stage');
    }
    get max_review_period_length() {
        return this.getField('max_review_period_length');
    }
    get application_rationing_policy() {
        return this.getField('application_rationing_policy');
    }
    get application_staking_policy() {
        return this.getField('application_staking_policy');
    }
    get role_staking_policy() {
        return this.getField('role_staking_policy');
    }
    get max_applicants() {
        const appPolicy = this.application_rationing_policy;
        if (appPolicy.isNone) {
            return 0;
        }
        return appPolicy.unwrap().max_active_applicants.toNumber();
    }
    get is_active() {
        switch (this.stage.type) {
            case OpeningStageKeys.WaitingToBegin:
                return true;
            case OpeningStageKeys.Active:
                return this.stage.value.is_active;
        }
        return false;
    }
}
exports.Opening = Opening;
class Application extends JoyStruct_1.JoyStruct {
    constructor(value) {
        super({
            opening_id: OpeningId,
            application_index_in_opening: types_1.u32,
            add_to_opening_in_block: types_1.u32,
            active_role_staking_id: types_1.Option.with(stake_1.StakeId),
            active_application_staking_id: types_1.Option.with(stake_1.StakeId),
            stage: ApplicationStage,
            human_readable_text: types_1.Text,
        }, value);
    }
    get stage() {
        return this.getField('stage');
    }
    get active_role_staking_id() {
        return this.getField('active_role_staking_id');
    }
    get active_application_staking_id() {
        return this.getField('active_application_staking_id');
    }
    get human_readable_text() {
        return this.getField('human_readable_text');
    }
}
exports.Application = Application;
function registerHiringTypes() {
    try {
        types_1.getTypeRegistry().register({
            ApplicationId: 'u64',
            OpeningId: 'u64',
            Application,
            ApplicationStage,
            // why the prefix? is there some other identically named type?
            'hiring::ActivateOpeningAt': ActivateOpeningAt,
            ApplicationRationingPolicy,
            OpeningStage,
            StakingPolicy,
            Opening,
        });
    }
    catch (err) {
        console.error('Failed to register custom types of hiring module', err);
    }
}
exports.registerHiringTypes = registerHiringTypes;
