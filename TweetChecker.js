var webdriver = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
var path = 'C:\\HDD Data\\Ewaco Analyzer\\Firefox Plugin\\geckodriver-v0.23.0-win64\\geckodriver.exe';

var service = new firefox.ServiceBuilder(path);

var builder = new webdriver.Builder().forBrowser('firefox');

builder.setFirefoxService(service);

var driver = builder.build();

async function test() {
    await driver.sleep(3000);
    await driver.get("https://twitter.com/realDonaldTrump/status/1065088330969305089");
    var tweeteruser = await driver.findElement(webdriver.By.className('username u-dir u-textTruncate')).getText();
    var retweets = await driver.findElement(webdriver.By.className('request-retweeted-popup')).getText();
    var favorited = await driver.findElement(webdriver.By.className('request-favorited-popup')).getText();
    var comments = await driver.findElement(webdriver.By.className('ProfileTweet-actionCount')).getAttribute('data-tweet-stat-count');
    console.log(tweeteruser + ' ' + retweets + ' ' + favorited + ' ' + comments + ' Comments');
    await driver.sleep(5000);
    await driver.get('https://twitter.com/Ninja/status/958071040768344070');
    tweeteruser = await driver.findElement(webdriver.By.className('username u-dir u-textTruncate')).getText();
    retweets = await driver.findElement(webdriver.By.className('request-retweeted-popup')).getText();
    favorited = await driver.findElement(webdriver.By.className('request-favorited-popup')).getText();
    comments = await driver.findElement(webdriver.By.className('ProfileTweet-actionCount')).getAttribute('data-tweet-stat-count');
    console.log(tweeteruser + ' ' + retweets + ' ' + favorited + ' ' + comments + ' Comments');
    await driver.sleep(5000);
    await driver.get('https://twitter.com/CouRageJD/status/1071517653351591936');
    tweeteruser = await driver.findElement(webdriver.By.className('username u-dir u-textTruncate')).getText();
    retweets = await driver.findElement(webdriver.By.className('request-retweeted-popup')).getText();
    favorited = await driver.findElement(webdriver.By.className('request-favorited-popup')).getText();
    comments = await driver.findElement(webdriver.By.className('ProfileTweet-actionCount')).getAttribute('data-tweet-stat-count');
    console.log(tweeteruser + ' ' + retweets + ' ' + favorited + ' ' + comments + ' Comments');
    //driver.close();
}

test();