import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { processInlineQuery, processMessage } from 'bot/core';
import { processStart, processGroup } from 'bot/actions';

// Init config .env
dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.on('message', processMessage);
bot.on('inline_query', processInlineQuery(bot));
bot.onText(/\/start/, processStart(bot));
bot.onText(/\/myGroups/, processGroup(bot));
bot.on('polling_error', console.log);
bot.on('webhook_error', console.log);
