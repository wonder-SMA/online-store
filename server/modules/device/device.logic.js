import { Device, DeviceInfo } from '../../models/models.js';

const deviceService = {
  create: async ({ name, price, typeId, brandId, info, img }) => {
    try {
      const device = await Device.create({ name, price, brandId, typeId, img });
      if (info) {
        info = JSON.parse(info);
        info.forEach(i => {
          DeviceInfo.create({
            title: i.title,
            description: i.description,
            deviceId: device.id
          });
        });
      }
      return Promise.resolve(device);
    } catch (err) {
      return Promise.reject(new Error(err.message));
    }
  },

  getAll: async (brandId, typeId, limit, offset) => {
    try {
      let devices;
      if (brandId && typeId) {
        devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset });
      } else if (!brandId && typeId) {
        devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
      } else if (brandId && !typeId) {
        devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });
      } else if (!brandId && !typeId) {
        devices = await Device.findAndCountAll({ limit, offset });
      }
      return Promise.resolve(devices);
    } catch (err) {
      return Promise.reject(new Error(err.message));
    }
  },

  getOne: async (id) => {
    try {
      const device = await Device.findOne(
        {
          where: { id },
          include: [{ model: DeviceInfo, as: 'info' }]
        }
      );
      return Promise.resolve(device);
    } catch (err) {
      return Promise.reject(new Error(err.message));
    }
  }
};

export { deviceService };