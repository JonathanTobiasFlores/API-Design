import 'dotenv/config'
import { connectDB, closeDB } from '../config/mongoose.js'
import { HiveModel } from '../models/hive-model.js'

const mockData = [
  {
    hiveId: 'hive1',
    name: 'Beehive One',
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
    name: 'Beehive Two',
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
  },
  {
    hiveId: 'hive3',
    name: 'Beehive Three',
    location: 'Sunny Meadow',
    measurements: [
      {
        timestamp: new Date('2022-04-15T09:30:00'),
        temperature: 29.4,
        weight: 52.1,
        humidity: 55.3
      }
    ],
    beeFlow: [
      {
        timestamp: new Date('2022-04-15T09:30:00'),
        arrivals: 180,
        departures: 170
      }
    ]
  },
  {
    hiveId: 'hive4',
    name: 'Beehive Four',
    location: 'Deep Forest',
    measurements: [
      {
        timestamp: new Date('2022-05-05T10:45:00'),
        temperature: 28.0,
        weight: 47.8,
        humidity: 58.7
      }
    ],
    beeFlow: [
      {
        timestamp: new Date('2022-05-05T10:45:00'),
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

seedDatabase().catch(console.error)
