import React from "react";
import Navbar from "../../component/Navbar.jsx";
import SideBar from "../../component/SideBar.jsx";
import SearchPatient from "./SearchPatient.jsx";
import AddPatient from "./AddPatient.jsx";
import ListPatients from "./ListPatients.jsx";

const PatientManagement = () => {
  return (
    <div>
      <SearchPatient />
      <ListPatients />
    </div>
  );
};

export default PatientManagement;
