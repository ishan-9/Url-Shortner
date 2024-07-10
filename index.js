const express = require("express")
const app = express();

const PORT = 9000;
const { connectMongo } = require("./connection")
const cookieParser = require("cookie-parser")
const { OnlyLoggedUser,CheckAuth } = require('./middleware/auth')
const userRouter = require("./router/user")
const staticRoute = require("./router/staticRouter")
const urlRouter = require("./router/url")
const path = require("path")

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use('/url', OnlyLoggedUser, urlRouter)
app.use('/user', userRouter)
app.use('/', CheckAuth, staticRoute)


app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

connectMongo("mongodb://localhost:27017/auth").then((req, res) => {
    console.log("Mongo Connected")
})

app.listen(PORT, check=() => {
    console.log("sever connected")
});
