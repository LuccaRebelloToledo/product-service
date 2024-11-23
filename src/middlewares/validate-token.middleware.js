const { default: axios } = require("axios");

const createAuthServiceAxios = (token) => {
  return axios.create({
    baseURL: process.env.AUTH_SERVICE_URL,
    headers: {
      Authorization: token,
    }
  });
}

const validateToken = async (req, _res, next) => {
  const token = req.headers['authorization'] || req.headers['Authorization'];

  const authServiceAxios = createAuthServiceAxios(token);

  await authServiceAxios.post('/sessions/validate-token');

  next();
}

module.exports = validateToken;