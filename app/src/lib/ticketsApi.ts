import { Tickets_ProjetFinalService } from '../generated/services/Tickets_ProjetFinalService';
import type {
  Tickets_ProjetFinalRead,
  Tickets_ProjetFinalWrite,
} from '../generated/models/Tickets_ProjetFinalModel';
import type { Ticket, TicketDraft } from './ticketFields';

// La connexion SharePoint (connecteur shared_sharepointonline) renvoie les
// colonnes Choix sous forme d'objet { Value, Id, @odata.type }. On lit
// simplement .Value ; à l'écriture, le connecteur accepte { Value } seul.
function readChoice(value: unknown): string {
  if (!value) return '';
  if (Array.isArray(value)) {
    const first = value[0] as { Value?: string } | undefined;
    return first?.Value ?? '';
  }
  return (value as { Value?: string }).Value ?? '';
}

function writeChoice(value: string): unknown {
  return { Value: value };
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
    gestionnaire: record.field_7 ?? '',
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
  const payload: Omit<Tickets_ProjetFinalWrite, 'ID'> = {
    Title: draft.titre,
    field_1: draft.description,
    field_2: writeChoice(draft.categorie) as Tickets_ProjetFinalWrite['field_2'],
    field_3: writeChoice(draft.priorite) as Tickets_ProjetFinalWrite['field_3'],
    field_4: writeChoice('Ouvert') as Tickets_ProjetFinalWrite['field_4'],
    field_5: draft.demandeur,
    field_6: draft.emailDemandeur,
    field_8: now,
    field_9: draft.dateEcheance ? new Date(draft.dateEcheance).toISOString() : undefined,
  };
  const result = await Tickets_ProjetFinalService.create(payload);
  if (!result.data) {
    throw new Error('La création du ticket a échoué.');
  }
  return fromRecord(result.data);
}

export interface TicketUpdate {
  statut?: Statut;
  gestionnaire?: string;
  commentaire?: string;
  dateResolution?: string;
}

type Statut = Ticket['statut'];

export async function updateTicket(id: string, update: TicketUpdate): Promise<Ticket> {
  const payload: Partial<Omit<Tickets_ProjetFinalWrite, 'ID'>> = {};
  if (update.statut) {
    payload.field_4 = writeChoice(update.statut) as Tickets_ProjetFinalWrite['field_4'];
  }
  if (update.gestionnaire !== undefined) {
    payload.field_7 = update.gestionnaire;
  }
  if (update.commentaire !== undefined) {
    payload.field_11 = update.commentaire;
  }
  if (update.dateResolution !== undefined) {
    payload.field_10 = update.dateResolution ? new Date(update.dateResolution).toISOString() : undefined;
  }
  const result = await Tickets_ProjetFinalService.update(id, payload);
  if (!result.data) {
    throw new Error('La mise à jour du ticket a échoué.');
  }
  return fromRecord(result.data);
}
