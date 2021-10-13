import { Account } from '../model/account.js';
import { getAccount, createAccount, updateAccount } from '../model/account.dao.js';
import { updateCashBox } from '../model/cashBox.dao.js';
import { getDefaultCashBox } from './cashBoxHandler.js';

const getDefaultAccount=async ()=>{
    let account=await getAccount();
    if(!account) {
        account=new Account();
        await createAccount(account);
    }
    return account;
};

const getBalance=async ()=>{
    const account=await getDefaultAccount();
    
    return {balance:account.getBalance()};
};

const getTransactions=async ()=>{
    const account=await getDefaultAccount();
    
    return {transactions:account.getTransactions()};
};

const takeOut=async (amount)=>{
    const account=await getDefaultAccount();
    const cashBox=await getDefaultCashBox();
    let balance,notes;
    try {
        balance=account.takeOut(amount);
        notes=cashBox.getNotesForAmount(amount);
    } catch (error) {
        
        return { error: error.message };
    }
    await updateAccount(account);
    await updateCashBox(cashBox);

    
    return {balance:balance,notes:notes};
};

const resetAccount=async ()=>{
    const aAccount=await updateAccount(new Account());
    
    if(!aAccount) {
        return { error: 'account reset failed' };
    }
    return aAccount;
};

export { getDefaultAccount, getBalance, getTransactions, takeOut, resetAccount };