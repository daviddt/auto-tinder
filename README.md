# auto-tinder
Automate your tinder 

## Install

1. Install Node.JS if you havn't already https://nodejs.org/en/
2. Open a CMD in this directory and enter "npm install"

## Configure the script

The script (app.js) requires on 2 vars that you need to configure.


var FACEBOOK_TOKEN = "your token";
var FACEBOOK_ID = "your id";

The facebook token can be aquired by navigating to this url, once your are logged in you will be redirected to a URL that looks like this:

https://www.facebook.com/connect/login_success.html#access_token=<your access token>&expires_in=3907

Copy the token from the URL and enter it in the script

The second var is the FACEBOOK_ID, get that from http://findmyfbid.com/

## Run the script

Open a CMD and type "node app.js"
The script will now automatically search for people who have probably liked you and like them back
