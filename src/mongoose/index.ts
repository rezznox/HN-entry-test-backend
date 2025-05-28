const mongoose = require('mongoose');

export default async function main() {
    const connectionString = `mongodb+srv://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOSTNAME}/?retryWrites=true&w=majority&appName=${process.env.MONGO_APP_NAME}`;
    const conn = await mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, family: 4, });
}
