import React from "react";
import styles from "./Button.module.css";

interface Props {
  text: string;
  disabled?: boolean;
  type?: "button" | "submit";
}

export const Button: React.FC<Props> = ({
  text,
  disabled = false,
  type = "button",
}) => {
  return (
    <button className={styles.button} disabled={disabled} type={type}>
      {text}
    </button>
  );
};
