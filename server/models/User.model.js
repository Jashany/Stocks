import mongoose from 'mongoose';


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    money: {
        type: Number,
        default: 100000, // Initial money given to each user
    },
    stocks: [{
        stockId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stock',
        },
        quantity: {
            type: Number,
            default: 0,
        },
    }],
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction',
        },
    ],
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;