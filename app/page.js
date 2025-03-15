"use client";
import React, { useState } from "react";
import styles from "./page.module.css"; 
import { useRouter } from "next/navigation";

export default function App() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  
  function handleNameChange(event) {
    event.preventDefault();

  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === "Login successful") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      if (data.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/user");
      }
    } else {
      setMessage("Invalid credentials");
    }
  })
  .catch(error => console.error("Error:", error));
}

  
  
 return (
    <div className={styles.container}>
      <h1 className={styles.header}>Login Panel</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input 
          className={styles.input}
          type="text"
          name="name"
          placeholder="Enter your name"
          onChange={handleNameChange}
          value={name}
        />
        <input 
          className={styles.input}
          type="text"
          name="surname"
          placeholder="Enter your surname"
          onChange={handleSurnameChange}
          value={surname}
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
