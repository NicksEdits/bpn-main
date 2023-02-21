const app = require('./backend/app');

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is on ${PORT}`)
})