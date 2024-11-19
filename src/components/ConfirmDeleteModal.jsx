// ConfirmDeleteModal.jsx
import { Flame } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ConfirmDeleteModal = ({ onConfirm, onCancel, userName }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleCancel = () => {
    setIsClosing(true); 
    setTimeout(() => {
      onCancel(); 
    }, 300); 
  };

  return (
    <AnimatePresence>
      {!isClosing && ( 
        <motion.div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-white p-8 rounded-md shadow-lg w-96">
            <Flame className="text-red-500 w-32 h-32 flex items-center justify-center mx-auto my-4" />
            <h2 className="text-center text-2xl">Are you sure?</h2>
            <p className="text-center my-4">
              Do you want to delete the user <b>{userName}</b>?
            </p>
            <div className="flex justify-around">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
                onClick={onConfirm}
                className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Confirm
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
                onClick={handleCancel} 
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmDeleteModal;
