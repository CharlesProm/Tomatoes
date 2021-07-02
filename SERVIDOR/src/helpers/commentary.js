const commentary = {
   
   	addCommentary:`INSERT INTO commentary (id_user, id_movie, descrip) VALUES($1, $2, $3)`,
	getCommentary: `SELECT U.username, U.name, U.lastname, C.descrip FROM commentary AS C INNER JOIN user_1 AS U ON C.id_user = U.id_user WHERE id_movie=$1`
}


module.exports = commentary;