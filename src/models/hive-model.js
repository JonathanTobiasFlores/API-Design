import mongoose from 'mongoose'

// Define the schema for the measurements subdocument
const measurementSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  temperature: { type: Number, required: true },
  weight: { type: Number, required: true },
  humidity: { type: Number, required: true }
}, { _id: false }) // Disable _id for each measurement document

// Define the schema for the beeFlow subdocument
const beeFlowSchema = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  arrivals: { type: Number, required: true },
  departures: { type: Number, required: true }
}, { _id: false }) // Disable _id for each beeFlow document

// Main HiveModel schema
const hiveModelSchema = new mongoose.Schema({
  hiveId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  measurements: [measurementSchema],
  beeFlow: [beeFlowSchema]
}, {
  timestamps: true,
  id: false, // Disable the virtual id property
  toJSON: {
    virtuals: true,
    /**
     * Transforms the document, removing the _id property.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     * @returns {object} The transformed object.
     */
    transform: (doc, ret) => {
      delete ret._id // Remove the top-level _id field
      delete ret.__v // Remove the __v field
      return ret
    }
  }
})

export const HiveModel = mongoose.model('HiveModel', hiveModelSchema)
