const express = require('express');
const app = express();
const superagent = require('superagent');          //请求页面
const cheerio = require('cheerio');

/**
 * 使用cheerio模块的cherrio.load()方法，将HTMLdocument作为参数传入函数
   以后就可以使用类似jQuery的$(selectior)的方式来获取页面元素
 * 
 */
let getHotNews = (res) => {
  let hotNews = [];
  let $ = cheerio.load(res.text);

  // 找到目标数据所在的页面元素，获取数据
  $('div#pane-news ul li a').each((idx, ele) => {
    // cherrio中$('selector').each()用来遍历所有匹配到的DOM元素
    // 参数idx是当前遍历的元素的索引，ele就是当前便利的DOM元素
    let news = {
      title: $(ele).text(),        // 获取新闻标题
      href: $(ele).attr('href')    // 获取新闻网页链接
    };
    hotNews.push(news)              // 存入最终结果数组
  });
  
  return hotNews
};


/**
 * superagent.get('http://news.baidu.com/') 用于访问该网页
 * res.text:页面所返回的数据
 */
superagent.get('http://news.baidu.com/').end((err, res) => {
  if (err) {
    console.log('热点新闻抓取失败', err)
  } else {
    hotNews = getHotNews(res);
  }
})

let serve = app.listen(3000, function() {
  let host = serve.address().address;
  let port = serve.address().port;

  app.get('/', async (req, res, next) => {
    res.send(hotNews);
  });

  console.log('you aoo is runing ar ', host, port);
})