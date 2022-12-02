module.exports = {
  'type': 'postgres',
  'host': process.env.JODEL_DB_RW_SERVICE_HOST || 'localhost',
  'username': process.env.DB_USER || 'postgres',
  'password': process.env.DB_PW || 'postgres',
  'database': process.env.DB_NAME || 'app',
  'synchronize': true,
  'logging': false,
  'entities': [
    process.env.NODE_ENV === 'production'
      ? 'dist/entity/*js'
      : 'src/entity/**/*.ts'
  ],
  'migrations': [
    'src/migration/**/*.ts'
  ],
  'subscribers': [
    'src/subscriber/**/*.ts'
  ],
  'cli': {
    'entitiesDir': 'src/entity',
    'migrationsDir': 'src/migration',
    'subscribersDir': 'src/subscriber'
  }
};
