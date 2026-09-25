// Mapping vers les noms internes SharePoint (voir sharepoint/schema-tickets.md).
// SharePoint a généré des noms internes génériques (field_1, field_2...) pour les
// colonnes contenant des accents ; ce fichier centralise la correspondance pour
// que le reste de l'app manipule des noms lisibles.

export const CATEGORIES = ['IT', 'RH', 'Logistique', 'Général'] as const;
export type Categorie = (typeof CATEGORIES)[number];

export const PRIORITIES = ['Basse', 'Normale', 'Haute', 'Critique'] as const;
export type Priorite = (typeof PRIORITIES)[number];

export const STATUSES = ['Nouveau', 'En cours', 'En attente demandeur', 'Résolu', 'Clôturé'] as const;
export type Statut = (typeof STATUSES)[number];

// Statuts qui exigent un commentaire de résolution avant de pouvoir enregistrer
// (cahier des charges : "un commentaire de résolution, obligatoire pour fermer un ticket").
export const STATUSES_REQUIRING_COMMENT: readonly Statut[] = ['Résolu', 'Clôturé'];

export const CANAUX_ORIGINE = ['Application', 'Teams', 'Téléphone', 'Email'] as const;
export type CanalOrigine = (typeof CANAUX_ORIGINE)[number];

export interface Ticket {
  id: string;
  titre: string;
  description: string;
  categorie: Categorie | '';
  priorite: Priorite | '';
  statut: Statut | '';
  demandeur: string;
  emailDemandeur: string;
  agentAssigne: string;
  canalOrigine: CanalOrigine | '';
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
  canalOrigine: CanalOrigine;
}
