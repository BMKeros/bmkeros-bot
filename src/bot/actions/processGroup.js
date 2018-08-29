import { User } from 'database/models';

const processGroup = (bot) => {
    return async (message) => {
        const chat_id = message.from.id;
        const user = await User.findOne({ where: { chat_id: chat_id }});

        bot.sendMessage(chat_id, "Choose a group!", {
            reply_markup: JSON.stringify({
                inline_keyboard: [[{
                    text: "Group Example",
                    callback_data: "/myGroup",
                }]],
            }),
        });
    };
};

export default processGroup;

