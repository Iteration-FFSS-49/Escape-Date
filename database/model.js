const { Pool } = require('pg');

//const PG_URI = 'postgres://nrcjerbs:OV_sIkJx1POAnpR_HPeuqY9kaxnEbrkz@kashin.db.elephantsql.com/nrcjerbs';
const PG_URI = 'postgres://vfwuhwjy:gW1WGjash3Z0KFCEsCQydgeAy5ey3-BC@kashin.db.elephantsql.com/vfwuhwjy';

const pool = new Pool({
    connectionString: PG_URI
  });


module.exports = {
    query: (text, params, callback) => {
      // console.log('executed query', text);
        return pool.query(text, params, callback);
    }
  };