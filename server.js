var sys = require("sys"),
    http = require("http"),
    path = require("path"),
    url = require("url"),
    filesys = require("fs");

http.createServer(function(request,response){
    var requestPath = url.parse(request.url).pathname,
        fullPath;

    if (requestPath === "/") {
        requestPath += "index.html";
    }
    fullPath = path.join(process.cwd(), requestPath);
    path.exists(fullPath,function(exists){
        if (!exists){
            response.writeHeader(404, {"Content-Type": "text/plain"});  
            response.write("404 Not Found\n");  
            response.end();
        }
        else{
            filesys.readFile(fullPath, "binary", function(err, file) {  
                 if (err) {  
                     response.writeHeader(500, {"Content-Type": "text/plain"});  
                     response.write(err + "\n");  
                     response.end();
                 }  
                 else {
                    response.writeHeader(200);  
                    response.write(file, "binary");  
                    response.end();
                }
            });
        }
    });
}).listen(8080);

sys.puts("Server Running on 8080");