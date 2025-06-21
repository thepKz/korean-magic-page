import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates an explanation and examples for a given Korean grammar point using OpenAI.
 * @param {string} grammarPoint - The Korean grammar point (e.g., "N 밖에 + 부정").
 * @param {string} currentExplanation - The existing basic explanation.
 * @returns {Promise<string>} The AI-generated explanation.
 */
export async function generateGrammarExplanation(grammarPoint, currentExplanation) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured.');
  }

  const prompt = `
    Hãy đóng vai một giáo viên dạy tiếng Hàn chuyên nghiệp và thân thiện.
    Giải thích sâu hơn về điểm ngữ pháp tiếng Hàn sau đây cho một người Việt Nam đang học.

    **Ngữ pháp:** "${grammarPoint}"

    **Giải thích hiện tại (để tham khảo):** "${currentExplanation}"

    **Yêu cầu:**
    1.  **Giải thích sâu hơn:** Cung cấp một lời giải thích chi tiết hơn, nói rõ về sắc thái, các trường hợp sử dụng đặc biệt, hoặc các lỗi sai phổ biến mà người học hay mắc phải. Sử dụng ngôn ngữ dễ hiểu, gần gũi.
    2.  **So sánh (nếu có):** Nếu có những điểm ngữ pháp tương tự dễ gây nhầm lẫn, hãy so sánh chúng (ví dụ: so sánh "는 바람에" và "느라고").
    3.  **Thêm 3 ví dụ mới:** Cung cấp 3 câu ví dụ hoàn toàn mới (khác với các ví dụ đã có), đa dạng về tình huống sử dụng. Với mỗi ví dụ, hãy cung cấp:
        - Câu tiếng Hàn.
        - Lời dịch tiếng Việt.
    4.  **Định dạng:** Vui lòng trả lời bằng Markdown của Github. Sử dụng in đậm, in nghiêng và gạch đầu dòng để câu trả lời được rõ ràng và dễ đọc.

    Bắt đầu giải thích ngay, không cần lời chào hỏi.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // Or "gpt-3.5-turbo"
      messages: [
        {
          role: 'system',
          content: 'You are a helpful and professional Korean language teacher explaining grammar to a Vietnamese student.'
        },
        {
          role: 'user',
          content: prompt,
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to generate explanation from AI.');
  }
} 