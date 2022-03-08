// --- DEPENDENCIES ----------------------------------------------------------------------------------------------

const express= require('express')

const app = require('liquid-express-views')(express())

const pokemon = require('./models/pokemon.js')

// const methodOverride = require("method-override")

const port = 3000

// --- MIDDLEWARE ------------------------------------------------------------------------------------------------

const reqLog = (req) => {
    console.log('===========================')
    console.log('this is the request object sent from the browser')
    console.log(`${req.method} request sent to ${req.url}`)
    console.log('req params are: ', req.params)
    console.log('the request body is:' , req.body)
    console.log('===========================')
}

app.use(express.urlencoded({extended:false}))

// app.use(methodOverride("_method"))

// --- ROUTES ----------------------------------------------------------------------------------------------------

/// --- index route ----------------------------------------------------------------------------------------------

app.get('/', (req, res) => {
reqLog(req)
res.render('index', { data: pokemon })

})

/// --- new route ------------------------------------------------------------------------------------------------

app.get('/new', (req, res) => {
    reqLog(req)
    res.render('new')
})

/// --- post/create route ----------------------------------------------------------------------------------------

/// --- delete route ---------------------------------------------------------------------------------------------

/// --- update/edit route (for showing changes) ------------------------------------------------------------------

/// --- update/edit route (for posting changes) ------------------------------------------------------------------

/// --- show route -----------------------------------------------------------------------------------------------

app.get('/:id', (req, res) => {
    res.render('show', { data: pokemon[req.params.id] })

})

/// --- listening for port ---------------------------------------------------------------------------------------

app.listen(port, () => {
    console.log('server running and ready. port is ', port)
})