const loader = function () {
  var P = ["processing", "processing.", "processing..", "processing..."];
  var x = 0;
  return setInterval(function () {
    process.stdout.clearLine();
    process.stdout.write("\r" + P[x++]);
    x &= 3;
  }, 250);
};

const clearLoader = function (loaderReference) {
  clearTimeout(loaderReference);
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
};
module.exports = { loader, clearLoader };
