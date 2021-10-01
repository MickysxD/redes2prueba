let aws_keys = {
  
    db_credentials: {
        host: process.env.IP_DB,
        //port: 3306,
        user: "root",
        password: "1234",
        database: "db_redes_pr2"
    }
}
module.exports = aws_keys;