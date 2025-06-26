import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const DeckSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    cardIds: [{ type: Schema.Types.ObjectId, ref: 'Flashcard' }],
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

DeckSchema.index({ ownerId: 1 });
DeckSchema.index({ isDefault: 1 });

export default model('Deck', DeckSchema); 