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
    setName(event.target.value);
  }
  
  function handleSurnameChange(event) {
    setSurname(event.target.value);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    // Girilen değerleri küçük harfe çevirip boşlukları temizleyelim
    const inputName = name.toLowerCase().trim();
    const inputSurname = surname.toLowerCase().trim();

    if (inputName === "admin" && inputSurname === "admin") {  // Her bir alanı ayrı kontrol edelim
      setMessage("Welcome to admin panel"); 
      setTimeout(() => {
        router.push("/admin");
      }, 1000);
    } else if (inputName && inputSurname) {  // Boş olmayan herhangi bir giriş
      setMessage("Welcome to user panel");
      setTimeout(() => {
        router.push("/user");
      }, 1000);
    } else {  
      setMessage("Please check your information");
    }
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
