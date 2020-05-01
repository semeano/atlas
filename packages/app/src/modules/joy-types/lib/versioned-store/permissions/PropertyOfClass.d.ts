import { JoyStruct } from '../../JoyStruct';
import ClassId from '../ClassId';
import { u16 } from '@polkadot/types';
declare type IPropertyOfClass = {
    class_id: ClassId;
    property_index: u16;
};
export default class PropertyOfClass extends JoyStruct<IPropertyOfClass> {
    constructor(value: IPropertyOfClass);
    get class_id(): ClassId;
    get property_index(): u16;
}
export {};
