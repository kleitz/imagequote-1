var PROJECT_PATH = process.cwd(),
    CONFIG = require(PROJECT_PATH + "/config.js"),
    App = require(PROJECT_PATH + "/modules/imagequote.core.node.js"),
    http = require("http"),
    app = new App({
        "PROJECT_PATH": PROJECT_PATH,
        "CONFIG": CONFIG
    });

http.createServer(function (request, response) {
    app.onRequest(this, request, response);
}).listen(CONFIG.PORT);
console.log("Server Running on port " + CONFIG.PORT);