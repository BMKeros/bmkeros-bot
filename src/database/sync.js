import models from 'database/models';

Object.keys(models).forEach(model => {
    models[model].sync();
});
