import { JoyStruct } from '../../../JoyStruct';
import { OperationType } from './operation-types';
import { bool, Option } from '@polkadot/types';
import { Credential } from '../credentials';
declare type IOperation = {
    with_credential: Option<Credential>;
    as_entity_maintainer: bool;
    operation_type: OperationType;
};
export declare class Operation extends JoyStruct<IOperation> {
    constructor(value: IOperation);
    get with_credential(): Option<Credential>;
    get as_entity_maintainer(): bool;
    get operation_type(): OperationType;
}
export {};
