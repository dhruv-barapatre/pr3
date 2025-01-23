const expres = require("express")
const userRouter = require("./routes/user.routes")
const { connection } = require("./utlis/db")

const app = expres()
app.use(expres.json())
app.set("view engine", "ejs")

app.use("/api/user", userRouter)
app.get("/", (req, res) => {
    res.render("email", { name: "Dhruv" })
})

app.listen(8080, async () => {
    try {
        await connection
        console.log("server is running on port 8080")
    } catch (error) {
        console.log(error)
    }
})