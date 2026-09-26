# Script vidéo — HelpDesk Nova Solutions (5 min)

Rythme visé : environ 130 mots par minute. Le texte à dire est en italique,
les actions à l'écran en liste.

## Avant d'enregistrer

- [ ] Prod à jour avec le build corrigé (`base: './'`) et l'app qui s'ouvre
      via « Lecture » dans prod-rse. Sinon, `pac code run` + `npm run dev`
      en local.
- [ ] Ton compte dans le groupe `HelpDesk - Responsables` (onglet Dashboard
      visible).
- [ ] Flow « Relancer tickets critiques » réactivé.
- [ ] Une dizaine de tickets de test variés (priorités, statuts, agents,
      canaux) pour que le tri et le Dashboard aient du contenu.
- [ ] Onglets ouverts à l'avance : la Code App, la liste SharePoint,
      Outlook (boîte du demandeur de test), Power Automate (historique
      d'exécution), Copilot Studio (agent), la solution dans prod-rse.
- [ ] Notifications Windows/Teams coupées.

## 0:00 – 0:35 · Le besoin

- Écran : titre du projet, ou la page d'accueil de la Code App.

*Nova Solutions, c'est 180 collaborateurs sur 3 sites et 3 agents support.
Aujourd'hui, les demandes arrivent par mail, par Teams et par téléphone,
sans aucune trace ni priorité, et le demandeur relance faute de savoir où en
est sa demande. L'objectif : centraliser les demandes, tracer leur cycle de
vie, automatiser les notifications, et permettre de créer et suivre un
ticket directement depuis Teams.*

## 0:35 – 1:10 · L'architecture

- Écran : la solution `Maxime_G_Batch18`, liste « Tous » (app, 3 flows,
  agent, références de connexion).

*Tout est réuni dans une seule solution Power Platform. SharePoint est la
source de données, avec une liste Tickets. La Code App en React, Vite et
TypeScript sert aux agents support et au responsable. Trois flows Power
Automate gèrent les notifications en arrière-plan. Et un agent Copilot
Studio, publié dans Teams, sert de portail aux collaborateurs. Le code suit
la structure demandée : components, pages et services, sans aucun secret en
dur, puisque les connexions passent par les connecteurs de la plateforme.*

## 1:10 – 2:30 · La Code App (espace agent support)

- Afficher la file des tickets.
- Cliquer sur l'en-tête « Priorité » : Critique remonte en premier (ordre
  logique, pas alphabétique). Idem sur « Statut » et « Agent assigné ».
- « + Enregistrer un ticket » : remplir titre, description, catégorie
  IT, priorité **Critique**, canal **Téléphone** → Enregistrer.
- Ouvrir le ticket créé : l'affecter à soi-même, passer le statut à
  « En cours ».
- Tenter de passer à « Résolu » sans commentaire → montrer le message
  d'erreur. Ajouter le commentaire → valider.

*La file affiche tous les tickets. On peut trier par priorité, par statut ou
par agent assigné, dans l'ordre métier. Un agent peut enregistrer un ticket
reçu par téléphone en précisant le canal d'origine. Il le prend en charge, le
réaffecte si besoin, et ne peut pas le clôturer sans commentaire de
résolution : c'est bloqué dans le formulaire.*

## 2:30 – 3:00 · Le tableau de bord responsable

- Onglet « Tableau de bord » : tickets ouverts, critiques en retard, résolus
  sur 7 jours, délai moyen, répartition par statut, charge par agent.

*Le responsable suit les volumes, les délais et la charge de son équipe. Cet
onglet n'apparaît que pour les membres du groupe de sécurité Entra
« HelpDesk - Responsables » : l'application vérifie l'appartenance au
groupe via le connecteur Office 365 Groups.*

## 3:00 – 3:40 · Les automatisations

- Outlook : l'accusé de réception reçu pour le ticket créé à 1:10.
- Outlook : l'alerte support (priorité Critique).
- Outlook : la notification de changement de statut.
- Power Automate : l'historique d'exécution du flow de relance.

*Dès la création, le demandeur reçoit un accusé de réception, et l'équipe est
alertée si le ticket est critique ou de priorité haute. Chaque changement de
statut est notifié. Enfin, un flow programmé relance l'équipe quand un ticket
critique n'est toujours pas pris en charge après une heure, conformément au
délai du cahier des charges.*

## 3:40 – 4:25 · L'agent Copilot Studio (simulation)

- Copilot Studio : la source de connaissance (FAQ SharePoint), puis les
  consignes (répondre uniquement depuis la FAQ, en français, rester dans le
  périmètre IT/RH).
- L'outil « Créer un élément » : Statut = Nouveau et Canal = Teams en
  valeurs fixes, les autres champs remplis par l'IA.
- L'outil « Obtenir les éléments » (filtre par ID) et l'authentification
  Microsoft.
- SharePoint : créer à la main un ticket avec Canal d'origine = **Teams**,
  puis le montrer dans la Code App avec le canal « Teams ».

*L'agent répond aux questions courantes à partir de la FAQ, crée un ticket
quand il ne trouve pas de réponse, et permet de suivre ses propres tickets
avec leur identifiant. L'environnement de formation n'a plus de crédits
Copilot Studio, et ce blocage touche tous les canaux, Teams compris. Plutôt
qu'une fausse démo, je montre sa configuration, puis je reproduis à la main
l'action de son outil de création : le ticket arrive avec le canal Teams, et
toute la chaîne de notifications se déclenche comme pour les autres.*

## 4:25 – 4:50 · Sécurité et mise en production

- La solution importée en « Géré » dans prod-rse, les 3 flows activés.

*Côté sécurité, chaque ticket a des droits individuels : seuls le demandeur
et le support y ont accès. L'agent exige une authentification Microsoft, et
les données personnelles sont limitées au strict nécessaire. La solution est
déployée en production dans un environnement dédié, sous forme de solution
gérée.*

## 4:50 – 5:00 · Conclusion

*Toutes les demandes sont centralisées, tracées de bout en bout, les
notifications sont automatiques et le responsable dispose de ses
indicateurs. Merci.*

## Si tu dois gagner du temps

Coupe d'abord la démonstration du tri (garde un seul clic sur « Priorité »),
puis montre une seule notification Outlook au lieu de trois. Ne coupe pas le
blocage du commentaire de résolution : c'est une règle métier explicite du
cahier des charges.
