# idea
We make it super easy for female victims (from sexual assaults) to find someone to talk to for support. We provide a 24/7 private, anonymous and free chat service. nj j\

### Demo: 
http://glasschat.org

### tech:
- Firebase: scalable database, real-time chat
- Angular JS
- Twitter Bootflat
- https://github.com/vitalets/checklist-model
- the exhaustive list below

``` 
chimehack git:(master) cat package.json
{
  "name": "chimehack",
  "version": "0.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "gulp test",
    "start": "node server/server.js",
    "postinstall": "./node_modules/bower/bin/bower install --config.directory='client/lib'"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {},
  "dependencies": {
    "body-parser": "^1.4.3",
    "bower": "^1.4.1",
    "express": "^4.4.5",
    "morgan": "^1.6.1"
  }
}
```
```
chimehack git:(master) cat bower.json
{
  "name": "chimehack",
  "private": "true",
  "dependencies": {
    "angular": "latest",
    "angularfire": "~1.1.2",
    "firebase": "~2.2.7",
    "Bootflat": "~2.0.4",
    "angular-route": "~1.4.2",
    "Selecter": "~3.2.4"
  }
}
```
