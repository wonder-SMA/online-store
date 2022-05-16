import { Brand } from '../../models/models.js';

const brandService = {
  create: async (name) => {
    const brand = await Brand.create({ name });
    return Promise.resolve(brand);
  },

  getAll: async () => {
    const brands = await Brand.findAll();
    return Promise.resolve(brands);
  }
};

export { brandService };