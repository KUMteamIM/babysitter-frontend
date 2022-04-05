/**
 * Config options can be overwritten by setting window.NtiPortal.config object
 * window.NtiPortal.config = { valueToOverwrite: 1 }
 */
 const defaultConfig = {
  debug: window.location.host.indexOf("localhost") > -1,
  apiBase: 'http://localhost:8000'
};

/**
 * @returns configuration object with custom variables from window.NtiPortal.config merged in, if set
 */
export const getConfig = function () {
  let appConfig = defaultConfig;
  if (window.NtiPortal?.config) {
    appConfig = { ...defaultConfig, ...window.NtiPortal.config };
  }

  return appConfig;
};

/**
 * returns a config object
 */
export default getConfig();
