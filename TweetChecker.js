var webdriver = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
var prompt = require('prompt-async');
var path = '.\\Firefox Plugin\\geckodriver-v0.23.0-win64\\geckodriver.exe';

var service = new firefox.ServiceBuilder(path);
var builder = new webdriver.Builder().forBrowser('firefox');
builder.setFirefoxService(service);

var driver = builder.build();

var time = 30;
var tweetList = [];

async function getTwitterData(twitterLink) {
    await driver.sleep(3000);
    await driver.get(twitterLink);
    var tweeteruser = await driver.findElement(webdriver.By.className('username u-dir u-textTruncate')).getText();
    var retweets = await driver.findElement(webdriver.By.className('request-retweeted-popup')).getText();
    var favorited = await driver.findElement(webdriver.By.className('request-favorited-popup')).getText();
    var comments = await driver.findElement(webdriver.By.className('ProfileTweet-actionCount')).getAttribute('data-tweet-stat-count');
    var time = new Date(Date.now()).toISOString();
    //console.log(time + ' ' + tweeteruser + ' ' + retweets + ' ' + favorited + ' ' + comments + ' Comments');
    return { time: time, twitterUser: tweeteruser, twitterID: getTwitterID(twitterLink), retweetCount: getNumber(retweets), favoritedCount: getNumber(favorited), commentCount: getNumber(comments) };
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function getNumber(numberString) {
    //console.log(numberString);
    return parseInt(numberString.replace(',', ''));
}

function getNumbers(numberString) {
    var numberPattern = /\d+/g;
    return numberString.match(numberPattern);
}

function getTwitterID(twitterLink) {
    var ids = getNumbers(twitterLink);
    var id;
    if (ids.length > 0) {
        id = ids[ids.length - 1];
    } else {
        Console.log('Error on ID extraction.');
        id = NaN;
    }
    return id;
}

async function runInterator() {
    for (i = 0; i < 20; i++) {
        console.log('Initialize Checking...');
        for (i = 0; i < tweetList.length; i++) {
            var outputData;
            //console.log(tweetList[i]);
            try {
                outputData = await getTwitterData(tweetList[i]);
            } catch (err) {
                console.log(err);
                console.log('Continuing...');
            }
            console.log(outputData);
        }
        if (tweetList.length <= 0) {
            await sleep(10000);
        }
    }
}

async function userInput() {
    prompt.start();
    for (i = 0; i < 10; i++) {
        console.log("Insert twitter link...");
        const { tweetlink } = await prompt.get("tweetlink");
        console.log(tweetlink);
        tweetList.push(tweetlink);
    }
}

userInput();
runInterator();