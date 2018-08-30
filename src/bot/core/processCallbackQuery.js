import { arrayChunk } from '../../utils/utils';

const regexCallbackQuery = /^(\w+[a-zA-Z0-9])\@(\w+[a-zA-Z0-9])\:?(\w+[a-zA-Z0-9]|\d)$/;

const processCallbackQuery = (bot) => {
	return async (message) => {
		console.log(message);

		const match = message.data.match(regexCallbackQuery);
		
		if (match){
			const [,namespace, action, params ] = match;

			if(namespace === 'group'){
	    		//bot.answerCallbackQuery(m.message.id, 'Ok, here ya go!');

	    		const keyboard = [
	    			{
            			text: 'Edit Name', 
            			callback_data: 'group@edit_name'
            		},
            		{
            			text: 'Add Member', 
            			callback_data: 'group@add_member'
            		},
            		{
            			text: 'Show Members',
            			callback_data: 'group@show_members',
            		},
            		{
            			text: 'Back <',
            			callback_data: 'group@back',
            		}
			    ];

			    bot.editMessageText(`Group: ${message.data}`, {
			        chat_id: message.message.chat.id,
			        message_id: message.message.message_id,
			        reply_markup: JSON.stringify({
			            inline_keyboard: arrayChunk(keyboard, 2),
			        }),
			    });
			}
		}
	};
};

export default processCallbackQuery;