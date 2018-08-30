import { arrayChunk } from '../../utils/utils';
import { User, Group } from '../../database/models';

const regexCallbackQuery = /^(\w+[a-zA-Z0-9])\@(\w+[a-zA-Z0-9])\:(\w+[a-zA-Z0-9]|\d)$/;
const getAction = (action) => {
    console.log(action);
    const actions = {
        'open_group': (bot, message, data) => {
            const keyboard = [
                {
                    text: '\uD83D\uDCDD Edit Name',
                    callback_data: 'group@edit_name:1'
                },
                {
                    text: '\u2795 Add Member',
                    callback_data: 'group@add_member:1'
                },
                {
                    text: '\uD83D\uDC65 Members',
                    callback_data: 'group@show_members:1',
                },
                {
                    text: '\uD83D\uDD19 Back',
                    callback_data: 'group@back:1',
                }
            ];

            bot.editMessageText(`Group: ${message.data}`, {
                chat_id: message.message.chat.id,
                message_id: message.message.message_id,
                reply_markup: JSON.stringify({
                    inline_keyboard: arrayChunk(keyboard, 2),
                }),
            });
        },
        'show_members': async (bot, message, data) => {
            const group = await Group.findById(data);
            const members = await group.getMembers();

            const keyboard = members.map(member => {
               return {text: `@${member.username}`, callback_data: `group@show_member:${member.id}`}
            });

            bot.editMessageText(`Members group: ${message.data}`, {
                chat_id: message.message.chat.id,
                message_id: message.message.message_id,
                reply_markup: JSON.stringify({
                    inline_keyboard: arrayChunk(keyboard, 2),
                }),
            });
        },
        'show_member': async (bot, message, data) => {
            const  user = await User.findById(data);

            const keyboard = [
                { text: '\uD83D\uDEAB Kick', callback_data: `group@kick_member:${ user.id }` },
                { text: '\uD83D\uDCDD Edit permission', callback_data: `group@edit_permission_member:${ user.id }`}
            ];

            const msg = `` +
                `<strong>Name:</strong> ${ user.first_name } ${ user.last_name }\n` +
                `<strong>Username:</strong> ${ user.username }\n\n` +
                `<strong>Permissions:</strong>\n` +
                `<strong>Root:</strong> \u2705 \n` +
                `<strong>Create:</strong> \u274C \n` +
                `<strong>Edit:</strong> \u2705 \n` +
                `<strong>Delete:</strong> \u2705 \n`;

            bot.editMessageText(msg, {
                chat_id: message.message.chat.id,
                message_id: message.message.message_id,
                reply_markup: JSON.stringify({
                    inline_keyboard: arrayChunk(keyboard, 2),
                }),
                parse_mode: "HTML"
            });
        },
        'default': () => console.log('Action no found'),
    };
    return actions[action] || actions['default']
};
const processCallbackQuery = (bot) => {
	return async (message) => {
		console.log(message);

		const match = message.data.match(regexCallbackQuery);
        console.log(match);
		if (match){
			const [,namespace, action, params ] = match;

			if (namespace === 'group'){
	    		//bot.answerCallbackQuery(m.message.id, 'Ok, here ya go!');
                const x = getAction(action);
                x(bot, message, params );
			}
		}
	};
};

export default processCallbackQuery;
