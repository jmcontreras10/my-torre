import styles from "./PersonCard.module.scss";

const PersonCard = (props) => {
  return (
    <div className={`bg-secondary p-5 color-white ${styles.prsCard}`}>
      <div className={`flex flex-col text-center content-center ${styles.inOn}`}>
        <img
          src={props.picture}
          className={`object-contain h-28 w-full mb-5 ${styles.imga}`}
          alt={props.username}
        />                
        <p>{props.username}</p>
        <p>{props.name}</p>
      </div>
    </div>
  );
};

export default PersonCard;
