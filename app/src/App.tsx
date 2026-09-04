import { useEffect, useState } from 'react';
import { getContext } from '@microsoft/power-apps/app';
import type { Ticket, TicketDraft } from './lib/ticketFields';
import { createTicket, listTickets, updateTicket } from './lib/ticketsApi';
import type { TicketUpdate } from './lib/ticketsApi';
import { TicketList } from './components/TicketList';
import { TicketFormModal } from './components/TicketFormModal';
import { TicketDetailModal } from './components/TicketDetailModal';
import './App.css';

type ViewMode = 'mine' | 'all';

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('mine');
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
    getContext()
      .then((ctx) => {
        setUserName(ctx.user.fullName ?? '');
        setUserEmail(ctx.user.userPrincipalName ?? '');
      })
      .catch(() => {
        // Contexte utilisateur indisponible (ex: exécution locale hors Teams) : pas bloquant.
      });
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

  const visibleTickets =
    viewMode === 'mine' && userEmail
      ? tickets.filter((t) => t.emailDemandeur.toLowerCase() === userEmail.toLowerCase())
      : tickets;

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>HelpDesk Ticketing</h1>
          <p className="app-subtitle">{userName ? `Connecté(e) en tant que ${userName}` : 'Support IT / RH'}</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setShowCreateForm(true)}>
          + Nouveau ticket
        </button>
      </header>

      <nav className="view-tabs">
        <button
          type="button"
          className={viewMode === 'mine' ? 'tab tab-active' : 'tab'}
          onClick={() => setViewMode('mine')}
        >
          Mes tickets
        </button>
        <button
          type="button"
          className={viewMode === 'all' ? 'tab tab-active' : 'tab'}
          onClick={() => setViewMode('all')}
        >
          Tous les tickets (gestionnaire)
        </button>
      </nav>

      <main className="app-main">
        {loading && <p>Chargement des tickets…</p>}
        {loadError && <p className="form-error">{loadError}</p>}
        {!loading && !loadError && (
          <TicketList tickets={visibleTickets} onSelect={setSelectedTicket} />
        )}
      </main>

      {showCreateForm && (
        <TicketFormModal
          defaultDemandeur={userName}
          defaultEmail={userEmail}
          onClose={() => setShowCreateForm(false)}
          onCreate={handleCreate}
        />
      )}

      {selectedTicket && (
        <TicketDetailModal
          ticket={selectedTicket}
          isGestionnaire={viewMode === 'all'}
          onClose={() => setSelectedTicket(null)}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default App;
