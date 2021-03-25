// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const Item = require('../models/item.model');
// const SECRET_KEY = process.env.SECRET_KEY;

// no auth implemented yet
const addItem = async (req, res) => {
  const { itemName, user, servingQuantity, totalNutrients, uniqueId } = req.body;
  // const { PROCNT, FIBTG, VITA_RAE, THIA, RIBF, NIA, VITB6A, VITB12, FOLDFE, VITC, CA, FE, MG, K, NA, ZN } = totalNutrients
  const dateToday = new Date().toISOString().substring(0, 10);
  try {
    console.log(itemName, user, servingQuantity, totalNutrients);
    const newItem = await Item.create({
      uniqueId: uniqueId,
      itemName: itemName,
      user: user,
      servingQuantity: servingQuantity,
      dateCreated: dateToday,
      totalNutrients: totalNutrients
    })
    res.status(200).send(newItem);
    console.log(newItem);
  } catch (error) {
    res.status(500).json({message: error })
  }
}

// no auth implemented yet
// return an array of items for that specific date, and filter in frontend
const getItemsByUserAndDate = async (req, res) => {
  const { user, createdAt } = req.body;
  try {
    // confirm that this returns an array of items for that date and user
    const foundItems = await Item.find({ user: user, createdAt: createdAt }).exec();
    res.status(200).send(foundItems);
  } catch (error) {
    res.status(400).send({ error: 400, message: error });
  }
}

// would go to a date, and then
// we would pull up a date through getItemsByUserAndDate, and display items
// then you can click on the button for the item, and use the item _id to delete it
const deleteItemById = async (req, res) => {
  const { _id} = req.body;
  try {
    const deletedItem = await Item.findByIdAndRemove(_id);
    res.status(200).send(deletedItem);
  } catch (error) {
    res.status(400).send({ error: 400, message: error });
  }
}

// update serving size
const updateById = async (req, res) => {
  const { _id, servingQuantity} = req.body;

  try {
    const updatedItem = await Item.findOneAndUpdate({ _id: _id }, { servingQuantity: servingQuantity }, { new: true });
    res.status(200).send(updatedItem);
  } catch (error) {
    res.status(400).send({ error: 400, message: error });
  }
}

module.exports = { addItem, getItemsByUserAndDate, deleteItemById, updateById }