require('dotenv').config();
const axios = require('axios');
const Item = require('../models/item.model');
const User = require('./../models/user.model');
const APIUrl = process.env.API_URL;
const APIKey = process.env.API_KEY;

const addItem = async (req, res) => {
  const { itemName, user, servingQuantity, totalNutrients, uniqueId, totalGoalMet  } = req.body;
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
    const currentUser = await User.findOne({ _id: user});
    const updatedGoalEntry = {
      date: dateToday,
      totalGoalMet: totalGoalMet
    };

    let index = currentUser.days.findIndex(entry => {
      return entry.date === dateToday;
    });

    if (index === -1) {
      currentUser.days.unshift(updatedGoalEntry);
      await currentUser.save();
    } else {
      currentUser.days[index].totalGoalMet = totalGoalMet;
      await currentUser.save();
    }

    res.status(200).send(newItem);
    console.log(newItem);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getItemsByUserAndDate = async (req, res) => {
  const user = req.params.id;
  const dateCreated =  req.params.date;
  console.log(user);
  try {
    const foundItems = await Item.find({ user: user, dateCreated: dateCreated }).exec();
    res.status(200).send(foundItems);
  } catch (error) {
    res.status(400).send({ error: 400, message: error });
  }
};

const deleteItemById = async (req, res) => {
  console.log('delete ')
    const uniqueId = req.params.id 
  console.log(uniqueId)
  try {
    const deletedItem = await Item.findOneAndDelete({ uniqueId: uniqueId });
    res.status(200).send(deletedItem);
  } catch (error) {
    res.status(400).send({ error: 400, message: error });
  }
};

const updateById = async (req, res) => {
  const { _id, servingQuantity } = req.body;
  try {
    const updatedItem = await Item.findOneAndUpdate({ _id: _id }, { servingQuantity: servingQuantity }, { new: true });
    res.status(200).send(updatedItem);
  } catch (error) {
    res.status(400).send({ error: 400, message: error });
  }
};

const search = async (req, res) => {
  const { type, query } = req.body;
  if (!type || !query) return res.status(400).json({error: 'Bad request: Please provide a valid request type and query!'});
  try {
    const { data } = await axios.get(`${APIUrl}/search?api_key=${APIKey}&query=${query}${ type !== 'all' ?
      type === 'non' ?
        '&dataType=Foundation,Survey,SR%20Legacy' : '&dataType=Branded'
      : '' }`);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({error: err});
  }
};

const getNutrition = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({error: 'Bad request: Please provide id!'});
  try {
    const { data } = await axios.post(`${APIUrl}?api_key=${APIKey}`, {
      fdcIds: [id],
      format: 'abridged',
      nutrients: [
        203,
        291,
        318,
        404,
        405,
        406,
        415,
        418,
        417,
        401,
        301,
        303,
        304,
        306,
        307,
        309
      ]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = { getNutrition, search, addItem, getItemsByUserAndDate, deleteItemById, updateById };
