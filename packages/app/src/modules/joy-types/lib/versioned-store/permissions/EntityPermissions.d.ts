import { JoyStruct } from '../../JoyStruct';
import { bool } from '@polkadot/types';
import { CredentialSet } from './credentials';
declare type IEntityPermissions = {
    update: CredentialSet;
    maintainer_has_all_permissions: bool;
};
export default class EntityPermissions extends JoyStruct<IEntityPermissions> {
    constructor(value: IEntityPermissions);
    get update(): CredentialSet;
    get maintainer_has_all_permissions(): bool;
}
export {};
