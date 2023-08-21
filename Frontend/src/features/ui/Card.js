import classes from "./styles/Card.module.css";

function Card({ children, className, courseId, onClick }) {
  const styles = `${classes.card} ${className}`;

  return (
    <div className={styles} key={courseId} onClick={onClick}>
      {children}
    </div>
  );
}

export default Card;
