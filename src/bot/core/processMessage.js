import { User, Session, Group } from "database/models";

const newGroup = async (bot, user, session, message) => {
    const newGroup = await Group.create({
        name: message.text,
        owner_id: user.id,
    });
    await session.update({ data: '' });

    bot.sendMessage(message.chat.id, `Your group ${message.text} was created successfully.`);
};

const editNameGroup = async (bot, user, session, message) => {
    const data = session.data;
    const group = await Group.findById(data.data);

    await group.update({ name: message.text });
    await session.update({ data: '' });

    bot.sendMessage(message.chat.id, 'Your group was updated successfully');
};

const getAction = (command) => {
    const actions = {
        'new_group': newGroup,
        'edit_name': editNameGroup,
        'default': () => console.log('action not found'),
    };

    return actions[command] || actions['default'];
};

const processMessage = (bot) => {
    return async (message) => {
        const user = await User.findByChatId(message.from.id);
        const session = await Session.find({ where: { user_id: user.id } });
        const data = session.data;

        if(data) {
            const action = getAction(data.command);
            action(bot, user, session, message);
        }
    };
};

export default processMessage;
