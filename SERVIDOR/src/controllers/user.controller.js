const db = require('../helpers/config');
const query = require('../helpers/user');

const loginUser = async (req, res, next) => {


        try {
                console.log("loginUser") 
                const { username, password } = req.body;
                let resUser = await db.query(`${query.loginUser}`, [username, password])
                if (resUser.length == 0) {
                        resUser = await db.query(`${query.loginUserEmail}`, [username, password])
                }

                if (resUser.rows.length > 0) {
                    const data = {
                        id_user: resUser.rows[0].id_user,
                        username: resUser.rows[0].username,
                        name: resUser.rows[0].name,
                        lastname: resUser.rows[0].lastname
                    }
                    res.send(JSON.stringify({
                            status: 200,
                            response: data
                    }));
                }else{
                    res.send(JSON.stringify({
                        status: 404,
                        response: "No se encontro el recurso"
                    }));
                }
                
        } catch (error) {
                res.send(JSON.stringify({
                        status: 404,
                        response: error
                }));
                throw error

        }
}

const getUser = async (req, res, next) => {


        try {
                const { descripcion } = req.body;
                const response = await db.query(`${query.getUsuario}`, [descripcion])
                const data = {
                        id_usuario: response.rows[0].id_usuario,
                        usuario: response.rows[0].usuario,
                        nombre: response.rows[0].nombre,
                        apellido: response.rows[0].apellido
                }
                res.send(JSON.stringify({
                        status: 200,
                        response: [data]
                }));
        } catch (error) {
                res.send(JSON.stringify({
                        status: 404,
                        response: error
                }));
                throw error 
        }
}


const signup = async (req, res, next) => {

        try {    
                const { username, name, lastname, email, password } = req.body;
                await db.query(`${query.signup}`, [username, name, lastname, email, password])
                res.send(JSON.stringify({
                        status: 200,
                        response: "Se ha registrado de forma exitosa"
                }));
        } catch (error) {
                res.send(JSON.stringify({
                        status: 404,
                        response: error
                }));
                throw error
        }
}

const update = async (req, res, next) => {

        try {    
                console.log("update")
                console.log(req.body)
                const { id_user, username, name, lastname, email, password } = req.body;
                await db.query(`${query.update}`, [username, name, lastname, email, password, id_user])
                res.send(JSON.stringify({
                        status: 200,
                        response: "Se ha actualizado de forma exitosa"
                }));
        } catch (error) {
                res.send(JSON.stringify({
                        status: 404,
                        response: error
                }));
                throw error
        }
}


const getProfile = async (req, res, next) => {

        try {    
                const { user } = req.body;
                let resUser = await db.query(`${query.getUserId}`, [user])
                res.send(JSON.stringify({
                        status: 200,
                        response: resUser.rows[0]
                }));
        } catch (error) {
                res.send(JSON.stringify({
                        status: 404,
                        response: error
                }));
                throw error
        }
}

module.exports = {
        loginUser,
        getUser,
        signup,
        update,
        getProfile
}
