import User, { IUser } from '../models/User';

// Example of creating a new user
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const newUser = new User({
            name,
            email,
            password,
        });

        await newUser.save();
        return res.json(newUser);

    } catch (error) {
        return res.json({ error });
    }
};

export default createUser;
