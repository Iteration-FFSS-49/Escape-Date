const { Pool } = require('pg');


// const PG_URI = 'postgres://vfwuhwjy:gW1WGjash3Z0KFCEsCQydgeAy5ey3-BC@kashin.db.elephantsql.com/vfwuhwjy'; // MAIN DATABASE
const PG_URI = 'postgres://orkbrrcv:GDpd7TeYoGCGwYHFIHttJN8sdPS2QmBk@kashin.db.elephantsql.com/orkbrrcv'; // BRYANS DATABASE

const pool = new Pool({
    connectionString: PG_URI
  });


module.exports = {
    query: (text, params, callback) => {
      // console.log('executed query', text);
        return pool.query(text, params, callback);
    }
  };