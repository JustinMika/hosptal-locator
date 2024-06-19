const express = require('express')
const router = express.Router()
const connection = require('../../config/databases')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const formattedDate = require('../../utils/DateTime')
const saveBase64ImageToFile = require('../../utils/saveBase64ImageToFile')
const saveLogs = require('../../utils/saveLogs')
const notification = require('../../utils/notifications')
const { verifyCsrfToken } = require('../../middleware/verifyCsrfToken')
const saveErrors = require('../../utils/saveErrors')

//hashage des mot de passe
const hashPassword = async plainPassword => {
    try {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(plainPassword, salt)
        return hashedPassword
    } catch (err) { }
}

// middleware
const verifyUser = (req, res, next) => {
    const jeton = req.headers.authorization?.split(' ')[1]
    if (!jeton) {
        return res.status(401).json({ message: 'Token missing' })
    }

    jwt.verify(jeton, process.env.JWT_TOKEN, (err, user) => {
        if (err) {
            return res.status(500).json({
                message: 'Server error'
            })
        }
        req.user = user
        next()
    })
}

// Fonction fléchée pour vérifier le mot de passe
const checkPassword = async (plainPassword, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword)
        return isMatch
    } catch (err) { }
}

// check auth
router.get('/check-login/', verifyUser, verifyCsrfToken, async (req, res) => {
    const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [
        req?.user?.user?.id
    ])
    const user = rows[0]
    res.json({
        data: req.cookies,
        res: user
    })
})

//logout
router.get('/logout/', (req, res) => {
    try {
        req.headers.authorization = null
        req.session.destroy(err => {
            if (err) {
                return res.sendStatus(500)
            }
            res.cookie('userId_1000pharma', '', { httpOnly: true })
            res.cookie = ''
            req.cookies = ''
            req.data = ''
            req.uuid = ''
            req.user = ''
            req.userId_1000pharma = ''
            res.userId_1000pharma = ''
            res.clearCookie('userId_1000pharma')
            res.json({ message: 'Logout successful' })
        })
    } catch (error) {
        res.cookie('userId_1000pharma', '', { httpOnly: true })
        res.cookie = ''
        req.cookies = ''
        req.data = ''
        req.uuid = ''
        req.user = ''
        req.userId_1000pharma = ''
        res.userId_1000pharma = ''
        res.clearCookie('userId_1000pharma')
        // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
        res.json({ message: 'Logout successful' })
        res.json({ message: error?.message })
    }
})

// --------------------------------------------------------------------------------------------------
router.post('/login/', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                message: 'Veuillez remplir tous les champs svp!',
                status: 'failled'
            })
        }

        const [rows] = await connection.query(
            "SELECT *, accesses.id FROM users LEFT JOIN accesses ON users.access_id=accesses.id WHERE email=? AND accesses.id=1 AND accesses.access ='admin'", 
            [email]
        )

        if (rows.length === 0) {
            return res.status(401).json({
                message: 'Votre compte est introuvable'
            })
        }

        const user = rows[0]

        if (!user?.isActive) {
            return res.status(401).json({
                message:
                    "Votre compte est temporairement desactiver; Contacter l'administrateur."
            })
        }

        checkPassword(password, user?.password)
            .then(isMatch => {
                if (isMatch) {
                    const token = jwt.sign(
                        { user: user },
                        process.env.JWT_TOKEN,
                        {
                            expiresIn: '7d'
                        }
                    )

                    res.cookie('token', token, { httpOnly: true })
                    res.cookie = token
                    req.token = token
                    req.user = user

                    const users = {
                        access_id: user.access_id,
                        user: user.id,
                        name: user.name,
                        email: user.email,
                        telephone: user.telephone,
                        uuid: user.uuid,
                        profil: user.profil,
                        lastLogin: user.lastLogin
                    }

                    res.status(200).json({
                        message: 'Authentification réussie.',
                        token: token,
                        uuid: user.uuid,
                        users: users
                    })
                } else {
                    return res.status(401).json({
                        message: 'Email et/ou mot de passe incorrect'
                    })
                }
            })
            .catch(err => {
                return res.status(401).json({
                    message: "Une erreur s'est est survenue : " + err
                })
            })
    } catch (error) {
        console.log(error)
        if (error) {
            saveErrors(
                error.message ?? '-',
                'admin.js',
                error.status ?? 0
            )
            res.status(500).json({
                message: error?.message
            })
        }
        saveErrors(error.message ?? '-', 'admin.js', error.status ?? 0)
        res.status(500).json({
            message: error?.message ?? 'Erreur interne du serveur.'
        })
    }
})

