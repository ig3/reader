const reader = require('davereader');
const fs = require('fs');
function readConfig (callback) {
  fs.readFile('config.json', function (err, data) {
    let myConfig = new Object();
    if (!err) {
      try {
        myConfig = JSON.parse(data.toString());
      } catch (err) {
        console.log('readConfig: err == ' + err.message);
      }
    }
    callback(myConfig);
  });
}
readConfig(function (myConfig) {
  reader.init(myConfig, function () {
  });
});
