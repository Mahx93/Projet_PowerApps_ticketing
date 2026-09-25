import type { Ticket } from './ticketFields';
import { STATUSES } from './ticketFields';

const OPEN_STATUSES: readonly Ticket['statut'][] = ['Nouveau', 'En cours', 'En attente demandeur'];
const RESOLVED_STATUSES: readonly Ticket['statut'][] = ['Résolu', 'Clôturé'];
const SLA_CRITIQUE_HOURS = 1;

export interface AgentWorkload {
  agent: string;
  ouverts: number;
  critiques: number;
}

export interface TicketStats {
  totalOuverts: number;
  critiquesEnRetard: number;
  resolusSemaine: number;
  delaiMoyenResolutionHeures: number | null;
  parStatut: { statut: Ticket['statut']; nombre: number }[];
  parAgent: AgentWorkload[];
}

function isOpen(t: Ticket): boolean {
  return t.statut !== '' && OPEN_STATUSES.includes(t.statut);
}

function hoursSince(iso: string): number {
  const created = new Date(iso).getTime();
  if (Number.isNaN(created)) return 0;
  return (Date.now() - created) / (1000 * 60 * 60);
}

export function computeStats(tickets: Ticket[]): TicketStats {
  const totalOuverts = tickets.filter(isOpen).length;

  const critiquesEnRetard = tickets.filter(
    (t) => isOpen(t) && t.priorite === 'Critique' && hoursSince(t.dateCreation) > SLA_CRITIQUE_HOURS
  ).length;

  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const resolusSemaine = tickets.filter(
    (t) => t.statut !== '' && RESOLVED_STATUSES.includes(t.statut) && new Date(t.dateResolution).getTime() >= sevenDaysAgo
  ).length;

  const resolutionDurations = tickets
    .filter((t) => t.statut !== '' && RESOLVED_STATUSES.includes(t.statut) && t.dateResolution && t.dateCreation)
    .map((t) => (new Date(t.dateResolution).getTime() - new Date(t.dateCreation).getTime()) / (1000 * 60 * 60))
    .filter((h) => h >= 0);
  const delaiMoyenResolutionHeures =
    resolutionDurations.length > 0
      ? resolutionDurations.reduce((sum, h) => sum + h, 0) / resolutionDurations.length
      : null;

  const parStatut = STATUSES.map((statut) => ({
    statut,
    nombre: tickets.filter((t) => t.statut === statut).length,
  }));

  const agentMap = new Map<string, AgentWorkload>();
  for (const t of tickets) {
    if (!isOpen(t)) continue;
    const agent = t.agentAssigne || 'Non assigné';
    const entry = agentMap.get(agent) ?? { agent, ouverts: 0, critiques: 0 };
    entry.ouverts += 1;
    if (t.priorite === 'Critique') entry.critiques += 1;
    agentMap.set(agent, entry);
  }
  const parAgent = [...agentMap.values()].sort((a, b) => b.ouverts - a.ouverts);

  return { totalOuverts, critiquesEnRetard, resolusSemaine, delaiMoyenResolutionHeures, parStatut, parAgent };
}
