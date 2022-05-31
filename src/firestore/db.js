const admin = require('firebase-admin')
const serviceAccount = require('../../service-account-file.json')

admin.initializeApp({
	credentials: admin.credential.cert(serviceAccount)
})

module.exports = {
  db: admin.firestore()
}