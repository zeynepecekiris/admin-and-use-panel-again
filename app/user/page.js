"use client";
import React, {useEffect} from "react";
import styles from "./user.module.css";
import { useRouter } from "next/navigation";

export default function User() {
    const router = useRouter();

    useEffect(() =>{
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if(!token || role !== "user"){
            router.push("/");
        }
    }, []);

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