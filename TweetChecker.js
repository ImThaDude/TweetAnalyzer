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
    await driver.sleep(5000);
    await driver.get('https://hackernoon.com/javascript-asynchrony-and-async-await-in-selenium-webdriver-tests-a89924421f65');
}

test();