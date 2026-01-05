const Stats = ({ pet }) => {
  const statsConfig = [
    { label: "Ситість", value: pet.hunger, icon: "bar_icons/stat_hunger.gif" },
    { label: "Щастя", value: pet.happiness, icon: "bar_icons/stat_happiness.gif" },
    { label: "Здоров'я", value: pet.health, icon: "bar_icons/stat_health.gif" },
    { label: "Енергія", value: pet.energy, icon: "bar_icons/stat_energy.gif" },
  ];

  return (
    <div className="stats-container" style={{ padding: '0 15px' }}>
      {statsConfig.map((s) => (
        <div key={s.label} className="stat-row" style={{ marginBottom: '10px' }}>
          <div className="stat-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <div className="stat-info" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img 
                src={s.icon} 
                className="stat-icon" 
                alt="" 
                style={{ width: '30px', height: '30px', objectFit: 'contain' }} 
              />
              <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#d63384' }}>{s.label}</span>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: s.value < 20 ? 'red' : '#d63384' }}>
              {Math.round(s.value)}%
            </span>
          </div>
          <div className="bar-bg" style={{ height: '10px', backgroundColor: '#fff0f3', borderRadius: '10px', overflow: 'hidden' }}>
            <div 
              className="bar-fill" 
              style={{ 
                height: '100%',
                width: `${s.value}%`, 
                backgroundColor: s.value < 20 ? "#ff4d4d" : "#ff69b4",
                transition: 'width 0.3s ease'
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;