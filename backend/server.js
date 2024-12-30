import express from "express";
import cors from "cors";
import router from "./routes/user.js";

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", router)

app.listen(PORT, () => {
    console.log(`App running at port ${PORT}`);
});