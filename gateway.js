const https = require('https');
const Stream = require('stream').Transform
const isAccessible = async (server) => {
  try {
    await https.get(server.server + "/stat", (res) => {
      return res.statusCode == 200
    })
  } catch (e) {
    return false
  }
}

const hasContent = async (server,item) => {
  try {
    await https.get(server.server + item, (res) => {
      return res.statusCode == 200
    })
  }catch (e) {
    return false
  }

}

const getContent = async (server,item) => {
  try {
    await https.request(server.server + item, function (response) {
      let data = new Stream();
      response.on('data', function (chunk) {
        data.push(chunk);
      });
      response.on('end', function () {
        return data.read()
      });
    }).end();
  } catch (e) {
    return null
  }
}

module.exports = {isAccessible,hasContent,getContent};