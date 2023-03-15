import 'express-async-errors';
import "dotenv/config";
import express from "express"
import cors from 'cors'
import { errorHandler, notFound } from './middleware/errorHandler';
import noteRoutes from "./routes/noteRoutes";
import userRoutes from "./routes/userRoutes";
import session from 'express-session'
import env from './util/validateEnv';
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth";

const app = express();
app.disable('x-powered-by')
app.use(cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: true,
        maxAge: 24 * 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.DATABASE_URI
    }),
}));

app.use("/api/notes", requiresAuth, noteRoutes)
app.use("/api/users", userRoutes)

app.use(notFound)
app.use(errorHandler)

export default app