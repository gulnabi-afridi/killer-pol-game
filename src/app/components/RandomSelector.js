// import React, { useState } from 'react';

// const RandomSelector = ({ players, setPlayers, selectedPlayer, setSelectedPlayer }) => {
//   const [spinning, setSpinning] = useState(false);
//   const [animationKey, setAnimationKey] = useState(0);

//   const selectRandomPlayer = () => {
//     const validPlayers = players.filter(player => player.lives > 0);
//     setPlayers(validPlayers);

//     if (validPlayers.length === 0) {
//       setSelectedPlayer(null);
//       return;
//     }

//     setSpinning(true);
//     const randomIndex = Math.floor(Math.random() * validPlayers.length);
//     const newAnimationKey = animationKey + 1; // Increment key to force re-render

//     setTimeout(() => {
//       setSelectedPlayer(validPlayers[randomIndex]);
//       setSpinning(false);
//     }, 3000); // 3 seconds for the spinning effect

//     setAnimationKey(newAnimationKey);
//   };

//   return (
//     <div className='relative'>
//       <div className=' text-white overflow-y-scroll z-10'>
//         <div className='flex justify-center my-6'>
//           <button
//             onClick={selectRandomPlayer}
//             className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
//           >
//             {spinning ? 'Spinning...' : 'Spin'}
//           </button>
//         </div>
//         <div className='flex justify-center items-center my-6 relative'>
//           <div className='loot-box' key={animationKey}>
//             <div className={`player-container ${spinning ? 'spinning' : ''}`}>
//               {players.map((player, index) => (
//                 <div
//                   key={`${player.id}-${index}`}
//                   className={`player ${player === selectedPlayer ? 'selected' : ''}`}
//                 >
//                   <h1 className='relative py-2 text-center'>{player.player_name}</h1>
//                   {player === selectedPlayer && !spinning && (
//                     <span className='red-bar'></span>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         {/* {selectedPlayer && !spinning && (
//           <div className='flex justify-center my-6'>
//             <h2 className='text-center text-yellow-400 text-[30px]'>
//               Selected Player: {selectedPlayer.player_name}
//             </h2>
//           </div>
//         )} */}
//       </div>

//       <style jsx>{`
//         .loot-box {
//           overflow: hidden;
//           width: 80%;
//           height: 50px;
//           border: 2px solid #fff;
//           background: #000;
//           position: relative;
//           margin: 0 auto;
//         }
//         .player-container {
//           display: flex;
//         }
//         .player {
//           position: relative;
//           min-width: 200px;
//           text-align: center;
//           font-size: 20px;
//           color: white;
//         }
//         .selected .red-bar {
//           position: absolute;
//           top: 0;
//           left: 50%;
//           transform: translateX(-50%);
//           width: 4px;
//           height: 100%;
//           background-color: red;
//         }
//         .spinning {
//           animation: spin 6s linear infinite;
//         }
//         @keyframes spin {
//           0% {
//             transform: translateX(100%);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default RandomSelector;





import React, { useState } from 'react';
import Image from 'next/image';
// import '../styles/global.css'; // Ensure this path is correct

const RandomSelector = () => {
  const users = [
    "Alex", "Steve", "Phil", "Terry", "Jonah", "Mimi", "Alex#2", "Kate", "Marisa", "Nicky",
    "Ben", "Trevor", "Simon", "Ming", "Billy", "Mike", "Apple", "James", "Sammy", "Jack",
    "Kieran", "Doug", "Stacey", "Lily", "Graham", "Sam", "Nick", "Bee", "Nana", "John",
    "Robert", "Chris", "David", "Dan", "Paul", "Josh", "Jason", "Larry", "Jack", "Tyler"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const slideBoxes = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 5) % users.length; // Cycle back to the start
      return newIndex;
    });
  };

  const translateX = -((currentIndex * 200) + (currentIndex * 16)); // 200px is box width and 16px is gap

  return (
    <div className='flex flex-col justify-center items-center'>
      <button onClick={slideBoxes} className='mb-4 p-2 bg-blue-500 text-white rounded'>Start Animation</button>
      <div className='carouselContainer'>
        <div className='carouselTrack' style={{ transform: `translateX(${translateX}px)` }}>
          {users.map((user, index) => (
            <div key={index} className='carouselCard'>
              <div className='relative w-full flex flex-col justify-center items-center rounded-md bg-[#0f1d3d]'>
                <h1 className='font-semibold text-[30px] text-white'>{user}</h1>
                <div className='flex items-center'>
                  <Image src='/images/heart.png' width={40} height={30} alt='Heart' />
                  <Image src='/images/heart.png' width={40} height={30} alt='Heart' />
                  <Image src='/images/heart.png' width={40} height={30} alt='Heart' />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RandomSelector;