router.get('/log-users/', verifyUser, verifyCsrfToken, async (req, res) => {
    try {
        const selectQuery =
            'SELECT log_users.logs, log_users.id, log_users.created_at, users.name FROM log_users LEFT JOIN users ON log_users.user_id=users.id'
        const [rows] = await connection.query(selectQuery)

        const data = rows
        res.status(200).json({
            message: 'succès.',
            status: 'success',
            data: data
        })
    } catch (error) {
        if (error) {
            // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
            res.status(400).json({
                message: error.message,
                status: error.status
            })
        }
    }
})

// get users
router.get('/get-users/', verifyUser, verifyCsrfToken, async (req, res) => {
    try {
        const selectQuery =
            'SELECT users.id, users.name, users.email, users.telephone, users.uuid, users.profil, users.isActive, users.lastLogin, accesses.access FROM users LEFT JOIN accesses ON users.access_id=accesses.id where accesses.id=1 OR accesses.id=2'
        const [rows] = await connection.query(selectQuery)

        const data = rows
        res.status(200).json({
            message: 'succès.',
            status: 'success',
            data: data
        })
    } catch (error) {
        if (error) {
            // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
            res.status(400).json({
                message: error.message,
                status: error.status
            })
        }
    }
})
// Add users
router.post(
    '/create-account-admin-users/',
    verifyUser,
    verifyCsrfToken,
    async (req, res) => {
        try {
            const { name, email, numero, IsActive } = req.body
            if (!name || !email || !numero || !IsActive) {
                return res.status(400).json({
                    message: 'Veuillez remplir tous les champs🖖'
                })
            }
            let telephone = numero

            const [rows] = await connection.query(
                'SELECT * FROM users WHERE email = ?',
                [email]
            )
            if (rows.length > 0) {
                return res
                    .status(409)
                    .json({ message: `Cet email ${email} est déjà utilisé` })
            }

            const [rows_n] = await connection.query(
                'SELECT * FROM users WHERE telephone = ?',
                [telephone]
            )
            if (rows_n.length > 0) {
                return res
                    .status(401)
                    .json({ message: `${telephone} est déjà utilisé` })
            }

            const hashedPassword =
                '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'

            const uuid = uuidv4()
            await connection.query(
                `INSERT INTO users(access_id, name, email, telephone, uuid, password, isActive, isLogin, created_at, updated_at) VALUES (1,'${name}', '${email}', '${numero}', '${uuid}', '${hashedPassword}', ${IsActive}, false, '${formattedDate}', '${formattedDate}')`
            )
            notification = `creation de l'utilisateur ${name}`
            const v = `'${notification}','${formattedDate}','${formattedDate}'`
            await connection.query(
                `INSERT INTO notifications(notification, created_at, updated_at) VALUES(${v})`
            )
            res.status(201).json({
                message: 'Votre compte est crée avec succès',
                uuid: uuid
            })
        } catch (error) {
            if (error) {
                // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
                res.status(401).json({
                    message: 'Erreur : ' + error?.message
                })
            }
            // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
            res.status(401).json({
                message:
                    "Une erreur est survenue lors de l'enregistrement de l'utilisateur"
            })
        }
    }
)

// activer/desactiver user
router.put(
    '/active-users-pharm/:id_user/',
    verifyUser,
    verifyCsrfToken,
    async (req, res) => {
        try {
            const { id_user } = req.params
            const { state } = req.body
            await connection.query(
                `UPDATE users SET isActive=${state} WHERE id=${id_user}`
            )
            return res.status(200).json({
                message: 'okey'
            })
        } catch (error) {
            // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
            return res.status(401).json({
                message: error.message
            })
        }
    }
)

// Delete user
router.delete(
    '/delete-users-admin/:id_user/',
    verifyUser,
    verifyCsrfToken,
    async (req, res) => {
        try {
            const { id_user } = req.params
            await connection.query(`DELETE FROM users WHERE id=${id_user}`)
            return res.status(200).json({
                message: 'okey, user deleted'
            })
            // notifications('user deleted')
        } catch (error) {
            // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
            return res.status(401).json({
                message: 'Erreur'
            })
        }
    }
)

