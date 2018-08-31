import { arrayChunk } from '../../utils/utils';
import { User, Group } from '../../database/models';

const regexCallbackQuery = /^(\w+[a-zA-Z0-9])\@(\w+[a-zA-Z0-9])\:(\w+[a-zA-Z0-9]|\d)$/;


const getHandleByNamespace = (namespace) => {
	const actions = {
		'group': (args) => {

			const { action, bot, message, params } = { ...args };
			
			const handle = getHandleByAction(action);

			handle(bot, message, params);

		},
		'default': () => console.log(`Namespace [${namespace}] not found`),
	};

	return actions[namespace] || actions['default'];
};

const getHandleByAction = (action) => {
    const actions = {
        'open_group': async (bot, message, data) => {
        	const group = await Group.findById(data, { attributes: ['id', 'name' ] });

            const keyboard = [
                {
                    text: '\uD83D\uDCDD Edit Name',
                    callback_data: `group@edit_name:${ group.id }`,
                },
                {
                    text: '\u2795 Add Member',
                    callback_data: `group@add_member:${ group.id }`,
                },
                {
                    text: '\uD83D\uDC65 Members',
                    callback_data: 'group@show_members:1',
                },
                {
                    text: '\uD83D\uDD19 Back',
                    callback_data: 'group@back:1',
                },
            ];

            const msg = `<strong>Group:</strong> <i>${group.name}</i>`;

            bot.editMessageText(msg, {
                chat_id: message.message.chat.id,
                message_id: message.message.message_id,
                reply_markup: JSON.stringify({
                    inline_keyboard: arrayChunk(keyboard, 2),
                }),
                parse_mode: 'HTML',
            });
        },
        'edit_name': async (bot, message, data) => {
        	const { chat } = message.message;
        	bot.sendMessage(chat.id, 'Write the new group name');
        },
        'add_member': async (bot, message, data) => {
        	const { chat } = message.message;
        	bot.sendMessage(chat.id, 'Write the username of the contact that will be added to the group');
        },
        'show_members': async (bot, message, data) => {
            const group = await Group.findById(data);
            const members = await group.getMembers();

            const keyboard = members.map(member => {
               return {
               	text: `@${member.username}`, 
               	callback_data: `group@show_member:${member.id}`
               };
            });

            keyboard.push({
            	text: '\uD83D\uDD19 Back',
            	callback_data: 'group@back:1',
            });

            const msg = '<strong>There are no members in this group</strong>'

            if(members.length > 0){
            	msg = `Members group: ${message.data}`;
            }

            bot.editMessageText(msg, {
            	chat_id: message.message.chat.id,
                message_id: message.message.message_id,
                reply_markup: JSON.stringify({
                	inline_keyboard: arrayChunk(keyboard, 2),
	            }),
	            parse_mode: 'HTML',
	        });
        },
        'show_member': async (bot, message, data) => {
            const  user = await User.findById(data);

            const keyboard = [
                { 
                	text: '\uD83D\uDEAB Kick',
                	callback_data: `group@kick_member:${ user.id }` 
                },
                { 
                	text: '\uD83D\uDCDD Edit permission', 
                	callback_data: `group@edit_permission_member:${ user.id }`
                },
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
                parse_mode: 'HTML',
            });
        },
        'default': () => console.log(`Action [${action}] no found`),
    };

    return actions[action] || actions['default']
};

const processCallbackQuery = (bot) => {
	return async (message) => {
		const query = message.data;

		const match = query.match(regexCallbackQuery);

		if(match) {
			const [,namespace, action, params ] = match;

			const handle = getHandleByNamespace(namespace);

			handle({ bot, message, action, params });

			//bot.answerCallbackQuery(m.message.id, 'Ok, here ya go!');
		}
	};
};

export default processCallbackQuery;
