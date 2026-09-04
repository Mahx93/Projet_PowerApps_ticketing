# Plan projet — suivi d'avancement

Légende : ⬜ à faire · 🔶 en cours · ✅ fait

## Phase 0 — Cadrage
- ✅ Structure du dépôt (`/app`, `/sharepoint`, `/flows`, `/copilot-studio`, `/docs`)
- ✅ Schéma de la liste SharePoint Tickets documenté (`sharepoint/schema-tickets.md`)
- ✅ Hook de démarrage : installation auto .NET 10 + Power Platform CLI (`.claude/hooks/session-start.sh`)
- ✅ Authentification `pac` vers l'environnement Power Platform dev (login Entra ID + réseau débloqué via Custom network access)
- ✅ Site SharePoint + liste Tickets_ProjetFinal créés (https://alegriaacademy23.sharepoint.com/sites/HelpDeskBatch18Maxime)

## Phase 1 — Power Apps & Power Automate
- ✅ J1 Environnement & Init : `pac auth create` (device code, PC perso), env sélectionné "DevZone Batch - 18&19", `pac code init` scaffold Vite/React/TS + `npm install`
- 🔶 J2 Dev & Structuration
  - ✅ Connexion source de données SharePoint (`pac code add-data-source`, liste Tickets_ProjetFinal reliée via son ID interne)
  - ✅ Composants (liste & suivi des tickets, vue demandeur vs gestionnaire, création/édition) — build + lint validés
  - ✅ Test en conditions réelles validé (`pac code run` + `npm run dev` sur port 3000, via l'URL "play" Power Apps, données SharePoint live)
- ⬜ J3 Power Automate & Sécurité : flow appelé depuis la CodeApp, sécurité à la ligne SharePoint vs Dataverse
- ⬜ J4 Déploiement : push de l'app, environnements dev → test (pas de prod ce batch), migration des objets

## Notes techniques importantes
- **`pac code` (Code Apps) ne fonctionne pas depuis l'environnement cloud Claude** : l'API `environment.api.powerplatform.com` semble bloquer les IP de datacenter. Toutes les commandes `pac code` (init, add-data-source, run, push) doivent s'exécuter sur le PC perso de Maxime (via VS Code + extension Power Platform Tools). Le reste (auth, env, solution, docs, code applicatif) se fait depuis l'interface Claude.
- **Microsoft Lists ≠ SharePoint site** : une liste créée depuis lists.microsoft.com sans choisir explicitement le site cible reste orpheline (n'apparaît pas dans le site ni dans les connecteurs). Toujours créer les listes depuis "Contenu du site" du site SharePoint cible.
- **`pac code add-data-source --table`** attend l'ID interne de la liste (GUID, obtenu via `pac code list-tables`), pas son nom affiché.

## Phase 2 — Copilot Studio
- ⬜ J5 Création de l'agent : page blanche + compétences (FAQ en RAG), génératif direct désactivé
- ⬜ J6 Actions & Power Automate : création de ticket + consultation de statut via flow, notification responsable support
- ⬜ J7 Sécurité, RGPD & Démo : groupes de sécurité, accès restreint, point RGPD, intégration Teams

## Phase 3 — Rendu
- ⬜ Vidéo 1 — Power Apps (démo + démarche)
- ⬜ Vidéo 2 — Power Automate / Agent (parcours complet + sécurité)

## Décisions prises
- Auth pac via device code, travail CLI fait depuis cette interface (session Claude Code web)
- FAQ RAG : à créer ensemble le moment venu, ou à ajuster selon consignes ultérieures
- Code App : démarrage from scratch avec le starter `pac code init`
