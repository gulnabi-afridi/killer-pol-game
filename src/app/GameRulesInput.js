import React, { useState } from 'react';
import UserInput from './components/UserInput';
import Link from 'next/link';
import Rules from './components/Rules';

const GameRulesInput = ({ players, setPlayers, moneyPaid, setPaid, firstPrice, secondPrice, thirdPrice, setFirstPrice, setSecondPrice, setThirdPrice,rules,setRules }) => {
    
    const [newRule, setNewRule] = useState('');
    const [viewRules, setViewRules] = useState(false);

    const addRule = () => {
        if (newRule.trim()) {
            setRules(prevRules => [...prevRules, { id: prevRules.length, text: newRule.trim() }]);
            setNewRule('');
           
        }
    };


    const removeRule = (id) => {
        setRules(rules.filter(rule => rule.id !== id));
    };

    return (
        <div className='relative'>
            {viewRules && (
                <div className='absolute w-full z-20 top-0'>
                    <Rules setViewRules={setViewRules} rules={rules} />
                </div>
            )}

            <div className='p-4 lg:flex-row grid grid-cols-1 lg:flex lg:justify-between'>
                <div className='mb-4'>
                    <h1 className='font-semibold mb-2'>Enter Game Rules</h1>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={newRule}
                            onChange={(e) => setNewRule(e.target.value)}
                            placeholder="Enter rule"
                            className="flex-grow p-2 rounded mb-4 text-black mr-2 bg-white border border-gray-300 shadow-sm"
                        />
                        <button
                            onClick={addRule}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                        >
                            +
                        </button>
                    </div>
                    {/* Uncomment this section if you want to display the list of rules inline */}
                    {/* <div className='h-44 overflow-y-auto border-2 border-yellow-500 p-2'>
                        {rules.map((rule, index) => (
                            <div key={rule.id} className='flex items-center mb-2'>
                                <span>{index + 1}. </span>
                                <span className='flex-grow max-w-64 py-2 px-2 ml-2 bg-gray-500 text-white truncate overflow-hidden'>
                                    {rule.text}
                                </span>
                                <button
                                    onClick={() => removeRule(rule.id)}
                                    className='ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}
                    </div> */}
                    <button onClick={() => setViewRules(true)} className='bg-gray-700 p-2 rounded-2'>View Rules</button>
                </div>

                <div className='order-2 mt-10 lg:mt-0 lg:order-none'>
                    <UserInput players={players} setPlayers={setPlayers} moneyPaid={moneyPaid} setPaid={setPaid} />
                </div>

                <div>
                    <div className='flex flex-col gap-2'>
                        <span>1st Price: </span>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={firstPrice}
                                onChange={(e) => setFirstPrice(e.target.value)}
                                placeholder="Enter 1st price"
                                className="flex-grow p-2 rounded text-black mr-2 bg-white border border-gray-300 shadow-sm"
                            />
                           
                        </div>

                        <span>2nd Price: </span>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={secondPrice}
                                onChange={(e) => setSecondPrice(e.target.value)}
                                placeholder="Enter 2nd price"
                                className="flex-grow p-2 rounded text-black mr-2 bg-white border border-gray-300 shadow-sm"
                            />
                           
                        </div>

                        <span>3rd Price: </span>
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={thirdPrice}
                                onChange={(e) => setThirdPrice(e.target.value)}
                                placeholder="Enter 3rd price"
                                className="flex-grow p-2 rounded text-black mr-2 bg-white border border-gray-300 shadow-sm"
                            />
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameRulesInput;
