//const bcrypt = require('bcrypt')
// const bcrypt = require('bcryptjs')

// Fonction fléchée pour vérifier le mot de passe
export const checkPassword = async (plainPassword, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword)
        return isMatch
    } catch (err) {
        console.error('Erreur lors de la vérification du mot de passe :', err)
        throw err // Vous pouvez gérer l'erreur en fonction de votre application
    }
}

//hashage des mot de passe
export const hashPassword = async plainPassword => {
    try {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(plainPassword, salt)
        return hashedPassword
    } catch (err) {
        console.error('Error hashing the password:', err)
        throw err // You might want to handle the error accordingly in your application
    }
}
