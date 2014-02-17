# coveralls-webhook

>A webhook middleware for the coveralls

[![Build Status](https://secure.travis-ci.org/banyan/coveralls-webhook.png?branch=master)](http://travis-ci.org/banyan/coveralls-webhook)

## Development

### Install Node.js 0.11.9 or higher.

This app is build by [Koa](https://github.com/koajs/koa).
Koa use generator so, this app must be running Node.js 0.11.9 or higher.

### Edit env

Copy `.env.sample` to `.env`.

### Run app

```
$ vi
$ ./bin/start
```

## Production on Heroku

### Create heroku app

```
$ heroku create [your-app-name]
```

### Set config variables

```
$ heroku config:set \
  WEBHOOK_PATH=endpoint-that-you-like \
  GITHUB_OAUTH_TOKEN=your-token
```

## License

MIT
