const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const chrome = require('selenium-webdriver/chrome');
const { title } = require('process');

describe('Tugas sesi 10', function () {
    let driver;

    afterEach(async function() {
        console.log("Semua test case telah keluar")
        await driver.quit()
    });

    it('Visit SauceDemo dan mengurutkan A sampai Z', async function () {
        options = new chrome.Options();
        // options.addArguments('--incognito'); // option ke chrome supaya gaada popup password nya
        driver = await new Builder()
            .forBrowser('chrome')
            // .setChromeOptions(options)
            .build();

        await driver.get('https://www.saucedemo.com');
        const title = await driver.getTitle();

        // assert: memastikan object sama persis
        assert.strictEqual(title, 'Swag Labs');

         // inputs
         let inputUsername = await driver.findElement(By.css('[data-test="username"]'))
         let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]'))
         let buttonLogin = await driver.findElement(By.className('submit-button btn_action'))
         await inputUsername.sendKeys('standard_user')
         await inputPassword.sendKeys('secret_sauce')
         await buttonLogin.click()
        
        // tunggu element tampil
        let buttonCart = await driver.wait(
            until.elementLocated(By.xpath('//*[@data-test="shopping-cart-link"]')), 
            10000
        );
        await driver.wait(until.elementIsVisible(buttonCart), 5000, 'Shopping cart harus tampil');
        
        // assert: elememt ada
        await buttonCart.isDisplayed()

        // assert: text dalam element benar
        let textAppLogo = await driver.findElement(By.className('app_logo'))
        let logotext = await textAppLogo.getText()
        assert.equal(logotext, 'Swag Labs')

        await driver.sleep(1700)

        // dropdown search
        let dropdownSort = await driver.findElement(By.xpath('//select[@class="product_sort_container"]'))
        await dropdownSort.click()
        let option = await driver.findElement(By.xpath('//option[text()="Name (A to Z)"]'));
        await option.click();

    });

    it('Tambahkan item baru ke cart', async function() {
        option = new chrome.Options();
        driver = await new Builder()
        .forBrowser('chrome')
        .build();

        await driver.get("https://www.saucedemo.com/");
        const title = await driver.getTitle();

        assert.equal(title, "Swag Labs")

        let inputUsername = await driver.findElement(By.xpath('//*[@id="user-name"]'));
        let inputPassword = await driver.findElement(By.xpath('//*[@id="password"]'));
        let buttonLogin = await driver.findElement(By.xpath('//*[@id="login-button"]'))

        await inputUsername.sendKeys('standard_user');
        await inputPassword.sendKeys('secret_sauce');
        await buttonLogin.click()

        let addToCart = await driver.wait(
            until.elementLocated(By.xpath('//*[@id="add-to-cart-sauce-labs-backpack"]')), 
            10000
        );
        await driver.wait(until.elementIsVisible(addToCart), 5000, 'Shopping cart harus tampil');
        await addToCart.isDisplayed()

        let textAppLogo = await driver.findElement(By.className('app_logo'))
        let logotext = await textAppLogo.getText()
        assert.equal(logotext, 'Swag Labs')

        await driver.sleep(1700)

        let addToCartButton = await driver.findElement(By.xpath('//*[@id="add-to-cart-sauce-labs-backpack"]'))
        await addToCartButton.click()

        let shoppingCart = await driver.findElement(By.xpath('//*[@data-test="shopping-cart-link"]'))
        await shoppingCart.click()

        let item1 = await driver.wait(
            until.elementLocated(By.xpath('//*[@data-test="item-quantity"]'))
        )
        await driver.wait(until.elementIsVisible(item1), 5000, 'Tombol checkout harus tampil');
        await item1.isDisplayed()

    });

    // it('Visit SauceDemo dan cek page title', async function () {
    //     options = new firefox.Options();
    //     options.addArguments("--headless");

    //     driver = await new Builder().forBrowser('firefox').setFirefoxOptions(options).build();

    //     // driver = await new Builder().forBrowser('chrome').build();

    //     await driver.get('https://www.saucedemo.com');
    //     const title = await driver.getTitle();

    //     await driver.quit()

    // })
});
