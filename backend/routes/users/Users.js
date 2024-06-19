const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const connection = require("../../config/databases");
const axios = require("axios");
const sendMail = require("../../utils/sendMail");
const saveErrors = require("../../utils/saveErrors");

router.post("/contact/", async (req, res) => {
    try {
        const formData = req.body;
        const date = new Date();

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        if (
            !formData?.name &&
            !formData?.email &&
            !formData?.telephone &&
            !formData?.message
        ) {
            res.status(500).json({
                message: "Veuillez remplir tous les champs svp,...",
                status: error?.status,
            });
        }
        const query = `INSERT INTO contacts (name, email, telephone, message, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [
            formData?.name,
            formData?.email,
            formData?.telephone,
            formData?.message,
            formattedDate,
            formattedDate,
        ];
        let pseudo = formData.name;
        let email = formData.email;

        const data = await connection.query(query, values);

        const options = {
            objet: "Contact",
            text: `${pseudo}-${email} vient d\'envoyer un email a l\'administration`,
            html: `<i>${pseudo}-${email} vient d\'envoyer un email a l\'administration</i>`,
        };
        sendMail(options, "cntpc1000@gmail.com");

        let m = `${pseudo}-${email} vient d\'envoyer un email a l\'administration`;
        const q = `INSERT INTO notifications(notification, created_at, updated_at) VALUES(?, ?, ?)`;
        await connection.query(q, [m, formattedDate, formattedDate]);

        res.status(200).json({
            message: "Données insérées avec succès",
            status: "success",
            data: data,
        });
    } catch (error) {
        if (error) {
            saveErrors(error.message ?? "-", "Users.js", error.status ?? 0);
            res.status(500).json({
                message: `une erreur s'est produite.`,
                status: error.status,
            });
        }
    }
});

router.get("/contact/", async (req, res) => {
    try {
        const data = await connection.query("SELECT * FROM contacts");
        res.json({
            status: "success",
            data: data[0],
        });
    } catch (error) {
        if (error) {
            saveErrors(error.message ?? "-", "Users.js", error.status ?? 0);
            res.status(401).json({
                error: error.message,
                message: "Erreur",
                status: error?.status ?? 500,
                data: [],
            });
        }
    }
});

// check-validation-payement
router.post("/ckeck-validation-payaments/", async (req, res) => {
    try {
        const { payements } = req.body;
        if (!payements) {
            res.status(401).json({ message: "Lien invalide et/ou expire" });
        }
        jwt.verify(
            payements,
            "userId_1000pharma_payement_0134789545",
            (err, payement) => {
                if (err) {
                    res.status(500).json({
                        message: "Lien invalide et/ou expire",
                    });
                }
                res.status(200).json({
                    data: payement,
                });
            }
        );
    } catch (error) {
        if (error) {
            saveErrors(error.message ?? "-", "Users.js", error.status ?? 0);
            res.status(401).json({
                error: error.message,
                message: "Erreur lors de la recuperation des données",
                status: "failled",
                data: [],
            });
        }
    }
});

// check--payement
router.post("/ckeck-ubpay-payaments/", async (req, res) => {
    try {
        const { medicament, montant, telephone, devise } = req.body;
        if (!medicament && !montant && !telephone && !devise) {
            res.status(401).json({ message: "Une erreur est survenue" });
        }
        const config = {
            merchantId: 89956,
            paymentOptionId: 346,
            customerPhone: telephone,
            currency: devise,
            amount: montant,
            merchantReference: "84370001-3652-4705-befb-ec48d21cbc94",
        };
        const response = await axios.post(
            "https://apps.ub-pay.net/test/merchantController/requestMobilePayment",
            config,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = response.data;

        let m = `payement de ${montant}${devise}  par -${telephone} pour ${medicament}.`;
        const q = `INSERT INTO notifications(notification, created_at, updated_at) VALUES(?, ?, ?)`;
        await connection.query(q, [m, formattedDate, formattedDate]);

        const options = {
            objet: "Reset passwoprd",
            text: `payement de ${montant}${devise}  par -${telephone} pour ${medicament}.`,
            html: `<i>payement de ${montant}${devise}  par -${telephone} pour ${medicament}.</i>`,
        };
        sendMail(options, "cntpc1000@gmail.com");

        res.status(200).json({
            data: data,
        });
    } catch (error) {
        if (error) {
            saveErrors(error.message ?? "-", "Users.js", error.status ?? 0);
            res.status(401).json({
                error: error.message,
                message: "Erreur lors de la recuperation des données",
                data: [],
            });
        }
    }
});

module.exports = router;
