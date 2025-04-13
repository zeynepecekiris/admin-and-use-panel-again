"use client";
import React, { useEffect, useState } from "react";
import styles from "./admin.module.css";
import { useRouter } from "next/navigation";

export default function Admin() {
    const router = useRouter();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem(process.env.NEXT_PUBLIC_TOKEN_KEY);
        const role = localStorage.getItem(process.env.NEXT_PUBLIC_ROLE_KEY);
    
        if (!token || role !== "admin") {
            router.push("/");
        }

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`)
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
                            <td colSpan="6">No users found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <button 
                onClick={() => {
                    localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_KEY);
                    localStorage.removeItem(process.env.NEXT_PUBLIC_ROLE_KEY);
                    router.push("/");
                }} 
                className={styles.button}
            >
                Logout
            </button>
        </div>
    );
}