import { User } from '../../database/models';
import { Group } from '../../database/models';

const processStart = (bot) => {
    return async (message) => {
        
        const chatId = message.chat.id;
        const exists = await User.exists({ chat_id: chatId.toString() });

        if (!exists) {
            const newUser = await User.create({
                chat_id: message.chat.id,
                first_name: message.chat.first_name,
                last_name: message.chat.last_name,
                username: message.chat.username,
            });
            
            console.log("Respuesta de usuarios", newUser);

            const newGroup = await Group.create({name: `My Group ${ newUser.username }`});

            newGroup.addMember(newUser);
            
            await bot.sendMessage(chatId, 'Bienvenido! Hemos almacenado algunos datos de ti, para que puedas hacer uso del bot inline en cualquier lugar de telegram.')
        } else {
            await bot.sendMessage(chatId, 'Bienvenido de vuelta, nos alegra tenerte por aqui nuevamente.')
        }
    };
};

export default processStart;
