import { commonCapConstraints } from 'appium-android-driver';

let uiautomatorCapConstraints = {
  app: {
    presence: true,
    isString: true
  },
  automationName: {
    isString: true
  },
  browserName: {
    isString: true
  },
  launchTimeout: {
    isNumber: true
  },
  skipUnlock: {
    isBoolean: true
  },
  uiautomator2ServerLaunchTimeout: {
    isNumber: true
  },
  uiautomator2ServerInstallTimeout: {
    isNumber: true
  },
  uiautomator2ServerReadTimeout: {
    isNumber: true
  },
  disableWindowAnimation: {
    isBoolean: true
  },
  systemPort: {
    isNumber: true
  },
  mjpegServerPort: {
    isNumber: true
  },
  mjpegScreenshotUrl: {
    isString: true
  },
  skipServerInstallation: {
    isBoolean: true
  },
  androidCoverageEndIntent: {
    isString: true
  },
  userProfile: {
    isNumber: true
  },
  appWaitForLaunch: {
    isBoolean: true
  },
  disableSuppressAccessibilityService: {
    isBoolean: true
  },
  forceAppLaunch: {
    isBoolean: true
  },
  shouldTerminateApp: {
    isBoolean: true
  }
};

let desiredCapConstraints = {};
Object.assign(
  desiredCapConstraints,
  uiautomatorCapConstraints,
  commonCapConstraints
);

export default desiredCapConstraints;
