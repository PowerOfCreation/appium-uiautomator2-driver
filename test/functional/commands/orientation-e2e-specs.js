import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import B from 'bluebird';
import { APIDEMOS_CAPS, amendCapabilities } from '../desired';
import { initSession, deleteSession } from '../helpers/session';
import ADB from 'appium-adb';


chai.should();
chai.use(chaiAsPromised);

describe('apidemo - orientation -', function () {
  let driver;

  describe('initial -', function () {
    afterEach(async function () {
      await driver.setOrientation('PORTRAIT');
      await deleteSession();
    });
    it('should have portrait orientation if requested', async function () {
      driver = await initSession(amendCapabilities(APIDEMOS_CAPS, {
        'appium:appActivity': '.view.TextFields',
        'appium:orientation': 'PORTRAIT',
      }));
      await driver.getOrientation().should.eventually.eql('PORTRAIT');
    });
    it('should have landscape orientation if requested', async function () {
      driver = await initSession(amendCapabilities(APIDEMOS_CAPS, {
        'appium:appActivity': '.view.TextFields',
        'appium:orientation': 'LANDSCAPE',
      }));
      await driver.getOrientation().should.eventually.eql('LANDSCAPE');
    });
    it('should have portrait orientation if nothing requested', async function () {
      driver = await initSession(amendCapabilities(APIDEMOS_CAPS, {
        'appium:appActivity': '.view.TextFields',
      }));
      await driver.getOrientation().should.eventually.eql('PORTRAIT');
    });
  });
  describe('setting -', function () {
    const adb = new ADB();
    before(async function () {
      if (await adb.getApiLevel() === 25) {
        return this.skip(); // this test is very flaky with API25
      }
      driver = await initSession(amendCapabilities(APIDEMOS_CAPS, {
        'appium:appActivity': '.view.TextFields'
      }));
    });
    after(async function () {
      await deleteSession();
    });
    it('should rotate screen to landscape', async function () {
      await driver.setOrientation('PORTRAIT');
      await B.delay(3000);
      await driver.setOrientation('LANDSCAPE');
      await B.delay(3000);
      await driver.getOrientation().should.eventually.become('LANDSCAPE');
    });
    it('should rotate screen to portrait', async function () {
      await driver.setOrientation('LANDSCAPE');
      await B.delay(3000);
      await driver.setOrientation('PORTRAIT');
      await B.delay(3000);
      await driver.getOrientation().should.eventually.become('PORTRAIT');
    });
    it('should not error when trying to rotate to portrait again', async function () {
      await driver.setOrientation('PORTRAIT');
      await B.delay(3000);
      await driver.setOrientation('PORTRAIT');
      await B.delay(3000);
      await driver.getOrientation().should.eventually.become('PORTRAIT');
    });
  });
});
