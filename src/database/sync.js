import models from 'database/models';

Object.keys(models).forEach(model => {
    models[model].sync();
});

const perms = ['ROOT', 'READ', 'WRITE', 'DELETE', 'CREATE'];

models.Permission.bulkCreate(perms.map(p => ({ name: p })));

