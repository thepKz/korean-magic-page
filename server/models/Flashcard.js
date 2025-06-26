import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const FlashcardSchema = new Schema(
  {
    front: { type: String, required: true }, // Mặt trước
    back: { type: String, required: true },  // Mặt sau
    grammarRef: { type: Schema.Types.ObjectId, ref: 'Grammar', default: null },
    ownerId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

// Index để truy vấn theo owner nhanh
FlashcardSchema.index({ ownerId: 1 });

export default model('Flashcard', FlashcardSchema); 