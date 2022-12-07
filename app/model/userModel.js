const db = require("../../database").db;

const query = {
	SELECT_ALL: "SELECT * FROM users",
	SELECT_BY_ID: this.SELECT_ALL + "WHERE id = ? LIMIT 1",
	UPDATE: "UPDATE users SET ? WHERE id = ?",
	DELETE: "DELETE FROM users WHERE id = ?",
};

module.exports = {
	getAll: () => {
		db.query(query.SELECT_ALL, (err, queryResult) => {
			if (err) throw err;
			return "queryResult";
		});
	},

	getById: (id) => {
		let result;
		db.query(query.SELECT_BY_ID, id, (err, queryResult) => {
			if (err) throw err;
			result = queryResult[0];
		});
		return result;
	},

	update: (id) => {
		let dataFound = this.getById(id);
		if (!dataFound) return;
		db.query(query.UPDATE, id, (err) => {
			if (err) throw err;
		});
	},

	delete: (id) => {
		let dataFound = this.getById(id);
		if (!dataFound) return;
		db.query(query.DELETE, id, (err) => {
			if (err) throw err;
		});
	},
};
