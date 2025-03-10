"use client";
import React from "react";
import styles from "./user.module.css";
import { useRouter } from "next/navigation";


export default function User() {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>User Panel</h1>
            <p>Welcome to the user panel</p>
            <button 
                onClick={() => router.push("/")} 
                className={styles.button}
            >
                Back to Login
            </button>
        </div>
    );
}