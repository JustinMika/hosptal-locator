const pool = require("../config/databases"),
    formattedDate = require("./DateTime"),
    saveLogs = async (e, t) => {
        try {
            if (e && t) {
                const a = `${e},'${t}','${formattedDate}','${formattedDate}'`;
                pool.query(
                    `INSERT INTO log_users(user_id, logs, created_at, updated_at) VALUES(${a})`
                );
            }
        } catch (e) {
            return "";
        }
    };
module.exports = saveLogs;
