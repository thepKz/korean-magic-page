import { ArrowLeft, CheckSquare, Square } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlashcards } from '../hooks/useFlashcards';

const MergeDeckPage: React.FC = () => {
  const { decks, mergeDecks } = useFlashcards();
  const [selected, setSelected] = useState<string[]>([]);
  const [title, setTitle] = useState('Merged Deck');
  const navigate = useNavigate();

  const toggleSelect = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]);
  };

  const handleMerge = async () => {
    if (selected.length < 2) return alert('Select at least 2 decks');
    const newDeck = await mergeDecks(selected, title);
    if (newDeck) {
      navigate(`/flashcards/deck/${newDeck._id}`);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-cyan-400"><ArrowLeft size={18}/>Back</button>
      <h1 className="text-2xl font-bold text-white">Merge Decks</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="px-3 py-2 rounded bg-gray-700 text-white max-w-md"
        placeholder="New deck title"
      />
      <div className="flex flex-col gap-2">
        {decks.map((deck) => (
          <label key={deck._id} className="flex items-center gap-2 text-gray-300 cursor-pointer">
            <button
              type="button"
              className="text-cyan-400"
              onClick={() => toggleSelect(deck._id)}
            >
              {selected.includes(deck._id) ? <CheckSquare size={20}/> : <Square size={20}/>}
            </button>
            {deck.title} ({deck.cardIds.length})
          </label>
        ))}
      </div>
      <button onClick={handleMerge} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white w-max">Merge</button>
    </div>
  );
};

export default MergeDeckPage; 