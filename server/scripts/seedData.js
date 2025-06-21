import dotenv from 'dotenv';
import mongoose from 'mongoose';
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
  },
  {
    id: 'int-6',
    korean: 'V(으)ㄴ/N 덕분에',
    english: 'Thanks to...',
    vietnamese: 'nhờ có, nhờ vào',
    structure: 'Verb/Noun + 덕분에',
    examples: [{
      korean: '선생님 덕분에 한국어 실력이 좋아졌어요.',
      english: 'Thanks to you, teacher, my Korean has improved.',
      vietnamese: 'Nhờ có cô giáo mà trình độ tiếng Hàn của em đã tốt hơn.',
      romanization: 'seonsaengnim deokbune hangugeo sillyeogi johajyeosseoyo.'
    }],
    usage: 'Expresses gratitude or positive reason for a result.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['gratitude', 'reason', 'positive']
  },
  {
    id: 'int-7',
    korean: 'V나요? / A(으)ㄴ가요? / N인가요?',
    english: 'Is it...? / Are you...?',
    vietnamese: '…không? (đuôi câu hỏi lịch sự)',
    structure: 'Verb/Adjective/Noun + question ending',
    examples: [{
      korean: '지금 바쁜가요?',
      english: 'Are you busy now?',
      vietnamese: 'Bây giờ bạn có bận không?',
      romanization: 'jigeum bappeungayo?'
    }],
    usage: 'A soft and polite way to ask a question.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'ending',
    tags: ['question', 'polite', 'soft']
  },
  {
    id: 'int-8',
    korean: 'V는 게 좋다',
    english: 'It is better to...',
    vietnamese: 'nên làm gì',
    structure: 'Verb + 는 게 좋다',
    examples: [{
      korean: '일찍 자는 게 좋겠어요.',
      english: 'It would be better to sleep early.',
      vietnamese: 'Bạn nên ngủ sớm thì tốt hơn.',
      romanization: 'iljjik janeun ge johgesseoyo.'
    }],
    usage: 'Used to give advice or make a recommendation.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['advice', 'recommendation', 'suggestion']
  },
  {
    id: 'int-9',
    korean: 'A아/어 보이다',
    english: 'To look / seem / appear',
    vietnamese: 'trông có vẻ',
    structure: 'Adjective stem + 아/어 보이다',
    examples: [{
      korean: '이 음식은 맛있어 보여요.',
      english: 'This food looks delicious.',
      vietnamese: 'Món ăn này trông có vẻ ngon.',
      romanization: 'i eumsigeun masisseo boyeoyo.'
    }],
    usage: 'Used to express an impression or appearance based on observation.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'adjective',
    tags: ['appearance', 'impression', 'seems']
  },
  {
    id: 'int-10',
    korean: 'V는/A(으)ㄴ/N인 것 같다',
    english: 'It seems/looks like...',
    vietnamese: 'hình như, có vẻ như',
    structure: 'Verb/Adjective/Noun + 것 같다',
    examples: [{
      korean: '밖에 비가 오는 것 같아요.',
      english: 'It seems like it is raining outside.',
      vietnamese: 'Hình như bên ngoài trời đang mưa.',
      romanization: 'bakke biga oneun geot gatayo.'
    }],
    usage: 'Expresses a guess, supposition, or opinion about something.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['supposition', 'guess', 'opinion']
  },
  {
    id: 'int-11',
    korean: '대신(에)',
    english: 'Instead of / In place of',
    vietnamese: 'thay vì, thay cho',
    structure: 'Noun + 대신(에) / Verb + 는 대신(에)',
    examples: [{
      korean: '커피 대신 차를 주세요.',
      english: 'Please give me tea instead of coffee.',
      vietnamese: 'Cho tôi trà thay cho cà phê.',
      romanization: 'keopi daesin chareul juseyo.'
    }],
    usage: 'Indicates that one thing is replaced by another.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['replacement', 'alternative']
  },
  {
    id: 'int-12',
    korean: 'V/A기는 하다',
    english: 'It is true that... but...',
    vietnamese: 'thì cũng có… nhưng',
    structure: 'Verb/Adjective stem + 기는 하다',
    examples: [{
      korean: '예쁘기는 하지만 너무 비싸요.',
      english: 'It is pretty, but it is too expensive.',
      vietnamese: 'Nó đẹp thì có đẹp nhưng mà đắt quá.',
      romanization: 'yeppeugineun hajiman neomu bissayo.'
    }],
    usage: 'Used to acknowledge a fact but then present a contrasting one.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['acknowledgement', 'contrast', 'but']
  },
  {
    id: 'int-13',
    korean: 'V고 나서',
    english: 'After doing...',
    vietnamese: 'sau khi',
    structure: 'Verb stem + 고 나서',
    examples: [{
      korean: '숙제를 하고 나서 놀 거예요.',
      english: 'I will play after doing my homework.',
      vietnamese: 'Tôi sẽ đi chơi sau khi làm bài tập xong.',
      romanization: 'sukjereul hago naseo nol geoyeyo.'
    }],
    usage: 'Indicates the completion of one action before starting another.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'ending',
    tags: ['sequence', 'after', 'completion']
  },
  {
    id: 'int-14',
    korean: '(으)로',
    english: 'With / By / Using',
    vietnamese: 'bằng',
    structure: 'Noun + (으)로',
    examples: [{
      korean: '이것은 쌀로 만들었어요.',
      english: 'This is made from rice.',
      vietnamese: 'Cái này được làm bằng gạo.',
      romanization: 'igeoseun ssallo mandeureosseoyo.'
    }],
    usage: 'Indicates the instrument, tool, material, or means by which something is done.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'particle',
    tags: ['instrument', 'material', 'means']
  },
  {
    id: 'int-15',
    korean: 'V다가',
    english: 'While doing something...',
    vietnamese: 'đang… thì',
    structure: 'Verb stem + 다가',
    examples: [{
      korean: '공부하다가 잠이 들었어요.',
      english: 'I fell asleep while studying.',
      vietnamese: 'Tôi đã ngủ gật trong khi đang học.',
      romanization: 'gongbuhadaga jami deureosseoyo.'
    }],
    usage: 'Indicates an interruption or shift of action.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'ending',
    tags: ['interruption', 'while', 'shift']
  },
  {
    id: 'int-16',
    korean: 'A게 + V',
    english: 'Adverbial form',
    vietnamese: 'một cách (trạng từ)',
    structure: 'Adjective stem + 게',
    examples: [{
      korean: '크게 말해주세요.',
      english: 'Please speak loudly.',
      vietnamese: 'Làm ơn hãy nói to lên.',
      romanization: 'keuge malhaejuseyo.'
    }],
    usage: 'Changes an adjective into an adverb to describe how an action is performed.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['adverb', 'manner']
  },
  {
    id: 'int-17',
    korean: 'V기 쉽다',
    english: 'Easy to...',
    vietnamese: 'dễ…',
    structure: 'Verb stem + 기 쉽다',
    examples: [{
      korean: '이 책은 이해하기 쉬워요.',
      english: 'This book is easy to understand.',
      vietnamese: 'Quyển sách này dễ hiểu.',
      romanization: 'i chaegeun ihaehagi swiwoyo.'
    }],
    usage: 'Indicates that doing an action is easy.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['easy', 'possibility']
  },
  {
    id: 'int-18',
    korean: 'V는 동안',
    english: 'While / During',
    vietnamese: 'trong khi',
    structure: 'Verb stem + 는 동안',
    examples: [{
      korean: '여행하는 동안 사진을 많이 찍었어요.',
      english: 'I took a lot of pictures while traveling.',
      vietnamese: 'Tôi đã chụp rất nhiều ảnh trong khi đi du lịch.',
      romanization: 'yeohaenghaneun dongan sajineul manhi jjigeosseoyo.'
    }],
    usage: 'Indicates the duration of time in which an action takes place.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['duration', 'while', 'during']
  },
  {
    id: 'int-19',
    korean: 'V(으)려면',
    english: 'If you want to / intend to',
    vietnamese: 'nếu định, nếu muốn',
    structure: 'Verb stem + (으)려면',
    examples: [{
      korean: '한국어를 잘하려면 매일 공부해야 돼요.',
      english: 'If you want to be good at Korean, you have to study every day.',
      vietnamese: 'Nếu muốn giỏi tiếng Hàn thì phải học mỗi ngày.',
      romanization: 'hangugeoreul jalharyeomyeon maeil gongbuhaeya dwaeyo.'
    }],
    usage: 'Expresses a condition or intention for a following action.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'ending',
    tags: ['condition', 'intention', 'if']
  },
  {
    id: 'int-20',
    korean: 'N처럼',
    english: 'Like / As',
    vietnamese: 'giống như',
    structure: 'Noun + 처럼',
    examples: [{
      korean: '가수처럼 노래를 잘 불러요.',
      english: 'She sings well like a singer.',
      vietnamese: 'Cô ấy hát hay như ca sĩ.',
      romanization: 'gasucheoreom noraereul jal bulleoyo.'
    }],
    usage: 'Indicates that something is similar to the preceding noun.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'particle',
    tags: ['similarity', 'like', 'as']
  },
  {
    id: 'int-21',
    korean: 'V는군요 / A군요 / N(이)군요',
    english: 'I see that...!',
    vietnamese: 'ra là thế, thì ra là',
    structure: 'Verb/Adjective/Noun + 군요',
    examples: [{
      korean: '한국어를 정말 잘하시는군요!',
      english: 'Oh, I see you speak Korean really well!',
      vietnamese: 'Ra là bạn nói tiếng Hàn giỏi thật đấy!',
      romanization: 'hangugeoreul jeongmal jalhasineungunyo!'
    }],
    usage: 'Expresses surprise or realization upon learning a new fact.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'ending',
    tags: ['realization', 'surprise', 'discovery']
  },
  {
    id: 'int-22',
    korean: 'V는/A(으)ㄴ 편이다',
    english: 'To tend to / To be on the side of',
    vietnamese: 'thuộc dạng, là diện',
    structure: 'Verb/Adjective + 편이다',
    examples: [{
      korean: '저는 조용한 편이에요.',
      english: 'I tend to be quiet.',
      vietnamese: 'Tôi thuộc dạng người trầm tính.',
      romanization: 'jeoneun joyonghan pyeonieyo.'
    }],
    usage: 'Indicates a tendency or general characteristic rather than an absolute fact.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['tendency', 'characteristic', 'generally']
  },
  {
    id: 'int-23',
    korean: 'V는 바람에',
    english: 'Because / Due to (unexpectedly)',
    vietnamese: 'tại vì',
    structure: 'Verb stem + 는 바람에',
    examples: [{
      korean: '버스를 놓치는 바람에 지각했어요.',
      english: 'I was late because I missed the bus.',
      vietnamese: 'Tại vì lỡ xe buýt nên tôi đã đến muộn.',
      romanization: 'beoseureul nochineun barame jigakhaesseoyo.'
    }],
    usage: 'Used to indicate that an unexpected, negative event caused the following result.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['reason', 'cause', 'negative', 'unexpected']
  },
  {
    id: 'int-24',
    korean: 'V는 중에 / N 중이다',
    english: 'In the middle of / Currently doing',
    vietnamese: 'đang, trong khi',
    structure: 'Verb/Noun + 중이다',
    examples: [{
      korean: '지금 회의 중이에요.',
      english: 'I am in a meeting right now.',
      vietnamese: 'Bây giờ tôi đang họp.',
      romanization: 'jigeum hoeui jungieyo.'
    }],
    usage: 'Indicates that an action is currently in progress.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['in-progress', 'currently', 'middle-of']
  },
  {
    id: 'int-25',
    korean: 'V도록 하다',
    english: 'To make sure to / To advise to',
    vietnamese: 'hãy, phải (khuyên nhủ, mệnh lệnh nhẹ)',
    structure: 'Verb stem + 도록 하다',
    examples: [{
      korean: '내일까지 숙제를 끝내도록 하세요.',
      english: 'Please make sure to finish the homework by tomorrow.',
      vietnamese: 'Hãy chắc chắn rằng bạn hoàn thành bài tập về nhà trước ngày mai.',
      romanization: 'naeilkkaji sukjereul kkeutnaedorok haseyo.'
    }],
    usage: 'Used to give instructions, commands, or advice in a relatively soft manner.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['instruction', 'advice', 'command']
  },
  {
    id: 'int-26',
    korean: 'V/A(으)ㄴ/N인 줄 알다/모르다',
    english: 'I thought... / I didn\'t know...',
    vietnamese: 'cứ tưởng là/không biết rằng',
    structure: 'Verb/Adjective/Noun + 줄 알다/모르다',
    examples: [{
      korean: '오늘이 일요일인 줄 알았어요.',
      english: 'I thought today was Sunday.',
      vietnamese: 'Tôi cứ tưởng hôm nay là Chủ nhật.',
      romanization: 'oneuri iryoirin jul arasseoyo.'
    }],
    usage: 'Expresses a mistaken belief or a lack of knowledge about a fact.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['assumption', 'belief', 'mistake']
  },
  {
    id: 'int-27',
    korean: 'V(으)ㄹ 줄 알다/모르다',
    english: 'To know/not know how to do something',
    vietnamese: 'biết/không biết làm gì',
    structure: 'Verb stem + (으)ㄹ 줄 알다/모르다',
    examples: [{
      korean: '운전할 줄 알아요?',
      english: 'Do you know how to drive?',
      vietnamese: 'Bạn có biết lái xe không?',
      romanization: 'unjeonhal jul arayo?'
    }],
    usage: 'Expresses ability or inability to perform an action.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['ability', 'skill', 'know-how']
  },
  {
    id: 'int-28',
    korean: 'N에 비해(서)',
    english: 'Compared to...',
    vietnamese: 'so với',
    structure: 'Noun + 에 비해(서)',
    examples: [{
      korean: '작년에 비해서 키가 많이 컸어요.',
      english: 'Compared to last year, I have grown a lot taller.',
      vietnamese: 'So với năm ngoái, tôi đã cao hơn rất nhiều.',
      romanization: 'jangnyeone bihaeseo kiga mani keosseoyo.'
    }],
    usage: 'Used to make a comparison between two things.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['comparison', 'relative']
  },
  {
    id: 'int-29',
    korean: 'V/A기를 바라다',
    english: 'To hope / wish for',
    vietnamese: 'mong rằng, hi vọng rằng',
    structure: 'Verb/Adjective stem + 기를 바라다',
    examples: [{
      korean: '시험에 합격하기를 바랍니다.',
      english: 'I hope you pass the exam.',
      vietnamese: 'Tôi hy vọng bạn sẽ vượt qua kỳ thi.',
      romanization: 'siheome hapgyeokhagireul baramnida.'
    }],
    usage: 'Expresses a hope or wish for something to happen.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['hope', 'wish', 'desire']
  },
  {
    id: 'int-30',
    korean: '아무 N(이)나',
    english: 'Any (noun)',
    vietnamese: 'bất cứ',
    structure: '아무 + Noun + (이)나',
    examples: [{
      korean: '아무 때나 괜찮아요.',
      english: 'Any time is fine.',
      vietnamese: 'Bất cứ lúc nào cũng được.',
      romanization: 'amu ttaena gwaenchanayo.'
    }],
    usage: 'Indicates "any" noun without exception, used in positive sentences.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['any', 'indefinite', 'choice']
  },
  {
    id: 'int-31',
    korean: '간접 화법 (Declarative)',
    english: 'Indirect Speech (Declarative)',
    vietnamese: 'nói rằng, nói là (câu trần thuật gián tiếp)',
    structure: 'Vㄴ/는다고 하다, A다고 하다, N(이)라고 하다',
    examples: [{
      korean: '친구가 오늘 바쁘다고 했어요.',
      english: 'My friend said they are busy today.',
      vietnamese: 'Bạn tôi nói rằng hôm nay bạn ấy bận.',
      romanization: 'chinguga oneul bappeudago haesseoyo.'
    }],
    usage: 'Used to report what someone else has said.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['indirect-speech', 'reported-speech', 'quotation']
  },
  {
    id: 'int-32',
    korean: '간접 화법 (Interrogative)',
    english: 'Indirect Speech (Interrogative)',
    vietnamese: 'hỏi rằng (câu nghi vấn gián tiếp)',
    structure: 'V/A(으)냐고 하다/묻다',
    examples: [{
      korean: '엄마가 어디 가냐고 물었어요.',
      english: 'My mom asked where I was going.',
      vietnamese: 'Mẹ đã hỏi tôi đang đi đâu.',
      romanization: 'eommaga eodi ganyago mureosseoyo.'
    }],
    usage: 'Used to report a question that someone else asked.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['indirect-speech', 'reported-speech', 'question']
  },
  {
    id: 'int-33',
    korean: 'V(으)ㄹ까 하다',
    english: 'To consider doing / I am thinking of...',
    vietnamese: 'đang nghĩ, định là',
    structure: 'Verb stem + (으)ㄹ까 하다',
    examples: [{
      korean: '주말에 영화를 볼까 해요.',
      english: 'I\'m thinking of watching a movie this weekend.',
      vietnamese: 'Tôi đang định cuối tuần này đi xem phim.',
      romanization: 'jumare yeonghwareul bolkka haeyo.'
    }],
    usage: 'Expresses an undecided plan or intention.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['intention', 'consideration', 'undecided']
  },
  {
    id: 'int-34',
    korean: '반말 (Informal Language)',
    english: 'Informal speech',
    vietnamese: 'đuôi văn nói ngang hàng (반말)',
    structure: 'Various endings (e.g., -ㄴ/는다, -다, -니/냐?, -자)',
    examples: [{
      korean: '밥 먹었어?',
      english: 'Did you eat?',
      vietnamese: 'Ăn cơm chưa?',
      romanization: 'bap meogeosseo?'
    }],
    usage: 'Used with close friends, younger people, or in very informal situations.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['informal', 'banmal', 'speech-level']
  },
  {
    id: 'int-35',
    korean: 'N아/야',
    english: 'Vocative particle',
    vietnamese: 'à, ơi (gọi tên)',
    structure: 'Noun (name) + 아/야',
    examples: [{
      korean: '민준아, 뭐 해?',
      english: 'Minjun, what are you doing?',
      vietnamese: 'Min-jun à, đang làm gì thế?',
      romanization: 'minjuna, mwo hae?'
    }],
    usage: 'Used when calling someone\'s name informally.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'particle',
    tags: ['vocative', 'calling', 'informal']
  },
  {
    id: 'int-36',
    korean: 'V다(가) 보면',
    english: 'If you keep doing...',
    vietnamese: 'nếu cứ liên tục làm gì thì…',
    structure: 'Verb stem + 다(가) 보면',
    examples: [{
      korean: '계속 듣다 보면 익숙해질 거예요.',
      english: 'If you keep listening, you will get used to it.',
      vietnamese: 'Nếu cứ tiếp tục nghe thì bạn sẽ quen thôi.',
      romanization: 'gyesok deutda bomyeon iksukhaejil geoyeyo.'
    }],
    usage: 'Indicates that if an action is continued, a certain result will naturally follow.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['repetition', 'discovery', 'condition']
  },
  {
    id: 'int-37',
    korean: 'V/A(으)ㅁ',
    english: 'Nominalizer / formal ending',
    vietnamese: 'danh từ hóa / đuôi kết thúc câu trang trọng',
    structure: 'Verb/Adjective stem + (으)ㅁ',
    examples: [{
      korean: '많이 웃음이 건강에 좋음.',
      english: 'Laughing a lot is good for health. (As a noun)',
      vietnamese: 'Việc cười nhiều thì tốt cho sức khỏe.',
      romanization: 'mani useumi geongange joheum.'
    }],
    usage: 'Turns verbs/adjectives into nouns, or used as a formal, written sentence ender.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'ending',
    tags: ['nominalization', 'formal', 'written']
  },
  {
    id: 'int-38',
    korean: '간접 화법 (Imperative)',
    english: 'Indirect Speech (Imperative)',
    vietnamese: 'bảo là (câu mệnh lệnh gián tiếp)',
    structure: 'V(으)라고 하다',
    examples: [{
      korean: '선생님께서 조용히 하라고 하셨어요.',
      english: 'The teacher told us to be quiet.',
      vietnamese: 'Giáo viên đã bảo chúng tôi hãy trật tự.',
      romanization: 'seonsaengnimkkeseo joyonghi harago hasyeosseoyo.'
    }],
    usage: 'Used to report a command or request.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['indirect-speech', 'reported-speech', 'command']
  },
  {
    id: 'int-39',
    korean: '간접 화법 (Propositive)',
    english: 'Indirect Speech (Propositive)',
    vietnamese: 'đề nghị là (câu đề nghị gián tiếp)',
    structure: 'V자고 하다',
    examples: [{
      korean: '친구가 같이 영화 보자고 했어요.',
      english: 'My friend suggested we watch a movie together.',
      vietnamese: 'Bạn tôi đã rủ cùng nhau đi xem phim.',
      romanization: 'chinguga gachi yeonghwa bojago haesseoyo.'
    }],
    usage: 'Used to report a suggestion.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['indirect-speech', 'reported-speech', 'suggestion']
  },
  {
    id: 'int-40',
    korean: 'V아/어 오다',
    english: 'Have been doing',
    vietnamese: 'đã đang (hành động tiếp diễn từ quá khứ đến hiện tại)',
    structure: 'Verb stem + 아/어 오다',
    examples: [{
      korean: '3년 동안 한국어를 공부해 왔어요.',
      english: 'I have been studying Korean for 3 years.',
      vietnamese: 'Tôi đã học tiếng Hàn được 3 năm rồi.',
      romanization: '3nyeon dongan hangugeoreul gongbuhae wasseoyo.'
    }],
    usage: 'Indicates an action that started in the past and has continued up to the present.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'verb',
    tags: ['continuation', 'past-to-present', 'duration']
  },
  {
    id: 'int-41',
    korean: 'V아/어 가다',
    english: 'To be doing / To go on doing',
    vietnamese: 'đang và sẽ (hành động tiếp diễn đến tương lai)',
    structure: 'Verb stem + 아/어 가다',
    examples: [{
      korean: '점점 나아져 갈 거예요.',
      english: 'It will gradually get better.',
      vietnamese: 'Sẽ dần dần tốt hơn thôi.',
      romanization: 'jeomjeom naajyeo gal geoyeyo.'
    }],
    usage: 'Indicates an action that is progressing from the present toward the future.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'verb',
    tags: ['progression', 'present-to-future', 'process']
  },
  {
    id: 'int-42',
    korean: 'V/A아야/어야겠다',
    english: 'I must / I should',
    vietnamese: 'sẽ phải…',
    structure: 'Verb/Adjective stem + 아야/어야겠다',
    examples: [{
      korean: '이제 자야겠어요.',
      english: 'I should go to sleep now.',
      vietnamese: 'Bây giờ tôi phải đi ngủ thôi.',
      romanization: 'ije jayagesseoyo.'
    }],
    usage: 'Expresses a sense of necessity or determination.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['necessity', 'determination', 'must']
  },
  {
    id: 'int-43',
    korean: 'V/A았/었으면 좋겠다',
    english: 'I wish / I hope',
    vietnamese: 'ước gì…',
    structure: 'Verb/Adjective stem + 았/었으면 좋겠다',
    examples: [{
      korean: '여행을 갔으면 좋겠어요.',
      english: 'I wish I could go on a trip.',
      vietnamese: 'Ước gì tôi được đi du lịch.',
      romanization: 'yeohaengeul gasseumyeon johgesseoyo.'
    }],
    usage: 'Expresses a wish or desire that is contrary to the present reality.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['wish', 'hope', 'desire']
  },
  {
    id: 'int-44',
    korean: '(아무리) V/A아/어도',
    english: 'Even if / No matter how',
    vietnamese: 'dù… nhưng',
    structure: 'Verb/Adjective stem + 아/어도',
    examples: [{
      korean: '아무리 바빠도 식사는 해야 해요.',
      english: 'No matter how busy you are, you have to eat.',
      vietnamese: 'Dù bận đến mấy thì cũng phải ăn cơm.',
      romanization: 'amuri bappado siksaneun haeya haeyo.'
    }],
    usage: 'Indicates that the situation in the second clause occurs regardless of the condition in the first clause.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['concession', 'even-if', 'no-matter']
  },
  {
    id: 'int-45',
    korean: 'V/A거든요',
    english: '...because / you see',
    vietnamese: 'vì, do (giải thích lý do đã biết)',
    structure: 'Verb/Adjective stem + 거든요',
    examples: [{
      korean: '왜 늦었어요? 길이 많이 막혔거든요.',
      english: 'Why were you late? Because the traffic was heavy.',
      vietnamese: 'Sao bạn đến muộn vậy? Vì đường bị tắc lắm.',
      romanization: 'wae neujeosseoyo? giri mani makhyeotgeodeunyo.'
    }],
    usage: 'Used to provide a reason or background information for a statement already made.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'ending',
    tags: ['reason', 'because', 'explanation']
  },
  {
    id: 'int-46',
    korean: 'V/A던데요',
    english: 'I recall that...',
    vietnamese: 'tôi thấy là (hồi tưởng)',
    structure: 'Verb/Adjective stem + 던데요',
    examples: [{
      korean: '어제 그 식당에 갔는데, 음식이 정말 맛있던데요.',
      english: 'I went to that restaurant yesterday, and I recall the food was really delicious.',
      vietnamese: 'Hôm qua tôi đến nhà hàng đó, tôi thấy đồ ăn ngon thật sự.',
      romanization: 'eoje geu sikdange ganneunde, eumsigi jeongmal masitdeondeyo.'
    }],
    usage: 'Expresses the speaker\'s recollection of a past experience or observation, often with mild surprise.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'ending',
    tags: ['recollection', 'past-experience', 'observation']
  },
  {
    id: 'int-47',
    korean: 'N대로',
    english: 'As / According to',
    vietnamese: 'theo, như',
    structure: 'Noun + 대로',
    examples: [{
      korean: '계획대로 하세요.',
      english: 'Do it according to the plan.',
      vietnamese: 'Hãy làm theo kế hoạch.',
      romanization: 'gyehoekdaero haseyo.'
    }],
    usage: 'Indicates that an action is performed in the same way as described by the noun.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'particle',
    tags: ['according-to', 'as', 'following']
  },
  {
    id: 'int-48',
    korean: 'V지 않으면 안 되다',
    english: 'Must / Have to',
    vietnamese: 'phải (phủ định của phủ định)',
    structure: 'Verb stem + 지 않으면 안 되다',
    examples: [{
      korean: '이 약을 먹지 않으면 안 돼요.',
      english: 'You must take this medicine.',
      vietnamese: 'Bạn phải uống thuốc này.',
      romanization: 'i yageul meokji anheumyeon an dwaeyo.'
    }],
    usage: 'A double negative construction that emphasizes necessity. Synonymous with -아야/어야 하다.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['necessity', 'must', 'obligation', 'double-negative']
  },
  {
    id: 'int-49',
    korean: 'V(으)려던 참이다',
    english: 'Was just about to...',
    vietnamese: 'vừa mới định…',
    structure: 'Verb stem + (으)려던 참이다',
    examples: [{
      korean: '막 전화하려던 참이었어요.',
      english: 'I was just about to call you.',
      vietnamese: 'Tôi vừa mới định gọi cho bạn.',
      romanization: 'mak jeonhwaharyeodeon chamieosseoyo.'
    }],
    usage: 'Indicates that the speaker was on the verge of doing an action when something else happened or was mentioned.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['imminent-action', 'about-to', 'timing']
  },
  {
    id: 'int-50',
    korean: 'V느라고',
    english: 'Because of doing... / While doing...',
    vietnamese: 'vì mải mê làm gì nên',
    structure: 'Verb stem + 느라고',
    examples: [{
      korean: '영화를 보느라고 전화를 못 받았어요.',
      english: 'I couldn\'t answer the phone because I was watching a movie.',
      vietnamese: 'Vì mải xem phim nên tôi không thể nghe điện thoại.',
      romanization: 'yeonghwareul boneurago jeonhwareul mot badasseoyo.'
    }],
    usage: 'Expresses a reason, often for a negative outcome, where the subject was occupied with the first action.',
    level: 'intermediate',
    topikLevel: 3,
    category: 'expression',
    tags: ['reason', 'because', 'occupied']
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