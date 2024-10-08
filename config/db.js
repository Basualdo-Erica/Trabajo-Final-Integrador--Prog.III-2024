const mysql = require('mysql2/promise');

//configuración de la conexión a MySQL
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',  
    password: '',  
    database: 'complaint_management',
    port: 3306,
});

//para usar en otros archivos
module.exports = connection;
