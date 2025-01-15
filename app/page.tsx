"use client";
import { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; 

interface User {
  name: string;
  email: string;
}

export default function Home() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [editUser , setEditUser ] = useState<number | null>(null); 

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    setUsers(storedUsers);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === '' || email === '') {
      alert("Please fill all the fields");
    } else {
      if (editUser  !== null) {
        const updatedUsers = users.map((user, index) => 
          index === editUser  ? { name, email } : user
        );
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setEditUser (null); 
      } else {
        const newUser  = { name, email };
    const updatedUsers = [...users, newUser ];
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers)); 
      }
      setName('');
      setEmail('');
    }
  };

  const handleEdit = (index: number) => {
    const userToEdit = users[index];
    setName(userToEdit.name);
    setEmail(userToEdit.email);
    setEditUser (index); 
  };

  const handleRemove = (index: number) => {
    const updatedUsers = users.filter((_, i) => i !== index); 
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers)); 
  };

  return (
    // <div className="min-h-screen bg-blue-900 flex items-center justify-center">
    //   <div className="bg-blue-950 p-6 rounded-3xl w-2/4">
    //     <div className="bg-white pl-6 p-4 rounded-3xl">
    //       <h1 className="font-bold text-4xl">Add User</h1>
    //       <p>Enter name and email:</p>
    //       <form onSubmit={handleSubmit}>
    //         <label className="mr-2 font-bold text-2xl">Name:</label> <br />
    //         <input
    //           className="border-2 w-full p-2"
    //           placeholder="Enter your name"
    //           value={name}
    //           onChange={(e) => setName(e.target.value)}
    //         />{' '}
    //         <br />
    //         <label className="mr-2 font-bold text-2xl">Email:</label> <br />
    //         <input
    //           className="border-2 w-full p-2"
    //           placeholder="Enter your email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //         <div className="flex justify-center">
    //           <button className="bg-blue-950 text-white text-2xl pt-1 pl-12 pr-12 pb-1 font-bold rounded-lg mt-4">
    //             Submit
    //           </button>
    //         </div>
    //       </form>
    //     </div>
        
    //     <div className="bg-white p-2 rounded-3xl mt-4">
    //       <div className="text-white">
    //         {users.length > 0 && (
    //           <div className="bg-blue-950 p-4 rounded-2xl ">
    //             <h2 className="font-bold text-2xl">User  List</h2>
    //             <ul>
    //               {users.map((user, index) => (
    //                 <li key={index} className="flex justify-between items-center border-b py-2">
    //                   <div>
    <div className="min-h-screen bg-blue-900 flex items-center justify-center p-4">
      <div className="bg-blue-950 p-6 rounded-3xl w-full max-w-md">
        <div className="bg-white pl-6 p-4 rounded-3xl">
          <h1 className="font-bold text-4xl">Add User</h1>
          <p>Enter name and email:</p>
          <form onSubmit={handleSubmit}>
            <label className="mr-2 font-bold text-2xl">Name:</label> <br />
            <input
              className="border-2 w-full p-2"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />{' '}
            <br />
            <label className="mr-2 font-bold text-2xl">Email:</label> <br />
            <input
              className="border-2 w-full p-2"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-center">
              <button className="bg-blue-950 text-white text-2xl pt-1 pl-12 pr-12 pb-1 font-bold rounded-lg mt-4">
                Submit
              </button>
            </div>
          </form>
        </div>
        
        <div className="bg-white p-2 rounded-3xl mt-4">
          <div className="text-white">
            {users.length > 0 && (
              <div className="bg-blue-950 p-4 rounded-2xl ">
                <h2 className="font-bold text-2xl">User  List</h2>
                <ul>
                  {users.map((user, index) => (
                    <li key={index} className="flex justify-between items-center border-b py-2 overflow-hidden">
                      <div>
                        <span className="font-bold">{user.name}</span> : <span>{user.email}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row space-x-2 sm:space-x-2 space-y-2 sm:space-y-0 ">
                        <button onClick={() => handleEdit(index)} className="text-white ml-2">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleRemove(index)} className="text-red-500">
                          <FaTrash />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          </div>
    </div>
    </div>
 );
 }