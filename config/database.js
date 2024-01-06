const {createPool} = require('mysql2');
const pool = createPool({
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.MYSQL_DB,
    connectionLimit:10
})

module.exports=pool;

// When using the mysql module directly, every time a connection is needed, a new connection has to be created using mysql.createConnection(config). This can lead to a lot of overhead, especially when there are a lot of connections being opened and closed simultaneously.

// createPool addresses this issue by maintaining a pool of open connections. This can greatly improve the performance of an application, especially when the overhead of opening and closing connections is high.

// The number of connections in the pool can be set by the connectionLimit option, allowing for optimal performance.

// When a connection is needed, the mysql module's .getConnection() method will first try to get a connection from the pool. If no connection is available in the pool, it will create a new one. This helps in reducing the number of connections being created at a given time, thereby improving the overall performance.

// In conclusion, createPool is a good choice when dealing with a high volume of database connections. It provides a way to efficiently manage the pool of connections and improves the overall performance of the application.


