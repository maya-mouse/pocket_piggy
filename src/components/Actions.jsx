const Actions = ({ onAction, actionsConfig }) => {
 const labelMap = {
    feed: 'Їсти',
    play: 'Грати',
    sleep: 'Спати',
    clean: 'Мити',
    heal: 'Ліки',
    dance: 'Танці'
  };

  return (
    <div className="btn-grid">
      {Object.keys(actionsConfig).map((id) => (
        <button 
          key={id} 
          id={id} 
          className={`btn-${id}`}
          onClick={() => onAction(id)}
        >
          {labelMap[id] || id}
        </button>
      ))}
    </div>
  );
};

export default Actions;