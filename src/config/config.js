import dotenv from "dotenv";
dotenv.config();

const config = {
  baseURL: process.env.BASE_URL,
  username: process.env.API_USERNAME,
  password: process.env.API_PASSWORD,
};

export default config;