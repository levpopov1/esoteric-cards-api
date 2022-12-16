import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface User {
  username: string;
  email: string;
  password: string;
  apiKey: string;
  apiKeyUsage: {
    requests: number;
    lastAccessTime: Date;
  };
}

const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  apiKey: {
    type: String,
  },
  apiKeyUsage: {
    requests: Number,
    lastAccessTime: Date,
  },
});

export const User = mongoose.model<User>('User', UserSchema, 'users');
