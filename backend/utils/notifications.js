const pool = require('../config/databases')
const formattedDate = require('./DateTime')

const notification = async message => {
    try {
        if (message) {
            const v = `'${notification}','${formattedDate}','${formattedDate}'`
            await pool.query(
                `INSERT INTO notifications(notification, created_at, updated_at) VALUES(${v})`
            )
        }
    } catch (error) {
        /**empty */
    }
}

module.exports = notification
