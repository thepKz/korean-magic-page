import { useCallback, useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export interface Flashcard {
  _id: string;
  front: string;
  back: string;
  grammarRef?: string;
}

export interface Deck {
  _id: string;
  title: string;
  description?: string;
  cardIds: string[];
  isDefault: boolean;
}

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

export const useFlashcards = () => {
  const { token } = useAuth();
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDecks = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/decks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setDecks(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDecks();
  }, [fetchDecks]);

  // Create deck
  const createDeck = async (title: string, description?: string) => {
    if (!token) return;
    const res = await fetch(`${API_URL}/decks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });
    const deck = await res.json();
    setDecks((prev) => [...prev, deck]);
    return deck;
  };

  const addFlashcardToDeck = async (
    deckId: string,
    front: string,
    back: string,
  ) => {
    if (!token) return;
    const res = await fetch(`${API_URL}/decks/${deckId}/flashcards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ front, back }),
    });
    return res.json();
  };

  const mergeDecks = async (deckIds: string[], newTitle: string) => {
    if (!token) return;
    const res = await fetch(`${API_URL}/decks/${deckIds[0]}/merge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ deckIds, newTitle }),
    });
    const newDeck = await res.json();
    setDecks((prev) => [...prev, newDeck]);
    return newDeck;
  };

  return {
    decks,
    loading,
    error,
    fetchDecks,
    createDeck,
    addFlashcardToDeck,
    mergeDecks,
  };
}; 