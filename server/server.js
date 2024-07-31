import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import bodyParser from "body-parser";
import router from "./routes/Stock.routes.js";
import Transaction from "./models/Transaction.model.js";

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/api", router);

app.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find({ Status: "ForSale" }).populate("userId").populate("stockId");
    
        console.log(transactions);
    
        return res.status(200).json({ transactions });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
});

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://notmeits11:notmeits11@salons.bqfujxq.mongodb.net/?retryWrites=true&w=majority&appName=Salons/Stocks', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
}).catch((error) => console.log(error.message));