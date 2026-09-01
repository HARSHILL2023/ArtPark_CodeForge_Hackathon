require('dotenv').config();
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function listGroqModels() {
  try {
    const list = await groq.models.list();
    console.log('Available Groq Models:');
    list.data.forEach(m => console.log(' -', m.id));
  } catch (err) {
    console.error('Failed to list Groq models:', err.message);
  }
}

listGroqModels();
