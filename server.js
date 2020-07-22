const mongoose = require('mongoose');
const app = require('./src/config/app.js');
const config = require('./src/config/config.js');

mongoose.set('useCreateIndex', true);
mongoose
	.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('Connected with mongodb...');
		app.listen(config.port, () => {
			console.log(`Api running on port: ${config.port}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
