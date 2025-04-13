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
        const token = localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_KEY)
        const role = localStorage.getItem(process.env.NEXT_PUBLIC_ROLE_KEY)

        if (!token) {
            router.push("/"); 
        } else if (role === "admin") {
            router.push("/admin"); 
        }

        setName(localStorage.getItem(process.env.NEXT_PUBLIC_NAME_KEY) || "" );
        setSurname(localStorage.getItem(process.env.NEXT_PUBLIC_SURNAME_KEY) || "");

          
    } catch (error) {
            console.error(error);
            
          }
    },[]);

    const handleSendMessage = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/message`, {
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
                    localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_KEY);
                    localStorage.removeItem(process.env.NEXT_PUBLIC_ROLE_KEY);
                    localStorage.removeItem(process.env.NEXT_PUBLIC_NAME_KEY);
                    localStorage.removeItem(process.env.NEXT_PUBLIC_SURNAME_KEY);
                    router.push("/");
                }}
            >
                Logout
            </button>
        </div>
    );
}