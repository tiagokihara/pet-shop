const customExpress = require('./config/customExpress')
const conn = require('./infra/connect')
const Tables = require('./infra/tables')

conn.connect(error => {
    if (error) {
        console.log(error)
    } else {

        Tables.init(conn)

        const app = customExpress()

        app.listen(3000, () => console.log('Listen to the port 3000'))
    }
})

