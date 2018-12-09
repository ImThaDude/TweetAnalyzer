var webdriver = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
var prompt = require('prompt-async');
var path = '.\\Firefox Plugin\\geckodriver-v0.23.0-win64\\geckodriver.exe';

var service = new firefox.ServiceBuilder(path);

var builder = new webdriver.Builder().forBrowser('firefox');

builder.setFirefoxService(service);

var driver = builder.build();

async function getTwitterData(twitterLink) {
    await driver.sleep(3000);
    await driver.get(twitterLink);
    var tweeteruser = await driver.findElement(webdriver.By.className('username u-dir u-textTruncate')).getText();
    var retweets = await driver.findElement(webdriver.By.className('request-retweeted-popup')).getText();
    var favorited = await driver.findElement(webdriver.By.className('request-favorited-popup')).getText();
    var comments = await driver.findElement(webdriver.By.className('ProfileTweet-actionCount')).getAttribute('data-tweet-stat-count');
    var day = new Date(Date.now()).toTimeString();
    console.log(day + ' ' + tweeteruser + ' ' + retweets + ' ' + favorited + ' ' + comments + ' Comments');
}

var time = 30;
var tweetList = [];

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

async function runInterator() {
    for (i = 0; i < 20; i++) {
        for (i = 0; i < tweetList.length; i++) {
            //console.log(tweetList[i]);
            try {
                await getTwitterData(tweetList[i]);
            } catch (err) {
                console.log(err);
                console.log('Continuing...');
            }
        }
        console.log('\n');
        await sleep(10000);
    }
}

async function userInput() {
    prompt.start();
    for (i = 0; i < 10; i++) {
        console.log("Insert twitter link...");
        const {tweetlink} = await prompt.get("tweetlink");
        console.log(tweetlink);
        tweetList.push(tweetlink);
    }
}

userInput();
runInterator();