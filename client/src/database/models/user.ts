// Example of schema
import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: String,
  email: String,
  password: String,
});

const User = model<IUser>('User', userSchema);

export default User;