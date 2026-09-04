import { useState } from 'react';
import { CATEGORIES, PRIORITIES } from '../lib/ticketFields';
import type { TicketDraft } from '../lib/ticketFields';

export function TicketFormModal({
  defaultDemandeur,
  defaultEmail,
  onClose,
  onCreate,
}: {
  defaultDemandeur: string;
  defaultEmail: string;
  onClose: () => void;
  onCreate: (draft: TicketDraft) => Promise<void>;
}) {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState<TicketDraft['categorie']>('IT');
  const [priorite, setPriorite] = useState<TicketDraft['priorite']>('Normale');
  const [demandeur, setDemandeur] = useState(defaultDemandeur);
  const [emailDemandeur, setEmailDemandeur] = useState(defaultEmail);
  const [dateEcheance, setDateEcheance] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!titre.trim()) {
      setError('Le titre est obligatoire.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await onCreate({ titre, description, categorie, priorite, demandeur, emailDemandeur, dateEcheance });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue.');
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Nouveau ticket</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Titre
            <input value={titre} onChange={(e) => setTitre(e.target.value)} autoFocus />
          </label>
          <label>
            Description
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
          </label>
          <div className="form-row">
            <label>
              Catégorie
              <select value={categorie} onChange={(e) => setCategorie(e.target.value as TicketDraft['categorie'])}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
            <label>
              Priorité
              <select value={priorite} onChange={(e) => setPriorite(e.target.value as TicketDraft['priorite'])}>
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="form-row">
            <label>
              Demandeur
              <input value={demandeur} onChange={(e) => setDemandeur(e.target.value)} />
            </label>
            <label>
              Email demandeur
              <input type="email" value={emailDemandeur} onChange={(e) => setEmailDemandeur(e.target.value)} />
            </label>
          </div>
          <label>
            Date d'échéance souhaitée
            <input type="date" value={dateEcheance} onChange={(e) => setDateEcheance(e.target.value)} />
          </label>

          {error && <p className="form-error">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Création…' : 'Créer le ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
