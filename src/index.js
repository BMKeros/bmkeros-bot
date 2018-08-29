import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { processInlineQuery, processMessage } from 'bot/core';
import { processStart, processGroup } from 'bot/actions';

// Init config .env
dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

bot.on('message', processMessage);
bot.on('inline_query', processInlineQuery(bot));
bot.on('callback_query', (m) => {
    console.log(m);
    //bot.answerCallbackQuery(m.id, 'Ok, here ya go!');
    bot.editMessageText(`Group: ${m.data}`, {
        chat_id: m.message.chat.id,
        message_id: m.message.message_id,
        reply_markup: JSON.stringify({
            inline_keyboard: [[{text: 'Edit Name', callback_data: '..'},{text: 'Add Members', callback_data: '..'}]],
        }),
    });
});
bot.onText(/\/start/, processStart(bot));
bot.on('polling_error', console.log);
bot.on('webhook_error', console.log);

//Manage Groups
bot.onText(/\/mygroups/, processGroup(bot));
bot.onText(/\/groups/, processGroup(bot));

