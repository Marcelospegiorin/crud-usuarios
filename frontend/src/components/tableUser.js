import React from 'react';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { toast } from "react-toastify";

//ICONS
import { MdDelete, MdEditSquare  } from "react-icons/md";

export default function TableUser({users, setUsers, setOnEdit}) {

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://192.168.100.40:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <div className='mt-12 w-[93%] sm:max-w-[70%] bg-slate-600 p-3 shadow-lg rounded-md mb-10 text-gray-200'>
      <table className='w-full break-all'>
        <thead className='border-b-gray-300 border-b-2'>
          <tr>
            <th >Nome</th>
            <th >E-mail</th>
            <th className='hidden sm:table-cell w-[20%]'>Telefone</th>
            <th className=''></th>
            <th></th>
          </tr>
        </thead>
        <tbody className='text-sm'>
          {users.map((item, i) => (
            <tr key={i} >
              <td className='w-[33%]'>{item.name}</td>
              <td className='w-[33%]'>{item.email}</td>
              <td className='hidden sm:table-cell w-[20%]'>{item.phone}</td>
              <td className='w-[2%]'><MdEditSquare size={25} className='hover:text-green-600 cursor-pointer' onClick={() => handleEdit(item)}/></td>
              <td className='w-[2%]'><MdDelete size={25} className='hover:text-red-600 cursor-pointer' onClick={() => handleDelete(item.id)}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
