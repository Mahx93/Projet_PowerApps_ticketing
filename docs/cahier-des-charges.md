# HelpDesk Ticketing — Cahier des charges

> Version actuelle (Alegria.academy — Spécialisation Power Platform, projet fil rouge).
> Remplace la version précédente (Batch 18&19 / MindLink IT), conservée dans l'historique git.

## Contexte

Client fictif **Nova Solutions** : 180 collaborateurs, 3 sites, équipés Microsoft 365. 3 agents support. Aucun outil dédié aujourd'hui : les demandes arrivent par mail, Teams et par téléphone.

**Problèmes constatés** :
- Aucune trace : impossible de savoir ce qui a été traité, par qui et quand
- Pas de priorité : une panne bloquante arrive au même endroit qu'un oubli de mot de passe
- Pas de suivi : le demandeur relance parce qu'il ignore où en est sa demande
- Pas de mesure : aucun indicateur sur les volumes ni sur les délais

**Objectifs du projet** :
- **Centraliser** : toutes les demandes dans un référentiel unique
- **Tracer** : le cycle de vie du ticket, de la création à la clôture
- **Automatiser** : les notifications vers le demandeur et vers le support
- **Converser** : créer et suivre un ticket directement depuis Teams

## Utilisateurs

1. **Le collaborateur** — déclare un incident, suit ses propres demandes et consulte la FAQ. Interagit via l'**agent Copilot Studio dans Teams** (pas la Code App).
2. **L'agent support** — voit la file complète, traite et clôture les tickets. Interagit via la **Power Apps Code App**.
3. **Le responsable** — suit les volumes, les délais et la charge de son équipe (reporting).

## Périmètre fonctionnel

### Le portail collaborateur — Agent Copilot Studio, dans Teams
- **Demander** : poser sa question en langage naturel
- **Obtenir une réponse** : l'agent cherche dans la FAQ SharePoint et répond directement s'il trouve la procédure
- **Déclarer** : si aucune réponse n'existe, l'agent bascule sur la création de ticket et collecte titre, description, catégorie, priorité
- **Suivre** : consulter le statut de ses propres tickets, et eux seulement, avec l'ID reçu à la création

### L'espace agent support — Power Apps Code App, côté traitement
- **Visualiser** : la file complète des tickets ouverts
- **Trier** : par priorité, par statut ou par agent assigné
- **Prendre en charge** : saisir un ticket et le réaffecter si besoin
- **Clôturer** : avec un commentaire de résolution obligatoire

### Les automatisations — Power Automate, en arrière-plan
- **Accuser réception** : auprès du demandeur, dès la création du ticket
- **Alerter** : l'équipe sur tout ticket critique ou de priorité haute
- **Notifier** : à chaque changement de statut
- **Relancer** : si un ticket critique n'est pas pris en charge dans les délais

### L'agent conversationnel — Copilot Studio, publié dans Teams
- **Répondre** : aux questions courantes, à partir de la FAQ
- **Créer** : un ticket directement depuis la conversation
- **Consulter** : le statut d'un ticket à partir de son identifiant
- **Rediriger** : vers un humain dès qu'il sort de son champ (Créer un ticket)

## Hors périmètre
- Pas de connexion externe : aucune interconnexion avec un outil ITSM du marché
- Pas de mobile natif : l'application web suffit, sur ordinateur comme sur mobile
- Pas de parc matériel : la gestion des équipements et le multilingue sont exclus

## Contraintes techniques
- **Stack** : Code App en React, Vite et TypeScript. SharePoint Online comme source de données.
- **Structure** : `components/` pour les éléments réutilisables, `pages/` pour les écrans, `services/` pour les données.
- **Règle** : aucun secret ni identifiant de connexion en dur dans le code.

## Modèle de données

**Cycle de vie du ticket** : Nouveau → En cours → (En attente demandeur) → Résolu → Clôturé

**La liste Tickets** :
- La saisie : Titre, description, catégorie, priorité et demandeur
- Le suivi : Statut, agent assigné, canal d'origine et dates de traitement
- La clôture : un commentaire de résolution, obligatoire pour fermer un ticket

**Les quatre priorités** :
- **Critique** : activité bloquée, prise en charge sous l'heure, résolution sous quatre heures
- **Haute** : forte gêne, prise en charge sous quatre heures, résolution sous un jour ouvré
- **Normale et Basse** : contournement possible ou demande de confort, de trois à dix jours ouvrés

## Livrables et évaluation

**Ce que tu rends** :
- La solution Power Apps : ton application, tes flows et ton agent, réunis dans une solution
- Une vidéo de 5 minutes : tu présentes ta solution et tu la démontres en fonctionnement
- Rien de plus : pas de dossier écrit, pas de soutenance

**Grille d'évaluation** :
- **Fonctionnalité — 40 %** : le parcours fonctionne de bout en bout, les cas d'erreur sont gérés
- **Propreté du code — 30 %** : structure respectée, code lisible, aucun secret en dur, nommage cohérent
- **Expérience utilisateur — 20 %** : navigation claire, retours visuels, formulaires compréhensibles
- **La vidéo — 10 %** : présentation du besoin, des choix techniques et de la démonstration

**Déroulé sur 8 séances** :
- Séances 1 à 3 : environnement et solution, automatisations, première Code App connectée
- Séances 4 et 5 : structure du code et écrans, puis actions avancées et connexion à l'app
- Séances 6 et 7 : sécurité et rôles, puis création de l'agent Copilot Studio
- Séance 8 : déploiement de la solution **en production**
