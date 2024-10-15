const express = require("express");
const router = express.Router();

const Item = require("../models/item");

const getItem = async (req, res, next) => {
  let item;
  try {
    item = await Item.findById(req.params.id);
    if (item === null) {
      return res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.item = item;
  next();
};

// GET ALL
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ONE
router.get("/:id", getItem, async (req, res) => {
  res.json(res.item);
});

// POST CREATE
router.post("/", async (req, res) => {
  const item = new Item({
    name: req.body.name,
    quantity: req.body.quantity,
    store: req.body.store,
    price: req.body.price,
  });
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH UPDATE
router.patch("/:id", getItem, async (req, res) => {
  if (req.body.name != null) {
    res.item.name = req.body.name;
  }
  if (req.body.quantity != null) {
    res.item.quantity = req.body.quantity;
  }
  if (req.body.store != null) {
    res.item.store = req.body.store;
  }
  if (req.body.price != null) {
    res.item.name = req.body.price;
  }
  try {
    const updatedItem = await res.item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", getItem, async (req, res) => {
  try {
    await res.item.deleteOne();
    res.json({ message: "Removed Item" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
