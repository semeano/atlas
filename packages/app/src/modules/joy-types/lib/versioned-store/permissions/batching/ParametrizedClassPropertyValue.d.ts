import { ParametrizedPropertyValue } from './parametrized-property-value';
import { JoyStruct } from '../../../JoyStruct';
import { u16 } from '@polkadot/types';
declare type IParametrizedClassPropertyValue = {
    in_class_index: u16;
    value: ParametrizedPropertyValue;
};
export default class ParametrizedClassPropertyValue extends JoyStruct<IParametrizedClassPropertyValue> {
    constructor(value: IParametrizedClassPropertyValue);
    get in_class_index(): u16;
    get value(): ParametrizedPropertyValue;
}
export {};
