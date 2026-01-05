
const Piggy = ({ pet, gif, message }) => {
  return (
    <div className="piggy-section">
      <div className="pig-animation-container">
        <img 
          src={gif} 
          id="pigImg" 
          className="pig-display" 
          alt="Piggy animation" 
        />
      </div>
      <div id="bubble" className="speech-bubble">
        {message}
      </div>
    </div>
  );
};

export default Piggy;