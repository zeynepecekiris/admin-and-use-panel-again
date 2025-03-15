"use client";
import React, { useEffect} from "react";
import styles from "./admin.module.css";
import { useRouter } from "next/navigation";

export default function Admin() {
    const router = useRouter();

    useEffect(() =>{
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
    })

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Admin Panel</h1>
            <p>Welcome to the admin panel</p>
            <button 
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    router.push("/");
                }} 
                className={styles.button}
            >
                Logout
            </button>
        </div>
    );
}