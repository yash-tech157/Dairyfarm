const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

// GET all animals with optional search query
router.get('/', animalController.getAllAnimals);

// POST a new animal
router.post('/', animalController.createAnimal);

// PUT update an animal by ID
router.put('/:id', animalController.updateAnimal);

// DELETE an animal by ID
router.delete('/:id', animalController.deleteAnimal);

// GET milk production summary for chart
router.get('/production/summary', animalController.getProductionSummary);

module.exports = router;
