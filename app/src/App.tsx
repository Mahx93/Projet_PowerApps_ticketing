import { useEffect, useState } from 'react';
import { getContext } from '@microsoft/power-apps/app';
import { AgentQueuePage } from './pages/AgentQueuePage';
import { DashboardPage } from './pages/DashboardPage';
import { isResponsable } from './services/entraGroups';
import './App.css';

type Page = 'queue' | 'dashboard';

function App() {
  const [agentName, setAgentName] = useState('');
  const [page, setPage] = useState<Page>('queue');
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    getContext()
      .then((ctx) => {
        setAgentName(ctx.user.fullName ?? '');
        return isResponsable(ctx.user.userPrincipalName ?? '');
      })
      .then(setShowDashboard)
      .catch((err) => {
        // Contexte utilisateur ou vérification de groupe indisponible (ex:
        // exécution locale hors Teams) : pas bloquant, le Dashboard reste
        // masqué par défaut.
        console.error('Vérification du groupe Responsables échouée :', err);
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
        {showDashboard && (
          <button
            type="button"
            className={page === 'dashboard' ? 'tab tab-active' : 'tab'}
            onClick={() => setPage('dashboard')}
          >
            Tableau de bord (responsable)
          </button>
        )}
      </nav>

      <main className="app-main">
        {page === 'dashboard' && showDashboard ? <DashboardPage /> : <AgentQueuePage agentName={agentName} />}
      </main>
    </div>
  );
}

export default App;
