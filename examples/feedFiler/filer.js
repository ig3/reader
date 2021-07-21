const reader = require('davereader');
const utils = require('daveutils');
const fs = require('fs');

const readerDataFolder = 'reader_data/';
const myOutputFolder = 'myOutputFolder/';

const config = {
  flHttpEnabled: false,
  flWebSocketEnabled: false,

  listsFolder: readerDataFolder + 'lists/',
  riversFolder: readerDataFolder + 'rivers/',
  podcastsFolder: readerDataFolder + 'podcasts/',
  dataFolder: readerDataFolder + 'data/',

  addToRiverCallbacksFolder: readerDataFolder + 'callbacks/addToRiver/',
  buildRiverCallbacksFolder: readerDataFolder + 'callbacks/buildRiver/',

  flRequestCloudNotify: false,
  flDownloadPodcasts: false
};

const feeds = [
  'http://scripting.com/rss.xml',
  'http://status.aws.amazon.com/rss/ec2-us-east-1.rss',
  'http://www.aclu.org/blog/feed/',
  'http://www.bart.gov/news/rss/rss.xml',
  'http://www.memeorandum.com/feed.xml',
  'http://code4lib.org/node/feed',
  'http://www.nytimes.com/pages/technology/index.html?partner=rssnyt',
  'http://hn.geekity.com/newstories.xml',
  'http://www.npr.org/rss/rss.php?id=1045'
];
function writeFeedsList (callback) {
  const f = readerDataFolder + 'lists/feeds.json'; const jsontext = utils.jsonStringify(feeds);
  utils.sureFilePath(f, function () {
    fs.writeFile(f, jsontext, function (err) {
      if (err) {
        console.log('writeFeedsList: err.message == ' + err.message);
      } else {
        callback();
      }
    });
  });
}

function startup () {
  config.newItemCallback = function (urlfeed, itemFromParser, item) { // called for each new item
    const f = myOutputFolder + utils.getDatePath() + utils.padWithZeros(item.id, 4) + '.json';
    utils.sureFilePath(f, function () {
      fs.writeFile(f, utils.jsonStringify(item));
    });
  };
  writeFeedsList(function () {
    reader.init(config);
  });
}
startup();
