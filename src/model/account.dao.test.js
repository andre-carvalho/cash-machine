import { getAccount, createAccount, updateAccount } from "./account.dao.js";
import { Account } from './account.js';
import { closeConnection } from '../drive/mongodb.js';

const ac = await getAccount();
if(ac) console.log("account balance:"+ac.getBalance());

console.log("=== createAccount ========== ");
const nac = await createAccount();
if(nac) console.log("account balance:"+nac.getBalance());

console.log("=== updateAccount ========== ");
const account=new Account(4545, [230,200,10,2,3]);

const uac = await updateAccount(account);
if(uac) console.log("account balance:"+uac.getBalance());

console.log("=== closeConnection ========== ");
await closeConnection();