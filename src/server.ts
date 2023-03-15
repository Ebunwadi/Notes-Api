import app from "./app";
import env from "./util/validateEnv";
import connectDB from "./config/dbConn";


connectDB()
const port = env.PORT

app.listen(port, () => console.log(`Server running on port ${port}`))

