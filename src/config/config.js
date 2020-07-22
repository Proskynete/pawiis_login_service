module.exports = {
	port: process.env.PORT || 5000,
	db: process.env.MONGODB || 'mongodb://localhost/pawii_login_service',
	SECRET_TOKEN: 'ULx{ecGK[[h`qK3x',
	saltRounds: 10,
};
