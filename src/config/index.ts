const envSpecificConfig =
  process.env.NODE_ENV === "development"
    ? { HUBLEY_API_ENDPOINT: "http://localhost:8900" }
    : { HUBLEY_API_ENDPOINT: "https://somehtingelse.com" };

const commonConfig = {};

const config = {
  ...envSpecificConfig,
  ...commonConfig,
};

export default config;
