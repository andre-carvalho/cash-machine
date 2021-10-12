/**
 * Routers for account 
 */
import { Router } from 'express';
import { getBalance, getTransactions, takeOut } from '../services/accountHandler.js'

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
        const data = await takeOut(amount);
        res.json(data);
    }
);

export { accountRouter };
