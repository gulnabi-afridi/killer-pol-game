import React, { useState, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import Image from "next/image";
import "./LootBox.css";
import { keyframes } from "styled-components";

const LootBox = ({
  players,
  setPlayers,
  selectedPlayer,
  setSelectedPlayer,
  reset,
  openLootBox,
}) => {
  const playersIndex = {};

  players.forEach((player) => {
    playersIndex[player.player_name] = {
      lives: player.lives - player.black,
      black: player.black,
      originalLives: player.lives,
    };
  });

  useEffect(() => {
    document.querySelector(".loot-track").style.transition = "none";
    document.querySelector(".loot-track").style.margin = "0px";

    setTimeout(openLootBox);
  }, []);

  useEffect(() => {
    const updatedPlayers = players.filter((player) => player.lives > 0);
    if (updatedPlayers.length !== players.length) {
      setPlayers(updatedPlayers);
    }
  }, [players, setPlayers]);

  // console.log(players, "♥️🌟");

  useEffect(() => {
    if (selectedPlayer && selectedPlayer.lives === 0) {
      const updatedPlayers = players.filter(
        (player) => player.player_name !== selectedPlayer.player_name
      );
      setPlayers(updatedPlayers);
    }
  }, [selectedPlayer]);

  return (
    <>
      <Head>
        <title>Loot Box JS Demo</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/foundation-sites@6.5.1/dist/css/foundation.min.css"
          integrity="sha256-1mcRjtAxlSjp6XJBgrBeeCORfBp/ppyX4tsvpQVCcpA= sha384-b5S5X654rX3Wo6z5/hnQ4GBmKuIJKMPwrJXn52ypjztlnDK2w9+9hSMBz/asy9Gw sha512-M1VveR2JGzpgWHb0elGqPTltHK3xbvu3Brgjfg4cg5ZNtyyApxw/45yHYsZ/rCVbfoO5MSZxB241wWq642jLtA=="
          crossOrigin="anonymous"
        />
      </Head>

      <div className="grid-container text-center">
        {/* <h1>Loot Box JS Demo</h1> */}
        {/* <button className="button primary" onClick={openLootBox}>Open</button> */}
        {/* <button className="button primary open-again overflow-x-hidden text-white bg-[#00CAFF36] py-2 px-3 rounded-sm" style={{ display: 'none' }} onClick={reset}>Open</button> */}
        <div className="loot-track-container md:w-[40rem] w-full ">
          <div className="loot-track">
            {[...Array(40)].map((_, i) => (
              <div id={`loot${i}`} className="loot" key={i}>
                <div className="loot-name "></div>
                <div className="lives flex justify-center items-center">
                  {players &&
                    Array.from({
                      length:
                        playersIndex[
                          document.querySelector("#loot" + i + " .loot-name")
                            ?.innerHTML
                        ]?.lives || 0,
                    }).map((_, j) => (
                      <Image
                        key={j}
                        src="/images/heart.png"
                        width={25}
                        height={25}
                        alt="Heart"
                      />
                    ))}

                  {players &&
                    Array.from({
                      length:
                        playersIndex[
                          document.querySelector("#loot" + i + " .loot-name")
                            ?.innerHTML
                        ]?.black || 0,
                    }).map((_, j) => (
                      <Image
                        key={j}
                        src="/images/eight.png"
                        width={25}
                        height={25}
                        alt="Heart"
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div className="win-line"></div>
        </div>
      </div>
    </>
  );
};

export default LootBox;
