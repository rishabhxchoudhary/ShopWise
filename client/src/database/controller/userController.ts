// import { NextRequest, NextResponse } from 'next/server';
// import User, { IUser } from '../models/user';

// // Example of creating a new user
// const createUser = async (req: NextRequest, res: NextResponse): Promise<NextResponse> => {
//   try {
//     const { name, email, password } = req.body;

//     const newUser: IUser = new User({
//       name,
//       email,
//       password,
//     });

//     await newUser.save();
//     return res.json(newUser);

//   } catch (error) {
//     return res.json({error});
//   }
// };

// export default createUser;
