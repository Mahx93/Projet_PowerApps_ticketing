import type { Priorite, Statut } from '../lib/ticketFields';

const PRIORITY_CLASS: Record<string, string> = {
  Critique: 'badge badge-critique',
  Haute: 'badge badge-haute',
  Normale: 'badge badge-normale',
  Basse: 'badge badge-basse',
};

const STATUS_CLASS: Record<string, string> = {
  Ouvert: 'badge badge-ouvert',
  'En cours': 'badge badge-encours',
  Résolu: 'badge badge-resolu',
  Fermé: 'badge badge-ferme',
};

export function PriorityBadge({ value }: { value: Priorite | '' }) {
  if (!value) return null;
  return <span className={PRIORITY_CLASS[value] ?? 'badge'}>{value}</span>;
}

export function StatusBadge({ value }: { value: Statut | '' }) {
  if (!value) return null;
  return <span className={STATUS_CLASS[value] ?? 'badge'}>{value}</span>;
}
