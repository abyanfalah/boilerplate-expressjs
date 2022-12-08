const db = require("../../database").db;
const uuid = require("uuid");
const sha1 = require("sha1");

const query = {
	SELECT_ALL: "SELECT * FROM users LIMIT ? OFFSET ?",
	SELECT_BY_ID: "SELECT * FROM users WHERE id = ? LIMIT 1",
	SELECT_BY_CREDENTIALS:
		"SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1",

	INSERT: "INSERT INTO users SET ?",
	UPDATE: "UPDATE users SET ? WHERE id = ?",
	DELETE: "DELETE FROM users WHERE id = ?",

	SELECT_USERNAME: "SELECT username FROM users WHERE username = ?",
};

module.exports = {
	getAll: (limit, offset) => {
		return new Promise((resolve, reject) => {
			db.query(
				query.SELECT_ALL,
				[parseInt(limit), parseInt(offset)],
				(err, result) => {
					if (err) return reject(err);
					return resolve(result);
				}
			);
		});
	},

	getById: (id) => {
		return new Promise((resolve, reject) => {
			db.query(query.SELECT_BY_ID, id, (err, result) => {
				if (err) return reject(err);
				return resolve(result[0]);
			});
		});
	},

	create: (newData) => {
		newData.id = uuid.v4();
		newData.password = sha1(newData.password);

		return new Promise((resolve, reject) => {
			db.query(query.INSERT, newData, (err) => {
				if (err) return reject(err);
				return resolve();
			});
		});
	},

	update: (newData) => {
		return new Promise((resolve, reject) => {
			db.query(query.UPDATE, [newData, newData.id], (err) => {
				if (err) return reject(err);
				return resolve();
			});
		});
	},

	delete: (id) => {
		return new Promise((resolve, reject) => {
			db.query(query.DELETE, id, (err) => {
				if (err) return reject(err);
				return resolve();
			});
		});
	},

	getByCredentials: (credentials) => {
		return new Promise((resolve, reject) => {
			db.query(
				query.SELECT_BY_CREDENTIALS,
				[credentials.username, sha1(credentials.password)],
				(err, result) => {
					if (err) return reject(err);
					return resolve(result[0]);
				}
			);
		});
	},

	usernameIsAvailable: (username) => {
		return new Promise((resolve, reject) => {
			db.query(query.SELECT_USERNAME, username, (err, result) => {
				if (err) return reject(err);

				if (result.length > 0) return resolve(false);
				return resolve(true);
			});
		});
	},
};
