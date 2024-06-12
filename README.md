# BEL
 - Site web du club de lecture Brasil Em Livros. Projet réalisé pour l'obtention du titre RNCP 37273 Niveau 5 - Développeur Web Full Stack.
 - Création d'une application CRUD (Create, Read, Update, Delete) en HTML5, SCSS, JS, NODE JS et SQL. 
 - Cahier des charges: https://drive.google.com/file/d/1mQfa_3K4IIVgdwQlUFUT2QyMklnRhnWu/view?usp=sharing
 - La documentation du code se trouve dans le commentaires et dans ce fichier README.
 
## Conseils d'utilisation :
1. Les informations concernant l'Administrateur du site et la base de données sont protégées.

2. Le site a 1 administrateur, les utilisateurs enregistrés et les utilisateurs non enregistrés. Chaque type compte avec des différentes fonctionnalités :

    - Administrateur - connexion, déconnexion, menu de navigation profil admin, ajouter un nouveau livre, modifier un livre et supprimer un livre.

    - Utilisateur enregistré - connexion, déconnexion, menu de navigation profil utilisateur enregistré, profil personnel avec ses informations personnelles et sa bibliotèque de favoris, écrire un commentaire à propos d'un livre, liker un livre, envoyer un message de contact en utilisant un formulaire pré-rempli,

    - Utilisateur non enregistré (profil public) - visualisation des livres, de ses détails et des commentaires sans interaction, inscription, formulaire de contact.

## DOCUMENTATION

### Technologies et dependences :
 - Node.Js (version 18.17.0), SCSS (1.69.5 compilé avec dart2js 3.1.5)
 - Dependences : bcrypt (version 5.1.1), dotenv(version 16.3.1),  ejs(version 3.1.9), express(version 4.18.2),  multer(version 1.4.5-lts.1), mysql(version 2.18.1), nodemon(version 3.0.1 ), npm-run-all(version 4.1.5), parseurl(version 1.3.3), path(version 0.12.7), session(version 0.1.0),

### ARCHITECTURE 

- MVC (Modèle-vue-contrôleur).

1. Modèle : responsable de la logique des données de l'application. Il gère la communication avec la base de données (SQL), la manipulation des données et les règles métier.
 
    - Technologies : Node.js et SQL.

    - Implémentation :
                    
        * Base de données SQL : Stocke les données de l'application.

        * Node.js (Modèle) : Utilise des bibliothèques et des modules tels que `express`, `express-session`, `dotenv`, et `parseurl` pour gérer la structure des données et les opérations sur ces données. Les opérations sur la base de données peuvent être réalisées à l'aide de requêtes SQL directes.

2. Vue : responsable de l'interface utilisateur et de la présentation des données. Elle rend le contenu que l'utilisateur final verra.

    - Technologies : HTML, SCSS et EJS.

    - Implémentation :

        * HTML et EJS : Structure la page web et permet de générer du contenu dynamique. EJS (Embedded JavaScript) permet d'incorporer du JavaScript dans des fichiers HTML pour rendre le contenu dynamique basé sur les données du modèle.

        * SCSS : permet d'écrire des styles plus modulaires, réutilisables et faciles à maintenir. 

3. Contrôleur : traite les requêtes des utilisateurs, invoque les méthodes appropriées du Modèle et sélectionne les Vues à rendre.

    - Technologies : Node.js.

    - Implémentation :

        * Node.js (Express) : Gère les routes et les contrôleurs. Contient une partie de la logique de l'application, mais son rôle principal est de traiter les requêtes entrantes, d'appliquer la logique nécessaire en utilisant le modèle, et de déterminer quelle vue doit être rendue.


### BASE DE DONNÉES - MODELE

#### Introduction :
 - La base de données conçue pour cette application contient les informations techniques concernant les livres, les informations concernant les utilisateurs enregistrés (identifiants, commentaires et likes) et les informations reçues par le formulaire de contact.

#### Structure de la base de données :
##### Modèles de données : 
 - Voir le cahier des charges : https://drive.google.com/file/d/1mQfa_3K4IIVgdwQlUFUT2QyMklnRhnWu/view?usp=sharing (p.27 - p.31)

### VUE
 - Introduction :
    * Utilisent EJS pour créer des pages HTML dynamiques en fonction des données fournies par les contrôleurs.

 - Structure des Vues :
    * Les vues sont organisées en fichiers EJS, qui sont stockés dans le répertoire `views` du projet. Chaque fichier EJS correspond à une page ou à un composant de l'interface utilisateur.
    
- Liste des Vues :
1. about.ejs : Présente des informations sur le club de lecture “Brasil em Livros”.
    - Détails du Code :
        * Div "a-propos" : affiche la bannière de la page.
        * Header / Footer : templates communs pour toutes les pages de l'application.
        * Section "container about-container" : contient des informations textuelles sur le club de lecture.
        * Section "container" : fournit une vidéo sur la littérature brésilienne, intégrée via une iframe YouTube.

2. add_book.ejs : Permet à l'administrateur de saisir des informations pour enregistrer un nouveau livre dans la base de données. Elle offre un formulaire détaillé pour capturer toutes les informations nécessaires sur le livre, y compris le titre, l'année de parution, la description, l'ISBN, l'image de couverture, le texte alternatif, la date de lecture au club, la catégorie du livre, l'éditeur et les informations sur l'auteur.
    - Détails du Code :
        * Div "admin" : affiche la bannière de la page.
        * Header / Footer : templates communs pour toutes les pages de l'application.
        * Article "container admin_page" : contient le formulaire pour enregistrer un livre dans la base de données.
        * <form method="post" class="book_form" enctype="multipart/form-data">: Un formulaire HTML utilisant la méthode POST pour soumettre les données du livre, avec enctype="multipart/form-data" pour permettre la gestion de l'upload des fichiers, notamment les images de couverture des livres.
        * Chaque champ de saisie est accompagné d'un label descriptif et d'un message d'erreur conditionnel.
        * Script "formulaire.js" : situé dans le dossier `public/javascript`. Masque les messages d'erreur lors d'un click sur les inputs.
    
3. admin.ejs : Présente la page de l'administrateur avec les liens permettant d'accéder à ses fonctionnalités.
    - Détails du Code :
        * Div "admin" : affiche la bannière de la page.
        * Header / Footer : templates communs pour toutes les pages de l'application.
        * Section "container admin_page" : Présente le menu de fonctionalités de l'administrateur.  

4. connexion.ejs : Présente la page de connexion.
- Détails du Code :
    * Div "connexion" : affiche la bannière de la page.
    * Header / Footer : templates communs pour toutes les pages de l'application.
    * Article "container connect" : Contient le formulaire de connexion des utilisateurs et de l'administrateur.
    * <form method="post" class="form_connexion">: Un formulaire HTML utilisant la méthode POST pour soumettre les données de connexion.
    * <fieldset> et <legend>: Groupement des éléments de formulaire avec une légende pour améliorer l'accessibilité et l'organisation visuelle.
    * Script "formulaire.js" : situé dans le dossier `public/javascript`. Masque les messages d'erreur lors d'un click sur les inputs.  

5. contact.ejs :

6. details_readings.ejs :
7. edit_book.ejs :
8. footer.ejs :
9. header.ejs :
10. home.ejs :
11. inscription.ejs :
12. readings_classics.ejs :
13. readings_contemporarys.ejs :
14. readings.ejs :
15. user.ejs :

        