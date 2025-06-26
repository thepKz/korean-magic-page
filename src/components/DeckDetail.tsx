import { ArrowLeft, Loader, Plus, Shuffle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

interface Flashcard {
  _id: string;
  front: string;
  back: string;
}

interface Deck {
  _id: string;
  title: string;
  description?: string;
  isDefault: boolean;
  cardIds: Flashcard[];
}

const DeckDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [deck, setDeck] = useState<Deck | null>(null);
  const [loading, setLoading] = useState(false);
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');

  const fetchDeck = async () => {
    if (!token || !id) return;
    setLoading(true);
    const res = await fetch(`${API_URL}/decks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setDeck(data);
    setLoading(false);
  };

  useEffect(() => { fetchDeck(); }, [id, token]);

  const handleAddCard = async () => {
    if (!front || !back || !id || !token) return;
    await fetch(`${API_URL}/decks/${id}/flashcards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ front, back }),
    });
    setFront('');
    setBack('');
    fetchDeck();
  };

  if (loading || !deck) return <div className="text-gray-400 flex items-center gap-2"><Loader className="animate-spin" size={20}/> Loading...</div>;

  return (
    <div className="flex flex-col gap-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-cyan-400"><ArrowLeft size={18}/>Back</button>
      <h1 className="text-3xl font-bold text-white">{deck.title}</h1>
      <p className="text-gray-400">{deck.cardIds.length} cards</p>

      {/* Add card */}
      {!deck.isDefault && (
        <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col gap-2 max-w-md">
          <h2 className="text-lg font-semibold text-white">Add Flashcard</h2>
          <input
            value={front}
            onChange={(e) => setFront(e.target.value)}
            placeholder="Front (Korean)"
            className="px-3 py-2 rounded bg-gray-700 text-white"
          />
          <input
            value={back}
            onChange={(e) => setBack(e.target.value)}
            placeholder="Back (Meaning)"
            className="px-3 py-2 rounded bg-gray-700 text-white"
          />
          <button
            onClick={handleAddCard}
            className="flex items-center gap-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white self-start"
          >
            <Plus size={18}/> Add
          </button>
        </div>
      )}

      {/* Flashcards list */}
      <div className="grid md:grid-cols-2 gap-4">
        {deck.cardIds.map((card: any) => (
          <div key={card._id} className="p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <p className="korean-text text-lg text-cyan-300 mb-2">{card.front}</p>
            <p className="text-gray-300">{card.back}</p>
          </div>
        ))}
      </div>

      {/* Merge decks (navigate) */}
      <button
        onClick={() => navigate('/flashcards/merge')}
        className="flex items-center gap-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg w-max mt-6"
      >
        <Shuffle size={18}/> Merge Decks
      </button>
    </div>
  );
};

export default DeckDetail; 