import { Struct } from '@polkadot/types/codec';
import { Codec } from '@polkadot/types/types';
export declare class JoyStruct<T extends {
    [K: string]: Codec;
}> extends Struct {
    getField<C extends Codec>(name: keyof T): C;
    getString(name: keyof T): string;
    getBoolean(name: keyof T): boolean;
    getEnumAsString<EnumValue extends string>(name: keyof T): EnumValue;
    unwrapOrUndefined<C extends Codec>(name: keyof T): C | undefined;
    getOptionalString(name: keyof T): string | undefined;
    cloneValues(): T;
}
