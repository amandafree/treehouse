var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var queryString = require("queryString");
var commonHeaders = {'Content-Type': 'text/html'};

//Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  //if url == "/" && GET
    if(request.url === "/") {
      if(request.method.toLowerCase() === "get"){
    //show search
      response.writeHead(200, commonHeaders);
      renderer.view("header", {}, response);
      response.view("search", {}, response);
      response.end("footer", {}, response);
      response.end();
  } else {
    //if url == "/" && POST

    //get the post data from body
    request.on("data", function(postBody){
      //extract the username
      var query = queryString.parse(postBody.toString());
      response.writeHead(303, {"Location": "/" + query.username});
      response.end();
        //redirect to /:username
    });

  }
}

};


//Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
  //if url == "/...."
  var username = request.url.replace("/", "");
  if(username.length > 0) {
    response.writeHead(200, commonHeaders);
    response.view("header", {}, response);

    //get json from Treehouse
    var studentProfile = new Profile(username);
    //on "end"
    studentProfile.on("end", function(profileJSON){
        //show profile

        //Store the values which we need
        var values = {
          avatarUrl: profileJSON.gravatar_url,
          username: profileJSON.profile_name,
          badges: profileJSON.badges.length,
          javascript: profileJSON.points.JavaScript
        }
        //Simple response
        response.view("profile", values, response);
        response.view("footer", {}, response);
        response.end();
    });
    //on "error"
    studentProfile.on("error", function(error) {
      //show error
      response.view("error", {errorMessage = error.message}, response);
      response.view("search", {}, response);
      response.view("footer", {}, response);
      response.end();
    });

  }
}

module.exports.home = home
module.exports.user = user
