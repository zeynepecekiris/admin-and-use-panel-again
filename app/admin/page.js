"use client";
import React from "react";
import styles from "./admin.module.css";
import { useRouter } from "next/navigation";

export default function Admin() {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Admin Panel</h1>
            <p>Welcome to the admin panel</p>
            <button 
                onClick={() => router.push("/")} 
                className={styles.button}
            >
                Back to Login
            </button>
        </div>
    );
}