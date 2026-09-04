# Liste SharePoint "Tickets"

Backend commun de l'app Power Apps (Code App) et de l'agent Copilot Studio.
Pas de Dataverse (licence non disponible ce batch).

**Site SharePoint :** https://alegriaacademy23.sharepoint.com/sites/HelpDeskBatch18Maxime
**Liste :** Tickets_ProjetFinal (privé)

| Colonne              | Type   | Détail                                                    |
|-----------------------|--------|------------------------------------------------------------|
| ID                    | Nombre | Généré automatiquement par SharePoint                     |
| Titre                 | Texte  | Résumé court du problème                                   |
| Description           | Texte  | Détail complet du problème                                 |
| Catégorie             | Choix  | IT \| RH \| Logistique \| Général                         |
| Priorité              | Choix  | Basse \| Normale \| Haute \| Critique                      |
| Statut                | Choix  | Ouvert \| En cours \| Résolu \| Fermé                       |
| Demandeur             | Texte  | Prénom Nom du demandeur                                    |
| Email demandeur       | Texte  | Email pour les notifications                                |
| Gestionnaire          | Texte  | Responsable du traitement                                  |
| Date création         | Date   | Remplie automatiquement à la soumission                    |
| Date échéance         | Date   | Date limite de résolution                                  |
| Date résolution       | Date   | Remplie à la clôture du ticket                              |
| Commentaire           | Texte  | Dernière mise à jour sur le suivi                           |

Voir `Tickets_sample.csv` pour un exemple de ligne.

## Notes de sécurité (J3 / J7)

- Sécurité à la ligne SharePoint : un demandeur ne doit voir que ses propres tickets, sauf le(s) profil(s) "Gestionnaire" / responsable support.
- L'agent Copilot Studio n'a accès qu'à cette liste + aux profils Office 365 de l'environnement (pas d'accès générique au site SharePoint).
