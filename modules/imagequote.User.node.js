function User (options) {
	options = options || {};
	this.CONFIG = options.CONFIG;
	this.dbConnection = options.dbConnection;
}

module.exports = User;

User.prototype.login = function (requestPath) {
	return true;
};

User.prototype.logout = function (requestPath) {
	return true;
};