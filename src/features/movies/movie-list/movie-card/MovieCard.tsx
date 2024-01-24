import React from "react";
import styles from "./MovieCard.module.scss";
import { MovieCardProps } from "./typings";
import { IMAGE_BASE_URL, PLACEHOLDER_IMAGE_URL } from "../../constants";

const MovieCard = (props: MovieCardProps) => {
  const { name, poster } = props;

  const handleError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    let targetEl = event.target as HTMLImageElement;
    targetEl.src = PLACEHOLDER_IMAGE_URL;
  };

  return (
    <div className={styles.container}>
      <div className={styles.poster}>
        <img
          src={`${IMAGE_BASE_URL}${poster}`}
          width="100%"
          height="100%"
          alt={name}
          onError={handleError}
          loading="lazy"
        />
      </div>
      <div className={styles.name}>{name}</div>
    </div>
  );
};

export default React.memo(MovieCard);
