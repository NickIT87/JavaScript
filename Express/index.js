import express from 'express'
import path from 'path'

const __dirname = path.resolve()
const PORT = process.env.PORT ?? 3000
const app = express()

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'static', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server started on: ${PORT}...`)
})