const connection = require('../config/databases')
const formattedDate = require('./DateTime')

const saveErrors = async (erreurs, scripts, status) => {
    try {
        const v = `'${erreurs}', '${scripts}', '${status}', '${formattedDate}','${formattedDate}'`
        await connection.query(
            `INSERT INTO save_errors(erreurs, scripts, status, created_at, updated_at) VALUES(${v})`
        )
    } catch (error) {
        /**empty */
    }
}

module.exports = saveErrors
