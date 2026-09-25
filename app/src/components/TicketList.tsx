import { useMemo, useState } from 'react';
import type { Ticket } from '../services/ticketFields';
import { PRIORITIES, STATUSES } from '../services/ticketFields';
import { PriorityBadge, StatusBadge } from './Badges';

function formatDate(iso: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('fr-FR');
}

type SortKey = 'priorite' | 'statut' | 'agentAssigne';
type SortDir = 'asc' | 'desc';

function sortRank(key: SortKey, ticket: Ticket): number | string {
  if (key === 'priorite') {
    // Ordre logique (Critique en premier), pas alphabétique.
    const i = PRIORITIES.indexOf(ticket.priorite as (typeof PRIORITIES)[number]);
    return i === -1 ? PRIORITIES.length : i;
  }
  if (key === 'statut') {
    const i = STATUSES.indexOf(ticket.statut as (typeof STATUSES)[number]);
    return i === -1 ? STATUSES.length : i;
  }
  return ticket.agentAssigne || 'zzz'; // "Non assigné" trié en dernier
}

export function TicketList({
  tickets,
  onSelect,
}: {
  tickets: Ticket[];
  onSelect: (ticket: Ticket) => void;
}) {
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  }

  const sortedTickets = useMemo(() => {
    if (!sortKey) return tickets;
    const sorted = [...tickets].sort((a, b) => {
      const ra = sortRank(sortKey, a);
      const rb = sortRank(sortKey, b);
      if (ra < rb) return -1;
      if (ra > rb) return 1;
      return 0;
    });
    return sortDir === 'asc' ? sorted : sorted.reverse();
  }, [tickets, sortKey, sortDir]);

  function sortIndicator(key: SortKey): string {
    if (sortKey !== key) return '';
    return sortDir === 'asc' ? ' ▲' : ' ▼';
  }

  if (tickets.length === 0) {
    return <p className="empty-state">Aucun ticket pour le moment.</p>;
  }

  return (
    <table className="ticket-table">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Catégorie</th>
          <th className="sortable" onClick={() => toggleSort('priorite')}>
            Priorité{sortIndicator('priorite')}
          </th>
          <th className="sortable" onClick={() => toggleSort('statut')}>
            Statut{sortIndicator('statut')}
          </th>
          <th>Demandeur</th>
          <th className="sortable" onClick={() => toggleSort('agentAssigne')}>
            Agent assigné{sortIndicator('agentAssigne')}
          </th>
          <th>Canal</th>
          <th>Créé le</th>
          <th>Échéance</th>
        </tr>
      </thead>
      <tbody>
        {sortedTickets.map((ticket) => (
          <tr key={ticket.id} onClick={() => onSelect(ticket)} tabIndex={0}>
            <td className="ticket-title">{ticket.titre}</td>
            <td>{ticket.categorie}</td>
            <td>
              <PriorityBadge value={ticket.priorite} />
            </td>
            <td>
              <StatusBadge value={ticket.statut} />
            </td>
            <td>{ticket.demandeur}</td>
            <td>{ticket.agentAssigne || '—'}</td>
            <td>{ticket.canalOrigine || '—'}</td>
            <td>{formatDate(ticket.dateCreation)}</td>
            <td>{formatDate(ticket.dateEcheance)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
