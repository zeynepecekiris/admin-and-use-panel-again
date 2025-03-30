"use client";
import React, {useEffect, useState} from "react";
import styles from "./user.module.css";
import { useRouter } from "next/navigation";
import { style } from "@mui/system";

export default function User() {
    const router = useRouter();
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");


    useEffect(() => {
    try {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token) {
            router.push("/"); 
        } else if (role === "admin") {
            router.push("/admin"); 

        }

        setName(localStorage.getItem("name") || "" );
        setSurname(localStorage.getItem("surname") || "");

          
    } catch (error) {
            console.error(error);
            
          }
    },[]);

    const handleSendMessage = async () => {
        try {
            const response = await fetch("http://localhost:8000/message", {
                method: "POST",
                headers: {
                     "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    surname,
                    message
                })
            });

            const data = await response.json();
            if (response.ok){
                alert("sent to message");
                setMessage("");
            } else {
                alert("error, message didn't send..")
            }

        } catch (error) {
            console.error(error);
          }
        
    };



    return (
        <div className={styles.container}>
            <h1 className={styles.header}>User Panel</h1>
            <p>Welcome to the user panel</p>

            <textarea 
            className={styles.textarea}
            placeholder="write your message here please"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />
            <button className={styles.button} onClick={handleSendMessage}>Submit</button>


            <button 
                className={styles.button}
                onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    localStorage.removeItem("name");
                    localStorage.removeItem("surname");
                    router.push("/");
                }}
            >
                Logout
            </button>
        </div>
    );
}