var sys = require("sys"),
    path = require("path"),
    url = require("url"),
    filesys = require("fs"),
    mime = require("mime");

function App (options) {
	options = options || {};
	this.CONFIG = options.CONFIG;
	this.PROJECT_PATH = options.PROJECT_PATH;
	this.init();
}

module.exports = App;

App.prototype.init = function () {
    var Router = this.getModule('imagequote.Router'),
        mysql = require('mysql');
    this.router = new Router({
        "CONFIG": this.CONFIG
    });
    this.dbConnection = mysql.createConnection({
        host: this.CONFIG.DB_HOST,
        user: this.CONFIG.DB_USER,
        password: this.CONFIG.DB_PASSWORD,
    });
    this.dbConnection.query("USE " + this.CONFIG.DB_NAME);
};

App.prototype.onRequest = function (server, request, response) {
	var self = this,
		requestPath = url.parse(request.url).pathname,
        fullPath,
        type;

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
                        type = mime.lookup(fullPath);
                        response.writeHead( 200, { "Content-Type" : type } );
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