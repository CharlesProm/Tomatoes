const db = require('../helpers/config');
const movie = require('../helpers/movie');
const request = require("request");


const listMoviesPopular = async (req, res, next) => {


        try {	
        		let i = 0;
               	var listMovies
				request("https://api.themoviedb.org/3/movie/popular?api_key=95e74f4f62afa78cd1ad0f6d521263d3&language=en-US&page=1",(err,response,body)=>{
					listMovies = JSON.parse(body)

					const resRating = async()=>{
						while( i < listMovies.results.length){
		    				const rating = await db.query(`${movie.getRatingMovie}`, [listMovies.results[i].id])
		    				var quantityComment = await db.query(`${movie.getQuantityComment}`, [listMovies.results[i].id])
		    				listMovies.results[i].audience_rating = 0
		    				if(rating.rows[0].rating !=null){
		    					listMovies.results[i].audience_rating = parseInt(`${rating.rows[0].rating}`, 10);
		    				}
		    				listMovies.results[i].quantity_commentary = quantityComment.rows[0].quantity_commentary
		    				i++
	    				}
	    				res.send(JSON.stringify({
						    status: 200,
						    response: listMovies
						}));
					}
					resRating()
    			})

    		
        } catch (error) {
                res.send(JSON.stringify({
                    status: 404,
                    response: error
                }));
                throw error

        }
}

const addFavourite = async(req, res, next) =>{

	try{
		console.log("addFavourite")
    	let dataMovie
    	let resMovie = await db.query(`${movie.getFavoutriteMovieById}`, [req.body.user, req.body.movie.id])
    	console.log("1")
    	if(resMovie.rows.length == 0){

			request(`https://api.themoviedb.org/3/movie/${req.body.movie.id}?api_key=95e74f4f62afa78cd1ad0f6d521263d3`,(err,response,body)=>{
			dataMovie = JSON.parse(body)
			const addMovie = async() =>{
				await db.query(`${movie.addMovie}`, [dataMovie.id, dataMovie.title, dataMovie.overview, dataMovie.poster_path, dataMovie.release_date, dataMovie.vote_average, dataMovie.runtime, dataMovie.director, dataMovie.writer, dataMovie.actors])
				let quantityComment = await db.query(`${movie.addFavourite}`, [req.body.movie.id, req.body.user])
				res.send(JSON.stringify({
				    status: 200,
				    response: "Se ha agregado a favoritos de forma exitoza"
				}));
			}
			addMovie()

			})


    		
    	}else{
    		res.send(JSON.stringify({
			    status: 200,
			    response: "Esta pelicula ya se encuentra es su lista de favoritos"
			}));
    	}
		



		// console.log("addFavourite")
		// console.log(req.body)
		// let quantityComment = await db.query(`${movie.addFavourite}`, [req.body.movie.id, req.body.user])
		// res.send(JSON.stringify({
		//     status: 200,
		//     response: "Se ha agregado a favoritos de forma exitoza"
		// }));
	}catch(error){
		res.send(JSON.stringify({
            status: 404,
            response: error
        }));
		throw error
	}

}

const ratingMovie = async(req, res, next) =>{

	try{
        let dataMovie
		request(`https://api.themoviedb.org/3/movie/${req.body.movie}?api_key=95e74f4f62afa78cd1ad0f6d521263d3`,(err,response,body)=>{
				dataMovie = JSON.parse(body)
				const addMovie = async() =>{
					let resMovie = await db.query(`${movie.getMovie}`, [req.body.movie])
					if(resMovie.rows.length == 0){
						await db.query(`${movie.addMovie}`, [dataMovie.id, dataMovie.title, dataMovie.overview, dataMovie.poster_path, dataMovie.release_date, dataMovie.vote_average, dataMovie.runtime, dataMovie.director, dataMovie.writer, dataMovie.actors])
					}
					let rating_movie = await db.query(`${movie.getRatingUserMovie}`, [req.body.movie, req.body.user.id_user])
					if(rating_movie.rows.length > 0){
						res.send(JSON.stringify({
						    status: 200,
						    response: "Ya se ha agreagdo una calificaón"
						}));
						return
					}
					
					await db.query(`${movie.addRatingMovie}`, [req.body.movie, req.body.user.id_user, req.body.rating])
					res.send(JSON.stringify({
					    status: 200,
					    response: "Se ha agregado una nueva calificación"
					}));
				}
				addMovie()

    	})
 
	}catch(error){
		res.send(JSON.stringify({
            status: 404,
            response: error
        }));
		throw error
	}
}


const getFavouriteMovie = async(req, res, next) =>{

	try{
		console.log("getFavouriteMovie")
        const { user } = req.body;
        let i = 0;
        let data;
		let favouriteMovie = await db.query(`${movie.getFavouriteMovie}`, [user])

		while(i < favouriteMovie.rows.length){
			console.log("1")
			const rating = await db.query(`${movie.getRatingMovie}`, [favouriteMovie.rows[i].id])
			console.log("2")

			console.log(rating.rows)
			favouriteMovie.rows[i].audience_rating = parseInt(rating.rows[0].rating)
			i++
		}
		res.send(JSON.stringify({
		    status: 200,
		    response: favouriteMovie.rows
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
        listMoviesPopular,
        addFavourite,
		ratingMovie,
		getFavouriteMovie
}
