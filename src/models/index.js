import fs from 'fs';
import path from 'path';

const models = {};
const initialModel = (sequelize) => {
	fs.readdirSync(path.resolve(process.cwd(), 'src/models'))
		.filter(file => {
			return (file.indexOf('.') !== -1 && file !== 'index.js');
		})
		.forEach(file => {
			let model = sequelize.import(path.resolve(process.cwd(), 'src/models', file));
			models[model.name] = model;
		});

	Object.keys(models).forEach(modelName => {
		if (models[modelName].hasOwnProperty('associate')) {
			models[modelName].associate(models);
		}
	});

	return models;
};

export default initialModel;