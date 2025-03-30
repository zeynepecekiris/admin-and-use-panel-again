"use client";
import React, { useEffect, useState } from "react";
import styles from "./admin.module.css";
import { useRouter } from "next/navigation";


export default function Admin() {
    const router = useRouter();
    const [users,  setUsers ] = useState([]);


    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
    
        if (!token || role !== "admin") {
            router.push("/");
    }

        fetch("http://127.0.0.1:8000/users")
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error", error));

}, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Admin Panel</h1>
            <p>Welcome to the admin panel</p>


            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Role</th>
                        <th>Last Login</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.surname}</td>
                                <td>{user.role}</td>
                                <td>{user.login_time || "Never Logged In"}</td>
                                <td>{user.message || "No message"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>


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