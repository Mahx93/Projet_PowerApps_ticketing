import type { Priorite, Statut } from '../services/ticketFields';

const PRIORITY_CLASS: Record<string, string> = {
  Critique: 'badge badge-critique',
  Haute: 'badge badge-haute',
  Normale: 'badge badge-normale',
  Basse: 'badge badge-basse',
};

const STATUS_CLASS: Record<string, string> = {
  Nouveau: 'badge badge-nouveau',
  'En cours': 'badge badge-encours',
  'En attente demandeur': 'badge badge-attente',
  Résolu: 'badge badge-resolu',
  Clôturé: 'badge badge-ferme',
};

export function PriorityBadge({ value }: { value: Priorite | '' }) {
  if (!value) return null;
  return <span className={PRIORITY_CLASS[value] ?? 'badge'}>{value}</span>;
}

export function StatusBadge({ value }: { value: Statut | '' }) {
  if (!value) return null;
  return <span className={STATUS_CLASS[value] ?? 'badge'}>{value}</span>;
}
