import cors from "cors";
import "dotenv/config";
import express from "express";
const app = express();

// app.use(morgan("combined"));
// app.use(
//     cors({
//         origin: process.env.ORIGIN || "http://localhost",
//     })
// );

const whiteList = [process.env.ORIGIN, "www.avatar.com"];

app.use(
    cors({
        origin: function (origin, callback) {
            // if (whiteList.includes(origin)) {
            //     callback(null, origin);
            // } else {
            //     callback("Error no cumple con el origin");
            // }
            const findOrigin = whiteList.find((item) => item === origin);
            // console.log(findOrigin);
            if (findOrigin) return callback(null, origin);
            return callback("Error no cumple con el origin");
        },
    })
);

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/info", (req, res) => {
    console.log("Entro a info user");
    const superInfo = "Super información de mi api";
    res.json({ superInfo });
});

app.post("/edit", (req, res) => {
    console.log(req.get("origin"));
    // if (req.get("origin") !== process.env.ORIGIN) return res.end();

    console.log("Entró a editar");
    console.log(req.body);

    // DB solicitud

    res.json({ ok: "información editada" });
});

app.listen(5000, console.log("andando"));
