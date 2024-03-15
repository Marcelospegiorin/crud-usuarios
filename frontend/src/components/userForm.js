import React, { useEffect, useRef, useState } from 'react'
import { toast } from "react-toastify";
import axios from 'axios'
import { phoneMask } from '../util/phoneMask'

export default function UserForm({ getUsers, onEdit, setOnEdit }) {

  const [telefone, setTelefone] = useState("");

  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      const dataFormatada = new Date(onEdit.date_birth).toISOString().split('T')[0];

      user.nome.value = onEdit.name;
      user.email.value = onEdit.email;
      user.fone.value = onEdit.phone;
      user.data_nascimento.value = dataFormatada;
    }
  }, [onEdit]);

  const handleChangeTelefone = (e) => {
    const valor = e.target.value;
    const telefoneFormatado = phoneMask(valor);
    setTelefone(telefoneFormatado);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if (
      !user.nome.value ||
      !user.email.value ||
      !user.fone.value ||
      !user.data_nascimento.value
    ) {
      return toast.warn("Preencha todos os campos!", {
        position: 'bottom-left'
      });
    }

    const telefoneCompleto = /^\(\d{2}\) \d{5}-\d{4}$/.test(user.fone.value);
    if (!telefoneCompleto) {
      return toast.warn("Número de telefone inválido!", {
        position: 'bottom-left'
      });
    }

    if (onEdit) {
      await axios
        .put("http://192.168.100.40:8800/" + onEdit.id, {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://192.168.100.40:8800", {
          nome: user.nome.value,
          email: user.email.value,
          fone: user.fone.value,
          data_nascimento: user.data_nascimento.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    user.nome.value = "";
    user.email.value = "";
    user.fone.value = "";
    user.data_nascimento.value = "";
    setTelefone("");

    setOnEdit(null);
    getUsers();
  };

  return (
    <form
      onSubmit={handleSubmit}
      ref={ref}
      className='bg-zinc-100 shadow-lg rounded-lg py-5 px-4 mt-5 min-w-[93%] lg:min-w-[70%] lg:justify-around lg:flex sm:items-center'
    >
      <div className='flex flex-col'>
        <label htmlFor="nome">Nome</label>
        <input type="text" id="nome" name="nome"
          className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2"
        />
      </div>
      <div className='flex flex-col mt-3 md:mt-0'>
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" name="email"
          className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2"
        />
      </div>
      <div className='flex flex-col mt-3 md:mt-0'>
        <label htmlFor="telefone">Telefone</label>
        <input type="text" id="fone" name="fone"
          value={telefone}
          onChange={handleChangeTelefone}
          className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2"
        />
      </div>
      <div className='flex flex-col mt-3 md:mt-0'>
        <label htmlFor="dataNascimento">Data de Nascimento</label>
        <input type="date" id="data_nascimento" name="data_nascimento"
          className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2"
        />
      </div>
      <button
        type="submit"
        className='bg-blue-700 text-white rounded-md py-2 px-3 mt-5 md:mt-0 w-full sm:w-auto h-10'
      >Salvar</button>
    </form>
  )
}
