const mongoose = require('mongoose');

const medicalHistorySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  description: { type: String, required: true }
}, { _id: false });

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  breed: { type: String, required: true },
  animalType: { type: String, required: true, enum: ['Cow', 'Buffalo', 'Goat', 'Sheep'] },
  milkProduction: { type: Number, required: true, min: 0 },
  healthStatus: { type: String, enum: ['Healthy', 'Sick', 'Attention'], default: 'Healthy' },
  dateOfEntry: { type: Date, default: Date.now },
  lastCheckup: { type: Date, default: Date.now },
  nextCheckup: { type: Date },
  medicalHistory: [medicalHistorySchema],
  createdAt: { type: Date, default: Date.now }
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
