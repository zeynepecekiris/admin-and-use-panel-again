"use client";
import React, { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  function handleNameChange(event) {
    setName(event.target.value);
  }
  function handleSurnameChange(event) {
    setSurname(event.target.value);
  }

  return (
    <div>
      <input 
        type="text"
        name="name"
        onChange={handleChange}
        value={name} />
      <input 
      type="text"
      name="surname"
      onChange={handleChange}
      value={surname} />
      </div>
  );
}