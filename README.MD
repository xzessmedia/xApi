# Datahub

xApi Boilerplate

## Quick Start

Lightweight Api Server with OpenApi Validation

1. Edit /server/api/cfg/config.json
2. Edit /.env.yml
3. Edit /server/api/common/api.yml with https://editor.swagger.com
4. Add Routes to /server/api/ and add Scripts to /server/api/routes/v1
5. To communicate with Database, either use BasicEndpoint as in example or extend to your own purpose
6. Install /data/requestlog.sql to your SQL Database before the first run


---

## Install Dependencies

Install all package dependencies (one time operation)

```shell
npm install
```

## Run It
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
npm run dev
```

or debug it

```shell
npm run dev:debug
```

## Design
https://openapi.design

#### Run in *production* mode:

Compiles the application and starts it in production production mode.

```shell
npm run compile
npm start
```

## Test It

Run the Mocha unit tests

```shell
npm test
```

or debug them

```shell
npm run test:debug
```

## Try It
* Open you're browser to [http://localhost:3500](http://localhost:3500)


## Debug It

#### Debug the server:

```
npm run dev:debug
```

#### Debug Tests

```
npm run test:debug
```