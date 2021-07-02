const db = require('../helpers/config');
const commentary = require('../helpers/commentary');
const request = require("request");




const addCommentary = async(req, res, next) =>{

	try{
		console.log("addCommentary")
       	let dataMovie

       	let resMovie = await db.query(`${movie.getMovie}`, [req.body.movie])
		request(`https://api.themoviedb.org/3/movie/${req.body.movie}?api_key=95e74f4f62afa78cd1ad0f6d521263d3`,(err,response,body)=>{
				dataMovie = JSON.parse(body)
				// console.log(dataMovie)
				const addComment = async() =>{
					console.log(`${commentary.addCommentary}`)
					console.log(req.body.user, req.body.movie, req.body.descrip)
					if(resMovie.rows.length == 0 ){
						await db.query(`${movie.addMovie}`, [dataMovie.id, dataMovie.title, dataMovie.overview, dataMovie.poster_path, dataMovie.release_date, dataMovie.vote_average, dataMovie.runtime, dataMovie.director, dataMovie.writer, dataMovie.actors])
					}
					await db.query(`${commentary.addCommentary}`, [req.body.user.id_user, req.body.movie, req.body.descrip])
					res.send(JSON.stringify({
					    status: 200,
					    response: "Se ha agregado un nuevo comentario"
					}));
				}
				addComment()

    	})
	}catch(error){
		res.send(JSON.stringify({
            status: 404,
            response: error
        }));
		throw error
	}
}

const getCommentary = async(req, res, next) =>{
		try{
        	const { movie } = req.body;
			const resGetCommentary = await db.query(`${commentary.getCommentary}`, [movie])
	    	res.send(JSON.stringify({
			    status: 200,
			    response: resGetCommentary.rows
			}));
	}catch(error){
		res.send(JSON.stringify({
            status: 404,
            response: error
        }));
		throw error
	}
}



module.exports = {
       addCommentary,
       getCommentary
}
