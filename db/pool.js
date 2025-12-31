const {Pool}=require('pg');

const pool=new Pool({
    host:'<host>',
    user:'<username>',
    password:'<password>',
    database:'<database>',
    port:5432
})

module.exports=pool;