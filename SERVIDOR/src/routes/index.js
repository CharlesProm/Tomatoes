const express = require('express');
const router = express.Router();
const app = express();
const uri = '/api'
const cors = require('cors')
const request = require("request");

app.use(cors());

const UserController = require('../controllers/user.controller')
const MovieController = require('../controllers/movie.controller')
const CommentaryController = require('../controllers/commentary.controller')

router.get('/', (req, res) => {
	
	res.send(JSON.stringify({
	    status: 200,
	    response: "EndPoint inicial"
	}));

})


// USUARIO

router.post(`${uri}/user/loginUser`, cors(), UserController.loginUser)
router.post(`${uri}/user/signup`, cors(), UserController.signup)
router.put(`${uri}/user/updateProfile`, cors(), UserController.update)
router.post(`${uri}/user/getProfile`, cors(), UserController.getProfile)

router.get(`${uri}/movie/listMoviesPopular`, cors(), MovieController.listMoviesPopular)
router.post(`${uri}/movie/ratingMovie`, cors(), MovieController.ratingMovie)
router.post(`${uri}/movie/addFavourite`, cors(), MovieController.addFavourite)
router.post(`${uri}/movie/getFavouriteMovie`, cors(), MovieController.getFavouriteMovie)

router.post(`${uri}/commentary/addCommentary`, cors(), CommentaryController.addCommentary)
router.post(`${uri}/commentary/getCommentary`, cors(), CommentaryController.getCommentary)



module.exports = router;