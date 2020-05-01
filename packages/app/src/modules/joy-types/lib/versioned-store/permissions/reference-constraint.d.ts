import { Enum, Null, Vec } from '@polkadot/types';
import PropertyOfClass from './PropertyOfClass';
export declare class NoReferencingAllowed extends Null {
}
export declare class NoConstraint extends Null {
}
declare const Restricted_base: import("@polkadot/types/types").Constructor<Vec<PropertyOfClass>>;
export declare class Restricted extends Restricted_base {
}
export declare type ReferenceConstraintVariant = NoReferencingAllowed | NoConstraint | Restricted;
export declare type ReferenceConstraintValue = {
    [typeName: string]: ReferenceConstraintVariant;
};
export declare class ReferenceConstraint extends Enum {
    constructor(value?: ReferenceConstraintValue, index?: number);
    static NoReferencingAllowed(): ReferenceConstraint;
    static NoConstraint(): ReferenceConstraint;
    static Restricted(restrictions: Vec<PropertyOfClass>): ReferenceConstraint;
}
export {};
