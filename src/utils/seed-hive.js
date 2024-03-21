import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB, closeDB } from '../config/mongoose.js'
import HiveHumidity from '../models/hive-humidity.js'

const hiveHumidityData = [
  {
    hiveId: 'hive1',
    measurements: [
      { timestamp: new Date('2017-01-01T05:00:00'), humidity: 92.40666666666674 },
      { timestamp: new Date('2017-01-01T06:00:00'), humidity: 92.26999999999998 }
      // Add more samples as needed
    ]
  }
  // Add more hive data if necessary
]

/**
 * Seed the database with hive-data.
 *
 */
async function seedDatabase () {
  try {
    await connectDB()

    await HiveHumidity.deleteMany({}) // Clear existing data
    await HiveHumidity.insertMany(hiveHumidityData) // Insert the seed data

    console.log('Database successfully seeded with hive humidity data.')
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await closeDB()
  }
}

seedDatabase().then(() => mongoose.disconnect())
