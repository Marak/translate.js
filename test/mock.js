// Utility method to mock responses from fetch()
const fetchMock = require('fetch-mock');

module.exports = (url, content, throws) => {
  fetchMock.post(url, () => new Promise((resolve, reject) => {
    setTimeout(() => {
      throws ? reject(content) : resolve(content);
    }, 500);
  }));
};

module.exports.end = () => {
  fetchMock.restore();
};
