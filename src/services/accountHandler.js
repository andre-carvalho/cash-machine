import { Account } from '../model/account.js';

const getNewAccount=()=>{
    return new Account();
};

export { getNewAccount };