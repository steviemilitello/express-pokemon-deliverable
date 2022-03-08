// --- DEPENDENCIES ----------------------------------------------------------------------------------------------

const express= require('express')

const app = require('liquid-express-views')(express())

const pokemon = require('./models/pokemon.js')

const methodOverride = require("method-override")

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

app.use(methodOverride("_method"))

// --- ROUTES ----------------------------------------------------------------------------------------------------

/// --- index route ----------------------------------------------------------------------------------------------

app.get('/pokemon', (req, res) => {
reqLog(req)
res.render('index', { data: pokemon })

})

/// --- new route ------------------------------------------------------------------------------------------------

app.get('/pokemon/new', (req, res) => {
    reqLog(req)
    res.render('new')

})

/// --- post/create route ----------------------------------------------------------------------------------------

app.post('/pokemon', (req, res) => {
    pokemon.push(req.body)
    res.redirect('/')

})

/// --- delete route ---------------------------------------------------------------------------------------------

app.delete("/pokemon/:id", (req, res) => {
    pokemon.splice(req.params.id, 1)
    res.redirect("/")

})

// --- update/edit route (for showing changes) ------------------------------------------------------------------

app.get("/pokemon/:id/edit", (req, res) => {
    res.render(
      "edit", 
      {
        data: pokemon[req.params.id],
        index: req.params.id, 
      }
    )

})

/// --- update/edit route (for posting changes) ------------------------------------------------------------------

app.put("/pokemon/:id/", (req, res) => {
    pokemon[req.params.id] = req.body
    res.redirect("/"); 

 })

/// --- show route -----------------------------------------------------------------------------------------------

app.get('/pokemon/:id', (req, res) => {
    res.render('show', { data: pokemon[req.params.id] })

})

/// --- listening for port ---------------------------------------------------------------------------------------

app.listen(port, () => {
    console.log('server running and ready. port is ', port)
})