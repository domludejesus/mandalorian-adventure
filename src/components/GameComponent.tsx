import { FC, MouseEventHandler } from 'react';

// Define the types for the GameMessages props
interface GameMessagesProps {
  messages: string[];
  className?: string; 
}

const GameMessages: FC<GameMessagesProps> = ({ messages }) => (
  <div className="p-4">
    <h2 className="text-2xl font-bold">Game Messages:</h2>
    {messages.map((message, index) => <p key={index} className="text-lg">{message}</p>)}
  </div>
);

// Define the types for the GameControls props
interface GameControlsProps {
  onMoveForward: MouseEventHandler;
  className?: string;
}


const GameControls: FC<GameControlsProps> = ({ onMoveForward }) => (
  <div className="p-4">
    <h2 className="text-2xl font-bold">Controls:</h2>
    <button 
      onClick={onMoveForward} 
      className="px-4 py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
    >
      Move Forward
    </button>
  </div>
);

// Define the types for the Modal props
interface ModalProps {
  show: boolean;
  onClose: MouseEventHandler;
  onFight: MouseEventHandler;
  onFlee: MouseEventHandler;
  className?: string;
}

const Modal: FC<ModalProps> = ({ show, onClose, onFight, onFlee, className }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white text-black p-4 rounded shadow-lg w-1/2">
        <h2 className="text-2xl font-bold">Encounter</h2>
        <p className="mb-4">Do you want to fight or flee?</p>
        <button 
          onClick={onFight} 
          className="px-4 py-2 mr-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors"
        >
          Fight
        </button>
        <button 
          onClick={onFlee} 
          className="px-4 py-2 mr-2 bg-yellow-500 text-white rounded hover:bg-yellow-700 transition-colors"
        >
          Flee
        </button>
        <button 
          onClick={onClose} 
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export { GameMessages, GameControls, Modal };
