module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');
  
  if (env('DATABASE_URL')) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: env('DATABASE_URL'),
          ssl: { rejectUnauthorized: false },
        },
      },
    };
  }

  return {
    connection: {
      client,
      connection: {
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'prorab_db'),
        user: env('DATABASE_USERNAME', 'elly'),
        password: env('DATABASE_PASSWORD', ''),
        ssl: env.bool('DATABASE_SSL', false),
      },
    },
  };
};
