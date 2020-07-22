const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const config = require('../config/config');

const Schema = mongoose.Schema;

const roleEnum = ['veterinarian', 'pet_owner'];

const UserSchema = Schema(
	{
		email: { type: String, unique: true, lowercase: true, require: true },
		password: { type: String, require: true },
		name: { type: String },
		role: { type: String, enum: roleEnum, default: 'veterinarian' },
		token: { type: String },
		created_at: { type: Date },
		updated_at: { type: Date },
		last_login: { type: Date },
	},
	{
		collection: 'User',
	}
);

UserSchema.pre('save', function (next) {
	const user = this;
	if (!user.isModified('password')) return next();

	bcrypt.hash(user.password, config.saltRounds, function (err, hash) {
		if (err) return next(err);

		user.password = hash;
		next();
	});
});

module.exports = mongoose.model('User', UserSchema);
