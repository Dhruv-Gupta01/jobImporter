const xml2js = require('xml2js');
module.exports = async function parseXml(xml) {
  return await xml2js.parseStringPromise(xml, { explicitArray: false });
};
