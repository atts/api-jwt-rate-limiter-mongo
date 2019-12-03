# api-jwt-rate-limiter-mongo
This project was generated with Node version 13.2.

# Prerequisites
Node environment to be installed. https://nodejs.org/en/download/

Mongo to be installed for running mongo service instance locally.
1. $ brew install mongodb-community-shell
2. $ brew link --overwrite  mongodb-community-shell
3. $ sudo mkdir -p /data/db (run this command if these directories not present in root)
4. $ sudo mongod (if followed previous step) else $ mongod
    
Redis store to be installed and run locally.
1. $ brew install redis
2. $ redis-server

# Development server
command yarn run start for a dev server. Navigate to http://localhost:5000/. The app will automatically reload if you change any of the source files.

# production env
This application needs few environment variables to be set if in production . For demo purpose, I have uploaded the env file which is prohibited in usual cases.


master
