import Food from '../models/Foodmodels.js';

export const postFood = async (req, res) => {
  try {
    const food = await Food.create(req.body);

    res.status(201).json({
      msg: 'Food created successfully',
      food,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message,
    });
  }
};

export const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();

    res.status(200).json({
      msg: 'All foods fetched successfully',
      data: foods,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message,
    });
  }
};

export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ msg: 'Food not available' });
    }

    res.status(200).json({
      msg: 'Food fetched successfully',
      data: food,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message,
    });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) {
      return res.status(404).json({ msg: 'Food not found' });
    }

    res.status(200).json({
      msg: 'Food deleted successfully',
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message,
    });
  }
};

export const updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!food) {
      return res.status(404).json({ msg: 'Food not found' });
    }

    res.status(200).json({
      msg: 'Food updated successfully',
      food,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message,
    });
  }
};