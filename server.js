// const http = require('http');
// const mysql = require('mysql');
// const url = require('url');

// // DB Connection configuration
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'yourUsername',
//   password: 'yourPassword',
//   database: 'yourDatabase'
// });

// connection.connect();

// // Create table if it doesn't exist
// const createTableSQL = `CREATE TABLE IF NOT EXISTS patient (
//     patientId INT(11) AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(100),
//     dateOfBirth DATETIME,
//     ENGINE = InnoDB
// )`;

// connection.query(createTableSQL, function (err) {
//     if (err) throw err;
//     console.log('Table created or already exists.');
// });

// // HTTP server to handle requests
// http.createServer((req, res) => {
//     const reqUrl = url.parse(req.url, true);
//     const pathname = reqUrl.pathname;
//     const method = req.method;

//     if (pathname === '/lab5/api/v1/insert' && method === 'POST') {
//         let body = '';
//         req.on('data', chunk => {
//             body += chunk.toString();
//         });
//         req.on('end', () => {
//             const data = JSON.parse(body);
//             // INSERT logic
//         });
//     } else if (pathname === '/lab5/api/v1/query' && method === 'GET') {
//         const queryData = reqUrl.query;
//         // SELECT logic
//     } else {
//         res.statusCode = 404;
//         res.end('404 Not Found');
//     }
// }).listen(3000, () => {
//     console.log('Server running at http://localhost:3000/');
// });
