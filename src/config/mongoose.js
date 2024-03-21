import mongoose from 'mongoose'

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB.')
})

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected.')
})

/**
 * Connect to the database.
 */
async function connectDB () {
  try {
    await mongoose.connect(process.env.DB_URI)
    console.log('Successfully connected to MongoDB.')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

/**
 * Close the connection to the database.
 */
async function closeDB () {
  try {
    await mongoose.disconnect()
    console.log('Disconnected from MongoDB.')
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error)
  }
}

export { connectDB, closeDB }
