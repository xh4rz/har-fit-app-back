export default () => ({
  nodeEnv: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  hostApi: process.env.HOST_API,

  database: {
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    port: Number(process.env.DB_PORT),
  },

  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    accessTokenExpirationMs: Number(process.env.JWT_ACCESS_TOKEN_EXPIRATION_MS),
    refreshTokenExpirationMs: Number(
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_MS,
    ),
  },

  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
});
