import "./die.styles.scss";

const Die = (props) => {
  const { value } = props;
  return (
    <>
      <button className="die">{value}</button>
    </>
  );
};

export default Die;
