# Introduction

Tasks micro-service for ToDo App :heart:


## Installation

Clone the repo
```bash
git clone https://github.com/princeahugah/TaskService.git
```

Install sequelize cli and typescript
```bash
yarn global add sequelize-cli typescript
```

Install node modules
```bash
yarn install
```

Setup environment variables
```bash
port = 3002
NODE_ENV = development

DB_USERNAME = db-user
DB_PASSWORD = pass123

HASHING_ALGORITHM = sha256
AUTH_SECRET = XbSK5mSY2IHiJCKHChhpaObq8YLDUH60nTFkZDHBXNRDBGyQlCViHTaV9

CORS_ORIGIN_WHITELIST = ["http://localhost:3000"]
CORS_ALLOWED_HEADERS = ["Content-Type", "Authorization", "Origin", "X-Requested-With", "Accept"]
CORS_EXPOSED_HEADERS = ["x-response-time"]
CORS_METHODS = ["POST", "OPTIONS", "GET", "DELETE", "PUT"]
```


## Configure your database

Run DB migration: We are using sqlite3 as the database. You can check the configuration in **migrations/config.json**
```bash
yarn run migrate
```

Confirm your tables have been setup properly
```bash
sqlite3 dev_database.sqlite3
sqlite> .schema
```
ctrl + D to exit


## Compile and run the service

```bash
yarn run dev
```

Your web server is now exposed on http://localhost:3002

### GET   /api/tasks/{userId}
```bash
curl -XGET http://localhost:3002/api/tasks/b2488515-4341-46d8-9548-3f4f6ee03176
```

### POST   /api/tasks
```bash
curl -XPOST -H 'Content-Type: application/json' -d '{"state":"to do","description":"Learning Node.js","userId":"b2488515-4341-46d8-9548-3f4f6ee03176"}' http://localhost:3002/api/tasks
```

### PUT   /api/tasks/{taskId}
```bash
curl -XPUT -H 'Content-Type: application/json' -d '{"state":"done","userId":"b2488515-4341-46d8-9548-3f4f6ee03176"}' http://localhost:3002/api/tasks/ba0000b0-eb10-4f25-97eb-8cf70e36d2a1
```

### DELETE   /api/tasks/{taskId}
```bash
curl -X DELETE http://localhost:3002/api/tasks/ba0000b0-eb10-4f25-97eb-8cf70e36d2a1
```


## Tests

Mocha tests
```bash
yarn run test
```


## CI/CD

Within this repo is a **Jenkinsfile** with defines how this project should be built and deployed.
See a screenshot of a jenkins build job below. It logs the status of the build to a slack channel.

[![Logo]./jenkins-blue-ocean.png
[![Logo]./jenkins-slack.png
