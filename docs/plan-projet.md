# Plan projet — suivi d'avancement

Légende : ⬜ à faire · 🔶 en cours · ✅ fait

## Phase 0 — Cadrage
- ✅ Structure du dépôt (`/app`, `/sharepoint`, `/flows`, `/copilot-studio`, `/docs`)
- ✅ Schéma de la liste SharePoint Tickets documenté (`sharepoint/schema-tickets.md`)
- ✅ Hook de démarrage : installation auto .NET 10 + Power Platform CLI (`.claude/hooks/session-start.sh`)
- 🔶 Authentification `pac` vers l'environnement Power Platform dev
  - ✅ Login Entra ID (`maxime.gadenne@Alegria.academy`)
  - ⬜ Bloqué : politique réseau de l'environnement cloud n'autorise pas `*.dynamics.com` / `*.powerplatform.com` → à corriger côté claude.ai/code (Custom network access)

## Phase 1 — Power Apps & Power Automate
- ⬜ J1 Environnement & Init : `pac auth create`, `pac solution init`, scaffold Code App (lien React/PowerApps)
- ⬜ J2 Dev & Structuration : connexion source de données SharePoint, composants, bonnes pratiques, débogage console
- ⬜ J3 Power Automate & Sécurité : flow appelé depuis la CodeApp, sécurité à la ligne SharePoint vs Dataverse
- ⬜ J4 Déploiement : push de l'app, environnements dev → test (pas de prod ce batch), migration des objets

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
