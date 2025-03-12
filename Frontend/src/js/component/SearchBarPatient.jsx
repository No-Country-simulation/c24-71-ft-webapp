import React, {useState } from "react";

const SearchBarPatient = ({ onSearchPatient }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Manejar cambios en el campo de búsqueda
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearchPatient) {
        onSearchPatient(value); // Llamar a la función de búsqueda en tiempo real
    }
  };

  return (
    <div>
      <input
        type="text"
        id="first_name"
        className="text-sm rounded-lg w-full p-2.5 bg-white text-black"
        placeholder="Juan Herrera"
        required
        
        value={searchQuery}
        onChange={handleChange} // Manejar cambios en tiempo real
      />
    </div>
  );
};

export default SearchBarPatient;