import { Type } from '../../models/models.js';

const typeService = {
  create: async (name) => {
    const type = await Type.create({ name });
    return Promise.resolve(type);
  },

  getAll: async () => {
    const types = await Type.findAll();
    return Promise.resolve(types);
  }
};

export { typeService };