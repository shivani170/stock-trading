export const SkeletonRow = () => (
  <div className="stock-card skeleton-row">
    <div className="skel-main">
      <div className="skel skel-avatar" />
      <div className="skel-info">
        <div className="skel skel-line" style={{ width: "55%" }} />
        <div className="skel skel-line-sm" style={{ width: "30%" }} />
      </div>
      <div className="skel-right">
        <div className="skel skel-price" style={{ width: 72 }} />
        <div className="skel skel-change" style={{ width: 80 }} />
      </div>
    </div>
    <div className="chart-skeleton" style={{ marginTop: 14 }} />
    <div className="skel-stats-row">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="skel-stat-block">
          <div className="skel skel-line-sm" style={{ width: 28 }} />
          <div className="skel skel-line" style={{ width: 44, marginTop: 4 }} />
        </div>
      ))}
    </div>
  </div>
);
