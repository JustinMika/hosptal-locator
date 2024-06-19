const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const util = require("util");
require("dotenv").config();
const useragent = require("useragent");
const path = require("path");
const pool = require("./config/databases");

const app = express();
app.disable("x-powered-by");
app.use(bodyParser.json({ limit: "30mb" }));
app.use(
    bodyParser.urlencoded({
        extended: true,
        limit: "10mb",
        parameterLimit: 50000,
    })
);

const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SESSION_TOKEN,
        resave: false,
        saveUninitialized: false,
    })
);

const uploadsDirectory = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsDirectory));

app.use(express.urlencoded({ extended: true }));

// Spécifier les origines autorisées
const allowedOrigins = [
    "https://1000pharma.com",
    "http://1000pharma.com",
    "https://1000pharma-c4b4b29a153-admin.1000pharma.com",
    "http://1000pharma.com",
    "http://localhost:5173",
    "http://localhost:5174",
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (allowedOrigins.includes(origin) || !origin) {
                callback(null, true);
            } else {
                // callback(new Error('Accès non autorisé par CORS'))
                console.log("Accès non autorisé par CORS");
            }
        },
        allowedHeaders: ["Authorization", "Content-Type"],
        exposedHeaders: ["X-Custom-Header"],
        methods: ["POST", "GET", "OPTIONS", "PUT", "DELETE"],
        credentials: true,
    })
);

// ============ les routes =============================
app.get("/", async (req, res) => {
    // Utiliser useragent pour obtenir le nom du navigateur
    const userAgentString = req.headers["user-agent"];
    let browserName = userAgentString;

    try {
        const userAgent = useragent.lookup(userAgentString);
        browserName = userAgent.family; // Obtenir le nom du navigateur
        res.status(200).json({
            message: "Hello this is API for 1000pharma",
            ip: req.ip,
            browserName:
                browserName === "Other" ? userAgentString : browserName,
            os: userAgent?.os?.family,
            device: userAgent?.device?.family,
        });
    } catch (error) {
        res.statusCode(500);
    }
});

app.post("/saveVisite/", async (req, res) => {
    try {
        const userAgentString = req.headers["user-agent"];
        let browserName = userAgentString;

        try {
            const userAgent = useragent.lookup(userAgentString);
            browserName = userAgent.family;
            browserName =
                browserName === "Other" ? userAgentString : browserName;
            const os = userAgent?.os.family;
            const device = userAgent?.device?.family;

            // recperation de l' IP
            const userIpAddress = req.ip;
            const { pageVisited } = req.body;
            const sql = `INSERT INTO vistors (ip, page_visited, browser_name, os, device) VALUES (?, ?, ?, ?, ?)`;
            const values = [
                userIpAddress,
                pageVisited,
                browserName,
                os,
                device,
            ];
            await pool.query(sql, values);

            return res
                .status(201)
                .json({ message: "Visitor information saved successfully" });
        } catch (error) {
            return res.status(200).json({ message: error.message });
        }
    } catch (error) {
        // error
        return res
            .status(500)
            .json({ error: "Unable to save visitor information" });
    }
});

// Route pour le logout
app.post("/logout", (req, res) => {
    // Détruisez la session et supprimez le cookie
    req.session.destroy((err) => {
        if (err) {
            return res.sendStatus(500);
        }
        res.clearCookie("token");
        res.json({ message: "Logout successful" });
    });
});

app.use("/api/v1/1000pharma/", require("./routes/users/Users"));
app.use("/api/v1/pharmaciens/", require("./routes/pharmaciens/pharmaciens"));
app.use("/api/v1/1000pharma_admin_/", require("./routes/admin/admin"));

module.exports = app;
