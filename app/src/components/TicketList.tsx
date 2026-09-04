import type { Ticket } from '../lib/ticketFields';
import { PriorityBadge, StatusBadge } from './Badges';

function formatDate(iso: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('fr-FR');
}

export function TicketList({
  tickets,
  onSelect,
}: {
  tickets: Ticket[];
  onSelect: (ticket: Ticket) => void;
}) {
  if (tickets.length === 0) {
    return <p className="empty-state">Aucun ticket pour le moment.</p>;
  }

  return (
    <table className="ticket-table">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Catégorie</th>
          <th>Priorité</th>
          <th>Statut</th>
          <th>Demandeur</th>
          <th>Créé le</th>
          <th>Échéance</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
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
            <td>{formatDate(ticket.dateCreation)}</td>
            <td>{formatDate(ticket.dateEcheance)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
