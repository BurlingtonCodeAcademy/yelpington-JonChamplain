const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const path = require('path')
const fs = require('fs')

app.use(express.static("."))

app.get('/restaurant/:id', (req,res) => {
    res.sendFile(path.resolve('./restaurant.html'))
})

app.post('/rest-data/:id', async (req,res) => {
    // let restDoc = await fs.readFile(`./rest-data/${req.params.id}.json`)

    await fs.appendFile(`./`)
})

app.listen(port, ( => {console.log(`listening on port: ${port}`)}))


///////////////////////restaurant.js//////////////////////////
let query 
let commentForm = document.getElementById('comments')

let displayName = document.getElementById('title')

let myStorage = window.localStorage

fetch(`/rest-data/${id}.json`)
    .then(res => res.json())
    .then((restLoc) => {
        console.log(restLoc)
    })

commentForm.addEventListener('submit', () => {
    let commentArray = myStorage.getItem('comments') || []

    commentArray.push({name: event.target.body.name, comment: event.target.body.comment})

    myStorage.getItem('comments') ? myStorage.removeItem('comments') : null
    myStorage.setItem('comments', commentArray);
        commentArray.forEach((comment) => {
            document.getElementById('comment-display').innerHTML += `<p>${comment.name}:</p> <p>${comment.comment}</p>`
        })
})