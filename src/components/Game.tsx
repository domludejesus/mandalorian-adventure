import React, { useState } from 'react';
import { GameMessages, GameControls, Modal } from './GameComponent';

type PlayerStatusProps = {
  status: {
    name: string;
    position: number;
    beskar: number;
    healthPoints: number;
  };
};

// PlayerStatus component
  const PlayerStatus = ({ status }: PlayerStatusProps) => (
    <div className="p-4">
        <h2 className="text-2xl font-bold">Player Status:</h2>
        <p className="font-bold">Name: <span className="font-normal">{status.name}</span></p>
        <p className="text-blue-500">Position: {status.position}</p>
        <p className="text-yellow-500">Beskar: {status.beskar}</p>
        <p className="text-red-500 animate-pulse">Health Points: {status.healthPoints}</p>
    </div>
);

// Enemy type
type Enemy = {
  name: string;
  intro: string;
  damage: number;
  frequency: number;
  position?: number;
};

// PowerUp type
type PowerUp = {
  name: string;
  benefit: number;
  frequency: number;
  position?: number;
};

// Game component
const Game = () => {
    // state for the player's status
    const [status, setStatus] = useState({
      name: 'Mandalorian',
      position: 0,
      beskar: 0,
      healthPoints: 100,
    });
  
    const [showModal, setShowModal] = useState(false);
    const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);
  
    // state for the game messages
  const [messages, setMessages] = useState<string[]>([]);
    
    const handleEncounter = (enemy) => {
      setCurrentEnemy(enemy);
      setShowModal(true);
    };
  
    const handleFight = () => {
      setStatus((prevStatus) => ({
        ...prevStatus,
        healthPoints: prevStatus.healthPoints - currentEnemy.damage,
        beskar: prevStatus.beskar + Math.floor(Math.random() * (50 - 10 + 1)) + 10,
      }));
      setMessages((prevMessages) => [
        ...prevMessages,
        `You decided to fight. You lost ${currentEnemy.damage} HP.`,
      ]);
      setShowModal(false);
    };
  
    const handleFlee = () => {
      setStatus((prevStatus) => ({
        ...prevStatus,
        position: prevStatus.position - 1,
      }));
      setMessages((prevMessages) => [
        ...prevMessages,
        `You decided to flee. You moved back to position ${status.position}.`,
      ]);
      setShowModal(false);
    };

    // TODO: Add your enemy data here.
    const enemiesData = [
      { name: 'Stormtrooper', intro: 'Prepare for a fight!', damage: 20, frequency: 0.5 },
      { name: 'Bounty Hunter', intro: 'This will hurt!', damage: 40, frequency: 0.3 },
      { name: 'Jawa', intro: 'Watch out for their blaster!', damage: 30, frequency: 0.2 },
    ];
  
    const generateEnemies = () => {
      let enemiesList = [];
      for (let i = 1; i <= 10; i++) {
        enemiesData.forEach((enemy) => {
          if (Math.random() < enemy.frequency) {
            enemiesList.push({ ...enemy, position: i });
          }
        });
      }
      return enemiesList;
    };
  
    const [enemies, setEnemies] = useState(generateEnemies());
    const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'

    // TODO: Add your power-ups data here.
    const powerUpsData = [
      { name: 'Health Boost', benefit: 20, frequency: 0.1 },
      { name: 'Beskar Armor', benefit: 30, frequency: 0.05 },
    ];
  
    const generatePowerUps = () => {
        let powerUpsList = [];
        for (let i = 1; i <= 10; i++) {
          powerUpsData.forEach((powerUp) => {
            if (Math.random() < powerUp.frequency) {
              powerUpsList.push({ ...powerUp, position: i });
            }
          });
        }
        return powerUpsList;
    };
    
    const [powerUps, setPowerUps] = useState(generatePowerUps());
    
    const [level, setLevel] = useState(1);
    
    const moveForward = () => {
        if (gameStatus !== 'playing') {
          alert('Game over. Refresh the page to play again.');
          return;
        }
    
        setStatus((prevStatus) => ({
          ...prevStatus,
          position: prevStatus.position + 1,
        }));
    
        setMessages((prevMessages) => [
          ...prevMessages,
          `${status.name} moved to position ${status.position + 1}`,
        ]);
    
        const enemy = enemies.find(e => e.position === status.position + 1);
        if (enemy) {
          handleEncounter(enemy);
        } else {
          setStatus((prevStatus) => ({
            ...prevStatus,
            beskar: prevStatus.beskar + Math.floor(Math.random() * (50 - 10 + 1)) + 10,
          }));
          setMessages((prevMessages) => [
            ...prevMessages,
            `No enemies encountered. You found some beskar.`,
          ]);
        }
    
        if (status.position >= 10) {
          setGameStatus('won');
          setMessages((prevMessages) => [
            ...prevMessages,
            `You reached the end and saved Baby Yoda! You advanced to level ${level + 1}.`,
          ]);
          setLevel((prevLevel) => prevLevel + 1);
          setEnemies(generateEnemies());
          setPowerUps(generatePowerUps());
        } else if (status.healthPoints <= 0) {
          setGameStatus('lost');
          setMessages((prevMessages) => [
            ...prevMessages,
            `You were defeated. Refresh the page to play again.`,
          ]);
        }
    };
    
    return (
        <div className="container mx-auto py-10 px-4 md:px-0">
          <h1 className="text-4xl font-bold mb-6">The Mandalorian Game</h1>
          <PlayerStatus status={status} />
          <GameMessages messages={messages} className="bg-gray-200 p-4 rounded-lg shadow-md mb-4"/>
          <GameControls onMoveForward={moveForward} className="flex justify-center mb-4"/>
          <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            onFight={handleFight}
            onFlee={handleFlee}
            className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center"
          />
        </div>
    );
};
    
export default Game;
