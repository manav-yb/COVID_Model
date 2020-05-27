express = require('./node_modules/express')

app = express()
var fs = require('fs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'hbs')

//For getting the result the administrator will request at a url for getting the result
//Here first authentication of the administrator is done then the result is returned
app.use('/Admin', require(__dirname + '/Routes/Admin.js').route)


app.listen(3000, () => {
    console.log("Server started listening at port 3000 for the administrator to get the results")
})
