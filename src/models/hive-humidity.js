import mongoose from 'mongoose'

const hiveHumiditySchema = new mongoose.Schema({
  hiveId: {
    type: String,
    required: true
  },
  measurements: [{
    timestamp: {
      type: Date,
      required: true
    },
    humidity: {
      type: Number,
      required: true
    }
  }]
}, {
  timestamps: true
})

const HiveHumidity = mongoose.model('HiveHumidity', hiveHumiditySchema)

export default HiveHumidity
