import React from 'react';

const Rules = ({ setViewRules, rules }) => {
  console.log(rules);
  
  return (
    <div className='bg-blue-500 max-h-1/3 w-full overflow-y-scroll'>
      <div className='text-white mx-4'>
        <div>
          <h1 className='font-bold text-[38px] md:text-[60px] text-yellow-500'>Game Rules</h1>
          <ol className='list-decimal list-inside text-[20px] flex flex-col gap-4 justify-center'>
            {rules && rules.length > 0 ? (
              rules.map((rule, index) => (
                <li key={index} className='text-md'>
                  {rule.text}
                </li>
              ))
            ) : (
              <li className='text-white'>No Rule Assigned Yet</li>
            )}
          </ol>
          <button 
            onClick={() => setViewRules(false)} 
            className='bg-gray-700 p-2 my-8 rounded-2'
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rules;
