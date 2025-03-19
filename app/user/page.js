"use client";
import React, {useEffect, useState} from "react";
import styles from "./user.module.css";
import { useRouter } from "next/navigation";

export default function User() {
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() =>{
    try {

        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        console.log("USER role:", role);
        console.log("Token:", token);

        if (!token) {
            console.log("Didn't find to token...");
            router.push("/"); 
          } else if (role === "admin") {
            router.push("/admin"); 
          } else {
            console.log("User olarak giriş yapıldı, /user'a yönlendiriliyor...");
            router.push("/user");
          }
        }  catch (error) {
            console.error("Hata oluştu:", error);
            console.error("📌 Hata detayları:", error.stack);
          }
        },[]);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>User Panel</h1>
            <p>Welcome to the user panel</p>
            <button 
                className={styles.button}
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    router.push("/");
                }}
            >
                Logout
            </button>
        </div>
    );
}