import mongoose from 'mongoose';

const CashBoxSchema = new mongoose.Schema({
    _id: String,
    availableNotes: [
        {
            v: Number,
            a: { type: Number, default: Infinity }
        }
    ]
});

// Compile model from schema
const CashBoxModel = mongoose.models['CashBox'] || mongoose.model('CashBox', CashBoxSchema );

export { CashBoxModel };