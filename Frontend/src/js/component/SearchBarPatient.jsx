import React, {useState, useEffect } from "react";

const SearchBarPatient = ({ onSearchPatient, resetSearch, displaySelectedName  }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Manejar cambios en el campo de búsqueda
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearchPatient) {
        onSearchPatient(value); // Llamar a la función de búsqueda en tiempo real
    } else {
      setSearchQuery(displaySelectedName)
    }
  };

  useEffect(() => {
    if (resetSearch) {
        setSearchQuery(""); // Limpiar el campo de búsqueda
    }
}, [resetSearch]);

  useEffect(() => {
    if (displaySelectedName) {
      setSearchQuery(displaySelectedName)
    }
  }, [displaySelectedName])

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