const serviceToken = require('../services/token.service');

const isAuth = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(403).json({
			error: 'Error 403',
			message: 'No Authorization',
		});
	}

	const token = req.headers.authorization.split(' ')[1];

	serviceToken
		.decodeToken(token)
		.then((response) => {
			req.user_id = response;
			next();
		})
		.catch((response) => {
			res.status(response.status);
		});
};

module.exports = isAuth;
