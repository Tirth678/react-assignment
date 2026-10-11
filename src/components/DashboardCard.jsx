import React from 'react';

const DashboardCard = React.memo(({ title, value, icon, color }) => {
  return (
    <div className="card dashboard-card" style={{ borderTop: `4px solid ${color}` }}>
      <div className="dashboard-card-content">
        <div className="dashboard-card-icon">{icon}</div>
        <div className="dashboard-card-info">
          <h3>{title}</h3>
          <p className="dashboard-card-value">{value}</p>
        </div>
      </div>
    </div>
  );
});

DashboardCard.displayName = 'DashboardCard';

export default DashboardCard;
