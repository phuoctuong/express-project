import connect from '../src/config/connect';
import factorize from './factory';

beforeAll(async () => {
    await connect(() => {
        const models = require('../src/models').models;
        factorize(models);
    });
});
