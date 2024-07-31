import { GetStock,BuyStockFromAnotherUser,BuyStocksAtMarketPrice,GetStocks,GetUser,GetStocksByUser,GetStocksForSale,PutStocksForSale,CreateUser,LoginUser } from "../controllers/Stock.controller.js";

import express from "express";

const router = express.Router();

router.get("/stocks", GetStocks);
router.get("/stocks/:id", GetStock);
router.get("/stocks/forsale", GetStocksForSale);
router.get("/stocks/user/:userId", GetStocksByUser);
router.get("/user/:userId", GetUser);
router.post("/stocks/buy", BuyStocksAtMarketPrice);
router.post("/stocks/sell", PutStocksForSale);
router.post("/stocks/buy/:userId", BuyStockFromAnotherUser);
router.post("/user", CreateUser);
router.post("/user/login", LoginUser);


export default router;
