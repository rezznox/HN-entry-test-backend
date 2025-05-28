const mongoose = require('mongoose');

export default async function main() {
  const conn = await mongoose.connect(`mongodb://localhost:27017`, { useNewUrlParser: true });
}
