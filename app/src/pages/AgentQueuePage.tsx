import { useEffect, useState } from 'react';
import type { Ticket, TicketDraft } from '../services/ticketFields';
import { createTicket, listTickets, updateTicket } from '../services/ticketsApi';
import type { TicketUpdate } from '../services/ticketsApi';
import { TicketList } from '../components/TicketList';
import { TicketFormModal } from '../components/TicketFormModal';
import { TicketDetailModal } from '../components/TicketDetailModal';

// Écran "espace agent support" : file complète des tickets, prise en charge,
// clôture. Le suivi côté demandeur (portail collaborateur) passe par l'agent
// Copilot Studio dans Teams, pas par cet écran.
export function AgentQueuePage({ agentName }: { agentName: string }) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  async function refreshTickets() {
    setLoading(true);
    setLoadError('');
    try {
      const data = await listTickets();
      setTickets(data);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Impossible de charger les tickets.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshTickets();
  }, []);

  async function handleCreate(draft: TicketDraft) {
    await createTicket(draft);
    setShowCreateForm(false);
    await refreshTickets();
  }

  async function handleUpdate(id: string, update: TicketUpdate) {
    await updateTicket(id, update);
    await refreshTickets();
  }

  return (
    <>
      <div className="page-toolbar">
        <button type="button" className="btn btn-primary" onClick={() => setShowCreateForm(true)}>
          + Enregistrer un ticket
        </button>
      </div>

      {loading && <p>Chargement des tickets…</p>}
      {loadError && <p className="form-error">{loadError}</p>}
      {!loading && !loadError && <TicketList tickets={tickets} onSelect={setSelectedTicket} />}

      {showCreateForm && (
        <TicketFormModal
          defaultDemandeur=""
          defaultEmail=""
          onClose={() => setShowCreateForm(false)}
          onCreate={handleCreate}
        />
      )}

      {selectedTicket && (
        <TicketDetailModal
          ticket={selectedTicket}
          defaultAgent={agentName}
          onClose={() => setSelectedTicket(null)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}
