const userModel = require("../model/userModel");
const uuid = require("uuid");
const sha1 = require("sha1");
const isIdenticalObject = require("../../helper/is-identical-object");
const db = require("../../database").db;

module.exports = {
	listUser: async (req, res) => {
		let limit = req.query.rows ?? 10;
		let offset = limit * ((req.query.page ?? 1) - 1);
		try {
			let data = await userModel.getAll(limit, offset);
			res.send({
				data,
				length: data.length,
				page: parseInt(req.query.page),
			});
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},

	getUser: async (req, res) => {
		try {
			let foundUser = await userModel.getById(req.params.id);
			if (!foundUser) {
				return res.sendStatus(404);
			}
			res.send(foundUser);
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},

	createUser: async (req, res) => {
		try {
			userModel.create(req.body);
			res.send({ message: "user created" });
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},

	updateUser: async (req, res) => {
		try {
			let userId = await req.params.id;
			let foundUser = await userModel.getById(userId);
			if (!foundUser) {
				return res.sendStatus(404);
			}

			req.body.id = userId;
			req.body.password = sha1(req.body.password);

			if (isIdenticalObject(req.body, foundUser)) {
				return res.send({ message: "same data, no changes were made" });
			}

			userModel.update(req.body);
			res.send({ message: "user updated" });
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},

	deleteUser: async (req, res) => {
		try {
			let foundUser = await userModel.getById(req.params.id);
			if (!foundUser) {
				return res.sendStatus(404);
			}
			userModel.delete(foundUser.id);
			res.send({ message: "user deleted" });
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	},
};
