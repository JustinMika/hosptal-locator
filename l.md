``` sql
utilisateurs
-------------
id (PK)
email
password
userType
createdAt
updatedAt

alertes
-------------
id (PK)
userId (FK to utilisateurs.id)
message
status
createdAt
updatedAt

visite_sites
-------------
id (PK)
userId (FK to utilisateurs.id)
visitedAt
createdAt
updatedAt

messageries
-------------
id (PK)
fromUserId (FK to utilisateurs.id)
toUserId (FK to utilisateurs.id)
message
sentAt
createdAt
updatedAt
```
