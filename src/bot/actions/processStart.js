import { User, Group } from 'database/models';
import { format } from 'utils/string';
import * as messagesWelcome from 'messages/welcome';

const processStart = (bot) => {
    return async (message) => {
        const { id: chat_id, username, first_name, last_name }  = message.chat;
        const exists = await User.exists({ chat_id });

        if (!exists) {
            const newUser = await User.create({ chat_id, username, first_name, last_name });

            const newGroup = await Group.create({
                name: 'My Personal Group',
                owner_id: newUser.id,
            });

            bot.sendMessage(chat_id, format(messagesWelcome.newMember, { newUser }));
        } else {
            bot.sendMessage(chat_id, messagesWelcome.oldMember);
        }
    };
};

export default processStart;
