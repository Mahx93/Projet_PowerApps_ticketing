# RGPD — note de conformité

Document interne, non exigé par le cahier des charges (aucun dossier écrit
n'est demandé) mais bonne pratique à mentionner brièvement dans la vidéo.

## Données personnelles traitées

- **Demandeur** : nom et email (récupérés automatiquement du contexte
  Teams/Microsoft 365 — jamais saisis manuellement)
- **Contenu du ticket** : titre, description, commentaire de résolution —
  peuvent contenir des données personnelles si l'utilisateur les mentionne
  spontanément (ex. un souci RH nominatif)
- **Agent assigné** : nom de l'agent support qui traite le ticket

Aucune donnée sensible (santé, opinions, origine, etc.) n'est demandée par
le formulaire ni par l'agent conversationnel.

## Minimisation

Seuls les champs nécessaires au traitement du ticket sont collectés :
Titre, Description, Catégorie, Priorité, Demandeur, Statut, Agent assigné,
Canal d'origine, dates, commentaire de clôture. Pas de champ superflu.

## Ce que l'agent Copilot Studio ne doit pas faire

- Ne pas conserver l'historique de conversation au-delà de la session
  active (comportement par défaut de Copilot Studio, pas de connaissance
  externe ni de mémoire long terme configurée)
- Ne pas solliciter de données sensibles même si le besoin métier ne les
  requiert pas (santé, vie privée, opinions...)
- Ne pas répéter ou reformuler inutilement des données personnelles au-delà
  de ce qui est nécessaire pour créer ou faire le point sur un ticket
- Ne consulter et n'afficher que les tickets créés par l'utilisateur courant
  (pas d'accès aux tickets d'un autre collaborateur)

Ces règles sont rappelées explicitement dans l'onglet **Consignes** de
l'agent, aux côtés de l'instruction de langue.

## Durée de conservation

- **Tickets clôturés** : conservés 12 mois dans SharePoint (utile pour
  historique support et mesure de charge), puis purge manuelle par le
  responsable
- **Journal des flows Power Automate** (historique d'exécution) : purge
  automatique par la rétention par défaut de la plateforme (28 jours),
  aucune action supplémentaire nécessaire

Ces durées sont des recommandations raisonnables pour ce projet
pédagogique ; en conditions réelles elles seraient validées avec le DPO de
l'entreprise.

## Sécurité déjà en place

- **Rupture d'héritage + octroi d'accès nominatif** sur chaque ticket créé
  (demandeur + support uniquement) — empêche un collaborateur de consulter
  les tickets d'un autre, mis en place dans le flow "Notifier création
  ticket" (voir `plan-projet.md`, Phase 1 J3)
- **Aucun secret en dur dans le code** (connexions gérées via les
  connecteurs Power Platform, pas de clé/API dans le repo)

## Droits des personnes

Toute demande d'accès, de rectification ou de suppression de données
passerait, dans ce contexte, par une simple demande au support IT (via un
ticket catégorie IT ou RH) — pas de procédure automatisée dédiée pour ce
projet pédagogique.
