module.exports = {
	isGuest: (req, res, next) => {
		if (req.session.user) {
			return res.sendStatus(403);
		}
		next();
	},

	isLogin: (req, res, next) => {
		if (!req.session.user) {
			return res.sendStatus(401);
		}
		next();
	},

	isAdmin: (req, res, next) => {
		if (!req.session.user.access.toLower() === "admin") {
			return res.sendStatus(403);
		}
		next();
	},
};
