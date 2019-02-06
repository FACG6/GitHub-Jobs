# GitHub-Jobs

# We are GitHub-Jobs Team

## What? 
Our app is a github jobs app that helps user search for any job on software field.

The user can enter a programming language or a software jobg in the input bar, and specify the location. Several Results will appear with job details if available.

## How? 
We collect data from github jobs api in the back-end and we display the needed information in our website.
We validated the input value and handeled possible errors in the backend.


## User Story

* The user want to search for a job name and description.
* The user wants to know if there are any problems or error such as noresults found, not found page, server internal error and empty input.

## Architecture

1. public
	css
	  styles.css
	js  
	  dom.js
	  fetch.js
	index.html
	html 
	  notFoundPage.html
	  serverInternalError.html
2. src

*  handlers.js
*  makeRequest.js
*  router.js
*  server.js
3. test
* test.js
4. README 
5. .gitignore 
6. package-lock.json 
6. package.json 

## Skills We Used:

1. Basic back-end services, such as building HTTP server. 
2. Modularizing our app. 
3. Testing our Functions.
4. Hosting our project on heroku.
5. Using module.exports and require to break a single large server file into smaller modules.
6. Make request to api in the back-end.
7. Handle Errors.


