// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const NutrientsSchema = require('./../models/nutrition.model');
// const SECRET_KEY = process.env.SECRET_KEY;

// no auth implemented yet
const addItem = async (req, res) => {
  const { itemName, user, servingQuantity, totalNutrients } = req.body;
  const { PROTCNT, FIBTG, VITA_RAE, THIA, RIBF, NIA, VITB6A, VITB12, FOLDFE, VITC, CA, FE, MG, K, NA, ZN } = totalNutrients
  try {
    const newItem = await NutrientsSchema.create({
      itemName: itemName,
      user: user,
      servingQuantity: servingQuantity,
      nutrients: {
        protein: PROTCNT,
        fiber: FIBTG,
        vitaminA: VITA_RAE,
        thiamin: THIA,
        riboflavin: RIBF,
        niacin: NIA,
        vitaminB6: VITB6A,
        vitaminB12: VITB12,
        folate: FOLDFE,
        vitaminC: VITC,
        calcium: CA,
        iron: FE,
        magnesium: MG,
        potassium: K,
        sodium: NA,
        zinc: ZN
      }
    })
    res.send(200).send(newItem);
  } catch (error) {
    res.status(500).send({ error: 500, message: error })
  }
}

// no auth implemented yet
// return an array of items for that specific date, and filter in frontend
const getItemsByUserAndDate = async (req, res) => {
  const { user, dateCreated } = req.body;
  try {
    // confirm that this returns an array of items for that date and user
    const foundItems = await NutrientsSchema.find({ user: user, dateCreated: dateCreated }).exec();
    res.status(200).send(foundItems);
  } catch (error) {
    res.status(400).send({ error: 400, message: error });
  }
}

// delete item by user and date?
// we can look for items belonging to this user, on a specific date, 
// then we can ... oh wait no we can do it through the actual item _id(primarykey)
const deleteItemById = async (req, res) => {
  const { _id} = req.body;
  try {
    const deletedItem = await NutrientsSchema.findByIdAndRemove(_id);
    res.status(200).send(deletedItem);
  } catch (error) {
    res.status(400).send({ error: 400, message: error });
  }
}

const updateById = async (req, res) => {
  const { _id} = req.body;
  try {
    const updatedItem = await NutrientsSchema.findByIdAndUpdate(_id);
    res.status(200).send(updatedItem);
  } catch (error) {
    res.status(400).send({ error: 400, message: error });
  }
}

module.exports = { addItem, getItemsByUserAndDate, deleteItemById, updateById }