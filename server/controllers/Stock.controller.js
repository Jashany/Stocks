import Stock from "../models/Stock.model.js";
import User from "../models/User.model.js";
import Transaction from "../models/Transaction.model.js";

const BuyStocksAtMarketPrice = async (req, res) => {
  try {
    const { userId, stockId, quantity } = req.body;
    const stock = await Stock.findById(stockId);

    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const totalPrice = quantity * stock.currentPrice;

    if (user.money < totalPrice) {
      return res.status(400).json({ message: "Not enough money" });
    }

    user.money -= totalPrice;

    const existingStock = user.stocks.find(
      (s) => s.stockId.toString() === stockId
    );

    if (existingStock) {
      existingStock.quantity += quantity;
    } else {
      user.stocks.push({ stockId, quantity });
    }

    await Transaction.create({
      userId,
      type: "buy",
      stockId,
      quantity,
      price: stock.currentPrice,
    });

    await user.save();

    return res.status(200).json({ message: "Stock bought successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const PutStocksForSale = async (req, res) => {
  try {
    const { userId, stockId, quantity, price } = req.body;

    const stock = await Stock.findById(stockId);

    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingStock = user.stocks.find(
      (s) => s.stockId.toString() === stockId
    );

    if (!existingStock || existingStock.quantity < quantity) {
      return res.status(400).json({ message: "Not enough stocks" });
    }

    //dont remove quantity or add money untill the stock is sold

    await Transaction.create({
      userId,
      type: "sell",
      stockId,
      quantity,
      price,
      Status: "ForSale",
    });

    await user.save();

    return res.status(200).json({ message: "Stock put for sale successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const BuyStockFromAnotherUser = async (req, res) => {
  try {
    const { userId, TransactionId } = req.body;

    const transaction = await Transaction.findById(TransactionId);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.Status !== "ForSale") {
      return res.status(400).json({ message: "Transaction not for sale" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const seller = await User.findById(transaction.userId);

    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const totalPrice = transaction.quantity * transaction.price;

    if (user.money < totalPrice) {
      return res.status(400).json({ message: "Not enough money" });
    }

    user.money -= totalPrice;

    const existingStock = user.stocks.find(
      (s) => s.stockId.toString() === transaction.stockId.toString()
    );

    if (existingStock) {
      existingStock.quantity += transaction.quantity;
    } else {
      user.stocks.push({
        stockId: transaction.stockId,
        quantity: transaction.quantity,
      });
    }

    seller.money += totalPrice;

    const existingStockSeller = seller.stocks.find(
      (s) => s.stockId.toString() === transaction.stockId.toString()
    );

    if (existingStockSeller) {
      existingStockSeller.quantity -= transaction.quantity;
    }

    transaction.Status = "Completed";

    await user.save();

    await seller.save();
    await transaction.save();

    return res.status(200).json({ message: "Stock bought successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const GetStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    return res.status(200).json({ stocks });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const GetStock = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await Stock.findById(id);
    return res.status(200).json({ stock });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const GetStocksForSale = async (req, res) => {
  console.log("hi");
  try {
    const transactions = await Transaction.find({ Status: "ForSale" });

    console.log(transactions);

    return res.status(200).json({ transactions });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const GetStocksByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await Transaction.find({ userId });
    return res.status(200).json({ transactions });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const GetUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("stocks.stockId");

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const CreateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addDummyStocks = async () => {
  try {
    await Stock.create({ name: "Apple", currentPrice: 100 });
    await Stock.create({ name: "Microsoft", currentPrice: 200 });
    await Stock.create({ name: "Google", currentPrice: 300 });
    await Stock.create({ name: "Facebook", currentPrice: 400 });
    await Stock.create({ name: "Amazon", currentPrice: 500 });
    await Stock.create({ name: "Tesla", currentPrice: 600 });
  } catch (error) {
    console.log(error.message);
  }
};

const getUserData = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("stocks.stockId");

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  BuyStocksAtMarketPrice,
  PutStocksForSale,
  BuyStockFromAnotherUser,
  GetStocks,
  GetStock,
  GetStocksForSale,
  GetStocksByUser,
  GetUser,
  CreateUser,
  LoginUser,
  getUserData,
};
