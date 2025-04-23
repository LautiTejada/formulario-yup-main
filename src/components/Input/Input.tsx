import React from "react";
import styles from "./Input.module.css";

interface Props {
  label: string;
  name: string;
  value: string;
  type?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const Input: React.FC<Props> = ({
  label,
  name,
  value,
  type = "text",
  handleChange,
  error,
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        type={type}
        className={`${styles.input} ${error ? styles.inputError : ""}`}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
