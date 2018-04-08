const csvWriteStream = require('csv-write-stream')
const { CronJob } = require('cron')
const fs = require('fs')
const ping = require('./ping')
var onExit = require('signal-exit')

const writer = csvWriteStream({ headers: ['timestamp', 'ms'] })
writer.pipe(fs.createWriteStream('log.csv'))

const job = new CronJob('1-10 0,30 * * * *', () => {
  ping()
    .then(ms => {
      const message = [new Date().toISOString(), ms]

      console.log(message)
      writer.write(message)
    })
    .catch(err => console.warn('Unsuccessful ping', err))
})

job.start()

onExit((code, signal) => {
  writer.end()
})
