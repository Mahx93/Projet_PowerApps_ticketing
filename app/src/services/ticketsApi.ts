import { Tickets_ProjetFinalService } from '../generated/services/Tickets_ProjetFinalService';
import type {
  Tickets_ProjetFinalRead,
  Tickets_ProjetFinalWrite,
} from '../generated/models/Tickets_ProjetFinalModel';
import type { Ticket, TicketDraft } from './ticketFields';

// La connexion SharePoint (connecteur shared_sharepointonline) modélise les
// colonnes Choix comme des tableaux ({ Value }[]), avec une propriété sœur
// "<field>@odata.type" = "#Collection(Edm.String)" à l'écriture — quel que
// soit ce que le SDK généré (Tickets_ProjetFinalModel) déclare pour ce champ
// (objet simple pour Catégorie/Priorité/Statut, texte simple pour
// Canaldorigine à sa création) : les deux se sont révélés trompeurs à
// l'usage, confirmé par échec HTTP 400 / écriture silencieusement ignorée.
function readChoice(value: unknown): string {
  if (!value) return '';
  if (Array.isArray(value)) {
    const first = value[0] as { Value?: string } | undefined;
    return first?.Value ?? '';
  }
  return (value as { Value?: string }).Value ?? '';
}

function choiceFields(field: string, value: string): Record<string, unknown> {
  return {
    [field]: [{ Value: value }],
    [`${field}@odata.type`]: '#Collection(Edm.String)',
  };
}

function fromRecord(record: Tickets_ProjetFinalRead): Ticket {
  return {
    id: String(record.ID ?? ''),
    titre: record.Title ?? '',
    description: record.field_1 ?? '',
    categorie: readChoice(record.field_2) as Ticket['categorie'],
    priorite: readChoice(record.field_3) as Ticket['priorite'],
    statut: readChoice(record.field_4) as Ticket['statut'],
    demandeur: record.field_5 ?? '',
    emailDemandeur: record.field_6 ?? '',
    agentAssigne: record.field_7 ?? '',
    canalOrigine: readChoice(record.Canaldorigine) as Ticket['canalOrigine'],
    dateCreation: record.field_8 ?? '',
    dateEcheance: record.field_9 ?? '',
    dateResolution: record.field_10 ?? '',
    commentaire: record.field_11 ?? '',
  };
}

export async function listTickets(): Promise<Ticket[]> {
  const result = await Tickets_ProjetFinalService.getAll({
    orderBy: ['field_8 desc'],
  });
  return (result.data ?? []).map(fromRecord);
}

export async function createTicket(draft: TicketDraft): Promise<Ticket> {
  const now = new Date().toISOString();
  const payload = {
    Title: draft.titre,
    field_1: draft.description,
    ...choiceFields('field_2', draft.categorie),
    ...choiceFields('field_3', draft.priorite),
    ...choiceFields('field_4', 'Nouveau'),
    field_5: draft.demandeur,
    field_6: draft.emailDemandeur,
    field_8: now,
    field_9: draft.dateEcheance ? new Date(draft.dateEcheance).toISOString() : undefined,
    ...choiceFields('Canaldorigine', draft.canalOrigine),
  } as unknown as Omit<Tickets_ProjetFinalWrite, 'ID'>;
  const result = await Tickets_ProjetFinalService.create(payload);
  if (!result.data) {
    throw new Error('La création du ticket a échoué.');
  }
  return fromRecord(result.data);
}

export interface TicketUpdate {
  statut?: Statut;
  agentAssigne?: string;
  commentaire?: string;
  dateResolution?: string;
}

type Statut = Ticket['statut'];

export async function updateTicket(id: string, update: TicketUpdate): Promise<Ticket> {
  const payload: Record<string, unknown> = {};
  if (update.statut) {
    Object.assign(payload, choiceFields('field_4', update.statut));
  }
  if (update.agentAssigne !== undefined) {
    payload.field_7 = update.agentAssigne;
  }
  if (update.commentaire !== undefined) {
    payload.field_11 = update.commentaire;
  }
  if (update.dateResolution !== undefined) {
    payload.field_10 = update.dateResolution ? new Date(update.dateResolution).toISOString() : undefined;
  }
  const result = await Tickets_ProjetFinalService.update(id, payload as Partial<Omit<Tickets_ProjetFinalWrite, 'ID'>>);
  if (!result.data) {
    throw new Error('La mise à jour du ticket a échoué.');
  }
  return fromRecord(result.data);
}
