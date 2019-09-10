import mongoose from 'mongoose';

const MONGO_URI = "mongodb+srv://medica:medicamedica@medicadz-smoh2.mongodb.net/medica?retryWrites=true&w=majority";

export default function connectDatabase() {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.error('#### Database connection closed.'))
      .once('open', () => resolve(mongoose.connections[0]));

    mongoose.connect(MONGO_URI, { useNewUrlParser: true, autoIndex: false });
  });
};

