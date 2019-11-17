module.exports = {
  dialect: 'postgres',
  host: '192.168.99.100',
  username: 'postgres',
  password: 'docker',
  database: 'gympoint',
  define: {
    timestamp: true,
    underscore: true,
    underscoreAll: true,
  },
};
