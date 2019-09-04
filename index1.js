/**
 * 抓取百度实时热点tile & href
 */

let superagent = require('superagent');
require("superagent-charset")(superagent);
let cheerio = require('cheerio');
let express = require('cheerio');
let app = express();
let news = [];

superagent
  .get('http://top.baidu.com/buzz?b=1')
  .charset('gb2312')
  .end((err, res) => {
  if (err) {
    console.log('该网址抓取失败', err)
  } else {
    getText(res.text);
  }
});

function getText(val) {
  let $ = cheerio.load(val);
  $('a.list-title').each((idx, ele) => {
    news.push(
      {
        title: $(ele).text(),
        href: $(ele).attr('href')
      }
    )
  })
}

let serve = app.listen(3001, function() {
  let host = serve.address().address;
  let port = serve.address().port;

  app.get('/', async (req, res, next) => {
    res.send(news);
  });

  console.log('runing at',  port);
})