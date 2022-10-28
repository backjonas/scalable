module.exports = {
  'type': 'postgres',
  'host': process.env.DB_HOST || 'localhost',
  'username': process.env.DB_USER || 'bitly',
  'password': process.env.DB_PW || 'bitly',
  'database': process.env.DB_NAME || 'bitly',
  'synchronize': true,
  'logging': false,
  'entities': [
    process.env.NODE_ENV === 'production'
      ? 'dist/**/*.entity{.ts,.js}'
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
