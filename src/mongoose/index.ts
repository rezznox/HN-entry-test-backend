const mongoose = require('mongoose');

export default async function main() {
    console.log('trying to connect');
  const conn = await mongoose.connect(`mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@127.0.0.1:27017/`, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('connected', conn);
}

