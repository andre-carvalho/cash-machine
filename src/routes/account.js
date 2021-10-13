/**
 * Routers for account 
 */
import { getBalance, getTransactions, resetAccount, takeOut } from '../services/accountHandler.js'
import pkg from 'express';
const { Router } = pkg;

const accountRouter = Router();

/* GET balance of account */
accountRouter.get("/balance",
    async (req, res) => {
        const data = await getBalance();
        res.json(data);
    }
);

/* GET extract of account */
accountRouter.get("/extract",
    async (req, res) => {
        const data = await getTransactions();
        res.json(data);
    }
);

/* GET take out from account */
accountRouter.get("/takeout/:amount",
    async (req, res) => {
        const { amount } = req.params;
        let val=parseInt(amount);
        if (isNaN(val) || !Number.isInteger(val)) {
            res.status(400).json({ error: 'amount should be numeric' });
        }else{
            const data = await takeOut(amount);
            res.json(data);
        }
    }
);

/* PUT account reset */
accountRouter.put("/reset",
    async (req, res) => {
        await resetAccount();
        res.status(202).json({ msg: 'the account has been reset to defaults' });
    }
);

export { accountRouter };
