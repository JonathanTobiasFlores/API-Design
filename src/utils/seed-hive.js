import 'dotenv/config'
import { connectDB, closeDB } from '../config/mongoose.js'
import { HiveModel } from '../models/hive-model.js'

const mockData = [
  {
    hiveId: 'hive1',
    location: 'Orchard Field',
    measurements: [
      {
        timestamp: new Date('2022-03-20T08:00:00'),
        temperature: 34.5,
        weight: 50.2,
        humidity: 60.5
      }
    ],
    beeFlow: [
      {
        timestamp: new Date('2022-03-20T08:00:00'),
        arrivals: 120,
        departures: 115
      }
    ]
  },
  {
    hiveId: 'hive2',
    location: 'Hilltop',
    measurements: [
      {
        timestamp: new Date('2022-03-20T08:00:00'),
        temperature: 30.7,
        weight: 48.3,
        humidity: 65.4
      }
    ],
    beeFlow: [
      {
        timestamp: new Date('2022-03-20T08:00:00'),
        arrivals: 150,
        departures: 140
      }
    ]
  }
]

/**
 * Seed the database with hive data.
 */
async function seedDatabase () {
  try {
    await connectDB()

    await HiveModel.deleteMany({}) // Clear existing data
    await HiveModel.insertMany(mockData) // Insert the seed data

    console.log('Database successfully seeded with hive data.')
  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    await closeDB()
  }
}

(async () => {
  await seedDatabase()
})()
