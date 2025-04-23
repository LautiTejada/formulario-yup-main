import React, { useState } from "react";
import * as yup from "yup";
import Swal from "sweetalert2";

import styles from "./Formulario.module.css";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

const schema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio").min(3, "Mínimo 3 caracteres"),
  correo: yup.string().required("El correo es obligatorio").email("Correo inválido"),
  contraseña: yup.string().required("La contraseña es obligatoria").min(6, "Mínimo 6 caracteres"),
  repetirContraseña: yup
    .string()
    .oneOf([yup.ref("contraseña")], "Las contraseñas no coinciden")
    .required("Repetir contraseña es obligatorio"),
});

export const Formulario = () => {
  const [values, setValues] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    repetirContraseña: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      await schema.validate(values, { abortEarly: false });
      setErrors({});

      Swal.fire("Formulario enviado correctamente", "", "success");

      setValues({
        nombre: "",
        correo: "",
        contraseña: "",
        repetirContraseña: "",
      });
      setSubmitted(false);
    } catch (err: any) {
      const newErrors: Record<string, string> = {};
      err.inner.forEach((error: any) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  const hasErrors =
    Object.keys(errors).length > 0 || Object.values(values).some((v) => v === "");

  return (
    <form onSubmit={handleSubmit} className={styles.formulario}>
      <Input
        label="Nombre"
        name="nombre"
        value={values.nombre}
        handleChange={handleChange}
        error={submitted ? errors.nombre : undefined}
      />
      <Input
        label="Correo"
        name="correo"
        type="email"
        value={values.correo}
        handleChange={handleChange}
        error={submitted ? errors.correo : undefined}
      />
      <Input
        label="Contraseña"
        name="contraseña"
        type="password"
        value={values.contraseña}
        handleChange={handleChange}
        error={submitted ? errors.contraseña : undefined}
      />
      <Input
        label="Repetir Contraseña"
        name="repetirContraseña"
        type="password"
        value={values.repetirContraseña}
        handleChange={handleChange}
        error={submitted ? errors.repetirContraseña : undefined}
      />

      <Button text="Enviar" type="submit" disabled={hasErrors} />
    </form>
  );
};
