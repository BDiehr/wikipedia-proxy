var koa = require('koa');
var app = koa();
var wikipedia = require("node-wikipedia");
var Router = require('koa-router');
var fetch = require('node-fetch');
var logger = require('koa-logger');
const router = new Router();
const PORT_NUM = 4141;

/**
 * Request Wikipedia Article
 * A thin wrapper around `node-wikipedia` to make it `yieldable` for use in koa.
 *
 * @param {String} page - Requested Wikipedia page
 * @returns {Object}
 */
const wikiRequest = (page) => new Promise(resolve => {
  wikipedia.page.data(page, { content: true }, (response) => resolve(response));
});

app.use(logger());
app.use(require('koa-cors')({
  headers: ['Content-Type', 'Access-Control-Request-Origin'],
}));

/**
 * Get Wikipedia Page
 */
router.get('/page/:page', function * () {
  const ctx = this;
  const page = ctx.params.page;
  const response = yield wikiRequest(page);
  ctx.body = JSON.stringify(response);
});

/**
 * Get Random Wikipedia Page
 */
router.get('/random', function * () {
  const ctx = this;
  const article = yield fetch('http://en.wikipedia.org/wiki/Special:Random').then(res => res.url);
  ctx.body = {
    msg: 'Successfully fetched a random Wikipedia article!',
    url: article,
  };
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT_NUM);
console.log(`Listening to port: ${PORT_NUM}`);
