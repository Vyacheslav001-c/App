import OpenAI from "openai";
const openai = new OpenAI({apiKey:`${process.env.API_URL}`});

// Об'єкт для зберігання контексту
let context = [{ role: "system", content: "розмовляй або українською або англійською" }];

export async function Main(message) {
  try {
    // Додаємо попередні повідомлення до контексту
    const messages = [...context, { role: "system", content: message }];

    const completion = await openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
    });

    if (completion.choices && completion.choices.length > 0) {
      // Оновлюємо контекст з попередніми повідомленнями
      context = [...messages, completion.choices[0].message];
      return completion.choices[0].message.content.toString();
    } else {
      throw new Error("Недійсна відповідь від API OpenAI");
    }
  } catch (error) {
    console.error('Помилка в Main:', error);
    // Ви можете вибрати інший спосіб обробки помилки тут, наприклад, поверненням стандартної відповіді або повторним викиданням помилки
    throw error;
  }
}
