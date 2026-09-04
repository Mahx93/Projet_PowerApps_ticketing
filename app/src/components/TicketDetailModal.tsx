import { useState } from 'react';
import { STATUSES } from '../lib/ticketFields';
import type { Ticket } from '../lib/ticketFields';
import type { TicketUpdate } from '../lib/ticketsApi';
import { PriorityBadge, StatusBadge } from './Badges';

export function TicketDetailModal({
  ticket,
  isGestionnaire,
  onClose,
  onUpdate,
}: {
  ticket: Ticket;
  isGestionnaire: boolean;
  onClose: () => void;
  onUpdate: (id: string, update: TicketUpdate) => Promise<void>;
}) {
  const [statut, setStatut] = useState(ticket.statut);
  const [gestionnaire, setGestionnaire] = useState(ticket.gestionnaire);
  const [commentaire, setCommentaire] = useState(ticket.commentaire);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSave() {
    setSubmitting(true);
    setError('');
    try {
      const update: TicketUpdate = { statut, gestionnaire, commentaire };
      if (statut === 'Résolu' || statut === 'Fermé') {
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

        {isGestionnaire ? (
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
                Gestionnaire
                <input value={gestionnaire} onChange={(e) => setGestionnaire(e.target.value)} />
              </label>
            </div>
            <label>
              Commentaire de suivi
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
        ) : (
          <>
            <dl className="detail-meta">
              <dt>Gestionnaire</dt>
              <dd>{ticket.gestionnaire || 'Non assigné'}</dd>
              <dt>Suivi</dt>
              <dd>{ticket.commentaire || 'Aucun commentaire pour le moment.'}</dd>
            </dl>
            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Fermer
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
