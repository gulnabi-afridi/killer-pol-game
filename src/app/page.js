"use client";

import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import UserInput from "./components/UserInput";
import Image from "next/image";
import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import GameRulesInput from "./GameRulesInput";
import RandomSelector from "./components/RandomSelector";
import LootBox from "./components/LootBox";

const Home = () => {
  const [playmode, setPlaymode] = useState(false);
  const [players, setPlayers] = useState([]);
  const [currentPlayers, setCurrentPlayers] = useState([]);
  const [winners, setWinners] = useState([]);
  const [showWinners, setShowWinners] = useState(false);
  const [sortedArray, setSortArray] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  const [message, setMessage] = useState("");
  const [shuffle, setShuffle] = useState(false);
  const [moneyPaid, setPaid] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [firstPrice, setFirstPrice] = useState();
  const [secondPrice, setSecondPrice] = useState();
  const [thirdPrice, setThirdPrice] = useState();
  const [rules, setRules] = useState([]);
  const [visited, setVisited] = useState([]);
  const [round, setRound] = useState(false);

  const shuffleArray = (array) => {
    let shuffledArray = array.slice(); // Create a copy of the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const sortPlayersByHits = (array) => {
    return array.slice().sort((a, b) => b.hit - a.hit);
  };

  const addLife = (id) => {
    const updatedPlayers = [...players];
    const playerIndex = updatedPlayers.findIndex((player) => player.id === id);

    if (playerIndex === -1) return;

    updatedPlayers[playerIndex].lives += 1;
    updatedPlayers[playerIndex].black += 1;
    setMessage(updatedPlayers[playerIndex].player_name + " Potted Black");
    setPlayers(updatedPlayers);
    setSelectedPlayer(updatedPlayers[playerIndex]);
    setShowOverlay(true);
    setTimeout(() => {
      setShowOverlay(false);
    }, 2000);
  };

  const startGame = () => {
    if (moneyPaid == true && players.length >= 1) {
      setPlaymode(true);
      const shuffled = shuffleArray(players);
      setPlayers(shuffled);
      setSortArray(shuffled);
    } else {
      if (players.length == 0) setMessage("No Player Enter yet");
      else setMessage("Money Not Paid");
      setShowOverlay(true);
      setTimeout(() => {
        setShowOverlay(false);
      }, 2000);
    }
  };

  const reset = () => {
    if (document.querySelector(".loot-track")) {
      document.querySelector(".loot-track").style.transition = "none";
      document.querySelector(".loot-track").style.margin = "0px";
    }

    setTimeout(openLootBox);
  };

  const openLootBox = () => {
    if (document.querySelector(".loot-track"))
      document.querySelector(".loot-track").style.transition =
        "margin 5s cubic-bezier(0.12, 0.8, 0.38, 1)";
    if (document.querySelector(".open-again"))
      document.querySelector(".open-again").style.display = "inline-block";
    if (document.querySelector(".loot")) {
      const itemSlots = document.querySelectorAll(".loot");

      for (let i = 4; i < itemSlots.length; i++) {
        calculate(i);
      }
    }
  };

  const calculate = (index) => {
    let result = {
      id: -1,
      player_name: "",
      lives: 0,
      hit: 0,
      miss: 0,
      black: 0,
      vis: false,
    };

    // Filter out players who are already visible
    let updatedarray = players.filter((player) => player.vis === false);

    if (updatedarray.length === 0) {
      // setMessage("Round is Completed Moving to the next round");
      // setShowOverlay(true);
      // setTimeout(() => {
      //     setShowOverlay(false);
      // }, 4000);

      updatedarray = players.map((player) => {
        if (player.lives !== 0) {
          return { ...player, vis: false };
        }
        return player; // Make sure to always return the player
      });

      // Ensure the random selector is disabled when the message is displayed
      // This will prevent further execution of the calculate function
    }
    let playerIndex = updatedarray
      ? Math.floor(Math.random() * updatedarray.length)
      : 0;

    // Assign the result values from the randomly selected player
    if (updatedarray[playerIndex]) {
      result.id = updatedarray[playerIndex].id;
      result.player_name = updatedarray[playerIndex].player_name;
      result.lives = updatedarray[playerIndex].lives;
      result.hit = updatedarray[playerIndex].hit;
      result.miss = updatedarray[playerIndex].miss;
      result.black = updatedarray[playerIndex].black;
      result.vis = true; // Set vis to true for the selected player
    }
    // Update the players state if index is 37
    if (index === 37) {
      const updatedPlayers = players.map((player) => {
        if (player.id === result.id) {
          return { ...player, vis: true };
        }
        return player;
      });

      setPlayers(updatedPlayers);
    }

    // Update the preview with the result
    updatePreview(index, result);
  };

  const updatePreview = (index, result) => {
    const preview = document.getElementById("loot" + index);
    const lootName = document.querySelector("#loot" + index + " .loot-name");
    const lootImg = document.querySelector("#loot" + index + " img");

    // lootImg.src = 'img/7.png';
    if (index % 2) {
      preview.style.backgroundColor = "#00CAFF36";
    } else {
      preview.style.backgroundColor = "#101f41";
    }
    // if(result.id==-1)
    // {

    //     result=null
    // }
    lootName.innerHTML = result.player_name;

    const getRandomInteger = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    };

    const winningPosition = getRandomInteger(-5600, -5755);

    const track = document.querySelector(".loot-track");
    track.style.marginLeft = winningPosition.toString() + "px";

    if (index === 37) {
      setTimeout(() => {
        setSelectedPlayer(result);
      }, 5000);
    }
  };

  const addhit = (id) => {
    const updatedPlayers = [...players];
    const playerIndex = updatedPlayers.findIndex((player) => player.id === id);

    if (playerIndex === -1) {
      console.log("Player not found, returning previous players array.");
      return;
    }

    // Get the removed player
    const removedPlayer = updatedPlayers.splice(playerIndex, 1)[0];

    setMessage(removedPlayer.player_name + " Potted");
    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
    }, 2000);

    // Update the state with the new players array
    setPlayers(updatedPlayers);

    // Update the loot box and select the next player
    if (updatedPlayers.length > 0) {
      setTimeout(() => {
        reset();
      }, 2000);
    } else {
      setSelectedPlayer(null);
    }
  };

  useEffect(() => {
    if (players.length === 0) {
      setSelectedPlayer(null);
    }
  }, [players]);

  const addmiss = (id) => {
    const updatedPlayers = [...players];
    const playerIndex = updatedPlayers.findIndex((player) => player.id === id);

    if (playerIndex === -1) return;

    if (
      updatedPlayers[playerIndex] &&
      updatedPlayers[playerIndex].lives !== 0
    ) {
      setMessage(updatedPlayers[playerIndex].player_name + " Missed");
    } else {
      setMessage(
        updatedPlayers[playerIndex].player_name + " has no life. Spin the bar"
      );
    }

    if (updatedPlayers[playerIndex]?.lives > 0) {
      updatedPlayers[playerIndex].miss += 1;
      updatedPlayers[playerIndex].lives -= 1;
      if (updatedPlayers[playerIndex].black !== 0) {
        updatedPlayers[playerIndex].black -= 1;
      }
    }

    setPlayers(updatedPlayers);
    setSelectedPlayer(updatedPlayers[playerIndex]);

    const updatedsortedPlayers = [...sortedArray];
    const sortedPlayerIndex = updatedsortedPlayers.findIndex(
      (player) => player.id === id
    );
    if (sortedPlayerIndex !== -1) {
      updatedsortedPlayers[sortedPlayerIndex] = updatedPlayers[playerIndex];
    }
    setSortArray(sortPlayersByHits(updatedsortedPlayers));
    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
    }, 2000);

    // Ensure the animation is reset and triggered
    setTimeout(() => {
      reset();
    }, 2000);
  };

  const isGameOver = () => {
    const alivePlayers = sortedArray.filter((player) => player.lives > 0);
    const deadPlayers = sortedArray.filter((player) => player.lives === 0);
    return (
      alivePlayers.length === 1 && deadPlayers.length === sortedArray.length - 1
    );
  };

  return (
    <div className="relative bgImage ">
      {showOverlay && (
        <div className="w-full h-full bg-black bg-opacity-50 z-20 fixed top-0 left-0 flex  justify-center">
          <div
            className={` ${
              message[message.length - 1] == "k" ||
              message[message.length - 1] == "l"
                ? "text-yellow-500"
                : message[message.length - 3] == "s"
                ? "text-red-500"
                : "text-green-500"
            } border-2 border-red-200 rounded-md h-[130px] lg:w-1/4 md:w-1/3 w-1/2 text-[35px] font-semibold flex justify-center items-center text-center  bg-black p-4 `}
          >
            {message}
          </div>
        </div>
      )}
      <div className="b\ text-white  h-screen overflow-y-scroll z-10 px-2">
        <div className="flex justify-between mx-2 sm:mx-12 pt-4">
          <div className="flex items-center gap-2 ">
            <Image
              src="/images/eight.png" // Path to the image in the public directory
              alt="8 ball"
              width={30}
              height={30}
            />
            <h1
              onClick={() => window.location.reload()}
              className="font-semibold cursor-pointer text-[20px] text-yellow-400 hover:bg-gray-800 p-2 rounded-md"
            >
              Quit
            </h1>
          </div>

          <button>
            {!playmode ? (
              <h1
                onClick={startGame}
                className="font-semibold text-yellow-400 text-[20px] hover:bg-gray-800 p-2 rounded-md"
              >
                ⚪️ Start
              </h1>
            ) : (
              ""
            )}
          </button>
        </div>

        <div className="lg:hidden flex justify-center items-center">
          <Image
            className=""
            src="/images/logo2.svg"
            width={250}
            height={250}
            alt="no image"
          />
        </div>

        {!playmode ? (
          <GameRulesInput
            players={players}
            setPlayers={setPlayers}
            moneyPaid={moneyPaid}
            setPaid={setPaid}
            firstPrice={firstPrice}
            secondPrice={secondPrice}
            thirdPrice={thirdPrice}
            setFirstPrice={setFirstPrice}
            setSecondPrice={setSecondPrice}
            setThirdPrice={setThirdPrice}
            rules={rules}
            setRules={setRules}
          />
        ) : (
          <div>
            {players.length >= 1 && !isGameOver() ? (
              <div className="">
                <div className="max-w-[90%] md:max-w-[30%] mx-auto lg:mx-0 gap-3 lg:max-w-full flex lg:flex-row flex-col  itemx-center lg:justify-between justify-center">
                  {/* Rules Box */}

                  <div className="w-full md:w-[15rem]  p-2 rounded-md h-fit bg-black bg-opacity-45">
                    <h1 className="font-semibold text-[30px] text-center">
                      Rules:
                    </h1>
                    <div>
                      {rules.map((rule, index) => (
                        <h1
                          key={index}
                          className={`text-[18px] ${
                            index % 2 ? "bg-[#00CAFF36]" : ""
                          } font-semibold leading-[32px]`}
                        >
                          {rule.text}
                        </h1>
                      ))}
                    </div>
                  </div>
                  {/* Selected Player */}

                  <div className="lg:order-none order-3">
                    <div className="lg:block hidden">
                      <Image
                        src="/images/logo2.svg"
                        width={300}
                        height={300}
                        alt="no image"
                      />
                    </div>

                    <div className="bg-gray-800 w-full md:w-[20rem]  rounded-md">
                      <h1 className="text-center bg-white text-black rounded-tl-md rounded-tr-md text-[25px] font-semibold ">
                        Selected Player
                      </h1>
                      {selectedPlayer ? (
                        <div className="flex flex-col justify-center items-center">
                          <h1 className="font-bold text-center text-[40px] text-white ">
                            {selectedPlayer.player_name}
                          </h1>
                          {selectedPlayer.lives > 0 && (
                            <div className="flex items-center gap-2">
                              {[
                                ...Array(
                                  Math.max(
                                    selectedPlayer.lives - selectedPlayer.black,
                                    0
                                  )
                                ),
                              ].map((_, j) => (
                                <Image
                                  key={j}
                                  src="/images/heart.png"
                                  width={30}
                                  height={30}
                                  alt="Heart"
                                />
                              ))}
                              {[...Array(selectedPlayer.black)].map((_, j) => (
                                <Image
                                  key={j}
                                  src="/images/eight.png"
                                  width={30}
                                  height={30}
                                  alt="Heart"
                                />
                              ))}

                              {/* {[...Array(selectedPlayer.miss + selectedPlayer.hit)].map((_, index) => (
                                                        <h1 key={index} className='text-[20px]'>❌</h1>
                                                    ))} */}
                            </div>
                          )}
                        </div>
                      ) : (
                        <h1 className="text-center">
                          {" "}
                          No Player Selected Yet{" "}
                        </h1>
                      )}
                    </div>
                  </div>
                  {round && (
                    <div className="roundBox" onClick={() => setRound(false)}>
                      <h1>Round One is Completed</h1>
                    </div>
                  )}
                  {/* Winners Prices */}
                  <div className="">
                    <div className="bg-[#00CAFF36] flex items-center gap-4 px-3 py-2 w-full md:w-[15rem]">
                      <Image
                        src="/images/first.png"
                        width={50}
                        height={50}
                        alt="no image"
                      />
                      <h1 className="text-[40px] ">
                        {" "}
                        <span className="font-semibold">{firstPrice}</span>฿
                      </h1>
                    </div>
                    <div className="bg-[#101f41] flex items-center gap-4 px-3 py-2 w-full md:w-[15rem]">
                      <Image
                        src="/images/second.png"
                        width={50}
                        height={50}
                        alt="no image"
                      />
                      <h1 className="text-[40px] ">
                        {" "}
                        <span className="font-semibold">{secondPrice}</span>฿
                      </h1>
                    </div>
                    <div className="bg-[#00CAFF36] flex items-center gap-4 px-3 py-2 w-full md:w-[15rem]">
                      <Image
                        src="/images/third.png"
                        width={50}
                        height={50}
                        alt="no image"
                      />
                      <h1 className="text-[40px] ">
                        {" "}
                        <span className="font-semibold">{thirdPrice}</span>฿
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              isGameOver() && (
                <div className="flex justify-center items-center flex-col">
                  <div className="lg:block hidden">
                    <Image
                      src="/images/logo2.svg"
                      width={350}
                      height={350}
                      alt="no image"
                    />
                  </div>
                  <h1 className="text-center font-semibold text-[30px]">
                    Winners
                  </h1>
                  {sortedArray.slice(0, 3).map((player, index) => (
                    <div key={index}>
                      {index === 0 && (
                        <div className="bg-[#00CAFF36] flex items-center gap-4 px-3 py-2 w-auto">
                          <Image
                            src="/images/first.png"
                            width={50}
                            height={50}
                            alt="First place"
                          />
                          <h1 className="text-[25px] sm:text-[40px] flex gap-4 items-center">
                            <span>{player.player_name}</span>
                            <span className="font-semibold">
                              {" "}
                              {firstPrice}฿
                            </span>
                          </h1>
                        </div>
                      )}
                      {index === 1 && (
                        <div className="bg-[#101f41] flex items-center gap-4 px-3 py-2 w-auto">
                          <Image
                            src="/images/second.png"
                            width={50}
                            height={50}
                            alt="Second place"
                          />
                          <h1 className="text-[25px] sm:text-[40px] flex gap-4 items-center">
                            <span>{player.player_name}</span>
                            <span className="font-semibold">
                              {secondPrice}฿
                            </span>
                          </h1>
                        </div>
                      )}
                      {index === 2 && (
                        <div className="bg-[#00CAFF36] flex items-center gap-4 px-3 py-2 w-auto">
                          <Image
                            src="/images/third.png"
                            width={50}
                            height={50}
                            alt="Third place"
                          />
                          <h1 className="text-[25px] sm:text-[40px] flex gap-4 items-center">
                            <span>{player.player_name}</span>
                            <span className="font-semibold">{thirdPrice}฿</span>
                          </h1>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )
            )}

            {/* Player count ----->  */}

            {players.length > 0 && !isGameOver() && (
              <div className="relative py-2">
                <LootBox
                  players={players}
                  setPlayers={setPlayers}
                  selectedPlayer={selectedPlayer}
                  setSelectedPlayer={setSelectedPlayer}
                  reset={reset}
                  openLootBox={openLootBox}
                />
                <div className="ml-4 text-[20px] font-semibold flex iems-center gap-3">
                  <h1>Players Count: </h1>
                  {
                    sortedArray.filter((player) => player.lives !== 0).length
                  } / {sortedArray.length}
                </div>

                {selectedPlayer && (
                  <div className="relative xl:absolute right-0 top-0 flex items-center justify-end gap-7">
                    <button onClick={() => addhit(selectedPlayer.id)}>
                      <MdOutlineDone
                        size={70}
                        className="bg-[#00CAFF36] text-green-500  rounded-sm"
                      />
                    </button>
                    <button onClick={() => addLife(selectedPlayer.id)}>
                      <Image
                        src="/images/eight.png" // Path to the image in the public directory
                        alt="8 ball"
                        width={60}
                        height={60}
                      />
                    </button>
                    <button onClick={() => addmiss(selectedPlayer.id)}>
                      <RxCross2
                        size={70}
                        className="bg-[#00CAFF36] text-red-500 rounded-sm"
                      />
                    </button>
                  </div>
                )}
                {selectedPlayer && (
                  <button
                    id="nextPlayerButton"
                    onClick={() => {
                      openLootBox();
                      reset();
                    }}
                    className="text-[26px] w-[200px] top-[110px] font-semibold h-[70px] bg-[#00CAFF36] rounded-lg absolute right-0 text-white"
                  >
                    Next Player{" "}
                  </button>
                )}
              </div>
            )}

            {/* USER COUNT ----------> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                {sortedArray.length >= 1 && (
                  <div className="px-4 overflow-y-auto scrollbar-custom">
                    <h1 className="text-gray-500">Users</h1>
                    {sortedArray &&
                      sortedArray
                        .filter((user) => user.lives > 0)
                        .slice(0, 10)
                        .map((myuser, index) => (
                          <div
                            key={myuser?.id}
                            className={` ${
                              index % 2
                                ? "bg-black bg-opacity-45"
                                : "bg-[#00CAFF36] bg-opacity-none"
                            } px-2 py-1 rounded-md flex items-center justify-between`}
                          >
                            {myuser && (
                              <div className="flex w-full items-center justify-between">
                                <h1 className="font-semibold text-[18px]">
                                  {myuser.player_name}
                                </h1>
                                <div className="flex items-center">
                                  {[
                                    ...Array(
                                      Math.max(myuser.lives - myuser.black, 0)
                                    ),
                                  ].map((_, j) => (
                                    <Image
                                      key={j}
                                      src="/images/heart.png"
                                      width={30}
                                      height={30}
                                      alt="Heart"
                                    />
                                  ))}
                                  {[...Array(myuser.black)].map((_, j) => (
                                    <Image
                                      key={j}
                                      src="/images/eight.png"
                                      width={30}
                                      height={30}
                                      alt="Heart"
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                  </div>
                )}
              </div>

              {sortedArray.length > 10 && (
                <div className=" px-4 overflow-y-auto scrollbar-custom">
                  <h1 className="text-gray-500">Users</h1>
                  {sortedArray
                    .filter((user) => user.lives > 0)
                    .slice(10, 20)
                    .map((myuser, index) => (
                      <div
                        key={myuser.id}
                        className={` ${
                          index % 2
                            ? "bg-black bg-opacity-45"
                            : "bg-[#00CAFF36] bg-opacity-none"
                        } px-2 py-1 rounded-md flex items-center justify-between`}
                      >
                        <div className="flex w-full items-center justify-between">
                          <h1 className="font-semibold text-[18px]">
                            {myuser.player_name}
                          </h1>
                          <div className="flex items-center">
                            {[
                              ...Array(
                                Math.max(myuser.lives - myuser.black, 0)
                              ),
                            ].map((_, j) => (
                              <Image
                                key={j}
                                src="/images/heart.png"
                                width={30}
                                height={30}
                                alt="Heart"
                              />
                            ))}
                            {[...Array(myuser.black)].map((_, j) => (
                              <Image
                                key={j}
                                src="/images/eight.png"
                                width={30}
                                height={30}
                                alt="Heart"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {sortedArray.length > 20 && (
                <div className="px-4 overflow-y-auto scrollbar-custom">
                  <h1 className="text-gray-500">Users</h1>
                  {sortedArray
                    .filter((user) => user.lives > 0)
                    .slice(20, 30)
                    .map((myuser, index) => (
                      <div
                        key={myuser.id}
                        className={` ${
                          index % 2
                            ? "bg-black bg-opacity-45"
                            : "bg-[#00CAFF36] bg-opacity-none"
                        } px-2 py-1 rounded-md flex items-center justify-between`}
                      >
                        <div className="flex w-full items-center justify-between">
                          <h1 className="font-semibold text-[18px]">
                            {myuser.player_name}
                          </h1>
                          <div className="flex items-center">
                            {[
                              ...Array(
                                Math.max(myuser.lives - myuser.black, 0)
                              ),
                            ].map((_, j) => (
                              <Image
                                key={j}
                                src="/images/heart.png"
                                width={30}
                                height={30}
                                alt="Heart"
                              />
                            ))}
                            {[...Array(myuser.black)].map((_, j) => (
                              <Image
                                key={j}
                                src="/images/eight.png"
                                width={30}
                                height={30}
                                alt="Heart"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {sortedArray.length > 30 && (
                <div className="px-4 overflow-y-auto scrollbar-custom">
                  <h1 className="text-gray-500">Users</h1>
                  {sortedArray
                    .filter((user) => user.lives > 0)
                    .slice(30, 40)
                    .map((myuser, index) => (
                      <div
                        key={myuser.id}
                        className={` ${
                          index % 2
                            ? "bg-black bg-opacity-45"
                            : "bg-[#00CAFF36] bg-opacity-none"
                        } px-2 py-1 rounded-md flex items-center justify-between`}
                      >
                        <div className="flex w-full items-center justify-between">
                          <h1 className="font-semibold text-[18px]">
                            {myuser.player_name}
                          </h1>
                          <div className="flex items-center">
                            {[
                              ...Array(
                                Math.max(myuser.lives - myuser.black, 0)
                              ),
                            ].map((_, j) => (
                              <Image
                                key={j}
                                src="/images/heart.png"
                                width={30}
                                height={30}
                                alt="Heart"
                              />
                            ))}
                            {[...Array(myuser.black)].map((_, j) => (
                              <Image
                                key={j}
                                src="/images/eight.png"
                                width={30}
                                height={30}
                                alt="Heart"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
