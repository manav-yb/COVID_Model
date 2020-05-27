const route = require('express').Router()


route.get('/', (req, res) => {
    res.render('Administrator')
})

route.post('/', (req, res) => {
    if(req.body.name == "SCMM" && req.body.pass == "123")
    {
        res.send("Successfully Landed at Result page")
    }
    else
    {
        res.send("Authentication fails")
    }
})


//Now this route can be imported in some other file
exports = module.exports = {
    route
}