router.get('/notifications/', verifyUser, verifyCsrfToken, async (req, res) => {
    try {
        const selectQuery = 'SELECT * FROM notifications'
        const [rows] = await connection.query(selectQuery)

        const data = rows
        res.status(200).json({
            message: 'succès.',
            status: 'success',
            data: data
        })
    } catch (error) {
        if (error) {
            // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
            res.status(400).json({
                message: error.message,
                status: error.status
            })
        }
    }
})

router.get(
    '/get-errors-server/',
    verifyUser,
    verifyCsrfToken,
    async (req, res) => {
        try {
            const selectQuery = 'SELECT * FROM save_errors ORDER BY id DESC'
            const [rows] = await connection.query(selectQuery)

            const data = rows
            res.status(200).json({
                message: 'succès.',
                status: 'success',
                data: data
            })
        } catch (error) {
            if (error) {
                // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
                res.status(400).json({
                    message: error.message,
                    status: error.status
                })
            }
        }
    }
)

//update-user-infos
router.put(
    '/update-user-infos/',
    verifyUser,
    verifyCsrfToken,
    async (req, res) => {
        try {
            const { name, email, numero, user_id } = req.body
            if (!name && !email && !numero && !user_id) {
                return res.status(400).json({
                    message: 'Veuillez remplir tous les champs requis',
                    status: 'error'
                })
            }
            const query = `UPDATE users SET name='${name}', email='${email}', telephone='${numero}' WHERE id=${user_id}`
            await connection.query(query)

            const [rows] = await connection.query(
                `SELECT * FROM users WHERE id=${user_id}`
            )

            const user = rows[0]
            const users = {
                access_id: user.access_id,
                user: user.id,
                name: user.name,
                email: user.email,
                telephone: user.telephone,
                uuid: user.uuid,
                profil: user.profil,
                lastLogin: user.lastLogin
            }

            res.status(201).json({
                message: 'User updated successfully',
                userId_1000pharma: users
            })
        } catch (error) {
            if (error) {
                // // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
                res.status(401).json({
                    message: error?.message
                })
            }
        }
    }
)

//update-user-infos-password
router.put(
    '/update-user-infos-password/',
    verifyUser,
    verifyCsrfToken,
    async (req, res) => {
        try {
            const { pwd, pwd2, user_id } = req.body
            if (!pwd && !pwd2 && !user_id) {
                return res.status(400).json({
                    message: 'Veuillez remplir tous les champs requis',
                    status: 'error'
                })
            }
            if (pwd == pwd2) {
                hashPassword(pwd)
                    .then(async hash => {
                        const query = `UPDATE users SET password=? WHERE id=?`
                        await connection.query(query, [hash, user_id])

                        res.status(201).json({
                            message: 'Votre mot de passe changeé avec succès'
                        })
                    })
                    .catch(err => {
                        res.status(401).json({
                            message: 'Une erreur est survenue.',
                            errors: err?.message
                        })
                    })
            } else {
                res.status(201).json({
                    message: 'le s deux mot de passent ne correspodent pas.',
                    uuid: uuid
                })
            }
        } catch (error) {
            if (error) {
                res.status(401).json({
                    message: error?.message
                })
            }
            res.status(401).json({
                message: error?.message
            })
        }
    }
)

//update-user-profil
router.post(
    '/update-user-profil/',
    verifyUser,
    verifyCsrfToken,
    async (req, res) => {
        try {
            const { files, user_id } = req.body
            if (!files && !user_id) {
                return res.status(400).json({
                    message: 'Veuillez remplir tous les champs requis',
                    status: 'error'
                })
            }
            const uuid = uuidv4()

            const base64String = files
            const filePath = `./uploads/${uuid}.jpg`

            const query = `UPDATE users SET profil ='${filePath}' WHERE id=${user_id}`
            await connection.query(query)

            const [rows] = await connection.query(
                `SELECT * FROM users WHERE id=${user_id}`
            )
            if (rows.length === 0) {
                return res.status(401).json({
                    message: 'Votre compte est introuvable',
                    status: 'failled'
                })
            }

            const user = rows[0]
            const users = {
                access_id: user.access_id,
                user: user.id,
                name: user.name,
                email: user.email,
                telephone: user.telephone,
                uuid: user.uuid,
                profil: user.profil,
                lastLogin: user.lastLogin
            }

            notification = 'update informations profile'
            const v = `'${notification}','${formattedDate}','${formattedDate}'`
            await connection.query(
                `INSERT INTO notifications(notification, created_at, updated_at) VALUES(${v})`
            )
            saveBase64ImageToFile(base64String, filePath)

            res.status(201).json({
                message: 'User updated successfully',
                userId_1000pharma: users
            })
        } catch (error) {
            if (error) {
                // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
                res.status(401).json({
                    message:
                        "Une erreur est survenue lors de l'enregistrement de l'utilisateur : " +
                        error,
                    status: error.status
                })
            }
            res.status(401).json({
                message: error?.message
            })
        }
    }
)

