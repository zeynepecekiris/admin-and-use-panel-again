"use client";
import React, { useState } from "react";
import styles from "./page.module.css"; 
import { useRouter } from "next/navigation";

export default function App() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleSurnameChange(event) {
    setSurname(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
   
  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, password, surname })
  })
  .then(response=>{
    if(!response.ok){
      throw new Error("Invalid credentials");
      }
      return response.json();
  })
  .then(data => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    setMessage("Login successful");
    setTimeout(()=>{
      if(data.role === "admin"){
        router.push("/admin");
      }else{
        router.push("/user");
      }
    }, 1000);
  })
  .catch(error => {
    setMessage("Invalid name, surname, or password");
      console.error("Error:", error);
    });
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
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <input 
          className={styles.input}
          type="text"
          name="surname"
          placeholder="Enter your surname"
          onChange={(e) => setSurname(e.target.value)}
          value={surname}
        />
        <input 
          className={styles.input}
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      <p className={styles.message}>{message}</p>
    </div>
  );
}
