var config = {
  port: 3000,
  db: 'mongodb://localhost/blog',
  session: {
    secret: 'myblog',
    key: 'myblog',
    maxAge: 2592000000
  }
};
module.exports = config;