var sys = require("sys"),
    path = require("path"),
    url = require("url"),
    filesys = require("fs");

function App (options) {
	options = options || {};
	this.CONFIG = options.CONFIG;
	this.PROJECT_PATH = options.PROJECT_PATH;
	this.init();
}

module.exports = App;

App.prototype.init = function () {
	var Router = this.getModule('imagequote.Router'),
   		Client = require('mysql').Client;
	this.router = new Router({
		"CONFIG": this.CONFIG
	});
	// this.dbClient = new Client();
	// this.dbClient.user = this.CONFIG.DB_USER;
	// this.dbClient.password = this.CONFIG.DB_PASSWOR;
};

App.prototype.onRequest = function (server, request, response) {
	var self = this,
		requestPath = url.parse(request.url).pathname,
        fullPath;

    if (requestPath === "/") {
        requestPath += "index.html";
    }
    if (this.router.isFileRequest(requestPath)) {
	    fullPath = this.getFileFullPath(requestPath);
	    path.exists(fullPath,function(exists){
	        if (!exists) {
	            response.writeHeader(404, {"Content-Type": "text/plain"});  
	            response.write("404 Not Found\n");  
	            response.end();
	        } else {
	            filesys.readFile(fullPath, "binary", function(err, file) {  
	                 if (err) {  
	                     response.writeHeader(500, {"Content-Type": "text/plain"});  
	                     response.write(err + "\n");  
	                     response.end();
	                 } else {
	                    response.writeHeader(200);  
	                    response.write(file, "binary");  
	                    response.end();
	                }
	            });
	        }
	    });
    } else {
    	this.router.callREST(fullPath);
    }
};

App.prototype.getFileFullPath = function (fileName) {
	this.CONFIG.WEB_APP_PATH = this.CONFIG.WEB_APP_PATH || this.PROJECT_PATH + this.CONFIG.WEB_APP;
	return path.join(this.CONFIG.WEB_APP_PATH, fileName);
};

App.prototype.getModule = function (moduleName) {
	this.CONFIG.MODULES_PATH = this.CONFIG.MODULES_PATH || this.PROJECT_PATH + this.CONFIG.MODULES;
	return require(this.CONFIG.MODULES_PATH + "/" + moduleName + '.node.js');
};