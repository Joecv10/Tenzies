import "./die.styles.scss";

const Die = (props) => {
  const { id, number, isHeld } = props.die;
  const { holdDice } = props;

  return (
    <>
      <button
        onClick={() => holdDice(id)}
        className={!isHeld ? "die" : "die-active"}
      >
        {number}
      </button>
    </>
  );
};

export default Die;
