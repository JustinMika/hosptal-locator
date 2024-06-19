// backend/syncDatabase.js
const sequelize = require('./config/databases');
const Utilisateur = require('./models/Utilisateur');
// const Alerte = require('./models/Alerte');
// const VisiteSite = require('./models/VisiteSite');
// const Messagerie = require('./models/Messagerie');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true });  // Utilisez force: true pour recréer les tables à chaque exécution
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
};

syncDatabase();
