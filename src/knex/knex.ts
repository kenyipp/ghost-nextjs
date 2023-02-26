import Knex from "knex";

const config = {
	client: "mysql2",
	connection: {
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT || "3306"),
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD
	},
	pool: {
		min: 2,
		max: 5
	}
};

export const knex = Knex(config);
