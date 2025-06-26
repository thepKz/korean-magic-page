import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlashcards } from '../hooks/useFlashcards';

const DeckList: React.FC = () => {
  const { decks, loading, createDeck } = useFlashcards();
  const [newTitle, setNewTitle] = useState('');
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    const deck = await createDeck(newTitle.trim());
    if (deck) {
      setNewTitle('');
      navigate(`/flashcards/deck/${deck._id}`);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-white">Flashcard Decks</h1>

      {/* Create Deck */}
      <div className="flex gap-2">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New deck title"
          className="px-3 py-2 rounded-lg bg-gray-800 text-white flex-grow"
        />
        <button
          onClick={handleCreate}
          className="flex items-center gap-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white"
        >
          <Plus size={18} /> Create
        </button>
      </div>

      {loading && <p className="text-gray-400">Loading...</p>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {decks.map((deck) => (
          <div
            key={deck._id}
            onClick={() => navigate(`/flashcards/deck/${deck._id}`)}
            className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors"
          >
            <h3 className="text-xl font-semibold text-white mb-1">{deck.title}</h3>
            {deck.isDefault && <span className="text-xs text-gray-400">Default</span>}
            <p className="text-sm text-gray-400">{deck.cardIds.length} cards</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeckList; 