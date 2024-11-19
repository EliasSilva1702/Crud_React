import React from "react";
import Header from "./components/Header";
import UserList from "./components/UserList";

const App = () => {
  return (
    <div className="font-outfit bg-[#fcfaea] min-h-screen">
      <Header />
      <UserList />
    </div>
  );
};

export default App;
