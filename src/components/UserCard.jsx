import { ArchiveX, ImageUp } from "lucide-react";
import { motion } from "framer-motion";
const UserCard = ({ user, onDelete, handleEdit }) => {
  return (
    <section className="flex flex-col gap-8 w-full sm:w-fit md:w-full border p-8 shadow-lg rounded-md my-4 mx-auto">
      <div className="my-4 w-full">
        <h3 className="text-xl text-center md:text-3xl my-4 border-b-2 w-full">
          {user.first_name} {user.last_name}
        </h3>

        <p className="text-xl">
          Email:{" "}
          <span className="font-semibold text-base sm:text-sm md:text-base lg:text-lg">
            {user.email}
          </span>
        </p>

        <p className="text-xl">
          Birthday:{" "}
          <span className="font-semibold text-base sm:text-sm md:text-base lg:text-lg">
            {user.birthday}
          </span>
        </p>
      </div>

      <div className="flex items-end gap-4 justify-end">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
          className="bg-slate-800 text-white w-fit py-2 px-3 rounded-md hover:bg-slate-700 flex items-center gap-2 justify-center"
          onClick={() => handleEdit(user)}
        >
          Update
          <ImageUp className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
          className="bg-red-800 text-white w-fit py-2 px-3 rounded-md hover:bg-red-700 flex items-center gap-2 justify-center"
          onClick={() => onDelete(user.id)}
        >
          Delete
          <ArchiveX className="w-5 h-5" />
        </motion.button>
      </div>
    </section>
  );
};

export default UserCard;
