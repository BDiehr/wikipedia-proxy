var koa = require('koa');
var app = koa();
var wikipedia = require('node-wikipedia');
var Router = require('koa-router');
const router = new Router();

const wikiRequest = (page) => new Promise(resolve => {
  wikipedia.page.data(page, { content: true }, (response) => resolve(response));
});


app.use(require('koa-cors')({
  credentials: true,
  headers: [
    'Content-Type',
    'Authorization',
    'Access-Control-Request-Origin',
    'Access-Control-Allow-Credentials',
  ],
}));
router.get('/:page', function * () {
  const ctx = this;
  const page = ctx.params.page;
  const response = yield wikiRequest(page);
  this.body = JSON.stringify(response);
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
