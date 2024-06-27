# Hospitals Locator

Hospitals Locator est une application web qui aide les patients à localiser les hôpitaux les plus proches. L'application utilise React avec TypeScript pour le frontend et Node.js pour le backend. Elle affiche les hôpitaux sur une carte et permet de tracer le chemin vers l'hôpital le plus proche en utilisant les coordonnées GPS de l'utilisateur.

## Fonctionnalités

-  Affichage des hôpitaux sur une carte interactive.
-  Géolocalisation de l'utilisateur en utilisant l'API de géolocalisation du navigateur.
-  Calcul de la distance entre l'utilisateur et les hôpitaux.
-  Traçage du chemin vers l'hôpital le plus proche.
-  Notifications pour informer l'utilisateur de la précision de la géolocalisation.

## Prérequis

-  Node.js et npm installés sur votre machine.

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/JustinMika/hosptals-locator.git
   cd hospitals-locator
   ```

2. Installez les dépendances du backend :

   ```bash
   cd backend
   npm install
   ```

3. Installez les dépendances du frontend :
   ```bash
   cd ../frontend
   npm install
   ```

## Configuration

1. Configurez votre base de données MongoDB pour le backend. Vous pouvez utiliser un service MongoDB cloud comme [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) ou installer MongoDB localement.

2. Créez un fichier `.env` dans le répertoire `backend` et ajoutez votre URI MongoDB :
   ```
   MONGO_URI=mongodb://localhost:27017/hospitals
   ```

## Démarrage

1. Démarrez le serveur backend :

   ```bash
   cd backend
   npm start
   ```

2. Démarrez l'application frontend :

   ```bash
   cd ../frontend
   npm start
   ```

3. Ouvrez votre navigateur et accédez à `http://localhost:3000`.

## Utilisation

-  À l'ouverture de l'application, vous serez invité à activer la géolocalisation dans votre navigateur.
-  La carte affichera les hôpitaux enregistrés dans la base de données.
-  La position actuelle de l'utilisateur sera affichée sur la carte avec un marqueur.
-  Si un hôpital est à moins de 5 km, le chemin vers cet hôpital sera tracé sur la carte.
-  Des notifications informeront l'utilisateur de la précision de la géolocalisation.

## Technologies utilisées

-  **Frontend**: React, TypeScript, Leaflet, React-Leaflet, React-Toastify
-  **Backend**: Node.js, Express, Mongoose
-  **Base de données**: MongoDB

## Structure du projet

```
hospitals-locator/
├── backend/
│ ├── models/
│ │ └── Hospital.js
│ ├── routes/
| |------└──hospital/
│ │        └──hospitals.js
│ ├── .env
│ ├── server.js
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── LocationMarker.tsx
│ │ │ ├── RoutingMachine.tsx
│ │ │ └── App.tsx
│ │ ├── App.css
│ │ └── index.tsx
│ ├── public/
│ │ └── index.html
│ ├── .env
│ └── package.json
└── README.md
```

## SQL CODE

```sql
-- Table utilisateurs
CREATE TABLE utilisateurs(
    id INT PRIMARY KEY AUTO_INCREMENT,
    pseudo VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    PASSWORD VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8) NULL,
    longitude DECIMAL(11, 8) NULL,
    userType VARCHAR(50) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Table alertes
CREATE TABLE alertes(
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    message TEXT,
    STATUS VARCHAR(50),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY(userId) REFERENCES utilisateurs(id)
);
-- Table visite_sites
CREATE TABLE visite_sites(
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    visitedAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY(userId) REFERENCES utilisateurs(id)
);
-- Table messageries
CREATE TABLE messageries(
    id INT PRIMARY KEY AUTO_INCREMENT,
    fromUserId INT,
    toUserId INT,
    message TEXT NULL,
    sentAt TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY(fromUserId) REFERENCES utilisateurs(id),
    FOREIGN KEY(toUserId) REFERENCES utilisateurs(id)
);
```

## Contribuer

Les contributions sont les bienvenues ! Veuillez créer une issue pour discuter de ce que vous aimeriez changer.

## License

Ce projet est sous licence <b>GPL-3.0 license</b>. Voir le fichier [GPL-3.0 license](LICENSE) pour plus d'informations.
