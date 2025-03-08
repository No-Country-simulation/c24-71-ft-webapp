import React from "react";

const Modal = ({ open, onClose, children }) => {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`
            fixed inset-0 flex justify-center items-center transition-colors
            ${open ? "visible bg-black/20" : "invisible"}
          `}
    >
        {/* Modal */}
      <div
      onClick ={(e) => e.stopPropagation()} 
      className={`
          bg-[#4E5C82] text-black rounded-xl shadow p-6 transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}>
            <botton
            onClick={onClose} 
            className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">
                X
            </botton>
      {children}
      </div>
    </div>
  );
};

export default Modal;
