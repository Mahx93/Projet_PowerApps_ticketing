import { useEffect, useState } from 'react';
import { listTickets } from '../services/ticketsApi';
import { computeStats } from '../services/ticketStats';
import type { TicketStats } from '../services/ticketStats';
import { StatusBadge } from '../components/Badges';

// Écran "responsable" : volumes, délais et charge d'équipe (cahier des
// charges — rôle Responsable). Calculs faits côté client à partir de la
// liste complète des tickets, pas de requête SharePoint dédiée.
export function DashboardPage() {
  const [stats, setStats] = useState<TicketStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    listTickets()
      .then((tickets) => setStats(computeStats(tickets)))
      .catch((err) => setError(err instanceof Error ? err.message : 'Impossible de charger les statistiques.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement du tableau de bord…</p>;
  if (error) return <p className="form-error">{error}</p>;
  if (!stats) return null;

  return (
    <>
      <div className="stat-row">
        <div className="stat-tile">
          <span className="stat-value">{stats.totalOuverts}</span>
          <span className="stat-label">Tickets ouverts</span>
        </div>
        <div className={stats.critiquesEnRetard > 0 ? 'stat-tile stat-tile-alert' : 'stat-tile'}>
          <span className="stat-value">{stats.critiquesEnRetard}</span>
          <span className="stat-label">Critiques en retard (&gt; 1h)</span>
        </div>
        <div className="stat-tile">
          <span className="stat-value">{stats.resolusSemaine}</span>
          <span className="stat-label">Résolus (7 derniers jours)</span>
        </div>
        <div className="stat-tile">
          <span className="stat-value">
            {stats.delaiMoyenResolutionHeures === null ? '—' : `${stats.delaiMoyenResolutionHeures.toFixed(1)} h`}
          </span>
          <span className="stat-label">Délai moyen de résolution</span>
        </div>
      </div>

      <h2 className="section-title">Répartition par statut</h2>
      <div className="status-breakdown">
        {stats.parStatut.map(({ statut, nombre }) => (
          <div key={statut} className="status-breakdown-item">
            <StatusBadge value={statut} />
            <span className="status-breakdown-count">{nombre}</span>
          </div>
        ))}
      </div>

      <h2 className="section-title">Charge par agent</h2>
      {stats.parAgent.length === 0 ? (
        <p className="empty-state">Aucun ticket ouvert pour le moment.</p>
      ) : (
        <table className="ticket-table">
          <thead>
            <tr>
              <th>Agent</th>
              <th>Tickets ouverts</th>
              <th>Dont critiques</th>
            </tr>
          </thead>
          <tbody>
            {stats.parAgent.map((row) => (
              <tr key={row.agent}>
                <td className="ticket-title">{row.agent}</td>
                <td>{row.ouverts}</td>
                <td>{row.critiques}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
