import * as dotenv from 'dotenv';
dotenv.config();

import Role from '../api/models/Role';
import User from '../api/models/User';
import Privilege from '../api/models/Privilege';
import UserPrivilege from '../api/models/UserPrivileges';

const syncTables = () => Promise.all([User.sync(), Role.sync(), Privilege.sync()]);
const syncPivotTables = () => Promise.all([UserPrivilege.sync()]);

syncTables()
    .then((result) => console.log(result))
    .catch((error) => console.log(error))
    .finally(() => process.exit());

syncPivotTables()
    .then((result) => console.log(result))
    .catch((error) => console.log(error))
    .finally(() => process.exit());
