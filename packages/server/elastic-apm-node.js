require('dotenv').config();

module.exports = {
  active: process.env.NODE_ENV === 'production',
  serviceName:
    process.env.DOMAIN &&
    new URL(process.env.DOMAIN).hostname.replace(/\./g, '-'),
  secretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
  serverUrl: process.env.ELASTIC_APM_SERVER_URL,
};
