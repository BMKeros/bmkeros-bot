import { User } from 'database/models';
import { Group } from 'database/models';

const processStart = (bot) => {
    return async (message) => {

        const { id: chat_id, username, first_name, last_name }  = message.chat;
        const exists = await User.exists({ chat_id });

        if (!exists) {
            const newUser = await User.create({ chat_id, username, first_name, last_name });

            const newGroup = await Group.create({
                name: `My Personal Group [${ newUser.username }]`,
                owner_id: newUser.id,
            });

            bot.sendMessage(chat_id, `Bienvenido ${ newUser.first_name } ${ newUser.last_name } !! Hemos almacenado algunos datos de ti, para que puedas hacer uso del bot inline en cualquier lugar de telegram.`);
        } else {
            bot.sendMessage(chat_id, 'Bienvenido de vuelta, nos alegra tenerte por aqui nuevamente.');
        }
    };
};

export default processStart;
