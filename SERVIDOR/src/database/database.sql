--CREATE TABLE

	--USER

	CREATE TABLE user_1 (
	id_user SERIAL PRIMARY KEY,
	username VARCHAR(20) NOT NULL,
    name VARCHAR(30) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL
);


	--MOVIE

	CREATE TABLE movie(
	id INT PRIMARY KEY,
	imdb_id VARCHAR(30),
	title VARCHAR(100) NOT NULL,
	overview VARCHAR,
	poster_path VARCHAR NOT NULL,
	release_date DATE,
	vote_average DECIMAL(10,2),
	runtime INT NOT NULL,
	director  VARCHAR(100),
	writer VARCHAR(255),
	actors VARCHAR(255),
	audience_rating DECIMAL(10,2)
);

CREATE TABLE rating_movie (
	id_movie INT NOT NULL,
	id_user INT NOT NULL,
	rating INT	NOT NULL,
	FOREIGN KEY(id_movie) REFERENCES movie(id),
	FOREIGN KEY(id_user) REFERENCES user_1(id_user)
);

CREATE TABLE commentary(
	id_commentary SERIAL PRIMARY KEY,
	id_user INT NOT NULL,
	id_movie INT NOT NULL,
	descrip VARCHAR,
	FOREIGN KEY(id_user) REFERENCES user_1(id_user),
	FOREIGN KEY(id_movie) REFERENCES movie(id)
);

CREATE TABLE rating_commentary(
	id_commentary INT NOT NULL,
	id_user INT NOT NULL,
	rating INT NOT NULL,
	FOREIGN KEY(id_user) REFERENCES user_1(id_user),
	FOREIGN KEY(id_commentary) REFERENCES commentary(id_commentary)
);

CREATE TABLE sub_commentary(
	id_sub_commentary SERIAL PRIMARY KEY,
	id_commentary INT NOT NULL,
	id_user INT NOT NULL,
	descrip VARCHAR,
	FOREIGN KEY(id_commentary) REFERENCES commentary(id_commentary),
	FOREIGN KEY(id_user) REFERENCES user_1(id_user)
);

CREATE TABLE favourite(
	id_movie INT NOT NULL,
	id_user INT NOT NULL,
	FOREIGN KEY(id_user) REFERENCES user_1(id_user),
	FOREIGN KEY(id_movie) REFERENCES movie(id)
);