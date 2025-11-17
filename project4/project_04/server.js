import express from 'express'

const app = express()

app.use(express.static('dist'))

app.listen(5004, "0.0.0.0", () => {
  console.log("app running on port 5004");
});