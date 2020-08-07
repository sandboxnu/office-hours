require('dotenv').config();

module.exports = {
  serviceName: new URL(process.env.DOMAIN).hostname.replace(/\./g, '-'),
  secretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
  serverUrl: process.env.ELASTIC_APM_SERVER_URL,
  active: process.env.NODE_ENV === 'production',
};
