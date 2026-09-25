# Liste SharePoint "Tickets"

Backend commun de l'app Power Apps (Code App) et de l'agent Copilot Studio.
Pas de Dataverse (licence non disponible ce batch).

**Site SharePoint :** https://alegriaacademy23.sharepoint.com/sites/HelpDeskBatch18Maxime
**Liste :** Tickets_ProjetFinal (privé)

| Colonne              | Type   | Détail                                                    | Nom interne (field_N) |
|-----------------------|--------|------------------------------------------------------------|------------------------|
| ID                    | Nombre | Généré automatiquement par SharePoint                     | `ID` |
| Titre                 | Texte  | Résumé court du problème                                   | `Title` |
| Description           | Texte  | Détail complet du problème                                 | `field_1` |
| Catégorie             | Choix  | IT \| RH \| Logistique \| Général                         | `field_2` |
| Priorité              | Choix  | Basse \| Normale \| Haute \| Critique                      | `field_3` |
| Statut                | Choix  | Nouveau \| En cours \| En attente demandeur \| Résolu \| Clôturé | `field_4` |
| Demandeur             | Texte  | Prénom Nom du demandeur                                    | `field_5` |
| Email demandeur       | Texte  | Email pour les notifications                                | `field_6` |
| Agent assigné (ex-Gestionnaire) | Texte | Agent support en charge du ticket                    | `field_7` |
| Date création         | Date   | Remplie automatiquement à la soumission                    | `field_8` |
| Date échéance         | Date   | Date limite de résolution                                  | `field_9` |
| Date résolution       | Date   | Remplie à la clôture du ticket                              | `field_10` |
| Commentaire           | Texte  | Commentaire de résolution — obligatoire pour Résolu/Clôturé | `field_11` |
| Canal d'origine       | Choix  | Application \| Teams \| Téléphone \| Email                 | `Canaldorigine` (nom lisible car pas de caractère accentué à sa création) |

Voir `Tickets_sample.csv` pour un exemple de ligne.

## Notes de sécurité (J3 / J7)

- Sécurité à la ligne SharePoint : un demandeur ne doit voir que ses propres tickets, sauf le(s) profil(s) "Gestionnaire" / responsable support.
- L'agent Copilot Studio n'a accès qu'à cette liste + aux profils Office 365 de l'environnement (pas d'accès générique au site SharePoint).
