import mongoose from 'mongoose';


const StockSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    currentPrice: {
        type: Number,
        required: true,
    },
    priceHistory: [{
        price: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    }],
}, { timestamps: true });

const Stock = mongoose.model('Stock', StockSchema);

export default Stock;