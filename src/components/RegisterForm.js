import React, { useState } from "react";

const RegisterForm = ({ setRegister }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirm_password: "",
    isAgree: false,
  });

  const [message, setMessage] = useState({
    type: "",
    body: "",
  });

  const validatePassword = (password) => {
    return password.length >= 6 ? true : false;
  };

  const handleChange = (e) => {
    const { type, name, value, checked } = e.target;
    setFormData((prevFormData) => {
      return { ...prevFormData, [name]: type === "checkbox" ? checked : value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password, confirm_password, isAgree } = formData;

    if (username && password && confirm_password) {
      if (validatePassword(password)) {
        if (password !== confirm_password) {
          setMessage({ type: "error", body: "Password didn't match!" });
        } else {
          if (isAgree) {
            localStorage.setItem("formData", JSON.stringify(formData));
            // setRegister(false);
            setTimeout(() => {
              setRegister(false);
            }, 2000);
            setMessage({ type: "success", body: "Register succeed!" });
            return true;
          } else {
            setMessage({
              type: "error",
              body: "Please agree terms and conditions!",
            });
          }
        }
      } else {
        setMessage({
          type: "error",
          body: "Password's length must be greater than or equal to 6!",
        });
      }
    } else {
      setMessage({ type: "error", body: "Please fill all the fields!" });
    }

    return false;
  };

  return (
    <section className="register">
      <h1 className="register--title">Register</h1>
      <p className="register-info">
        Please register by filling form to play 2d game!
      </p>
      <form className="register--form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter your name"
          onChange={handleChange}
          value={formData.username}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm password"
          onChange={handleChange}
          value={formData.confirm_password}
          required
        />
        <label htmlFor="isAgree">
          <input
            id="isAgree"
            name="isAgree"
            type="checkbox"
            checked={formData.isAgree}
            onChange={handleChange}
          />
          I agree with the terms and conditions of this website.
        </label>
        <input
          type="submit"
          value="Submit"
          style={{ alignSelf: "center", marginBottom: "5px" }}
        />
      </form>
      {message.body && (
        <p className={`message ${message.type}`}>{message.body}</p>
      )}
    </section>
  );
};

export default RegisterForm;
