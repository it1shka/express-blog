require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.use('/articles', articleRouter)

app.get('/', async (req, res) => {
  const articles = await Article
    .find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles })
})

async function main() {
  const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/blog'
  const PORT = process.env.PORT || 5000
  try {
    console.log(`Connecting to mongo on ${DB_URL}`)
    await mongoose.connect(DB_URL)
    app.listen(5000, () => console.log(`Running on ${PORT}`))
  } catch(e) {
    console.log(e)
  }
}

main()