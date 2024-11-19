import React from "react";

const ModalNotification = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded-lg text-center">
        <p className="text-2xl">{message}</p>
        <button
          className=" text-xl mt-4 bg-slate-400/50 py-2 px-3 rounded-lg transition hover:bg-slate-400/70"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalNotification;
