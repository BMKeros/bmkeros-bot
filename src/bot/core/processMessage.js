import { User, Session, Group } from "database/models";
import { isCommand, isUsername } from 'utils/bot';

const newGroup = async (bot, user, session, message) => {
    const newGroup = await Group.create({
        name: message.text,
        owner_id: user.id,
    });
    await session.update({ data: '' });

    bot.sendMessage(message.chat.id, `Your group ${message.text} was created successfully.`);
};

const editNameGroup = async (bot, user, session, message) => {
    if(isCommand(message.text)){
        bot.sendMessage(message.chat.id, 'An error has occurred, write a correct group name');
    } else {
        const data = session.data;
        const group = await Group.findById(data.data);

        await group.update({ name: message.text });
        await session.update({ data: '' });

        bot.sendMessage(message.chat.id, 'Your group was updated successfully');
    }
};

const addMemberToGroup = async (bot, user, session, message) => {
    const { text } = message;

    const username = isUsername(text) ? text.slice(1, text.length) : text;

    const member = await User.find({ where: { username }});

    if(member){
        const data = session.data;
        const group = await Group.findById(data.data.group_id);

        await group.addMember(member);

        await session.update({ data: '' });
        bot.sendMessage(message.chat.id, `${username} has been added ${group.name} group successfully`);
    } else {
        bot.sendMessage(message.chat.id, `There is no user with this ${username} username`);
    }
};

const getAction = (command) => {
    const actions = {
        'new_group': newGroup,
        'edit_name': editNameGroup,
        'add_member': addMemberToGroup,
        'default': () => console.log('action not found'),
    };

    return actions[command] || actions['default'];
};

const processMessage = (bot) => {
    return async (message) => {
        const user = await User.findByChatId(message.from.id);

        if(user){
            const session = await Session.find({ where: { user_id: user.id } });
            const data = session.data;

            if(data) {
                const action = getAction(data.command);
                action(bot, user, session, message);
            }
        }
    };
};

export default processMessage;