// stock-medicaments
router.get(
    '/stock-medicaments/',
    verifyUser,
    verifyCsrfToken,
    async (req, res) => {
        try {
            const [rows] = await connection.query(
                `SELECT users.name, users.telephone, users.email, stock_medocs.medicament, stock_medocs.price, stock_medocs.devise, stock_medocs.quantite, stock_medocs.id FROM users RIGHT JOIN stock_medocs ON users.id = stock_medocs.user_id`
            )

            const data = rows

            res.status(201).json({
                message: 'User updated successfully',
                data: data
            })
        } catch (error) {
            if (error) {
                // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
                res.status(401).json({
                    message: 'Une erreur est survenue : ' + error,
                    status: error.status
                })
            }
        }
    }
)

// pharmacienns
router.get(
    '/get-pharmaciens/',
    verifyUser,
    verifyCsrfToken,
    async (req, res) => {
        try {
            const [rows] = await connection.query(
                `SELECT users.id, users.name, users.telephone, users.isActive, users.email, accesses.access FROM users LEFT JOIN accesses ON accesses.id = users.access_id WHERE accesses.access ='user'`
            )

            const data = rows

            res.status(201).json({
                message: 'User updated successfully',
                data: data
            })
        } catch (error) {
            if (error) {
                // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
                res.status(401).json({
                    message: 'Une erreur est survenue : ' + error,
                    status: error.status
                })
            }
        }
    }
)

router.get(
    '/avec-ordonance/',
    verifyUser,
    verifyCsrfToken,
    async (req, res) => {
        try {
            const [rows] = await connection.query(
                `SELECT ordonances.id, ordonances.file_ordonance, ordonances.isLivraisonAtHome, clients.name, clients.phone, ordonances.adresse, ordonances.created_at FROM ordonances LEFT JOIN clients ON clients.id = ordonances.client_id WHERE ordonances.isLivraisonAtHome = 1`
            )

            const data = rows

            res.status(200).json({
                message: 'User updated successfully',
                data: data
            })
        } catch (error) {
            if (error) {
                // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
                res.status(401).json({
                    message: 'Une erreur est survenue : ' + error,
                    status: error.status
                })
            }
        }
    }
)

router.get(
    '/avec-ordonance-sans-livraison/',
    verifyUser,
    verifyCsrfToken,
    async (req, res) => {
        try {
            const [rows] = await connection.query(
                `SELECT ordonances.id, ordonances.file_ordonance, ordonances.isLivraisonAtHome, clients.name, clients.phone, ordonances.adresse, ordonances.created_at FROM ordonances LEFT JOIN clients ON clients.id = ordonances.client_id WHERE ordonances.isLivraisonAtHome = false`
            )
            const data = rows
            res.status(200).json({
                message: 'User updated successfully',
                data: data
            })
        } catch (error) {
            if (error) {
                // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
                res.status(401).json({
                    message: 'Une erreur est survenue : ' + error,
                    status: error.status
                })
            }
        }
    }
)

// sans ordonance avec livraison
router.get(
    '/sans-ordonance/:livrable',
    verifyUser,
    verifyCsrfToken,
    async (req, res) => {
        try {
            const { livrable } = req.params
            const [rows] = await connection.query(
                `SELECT symptomes_clients.id, symptomes_clients.symptome, symptomes_clients.sex, symptomes_clients.age, symptomes_clients.isPregnant, symptomes_clients.weight, clients.name, clients.phone, clients.adresse, symptomes_clients.created_at FROM symptomes_clients LEFT JOIN clients ON clients.id = symptomes_clients.client_id WHERE Livrable=${livrable ?? 0
                }`
            )

            const data = rows

            res.status(200).json({
                message: 'User updated successfully',
                data: data
            })
        } catch (error) {
            // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
            if (error) {
                res.status(401).json({
                    message: 'Une erreur est survenue : ' + error,
                    status: error.status
                })
            }
        }
    }
)

