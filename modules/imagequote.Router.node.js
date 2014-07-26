function Router (options) {
	options = options || {};
	this.CONFIG = options.CONFIG;
	this.PROJECT_PATH = options.PROJECT_PATH;
}

module.exports = Router;

Router.prototype.isFileRequest = function (requestPath) {
	return true;
};

Router.prototype.callREST = function (requestPath) {
	return true;
};