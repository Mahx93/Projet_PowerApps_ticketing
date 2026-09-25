import { useEffect, useState } from 'react';
import { getContext } from '@microsoft/power-apps/app';
import { AgentQueuePage } from './pages/AgentQueuePage';
import './App.css';

function App() {
  const [agentName, setAgentName] = useState('');

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

      <main className="app-main">
        <AgentQueuePage agentName={agentName} />
      </main>
    </div>
  );
}

export default App;
