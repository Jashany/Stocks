import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import bodyParser from "body-parser";
import router from "./routes/Stock.routes.js";


const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use("/api", router);

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://notmeits11:notmeits11@salons.bqfujxq.mongodb.net/?retryWrites=true&w=majority&appName=Salons/Stocks', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
}).catch((error) => console.log(error.message));