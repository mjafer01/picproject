// src/utils/disableConsoleWarnings.js

const disableConsoleWarnings = () => {
  const noop = () => {};
  console.warn = noop;
};

export default disableConsoleWarnings;
