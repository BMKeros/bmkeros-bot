import { User, Group, Session } from 'database/models';

const manageMyGroups = async (bot, user, chat_id) => {
    const groups = await user.getMyGroups({ attributes: ['id', 'name'] });
    const buttons = groups.map(g => {
        return { text: g.name, callback_data: `group@open_group:${g.id}`};
    });

    bot.sendMessage(chat_id, 'Choose a group!', {
        reply_markup: JSON.stringify({
            inline_keyboard: [buttons],
        }),
    });
};

const manageGroups = async (bot, user, chat_id) => {
    const groups = await user.getGroups({ attributes: ['name'] });
    const buttons = groups.map(g => ({ text: g.name, callback_data: '/groups' }))

    if(groups.length > 0) {
        bot.sendMessage(chat_id, 'Choose a group!', {
            reply_markup: JSON.stringify({
                inline_keyboard: [buttons],
            }),
        });
    } else {
        bot.sendMessage(chat_id, 'You are not a member of any group');
    }

};

const manageNewGroup = async (bot, user, chat_id) => {
    const [session]  = await Session.findOrCreate({
        where: { user_id: user.id },
    });
    let data = {
        command: 'new_group',
        user_id: user.id,
    };

    await session.update({ data, user_id: user.id });

    bot.sendMessage(chat_id, 'Write the group\'s name');
};

const getHandle = (command) => {
    const actions = {
        '/newgroup': manageNewGroup,
        '/groups': manageGroups,
        '/mygroups': manageMyGroups,
        'default': () => console.log('action not found'),
    };

    return actions[command] || actions['default'];
};

const processGroup = (bot) => {
    return async (message) => {

        const chat_id = message.chat.id;
        const from_id = message.from.id;
        const user = await User.findOne({ where: { chat_id: from_id }});

        const handle = getHandle(message.text);

        handle(bot, user, chat_id);
    };
};

export default processGroup;

