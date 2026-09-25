// Mapping vers les noms internes SharePoint (voir sharepoint/schema-tickets.md).
// SharePoint a généré des noms internes génériques (field_1, field_2...) pour les
// colonnes contenant des accents ; ce fichier centralise la correspondance pour
// que le reste de l'app manipule des noms lisibles.

export const CATEGORIES = ['IT', 'RH', 'Logistique', 'Général'] as const;
export type Categorie = (typeof CATEGORIES)[number];

export const PRIORITIES = ['Basse', 'Normale', 'Haute', 'Critique'] as const;
export type Priorite = (typeof PRIORITIES)[number];

export const STATUSES = ['Ouvert', 'En cours', 'Résolu', 'Fermé'] as const;
export type Statut = (typeof STATUSES)[number];

export interface Ticket {
  id: string;
  titre: string;
  description: string;
  categorie: Categorie | '';
  priorite: Priorite | '';
  statut: Statut | '';
  demandeur: string;
  emailDemandeur: string;
  gestionnaire: string;
  dateCreation: string;
  dateEcheance: string;
  dateResolution: string;
  commentaire: string;
}

export interface TicketDraft {
  titre: string;
  description: string;
  categorie: Categorie;
  priorite: Priorite;
  demandeur: string;
  emailDemandeur: string;
  dateEcheance: string;
}
