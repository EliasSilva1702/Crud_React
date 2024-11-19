import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

const UserForm = ({ onSubmit, defaultValues, setIsOpen }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues,
  });

  // Estado local para manejar la animación de salida
  const [isClosing, setIsClosing] = useState(false);

  const handleCancel = () => {
    setIsClosing(true); 
    setTimeout(() => {
      reset(); 
      setIsOpen(false); 
    }, 300); 
  };

  // Define dinámicamente el título
  const title = defaultValues?.id ? "Update User" : "Create User";

  return (
    <AnimatePresence>
      {!isClosing && ( 
        <motion.main
          className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }} 
          transition={{ duration: 0.2 }} 
        >
          <form
            className="flex flex-col gap-4 w-fit mx-auto my-4 bg-white p-8 rounded-md shadow-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            
            <h1 className="text-center text-2xl md:text-4xl">{title}</h1>
            <input
              {...register("first_name")}
              placeholder="Name"
              className=" border-slate-900 border rounded-md px-3 py-2 placeholder:text-black/45"
            />
            <input
              {...register("last_name")}
              placeholder="Last name"
              className=" border-slate-900 border rounded-md px-3 py-2 placeholder:text-black/45"
            />
            <input
              {...register("email")}
              type="email"
              placeholder="Mail"
              className=" border-slate-900 border rounded-md px-3 py-2 placeholder:text-black/45"
            />
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className=" border-slate-900 border rounded-md px-3 py-2 placeholder:text-black/45"
            />
            <input
              {...register("birthday")}
              type="date"
              placeholder="Birthday"
              className="border-slate-900 border rounded-md px-3 py-2"
            />

            <div className="flex items-center justify-center gap-4">
              <button
                type="submit"
                className="bg-slate-900 transition hover:bg-slate-800 text-white px-3 py-2 rounded-md w-full"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-slate-900 transition hover:bg-slate-800 text-white px-3 py-2 rounded-md w-full"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default UserForm;
