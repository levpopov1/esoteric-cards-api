import { connect } from 'mongoose';

const connectDB = async function () {
  try {
    await connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connetcion successful');
  } catch (error) {
    console.error(error);
  }
};

export default connectDB;
