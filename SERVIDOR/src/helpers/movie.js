const movie = {
    getRatingMovie: `SELECT AVG(ALL rating) AS rating FROM rating_movie WHERE id_movie=$1 `,
    getQuantityComment:`SELECT COUNT(*) AS quantity_commentary FROM commentary WHERE id_movie=$1`,
    addFavourite:`INSERT INTO favourite(id_movie, id_user) VALUES ($1, $2)`,
   	getFavouriteMovie: `SELECT * FROM favourite AS F INNER JOIN movie AS M ON M.id = F.id_movie WHERE F.id_user=$1`,
   	getFavoutriteMovieById: `SELECT * FROM movie AS M INNER JOIN favourite AS F ON M.id=F.id_movie WHERE F.id_user=$1 AND M.id=$2`,
   	addRatingMovie: `INSERT INTO rating_movie(id_movie, id_user, rating) VALUES ($1, $2, $3)`,
   	addMovie:`INSERT INTO movie(id, title, overview, poster_path, release_date, vote_average, runtime, director, writer, actors)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
	getMovie: `SELECT * FROM movie WHERE id=$1`,
	getRatingUserMovie: `SELECT * FROM rating_movie WHERE id_movie=$1 AND id_user=$2`
}


module.exports = movie;