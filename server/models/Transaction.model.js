import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    type: {
        type: String,
        enum: ["buy", "sell"],
    },
    stockId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Stock",
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    Status: {
        type: String,
        enum: ["ForSale", "Pending", "Completed"],
        default: "Completed",
    },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
