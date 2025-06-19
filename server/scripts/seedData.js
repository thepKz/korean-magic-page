import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Grammar from '../models/Grammar.js';

dotenv.config();

const topik3Grammar = [
  {
    id: 'int-1',
    korean: 'N 밖에 + 부정',
    english: 'Only / Nothing but',
    vietnamese: 'chỉ…',
    structure: 'Noun + 밖에 + negative verb',
    examples: [
      {
        korean: '오빠밖에 사랑하지 않아요.',
        english: 'I only love my older brother.',
        vietnamese: 'Tôi chỉ yêu anh trai thôi.',
        romanization: 'Oppabakke saranghaji anayo.'
      },
      {
        korean: '물밖에 마시지 않아요.',
        english: 'I only drink water.',
        vietnamese: 'Tôi chỉ uống nước thôi.',
        romanization: 'Mulbakke masiji anayo.'
      }
    ],
    usage: 'Used to express "only" or "nothing but" with negative verbs',
    level: 'intermediate',
    topikLevel: 3,
    category: 'particle',
    difficulty: 3,
    tags: ['restriction', 'limitation', 'negative']
  },
  {
    id: 'int-2',
    korean: 'N(이)라고 하다',
    english: 'To be called / To say that',
    vietnamese: 'được gọi là…',
    structure: 'Noun + (이)라고 하다',
    examples: [
      {
        korean: '한국어를 베트남말로 띠엔 한이라고 해요.',
        english: 'Korean is called "Tieng Han" in Vietnamese.',
        vietnamese: 'Tiếng Hàn được gọi là "Tiếng Hàn" trong tiếng Việt.',
        romanization: 'Hangugeoreul beteunamallo ttien hanirago haeyo.'
      },
      {
        korean: '이 음식을 김치라고 해요.',
        english: 'This food is called kimchi.',
        vietnamese: 'Món ăn này được gọi là kimchi.',
        romanization: 'I eumsigeul gimchirago haeyo.'
      }
    ],
    usage: 'Used to say what something is called or to quote what someone said',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    difficulty: 2,
    tags: ['naming', 'quotation', 'indirect-speech']
  },
  {
    id: 'int-3',
    korean: 'V게 되다',
    english: 'To come to / To end up',
    vietnamese: 'bị, được, trở nên (chỉ sự thay đổi trạng thái, biến đổi mới)',
    structure: 'Verb stem + 게 되다',
    examples: [
      {
        korean: '이번 학기에 장학금을 받게 되었어요.',
        english: 'I came to receive a scholarship this semester.',
        vietnamese: 'Học kỳ này tôi được nhận học bổng.',
        romanization: 'Ibeon hakgie janghakgeumeul batge doeeosseoyo.'
      },
      {
        korean: '한국어를 잘하게 되었어요.',
        english: 'I came to speak Korean well.',
        vietnamese: 'Tôi đã trở nên giỏi tiếng Hàn.',
        romanization: 'Hangugeoreul jalhage doeeosseoyo.'
      }
    ],
    usage: 'Used to express a change in situation or state that happened naturally',
    level: 'intermediate',
    topikLevel: 3,
    category: 'verb',
    difficulty: 3,
    tags: ['change', 'result', 'natural-progression']
  },
  {
    id: 'int-4',
    korean: 'V(으)ㄹ 생각이다',
    english: 'To plan to / To intend to',
    vietnamese: 'dự định sẽ làm gì',
    structure: 'Verb stem + (으)ㄹ 생각이다',
    examples: [
      {
        korean: '유학할 생각이에요.',
        english: 'I plan to study abroad.',
        vietnamese: 'Tôi dự định đi du học.',
        romanization: 'Yuhakhal saenggagieyo.'
      },
      {
        korean: '내년에 결혼할 생각이에요.',
        english: 'I plan to get married next year.',
        vietnamese: 'Tôi dự định kết hôn vào năm sau.',
        romanization: 'Naenyeone gyeolhonhal saenggagieyo.'
      }
    ],
    usage: 'Used to express plans or intentions',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    difficulty: 2,
    tags: ['intention', 'planning', 'future']
  },
  {
    id: 'int-5',
    korean: 'V는 길이다/길에',
    english: 'On the way to',
    vietnamese: 'đang trên đường …',
    structure: 'Verb stem + 는 길이다/길에',
    examples: [
      {
        korean: '밥을 먹으러 가는 길이에요.',
        english: 'I\'m on my way to eat.',
        vietnamese: 'Tôi đang trên đường đi ăn.',
        romanization: 'Babeul meogeuro ganeun girieyo.'
      },
      {
        korean: '집에 가는 길에 친구를 만났어요.',
        english: 'I met a friend on the way home.',
        vietnamese: 'Tôi gặp bạn trên đường về nhà.',
        romanization: 'Jibe ganeun gire chingureul mannasseoyo.'
      }
    ],
    usage: 'Used to express being on the way to do something',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    difficulty: 2,
    tags: ['direction', 'process', 'movement']
  }
  // Add more grammar points here...
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/korean-grammar-museum');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Grammar.deleteMany({});
    console.log('Cleared existing grammar data');

    // Insert new data
    await Grammar.insertMany(topik3Grammar);
    console.log(`Inserted ${topik3Grammar.length} grammar points`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();