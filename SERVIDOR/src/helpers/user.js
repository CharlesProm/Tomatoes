const user = {
    getAllUser: 'SELECT * FROM user_1',
    loginUser: `SELECT * FROM user_1 WHERE username=$1 AND password=$2 `,
    loginUserEmail: `SELECT * FROM user_1 WHERE email=$1 AND password=$2 `,
    getUser: `SELECT * FROM user_1 WHERE username=$1 `,
    getUserId: `SELECT * FROM user_1 WHERE id_user=$1 `,
    signup:`INSERT INTO user_1(username, name, lastname, email, password) VALUES ($1, $2, $3, $4, $5)`,
    update:`UPDATE user_1 SET username=$1, name=$2, lastname=$3, email=$4, password=$5 WHERE id_user=$6`
}


module.exports = user;