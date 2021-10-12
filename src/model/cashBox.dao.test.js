import { createCashBox, getCashBox, updateCashBox } from "./cashBox.dao.js";
import { CashBox } from "./cashBox.js";
import { closeConnection } from '../drive/mongodb.js';

const cb = await getCashBox();
if(cb) console.log("getAvailableNotes:"+cb.getAvailableNotes());

console.log("=== createCashBox ========== ");
const ncb = await createCashBox();
if(ncb) console.log("getAvailableNotes:"+JSON.stringify(ncb.getAvailableNotes()));

console.log("=== updateCashBox ========== ");
const cashBox=new CashBox([{v:1000,a:100},{v:500,a:100},{v:400,a:100},{v:300,a:100}]);

const ucb = await updateCashBox(cashBox);
if(ucb) console.log("getAvailableNotes:"+JSON.stringify(ucb.getAvailableNotes()));

console.log("=== closeConnection ========== ");
await closeConnection();