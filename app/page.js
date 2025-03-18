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
      [name]: value 
    }));  
  }

  async function handleSubmit(event) {
    event.preventDefault();

    console.log("Gönderilen veri:", formData); 

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname
        })
        });
        console.log("Backend yanıtı (Response status):", response.status);

      if (!response.ok){
        throw new Error("HTTP error! status: ${response.status} ");
      }

      const data = await response.json();
      console.log("Answer the backend:", data); 
   
 
    
      if(data.role === "admin"){
        router.push("/admin");
      } else{
        router.push("/user");
      }
    } catch (error) {
      console.error("Hata oluştu:", error);
      setMessage("Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.");
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
