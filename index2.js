/**
 * 抓取图片链接
 */

let superagent = require('superagent');
let cheerio = require('cheerio');
let express = require('express');
let app = express();
let picLinks = [];

superagent
  .get('https://picjumbo.com/')
  .end((err, res) => {
  if (err) {
    console.log('该网址抓取失败', err)
  } else {
    getText(res.text);
  }
});

function getText(val) {
  let $ = cheerio.load(val);

  $('.tri_img_wrap .masonry_item picture img.image').each((idx, ele) => {
    picLinks.push(
      {
        link: $(ele).attr('data-src')
      }
    )
  })
}

let serve = app.listen(3002, function() {
  let port = serve.address().port;

  app.get('/', async (req, res, next) => {
    res.send(picLinks);
  });

  console.log('runing at',  port);
})