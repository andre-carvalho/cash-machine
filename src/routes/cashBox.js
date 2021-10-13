/**
 * Routers for account 
 */
import { getAvailableNotes, resetCashBox } from '../services/cashBoxHandler.js'
import pkg from 'express';
const { Router } = pkg;
 
const cashBoxRouter = Router();
 
/* GET available notes in the cash box */
cashBoxRouter.get("/available/notes",
    async (req, res) => {
        const data = await getAvailableNotes();
        let notes=[];
        // to clear the output API
        data.availableNotes.forEach(note => {
            notes.push({v:note.v,a:note.a});
        });
        res.json(notes);
    }
);

/* PUT cash box reset */
cashBoxRouter.put("/reset",
    async (req, res) => {
        await resetCashBox();
        res.status(202).json({ msg: 'the cash box has been reset to defaults' });
    }
);
  
export { cashBoxRouter };
 