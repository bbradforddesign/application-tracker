import app from "./app";
import dotenv from "dotenv";
dotenv.config();

// api entrypoint
app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});
