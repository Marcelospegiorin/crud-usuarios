import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UserForm from "./components/userForm";
import TableUser from "./components/tableUser"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default App;

function App() {

  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://192.168.100.40:8800/");
      setUsers(res.data);
      toast.success('Dados carregados!', {
        position: 'bottom-left'
      });
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST" || "ERR_CONNECTION_REFUSED") {
        toast.error("Ocorreu um erro ao carregar os dados", {
          position: 'bottom-left'
        });
      }
      console.log(error)
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <div>
      <div className="container mx-auto font-montserrat py-3 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold mt-5 text-center">CRUD DE USUÁRIOS</h1>
        <UserForm
          onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers}
        />
        <TableUser
          setOnEdit={setOnEdit} users={users} setUsers={setUsers}
        />
      </div>

      <ToastContainer autoClose={1300} closeOnClick />
    </div>
  );
}