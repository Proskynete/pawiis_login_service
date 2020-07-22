const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const serviceToken = require('../services/serviceToken');

const signUp = (req, res) => {
	const newUser = new User({
		email: req.body.email,
		password: req.body.password,
		created_at: Date.now(),
		updated_at: Date.now(),
		last_login: Date.now(),
	});

	Object.assign(newUser, { token: serviceToken.createToken(newUser) });

	newUser.save((err, user) => {
		if (err)
			return res.status(500).json({
				status: 500,
				error: `${err}`,
				message: `Server Error`,
			});

		res.status(200).json({
			user,
		});
	});
};

const signIn = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email }).exec();

		if (!user) {
			return res
				.status(404)
				.json({ status: 404, logged_in: false, message: 'User not found' });
		}

		const passwordVerificated = await bcrypt.compare(password, user.password);

		if (passwordVerificated) {
			user.token = serviceToken.createToken(user);
			user.last_login = Date.now();
			const userUpdated = await user.save();

			if (!userUpdated) {
				return res.status(410).json({
					status: 410,
					logged_in: false,
					message: 'Error to add new date to last_login',
				});
			}

			return res.status(200).json({
				status: 200,
				logged_in: true,
				message: 'Sign in success',
				user: userUpdated,
			});
		} else {
			return res.status(411).json({
				status: 411,
				logged_in: false,
				message: 'Error in email or password',
			});
		}
	} catch (error) {
		return res.status(500).json({
			status: 500,
			logged_in: false,
			error,
		});
	}
};

const showAllUsers = (_, res) => {
	User.find({}, (err, users) => {
		if (err)
			res.status(500).json({
				status: 500,
				error: `${err}`,
				message: `Server Error`,
			});

		if (!users)
			res.status(404).json({
				status: 404,
				error: `${err}`,
				message: `Users not found`,
			});

		res.status(200).json({
			status: 200,
			users,
		});
	});
};

const getUserById = (req, res) => {
	const userID = req.params.userID;

	User.findById(userID, (err, user) => {
		if (err)
			return res.status(500).json({
				status: 500,
				error: `${err}`,
				message: `Server Error`,
			});

		if (!user)
			return res.status(404).json({
				status: 404,
				error: `${err}`,
				message: `User not found`,
			});

		res.status(200).json({
			status: 200,
			profile: 'user-details',
			user,
		});
	});
};

const updateUser = (req, res) => {
	const userID = req.params.userID;

	User.findById(userID, (err, user) => {
		if (err)
			res.status(500).json({
				status: 500,
				error: `${err}`,
				message: `Server Error`,
			});

		for (const key in req.body) {
			user[key] = req.body[key] !== '' ? req.body[key] : user[key];
		}

		user.updated_at = Date.now();

		user.save((err) => {
			if (err)
				res.status(500).json({
					status: 500,
					error: `${err}`,
					message: `Error when try update user info`,
				});

			res.status(200).json({
				status: 200,
				profile: 'user-updated',
				user,
			});
		});
	});
};

const deleteUser = (req, res) => {
	const userID = req.params.userID;

	User.findById(userID, (err, user) => {
		if (err)
			res.status(500).json({
				status: 500,
				error: `${err}`,
				message: `Server Error. User not found`,
			});

		user.remove((err) => {
			if (err)
				res.status(500).json({
					status: 500,
					error: `${err}`,
					message: `Server Error. We could not delete the user`,
				});

			res.status(200).json({
				status: 200,
				message: `Successful request`,
			});
		});
	});
};

module.exports = {
	showAllUsers,
	getUserById,
	updateUser,
	deleteUser,
	signUp,
	signIn,
};
