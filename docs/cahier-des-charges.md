# HelpDesk de Ticketing — Cahier des charges

Batch 18&19 · Projet Fil Rouge · Rabah Sellah · MindLink IT
Agent Copilot Studio + App Power Apps, déployés sur Teams

## Objectif

- Un agent Copilot Studio qui répond aux questions IT/RH
- S'il ne sait pas répondre : il crée un ticket SharePoint
- Notification automatique au responsable support
- L'utilisateur suit l'avancée de son ticket via l'agent
- Déploiement sur Teams

## Architecture

- **Power Apps** — Gestion des tickets : Code App (dev local VS Code), liste & suivi, vue demandeur vs gestionnaire. Pas de déploiement prod ce batch.
- **SharePoint** — Source de données : liste Tickets, pas de Dataverse (licence non disponible), backend commun app + agent.
- **Copilot Studio** — Agent IA sur Teams : page blanche + compétences, RAG sur doc FAQ, génératif direct désactivé, accès restreint + RGPD.
- **Power Automate** — création de ticket + notification au responsable support.

## Sécurité de l'agent Copilot Studio

- Page blanche + compétences ajoutées explicitement (rien d'ouvert par défaut)
- Génératif direct désactivé (force le passage par le RAG sur la FAQ)
- Accès restreint à la liste de tickets + profils O365 de l'environnement, groupes de sécurité pour lecture/écriture
- Point RGPD à traiter explicitement en séance (J7) : ce que l'agent conserve, ce qu'il ne doit pas stocker, durée de rétention

## Format de rendu

Un seul rendu final, 2 vidéos séparées, utilisées pour le livret d'évaluation diplôme :

- **Vidéo 1 — Power Apps** : démonstration de l'application + explication de la démarche de construction. Pas de rendu intermédiaire.
- **Vidéo 2 — Power Automate / Agent** : démonstration du parcours complet de l'agent, sécurité et configuration obligatoirement présentées. Objectif : évaluer la compréhension de la démarche, pas seulement le résultat.
