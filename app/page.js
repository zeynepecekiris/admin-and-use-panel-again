"use client";
import React, { useState } from "react";
import styles from "./page.module.css"; 
import { useRouter } from "next/navigation";

export default function App() {

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
   
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  function handleChange(event){
    const {name, value} = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));  
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
        const response = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
            name: formData.name,
            surname: formData.surname
           }),
        });
   
      const data = await response.json();
      console.log("Backend response:", data ); 

      if (response.ok) {
          if (!data.role || !data.token) {
            throw new Error("Missing role or token");
          }
          
          localStorage.setItem("role", data.role);
          localStorage.setItem("token", data.token);
          localStorage.setItem("name", formData.name);
          localStorage.setItem("surname", formData.surname);

          if (data.role === "admin") {
              router.push("/admin");
          } else if (data.role === "user") {
          router.push("/user");
          } else {
          throw new Error("Unknown role!");
          }
      } else {
         alert("Login failed: " + data.message);
      }
  } catch (error) {
    
      console.error("Error:", error);
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
          onChange={handleChange}
          value={formData.name}
        />
        <input 
          className={styles.input}
          type="text"
          name="surname"
          placeholder="Enter your surname"
          onChange={handleChange}
          value={formData.surname}
        />
       <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      <p className={styles.message}>{message}</p>
    </div>
  );
}

