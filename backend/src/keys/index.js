import dotenv from "dotenv"
dotenv.config()

export default {
  mongo_uri: `mongodb+srv://${process.env.mongodb_user}:${process.env.mongodb_password}@cluster0.ffq1uic.mongodb.net/shohgram`,
}
