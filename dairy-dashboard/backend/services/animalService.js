const Animal = require('../models/Animal');

const getAllAnimals = async (searchQuery) => {
  try {
    const query = searchQuery ? {
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { breed: { $regex: searchQuery, $options: 'i' } }
      ]
    } : {};
    const animals = await Animal.find(query).sort({ createdAt: -1 });
    return animals;
  } catch (err) {
    console.error("Error in getAllAnimals service:", err);
    throw new Error('Could not retrieve animals');
  }
};

const createAnimal = async (animalData) => {
  try {
    const newAnimal = new Animal(animalData);
    await newAnimal.save();
    return newAnimal;
  } catch (err) {
    console.error("Error in createAnimal service:", err);
    throw err;
  }
};

const updateAnimal = async (id, animalData) => {
  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(id, animalData, { new: true, runValidators: true });
    if (!updatedAnimal) {
      throw new Error('Animal not found');
    }
    return updatedAnimal;
  } catch (err) {
    console.error("Error in updateAnimal service:", err);
    throw err;
  }
};

const deleteAnimal = async (id) => {
  try {
    const deletedAnimal = await Animal.findByIdAndDelete(id);
    if (!deletedAnimal) {
      throw new Error('Animal not found');
    }
    return { message: 'Animal deleted successfully' };
  } catch (err) {
    console.error("Error in deleteAnimal service:", err);
    throw new Error('Could not delete animal');
  }
};

const getProductionSummary = async () => {
  try {
    const summary = await Animal.aggregate([
      {
        $group: {
          _id: '$animalType',
          totalMilk: { $sum: '$milkProduction' }
        }
      }
    ]);
    return summary;
  } catch (err) {
    console.error("Error in getProductionSummary service:", err);
    throw new Error('Could not get production summary');
  }
};

module.exports = {
  getAllAnimals,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getProductionSummary
};
