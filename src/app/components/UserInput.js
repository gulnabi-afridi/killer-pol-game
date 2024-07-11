import Image from 'next/image';
import React from 'react'
import { useState } from 'react';

const UserInput = ({ players, setPlayers, moneyPaid, setPaid }) => {
    const [username, setUsername] = useState('');
    const [counter, setcounter] = useState(0)
    const [lifes, setLife] = useState(3);
    const [model, setModel] = useState(false);
    const [selectedUser, setSelectedUser] = useState();
    const [imageOpacity, setImageOpacity] = useState({});

    const addUser = () => {
        if (username.trim()) {

            setUsername('');
            setcounter(precounter => precounter + 1);
            setPlayers([...players, { id: counter, player_name: username, lives: lifes, hit: 0, miss: 0,black:0,vis:false}])

        }
    };

    const addSelectedUserLife = (user) => {
        const updatedarray = [...players];

        for (let i = 0; i < updatedarray.length; i++) {
            if (updatedarray[i].id === user.id) {
                updatedarray[i].lives += 1;
                break;
            }
        }

        setPlayers(updatedarray);
    }
    const deleteItem = (userId) => {
        setPlayers(players.filter(user => user.id !== userId));
    };
    const SubSelectedUserLife = (user) => {
        const updatedarray = [...players];

        for (let i = 0; i < updatedarray.length; i++) {
            if (updatedarray[i].id === user.id && updatedarray[i].lives != 0) {
                updatedarray[i].lives -= 1;
                break;
            }
        }

        setPlayers(updatedarray);
    }

    const handlePayButtonClick = (e, userId) => {
        e.stopPropagation(); // Prevent event bubbling
        
        // Toggle opacity state
        setImageOpacity(prev => ({
            ...prev,
            [userId]: prev[userId] === 'opacity-40' ? 'opacity-90' : 'opacity-40'
        }));
    };

    return (
        <div>
            <div className='lg:block hidden'>

<Image src='/images/logo2.svg' width={350} height={350} alt='no image' />
</div>
            <div className='flex relative z-10 justify-center items-center  mb-4'>
                
                <div className='flex flex-wrap flex-row  justify-between gap-6 md:gap-12'>
                    <div className='flex items-center  gap-4 bg-gray-800 px-4 py-2 rounded-sm' >
                        <h1 clas>Max Lives(5)</h1>
                        <input onChange={(e) => setLife(e.target.value)} className='w-[20px] h-[20px] text-black rounded-sm p-1' type="text" placeholder='3' />
                    </div>
                    <div className='flex items-center gap-4'>

                        {/* <div onClick={() => setPaid(true)} className='flex items-center justify-between cursor-pointer gap-4 bg-gray-800 px-4 py-2 rounded-sm' >
                            <h1>Paid All</h1>
                            <button>
                                <Image width={25} height={25} className={`hover:rotate-90 ${moneyPaid ? 'opacity-90' : ' opacity-40'}`} src='/images/money.png' alt='no image' />
                            </button>
                        </div> */}
                    </div>

                </div>

            </div>

            <div className=''>
                {/* Input Box */}

                <div className='flex justify-center items-center '>
                    {model && <dialog id="myDialog" className="bg-blue-400 z-20 flex flex-col gap-5 justify-center items-center w-1/2 h-[300px]">
                        <h2 className='text-[30px] font-semibold' >{selectedUser.player_name}</h2>
                        <h2 className='text-[25px] font-semibold' >Handicaped lives {selectedUser.lives}</h2>
                        <div className='flex items-center cursor-pointer gap-4 bg-gray-800 px-4 py-2 rounded-sm' >
                            <h1 onClick={() => addSelectedUserLife(selectedUser)} className='text-white'>⚪️ Add Lives</h1>

                        </div>
                        <div className='flex items-center cursor-pointer gap-4 bg-gray-800 px-4 py-2 rounded-sm' >
                            <h1 onClick={() => SubSelectedUserLife(selectedUser)} className='text-white'>❌ Substract Lives</h1>

                        </div>
                        <button id="closeDialog " onClick={() => (setModel(false), setSelectedUser(''))} className='hover:bg-gray-800 hover:text-white font-semibold p-2 rounded-sm'>Close</button>
                    </dialog>
                    }



                    <div className="flex cursor:pointer">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter name"
                            className="p-2 rounded mb-4 text-black mr-2 bg-white border border-gray-300 shadow-sm"
                        />

                        <button
                            onClick={() => addUser()}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="flex justify-center items-center flex-col">
                    <div className="h-64 px-4 overflow-y-auto shadow-sm scrollbar-custom">
                        {players && players.map((user, index) => (
                            <div
                                
                                key={index}
                                className="bg-gray-800 cursor-pointer p-2 w-[18rem] rounded mt-2 flex items-center"
                            >
                                <span onClick={() => (setModel(true), setSelectedUser(user))} className="flex-grow text-[15px]">{index + 1} <span className="ml-2">{user.player_name}</span></span>

                                <div className="flex items-center">
                                    <div onClick={() => deleteItem(user.id)}>🗑️</div>
                                    <button
                                        onClick={(e) => handlePayButtonClick(e, user.id)}
                                        className="ml-2 text-red-500"
                                    >
                                        <Image
                                            width={25}
                                            height={25}
                                            className={`hover:rotate-90 z-10 ${imageOpacity[user.id] || 'opacity-40'}`}
                                            src="/images/money.png"
                                            alt="no image"
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserInput