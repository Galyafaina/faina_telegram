const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
const token = 'YOUR_TELEGRAM_BOT_TOKEN';

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

// Function to fetch a random quote
async function getRandomQuote() {
    try {
        const response = await axios.get('https://api.quotable.io/random');
        const quote = response.data;
        return `${quote.content} - ${quote.author}`;
    } catch (error) {
        console.error('Error fetching quote:', error);
        return 'Failed to fetch quote. Please try again later.';
    }
}

// Event listener for the '/quote' command
bot.onText(/\/quote/, async (msg) => {
    const chatId = msg.chat.id;
    const quote = await getRandomQuote();
    bot.sendMessage(chatId, quote);
});

// Event listener for unsupported commands
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Unsupported command. Use /quote to get a random inspirational quote.');
});
