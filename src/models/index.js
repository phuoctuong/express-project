import fs from 'fs';
import path from 'path';
import { mapKeys, camelCase } from 'lodash';

const models = {};
const initialModel = (sequelize) => {
	fs.readdirSync(path.resolve(process.cwd(), 'src/models'))
		.filter(file => {
			return (file.indexOf('.') !== -1 && file !== 'index.js');
		})
		.forEach(file => {
			const model = sequelize.import(path.resolve(process.cwd(), 'src/models', file));
			models[model.name] = model;
		});

	Object.keys(models).forEach(modelName => {
		if (models[modelName].hasOwnProperty('associate')) {
			models[modelName].associate(models);
		}
		if (models[modelName].hasOwnProperty('loadScope')) {
			models[modelName].loadScope(models);
		}

		models[modelName].prototype.toJSON = function () {
			return mapKeys(this.get(), (value, key) => {
				return camelCase(key);
			});
		};
	});

	return models;
};

export { models };
export default initialModel;