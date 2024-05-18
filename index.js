const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./Routes/index')
app.use(bodyParser.json())
app.use(cors())

app.use(router)

app.listen(3000, () => {
    console.log('Server started on port 3000')
})