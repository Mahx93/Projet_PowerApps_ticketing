import { useEffect, useState } from 'react';
import { getContext } from '@microsoft/power-apps/app';
import { AgentQueuePage } from './pages/AgentQueuePage';
import { DashboardPage } from './pages/DashboardPage';
import './App.css';

type Page = 'queue' | 'dashboard';

function App() {
  const [agentName, setAgentName] = useState('');
  const [page, setPage] = useState<Page>('queue');

  useEffect(() => {
    getContext()
      .then((ctx) => setAgentName(ctx.user.fullName ?? ''))
      .catch(() => {
        // Contexte utilisateur indisponible (ex: exécution locale hors Teams) : pas bloquant.
      });
  }, []);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>HelpDesk Ticketing — Espace agent</h1>
          <p className="app-subtitle">{agentName ? `Connecté(e) en tant que ${agentName}` : 'Support IT / RH'}</p>
        </div>
      </header>

      <nav className="view-tabs">
        <button type="button" className={page === 'queue' ? 'tab tab-active' : 'tab'} onClick={() => setPage('queue')}>
          File des tickets
        </button>
        <button
          type="button"
          className={page === 'dashboard' ? 'tab tab-active' : 'tab'}
          onClick={() => setPage('dashboard')}
        >
          Tableau de bord (responsable)
        </button>
      </nav>

      <main className="app-main">
        {page === 'queue' ? <AgentQueuePage agentName={agentName} /> : <DashboardPage />}
      </main>
    </div>
  );
}

export default App;
