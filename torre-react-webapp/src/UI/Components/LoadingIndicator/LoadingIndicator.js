import styles from "./LoadingIndicator.module.scss";

const LoadingIndicator = (props) => {
  return (
    <button type="button" className="bg-rose-600 m-auto mb-6 bg-" disabled>
      <div
        className={`animate-spin h-10 w-10 mr-3 ${styles.anim} m-auto`}
        viewBox="0 0 24 24"
      ></div>
    </button>
  );
};

export default LoadingIndicator;
