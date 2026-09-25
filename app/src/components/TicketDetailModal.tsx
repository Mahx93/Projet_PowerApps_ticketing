import { useState } from 'react';
import { STATUSES, STATUSES_REQUIRING_COMMENT } from '../services/ticketFields';
import type { Ticket } from '../services/ticketFields';
import type { TicketUpdate } from '../services/ticketsApi';
import { PriorityBadge, StatusBadge } from './Badges';

export function TicketDetailModal({
  ticket,
  defaultAgent,
  onClose,
  onUpdate,
}: {
  ticket: Ticket;
  defaultAgent: string;
  onClose: () => void;
  onUpdate: (id: string, update: TicketUpdate) => Promise<void>;
}) {
  const [statut, setStatut] = useState(ticket.statut);
  const [agentAssigne, setAgentAssigne] = useState(ticket.agentAssigne || defaultAgent);
  const [commentaire, setCommentaire] = useState(ticket.commentaire);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const commentRequired = statut !== '' && STATUSES_REQUIRING_COMMENT.includes(statut);

  async function handleSave() {
    if (commentRequired && !commentaire.trim()) {
      setError('Un commentaire de résolution est obligatoire pour ce statut.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const update: TicketUpdate = { statut, agentAssigne, commentaire };
      if (statut === 'Résolu' || statut === 'Clôturé') {
        update.dateResolution = ticket.dateResolution || new Date().toISOString();
      }
      await onUpdate(ticket.id, update);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue.');
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{ticket.titre}</h2>
        <div className="detail-badges">
          {ticket.categorie} · <PriorityBadge value={ticket.priorite} /> <StatusBadge value={ticket.statut} />
        </div>
        <p className="detail-description">{ticket.description || 'Pas de description.'}</p>

        <dl className="detail-meta">
          <dt>Demandeur</dt>
          <dd>{ticket.demandeur} ({ticket.emailDemandeur})</dd>
          <dt>Créé le</dt>
          <dd>{ticket.dateCreation ? new Date(ticket.dateCreation).toLocaleString('fr-FR') : '—'}</dd>
        </dl>

        <div className="detail-edit">
          <div className="form-row">
            <label>
              Statut
              <select value={statut} onChange={(e) => setStatut(e.target.value as Ticket['statut'])}>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>
            <label>
              Agent assigné
              <input value={agentAssigne} onChange={(e) => setAgentAssigne(e.target.value)} />
            </label>
          </div>
          <label>
            Commentaire de résolution{commentRequired ? ' (obligatoire)' : ''}
            <textarea value={commentaire} onChange={(e) => setCommentaire(e.target.value)} rows={3} />
          </label>
          {error && <p className="form-error">{error}</p>}
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
              Fermer
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave} disabled={submitting}>
              {submitting ? 'Enregistrement…' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
