export default {
  username: 'calamari',
  password: process.env.CALAMARI_TOKEN || '',
  url: process.env.CALAMARI_URL || 'https://softwarebrothers.calamari.io/api/',
  employee: process.env.CALAMARI_EMPLOYEE || '',
};
