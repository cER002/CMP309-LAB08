// const handler = (req, res, next) => {

// }

// app.use((req, res, next) => {
//     // code

//     next()
// }) // generic middleware

// app.use(handler) // better way for the 2 middleware they must be like this

import express from 'express';
import path from 'node:path';

const PORT = process.env.PORT ?? 3000;
const app = express();
const robots = "User-agent: *\nDisallow: /"
const courses = [
    { id: 0, title: "Web Programming", credits: 70 },
    { id: 1, title: "Database Management Systems", credits: 80 },
    { id: 2, title: "Dİfferential Equations", credits: 90 }
]
let count = 0

const requestCounter = (req, res, next) => {
    count += 1
    next()
}

const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.path} from ${req.get('User-Agent')}`)
    next()
}

app.use(express.static(path.join(import.meta.dirname, 'public')))
app.use(requestLogger)
app.use(requestCounter)

app.get('/', (req, res) => {
    res.sendFile(path.join(import.meta.dirname, 'public/index.html'))
})

app.get('/hello', (req, res) => {
    res.send('Hello from Çağdaş\'s server')
})

app.get('/robots.txt', (req, res) => {
    res.type('text/plain')
    res.send(robots)
})

app.get('/old-page', (req, res) => {
    res.redirect('/hello')
})

app.get('/api/courses', (req, res) => {
    res.json(courses)
})

app.get('/api/status', (req, res) => {
    const nodeVersion = process.version
    const uptimeSeconds = process.uptime()

    res.json({
        status: "up",
        nodeVersion,
        uptimeSeconds
    })
})

app.get('/api/headers', (req, res) => {
    const userAgent = req.get('User-Agent')
    const accept = req.get('Accept')

    res.json({
        "user-agent": userAgent,
        "accept": accept
    })
})

app.get('/api/subscribe', (req, res) => {
    res.status(201).json({
        "subscribed": true
    })
})

app.get('/api/admin', (req, res) => {
    res.status(403).json({
        "error": "Forbidden"
    })
})

app.get('/api/stats', (req, res) => {
    res.json({
        "requestsServed": count
    })
})

app.get('/{*splat}', (req, res) => {
    const url = req.url

    if (url.startsWith('/api')) {
        res.status(404).json({
            "error": "Not found"
        })
        return
    }

    res.status(404).send("Page Not Found")
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})