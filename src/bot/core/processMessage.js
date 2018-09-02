import { User, Session, Group } from "../../database/models";

const newGroup = async (bot, user, session, message) => {

    const newGroup = await Group.create({
        name: message.text,
        owner_id: user.id,
    });
    await session.update({ data: '' });
    await bot.sendMessage(message.chat.id, `Your group ${message.text} was created successfully.`);
};

const getAction = (command) => {
    const actions = {
        'new_group': newGroup,
        'default': () => console.log('action not found'),
    };

    return actions[command] || actions['default'];
};

const processMessage = (bot) => {
    return async (message) => {
        const user = await User.find({ where: { username: message.from.username} });
        const session = await Session.find({ where: { user_id: user.id } });
        const data = await JSON.parse(session.data);

       const action = getAction(data.command);

       action(bot, user, session, message);
        //console.log("Message", message);
    };
};

export default processMessage;
