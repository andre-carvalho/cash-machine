import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
    _id: String,
    balance:  { type: Number, required: true },
    transactions: [Number]
});

// Compile model from schema
const AccountModel = mongoose.models['Account'] || mongoose.model('Account', AccountSchema );

export { AccountModel };