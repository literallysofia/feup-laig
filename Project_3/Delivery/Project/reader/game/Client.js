function Client(port) {
    this.defaultPort = 8081;
    this.port = port || this.defaultPort;
};

Client.prototype.constructor = Client;


Client.prototype.getPrologRequest = function(requestString, onSuccess, onError)
{
    var requestPort = this.port;
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

    request.onload = onSuccess || function(data){console.log("Request successful. Reply: " + data.target.response);};
    request.onerror = onError || function(){console.log("Error waiting for response");};

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
}

//Handle the Reply
Client.prototype.handleReply= function(data){
    console.log(data.target.response);

    return data.target.response;
}