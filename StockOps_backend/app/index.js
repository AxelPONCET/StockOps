import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from "./router.js"

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json());
app.use(express.static('public'));

app.use(router)

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port} ✅`);
});