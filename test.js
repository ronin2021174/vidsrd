const { getvidsrc } = import('D:/Node Projects/vidsrc/test2/vidsrc-api-js/src/vidsrcpro.js');

(async () => {
  console.log(await getvidsrc(12345, 1, 10)); // Example usage
})();
