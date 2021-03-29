const Item = require('../models/item.model');

const addItem = async (req, res) => {
  const { itemName, user, servingQuantity, totalNutrients, uniqueId } = req.body;
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
    });

    res.status(200).send(newItem);
    console.log(newItem);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getItemsByUserAndDate = async (req, res) => {
  const user = req.params.id 
  const dateCreated =  req.params.date 

  // const { user, dateCreated } = req.body;
  console.log(user);
  try {
    const foundItems = await Item.find({ user: user, dateCreated: dateCreated }).exec();
    console.log(dateCreated)
    console.log(foundItems)
    res.status(200).send(foundItems);
  } catch (error) {
    res.status(400).send({ error: 400, message: error });
  }
};

const deleteItemById = async (req, res) => {
  console.log('delete ')
    const uniqueId = req.params.id 
  // const { _id } = req.body;
  console.log(uniqueId)
  try {
    const deletedItem = await Item.findOneAndDelete({ uniqueId: uniqueId });
    res.status(200).send(deletedItem);
  } catch (error) {
    res.status(400).send({ error: 400, message: error });
  }
};

// update serving size
const updateById = async (req, res) => {
  const { _id, servingQuantity } = req.body;
  try {
    const updatedItem = await Item.findOneAndUpdate({ _id: _id }, { servingQuantity: servingQuantity }, { new: true });
    res.status(200).send(updatedItem);
  } catch (error) {
    res.status(400).send({ error: 400, message: error });
  }
};

module.exports = { addItem, getItemsByUserAndDate, deleteItemById, updateById };