const animalService = require('../services/animalService');

const getAllAnimals = async (req, res) => {
  try {
    const { search } = req.query;
    const animals = await animalService.getAllAnimals(search);
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createAnimal = async (req, res) => {
  try {
    const newAnimal = await animalService.createAnimal(req.body);
    res.status(201).json(newAnimal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateAnimal = async (req, res) => {
  try {
    const updatedAnimal = await animalService.updateAnimal(req.params.id, req.body);
    res.json(updatedAnimal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteAnimal = async (req, res) => {
  try {
    await animalService.deleteAnimal(req.params.id);
    res.json({ message: 'Animal deleted successfully' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const getProductionSummary = async (req, res) => {
  try {
    const summary = await animalService.getProductionSummary();
    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllAnimals,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getProductionSummary
};
