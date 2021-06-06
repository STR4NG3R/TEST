# TEST

For running the application you will need postgres sql to the db, in server/ormconfig.json you can modify the credential for the database access
also you will need npm and the driver for google chrome.

then you can execute the follow commands
```bash
cd server 
npm install
npm start dev
cd ..
cd web
npm install 
npm start
```

The react application allow to you to interact with the server, it will ask you for the credentials and the server will receive by params

if you dont want to use the React application to interact with the server you can reach the endpoint as follow

```bash
localhost:5000/api/v1/notes/getnotes?email=yourEmail&password=yourPassword
```
 
 I use selenium to web scrap the data from the oring and use it on randomist, also you can specify how many notes do you want (optional).
  
```bash
localhost:5000/api/v1/notes/getnotes?email=yourEmail&password=yourPassword&numberNotes=5
```
