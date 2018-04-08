const Ping = require('ping-lite')

const ping = () => {
  const pingSender = new Ping('syd1.speedtest.telstra.net')

  return new Promise((resolve, reject) => {
    pingSender.send((err, ms) => {
      if (err || ms === null) {
        reject(err)
      } else {
        resolve(ms)
      }
    })
  })
}

module.exports = ping
