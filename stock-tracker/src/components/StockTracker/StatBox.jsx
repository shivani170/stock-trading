export const StatBox = ({ label, value, highlight }) => (
  <div className={`stat${highlight ? ` stat-${highlight}` : ""}`}>
    <span className="stat-label">{label}</span>
    <span className="stat-value">{value}</span>
  </div>
);
