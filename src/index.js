import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { processInlineQuery, processMessage, processCallbackQuery } from 'bot/core';
import { processStart, processGroup } from 'bot/actions';

// Init config .env
dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.on('message', processMessage);
bot.on('inline_query', processInlineQuery(bot));
bot.on('callback_query', processCallbackQuery(bot));
bot.on('polling_error', console.log);
bot.on('webhook_error', console.log);

//Start command
bot.onText(/\/start/, processStart(bot));

//Manage Groups
bot.onText(/\/(?:mygroups|groups|newgroup)/, processGroup(bot));
