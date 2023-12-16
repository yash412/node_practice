const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    if(req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}: ${req.url} New Req Received\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl)
    fs.appendFile("log.txt", log, (err, data) => {
        switch(myUrl.pathname){
            case "/":
                res.end("HomePage");
                break;

            case "/about":
                const username = myUrl.query.user;
                res.end(`hii ,${username}`);
                break;

            case "/search":
                const search = myUrl.query.search_query;
                res.end("Here are the search results " + search);
                break;

            case "/signup":
                if(req.method=="GET") {
                    res.end("This is a signup form");
                } else {
                    if(req.method=="POST") {
                        //DB Query
                        res.end("Success");
                    }
                    
                }
            default:
                res.end("404 Not Found");
        };
        //res.end("Hello from server again");
    });
    //console.log(req);
    console.log("New Req Res.")
    //res.end("Hello from server")
});

myServer.listen(8000, () => console.log("Server Started !!"))