// liste-des-clients
router.get(
    '/liste-des-clients/',
    verifyUser,
    verifyCsrfToken,
    async (req, res) => {
        try {
            const [rows] = await connection.query(`SELECT * FROM clients`)

            const data = rows

            res.status(200).json({
                message: 'User updated successfully',
                data: data
            })
        } catch (error) {
            if (error) {
                // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
                res.status(401).json({
                    message: 'Une erreur est survenue : ' + error,
                    status: error.status
                })
            }
        }
    }
)

// Elaborer transaction
router.post(
    '/generate-transaction/',
    verifyUser,
    verifyCsrfToken,
    async (req, res) => {
        try {
            const { devise, medicament, montant, telephone } = req.body
            if (devise && medicament && montant && telephone) {
                const payement = {
                    devise: devise,
                    medicament: medicament,
                    montant: montant,
                    phone: telephone
                }
                const data = jwt.sign(
                    { payement: payement },
                    'userId_1000pharma_payement_0134789545',
                    {
                        expiresIn: '7d'
                    }
                )

                res.status(200).json({
                    message: 'User updated successfully',
                    data: data
                })
            } else {
                res.status(400).json({
                    message: 'Veuillez remplir tous les champs'
                })
            }
        } catch (error) {
            if (error) {
                // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
                res.status(401).json({
                    message: 'Une erreur est survenue : ' + error,
                    status: error.status
                })
            }
        }
    }
)

// /saveVisite/
router.get(
    '/get-all-visite-site/',
    verifyUser,
    verifyCsrfToken,
    async (req, res) => {
        try {
            const [rows] = await connection.query(`SELECT * FROM vistors`)

            const data = rows

            res.status(200).json({
                message: 'User updated successfully',
                data: data
            })
        } catch (error) {
            if (error) {
                // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
                res.status(401).json({
                    message: 'Une erreur est survenue : ' + error,
                    status: error.status
                })
            }
        }
    }
)

// stat visistes pa jrs
router.get(
    '/get-visistes-jours/',
    verifyUser,
    verifyCsrfToken,
    async (req, res) => {
        try {
            const selectQuery =
                'SELECT DAYNAME(visit_time) AS jour, COUNT(*) AS visites FROM vistors GROUP BY DAYNAME(visit_time) ORDER BY DAYOFWEEK(visit_time)'
            const [rows] = await connection.query(selectQuery)
            const data = rows

            res.status(200).json({
                message: 'succès.',
                status: 'success',
                data: data
            })
        } catch (error) {
            if (error) {
                // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
                res.status(400).json({
                    message: error.message,
                    status: error.status
                })
            }
        }
    }
)

// stat visistes par moi
router.get(
    '/get-visistes-mois/',
    verifyUser,
    verifyCsrfToken,
    async (req, res) => {
        try {
            const selectQuery =
                'SELECT MONTHNAME(visit_time) AS name, COUNT(*) AS visites FROM vistors GROUP BY MONTHNAME(visit_time) ORDER BY MONTH(visit_time)'
            const [rows] = await connection.query(selectQuery)
            const data = rows

            res.status(200).json({
                message: 'succès.',
                data: data
            })
        } catch (error) {
            if (error) {
                // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
                res.status(400).json({
                    message: error.message,
                    status: error.status
                })
            }
        }
    }
)

// stat visistes par moi-pages
router.get(
    '/get-visistes-mois-pages/',
    verifyUser,
    verifyCsrfToken,
    async (req, res) => {
        try {
            const selectQuery =
                'SELECT page_visited as name, COUNT(*) AS visites FROM vistors GROUP BY page_visited ORDER BY DAYOFWEEK(visit_time), page_visited'
            const [rows] = await connection.query(selectQuery)
            const data = rows

            res.status(200).json({
                message: 'succès.',
                data: data
            })
        } catch (error) {
            if (error) {
                // saveErrors(error.message ?? '-', 'Admin.js', error.status ?? 0)
                res.status(400).json({
                    message: error.message,
                    status: error.status
                })
            }
        }
    }
)

module.exports = router
