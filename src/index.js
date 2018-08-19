import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { processInlineQuery } from 'bot/actions';

// Init config .env
dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.on('message', (message) => {
    console.log(message);
});

bot.on('inline_query', processInlineQuery);
