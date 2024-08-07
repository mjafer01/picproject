// setupTests.js

const originalError = console.error;

beforeAll(() => {
  console.error = (...args) => {
    try{
    if (args && args.length > 0 && args[0].toLowerCase().includes('warning')) {
      return;
    }
    }
    catch (ex){}
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
