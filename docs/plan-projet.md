# Plan projet — suivi d'avancement

Légende : ⬜ à faire · 🔶 en cours · ✅ fait

## ⚠️ Cahier des charges révisé (25/09)

Le cahier des charges a été remplacé par une version sensiblement différente
(voir `docs/cahier-des-charges.md`) : client renommé Nova Solutions, rôle
"Responsable" avec reporting, nouveau statut "En attente demandeur",
automatisations différentes (accusé de réception au demandeur, alerte
conditionnelle, relance SLA), structure de code imposée
(`components/pages/services`), et déploiement **en production** requis
(contrairement à l'ancienne version qui l'excluait). Le travail J1-J4
ci-dessous (Phase 1 — historique) reste globalement valide mais est en cours
de mise en conformité, suivie ici :

### Écarts à corriger — dans cet ordre
1. ✅ **Réorg du code** en `components/pages/services`, Code App recentrée sur
   le périmètre "espace agent support" uniquement (le suivi demandeur passe
   par l'agent Copilot Studio, pas par la Code App)
2. ⬜ **Statuts et champs manquants** : ajouter le statut "En attente
   demandeur" (Nouveau → En cours → En attente demandeur → Résolu → Clôturé),
   les champs "canal d'origine" et "agent assigné" (formaliser), rendre le
   commentaire de résolution obligatoire à la clôture
3. ⬜ **Automatisations manquantes** : accuser réception au demandeur (pas
   seulement notifier le support), alerter l'équipe seulement si
   critique/haute (pas systématique), notifier à chaque changement de statut,
   relancer si un ticket critique dépasse son délai (SLA)
4. ⬜ **Tri de la file agent** (priorité/statut/agent assigné) + nouvelle page
   Dashboard pour le rôle Responsable (volumes, délais, charge d'équipe)
5. ⬜ **Déploiement en production** (à re-vérifier : droits sur un
   environnement supplémentaire, cf. note J4 ci-dessous)

## Phase 1 — Power Apps & Power Automate (historique, batch 18&19)
- ✅ J1 Environnement & Init : `pac auth create` (device code, PC perso), env sélectionné "DevZone Batch - 18&19", `pac code init` scaffold Vite/React/TS + `npm install`
- ✅ J2 Dev & Structuration
  - ✅ Connexion source de données SharePoint (`pac code add-data-source`, liste Tickets_ProjetFinal reliée via son ID interne)
  - ✅ Composants (liste & suivi des tickets, création/édition) — build + lint validés
  - ✅ Test en conditions réelles validé (`pac code run` + `npm run dev` sur port 3000, via l'URL "play" Power Apps, données SharePoint live)
- ✅ J3 Power Automate & Sécurité
  - ✅ Flow "Notifier création ticket" : déclencheur SharePoint "Lorsqu'un élément est créé" (Tickets_ProjetFinal) → Office 365 Outlook "Envoyer un e-mail (V2)" — testé de bout en bout (création ticket → email reçu). À revoir : ce flow notifie le support sur toute création ; le nouveau cahier veut un accusé de réception au **demandeur** + une alerte **conditionnelle** au support (cf. écart 3 ci-dessus).
  - ✅ Sécurité à la ligne : rupture d'héritage + octroi d'accès nominatif (demandeur + support) sur chaque nouvel item, dans le même flow — testé, toutes les étapes en succès
- 🔶 J4 Déploiement
  - ✅ `pac code push --solutionName Maxime_G` — app "HelpDesk Ticketing" visible dans la solution, rattachée pour de bon
  - ⬜ Migration dev → test/prod : un seul environnement disponible pour l'instant (`DevZone Batch - 18&19`) ; à vérifier si Maxime a les droits de créer un environnement supplémentaire (admin.powerplatform.microsoft.com → Environnements → Nouveau). Le nouveau cahier demande explicitement un déploiement **en production** en séance 8 (contrairement à l'ancienne version).

## Notes techniques importantes
- **`pac code` (Code Apps) ne fonctionne pas depuis l'environnement cloud Claude** : l'API `environment.api.powerplatform.com` semble bloquer les IP de datacenter. Toutes les commandes `pac code` (init, add-data-source, run, push) doivent s'exécuter sur le PC perso de Maxime (via VS Code + extension Power Platform Tools). Le reste (auth, env, solution, docs, code applicatif) se fait depuis l'interface Claude.
- **Microsoft Lists ≠ SharePoint site** : une liste créée depuis lists.microsoft.com sans choisir explicitement le site cible reste orpheline (n'apparaît pas dans le site ni dans les connecteurs). Toujours créer les listes depuis "Contenu du site" du site SharePoint cible.
- **`pac code add-data-source --table`** attend l'ID interne de la liste (GUID, obtenu via `pac code list-tables`), pas son nom affiché.
- **Champs Choix SharePoint (Catégorie/Priorité/Statut) en écriture** : le SDK généré (`Tickets_ProjetFinalModel.ts`) type ces champs comme un objet simple, mais l'API réelle attend un tableau (`field_2: [{ Value: "IT" }]`) + une propriété sœur `field_2@odata.type: "#Collection(Edm.String)"`. Confirmé par un échec HTTP 400 en test réel. Voir `src/services/ticketsApi.ts`.
- **Connecteur "Mail" (`shared_sendmail`) vs "Office 365 Outlook"** : dans le sélecteur d'actions Power Automate, les deux proposent une action "Envoyer un e-mail" au nom quasi identique. Le connecteur générique "Mail" est actuellement bridé par Microsoft pour les nouveaux tenants (HTTP 401 "restricted for new tenants") — toujours choisir explicitement **Office 365 Outlook**.
- **Licence Power Apps manquante sur ce tenant de formation** : lancer l'app déployée via le lecteur officiel (make.powerapps.com / lien "play" de production) déclenche une demande d'essai Power Apps ("plan insuffisant"). Le mode local (`pac code run` + URL "play" avec `_localAppUrl`) n'est pas soumis à cette contrainte et fonctionne normalement — c'est ce mode qui sert de démo fonctionnelle pour la vidéo tant que la licence n'est pas résolue côté tenant. À re-vérifier vu l'exigence de prod du nouveau cahier.
- **Structure du code (25/09)** : réorganisé en `components/` (Badges, TicketList, TicketFormModal, TicketDetailModal), `pages/` (AgentQueuePage), `services/` (ticketFields, ticketsApi — ex-`lib/`). La Code App ne gère plus que le côté agent support ; la vue "Mes tickets" (demandeur) a été retirée, ce suivi passera par l'agent Copilot Studio.

## Phase 2 — Copilot Studio
- ⬜ J5 Création de l'agent : page blanche + compétences (FAQ en RAG), génératif direct désactivé
- ⬜ J6 Actions & Power Automate : création de ticket + consultation de statut via flow (par ID, restreint aux tickets du demandeur), notification responsable support
- ⬜ J7 Sécurité, RGPD & Démo : groupes de sécurité, accès restreint, point RGPD, intégration Teams

## Phase 3 — Rendu
- ⬜ **Une seule vidéo de 5 minutes** (changement : avant c'était 2 vidéos séparées) — présentation de la solution + démonstration en fonctionnement. Pas de dossier écrit, pas de soutenance.

## Décisions prises
- Auth pac via device code, travail CLI fait depuis cette interface (session Claude Code web)
- FAQ RAG : à créer ensemble le moment venu, ou à ajuster selon consignes ultérieures
- Code App : démarrage from scratch avec le starter `pac code init`
- Code App recentrée sur le périmètre agent support + responsable (pas de vue demandeur, gérée par Copilot Studio)
