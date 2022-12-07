const userModel = require("../model/userModel");

const db = require("../../database").db;

module.exports = {
	listUser: (req, res) => {
		return res.send(userModel.getAll());
	},

	getUser: (req, res) => {
		let user = userModel.getById(req.params.id);
		if (!user) return res.status(404);
		res.send(user);
	},

	createUser: (req, res) => {
		res.send(req.body);
	},

	updateUser: (req, res) => {
		res.send(req.params.id);
		// res.send(req.body);
	},

	deleteUser: (req, res) => {
		res.send(req.params.id);
		// res.send(req.body);
	},
};
