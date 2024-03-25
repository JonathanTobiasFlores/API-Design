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
      },
      {
        timestamp: new Date('2022-03-21T08:00:00'),
        temperature: 35.1,
        weight: 50.8,
        humidity: 59.9
      }
    ],
    beeFlow: [
      {
        timestamp: new Date('2022-03-20T08:00:00'),
        arrivals: 120,
        departures: 115
      },
      {
        timestamp: new Date('2022-03-21T08:00:00'),
        arrivals: 130,
        departures: 125
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
      },
      {
        timestamp: new Date('2022-03-21T08:00:00'),
        temperature: 31.2,
        weight: 49.0,
        humidity: 64.8
      }
    ],
    beeFlow: [
      {
        timestamp: new Date('2022-03-20T08:00:00'),
        arrivals: 150,
        departures: 140
      },
      {
        timestamp: new Date('2022-03-21T08:00:00'),
        arrivals: 160,
        departures: 150
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
