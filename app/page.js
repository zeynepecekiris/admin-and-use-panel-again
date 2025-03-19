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
   
      const data = await response.json();
      console.log("Answer the backend:", data ); 

      if (response.ok) {
        console.log("🔍 localStorage'a kaydedilecek role:", typeof data.role, data.role);
        console.log("🔍 localStorage'a kaydedilecek token:", typeof data.token, data.token);

        if (!data.role || !data.token) {
          console.error(" Beklenen veri eksik! Backend hatalı yanıt döndürüyor.");
          console.error(" Backend yanıtı:", data);
          throw new Error("Backend yanlış veri döndürdü!");
        }
      }

      localStorage.setItem("role", data.role);
      localStorage.setItem("token", data.token);


      if (data.role === "admin") {
        console.log("Admin olarak giriş yapıldı, /admin'e yönlendiriliyor...");
        router.push("/admin");
      } else {
        console.log("User olarak giriş yapıldı, /user'a yönlendiriliyor...");
        router.push("/user");
      }
    } else {
      alert("Login failed: " + data.message);
    }
  } catch (error) {
    console.error(" Hata oluştu!", error);
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

