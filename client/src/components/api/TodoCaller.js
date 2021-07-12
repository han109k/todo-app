const baseURL = process.env.NODE_ENV === "production"
  ? "/api/v2"
  : "http://localhost:5001/api/v2";

export default baseURL;