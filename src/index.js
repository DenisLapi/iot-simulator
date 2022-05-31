const admin = require('firebase-admin')
const moment = require('moment')
const cron = require('node-cron')
const { db } = require('./firestore/db')

const sensorIds = [
  'ywbqio19TZZa59YLthS1',
  'wJpjIR9LmOK3MOlyJE9n',
  'kRudl2kw2JBvXztrNO2J'
]

cron.schedule('*/10 * * * * *', () => {
  sensorIds.forEach(id => {
    const label = moment().format('YYYY.MM.DD HH:mm')
    const value = Math.floor(Math.random() * 100) + 1
    db.collection('sensors')
      .doc(id)
      .get()
      .then(snapshot => {
        if (snapshot.data()) {
          const { status } = snapshot.data()
          if (!status) throw Error(`Sensor ${id} not active`)
          return snapshot.ref.update({
            values: admin.firestore.FieldValue.arrayUnion({
              label,
              value
            })
          })
        }
        throw Error('No snapshot data')
      })
      .then(() => {
        console.log(`Sensor ID: ${id}\t| Label: ${label}\t| Value: ${value}`)
      })
      .catch(e => {
        console.log(e)
      })
  })
})
