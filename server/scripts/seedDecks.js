import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Deck from '../models/Deck.js';
import Flashcard from '../models/Flashcard.js';
import Grammar from '../models/Grammar.js';

dotenv.config();

async function seedDecks() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/korean-grammar-museum');
    console.log('✅ Connected to MongoDB');
    // Check if default deck exists
    const exists = await Deck.findOne({ isDefault: true });
    if (exists) {
      console.log('ℹ️  Default deck already exists. Skipping seeding.');
      return;
    }
    // Fetch all grammar points
    const grammarList = await Grammar.find({});
    const flashcards = await Flashcard.insertMany(
      grammarList.map((g) => ({
        front: g.korean,
        back: g.english,
        grammarRef: g._id,
        // ownerId sẽ mặc định null (deck hệ thống)
      }))
    );
    const cardIds = flashcards.map((f) => f._id);
    await Deck.create({
      title: 'Basic Korean Grammar',
      description: 'Default deck generated from grammar collection',
      ownerId: null,
      cardIds,
      isDefault: true,
    });
    console.log(`✅ Seeded default deck with ${flashcards.length} flashcards`);
  } catch (error) {
    console.error('❌ Seeding error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

seedDecks(); 