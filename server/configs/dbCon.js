import { connect } from "mongoose"

export default async function dbCon(URI) {
  try {
    await connect(URI)
    console.log("Connected to MongoDB")
  } catch (err) {
    console.log(err.message)
  }
}
