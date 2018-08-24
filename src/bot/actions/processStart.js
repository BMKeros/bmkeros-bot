import { User } from '../../database/models';

const processStart = (bot) => {
    return (message) => {
        //console.log("processStart", message);
        let chatId = message.chat.id;

        User.findOne({
            where: { chat_id: chatId.toString() }
        })
            .then(res => {
                if (res === null) {
                    User.create({
                        chat_id: message.chat.id,
                        first_name: message.chat.first_name,
                        last_name: message.chat.last_name,
                        username: message.chat.username,
                        //createdAt: Date.now(),
                    })
                        .then(res => {
                            bot.sendMessage(
                                chatId,
                                "Bienvenido! Hemos almacenado algunos datos de ti, para que puedas hacer uso del bot inline en cualquier lugar de telegram"
                            )
                        })
                        .catch(err => console.log);
                } else {
                    bot.sendMessage(chatId, "Bienvenido de vuelta, nos alegra tenerte por aqui nuevamente.")
                }
            })
            .catch(err => console.log);
    };
};

export default processStart;
