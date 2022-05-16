const userService = {
  registration: async () => {
    return Promise.resolve('registration');
  },

  login: async () => {
    return Promise.resolve('login');
  }
};

export { userService };