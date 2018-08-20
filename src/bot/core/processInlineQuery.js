import { JsonEncode } from '../../utils/json';

const TYPE_QUERY_SEARCH = 'Qsearch';
const TYPE_QUERY_NONE = 'Qnone';
const SYMBOL_SEARCH = '?';

const regexQueryAccount = /^(\?)([cuenta|account]+)(\@)(\w+[a-zA-Z])(\!)$/;

const isQuerySearch = text => text.startsWith(SYMBOL_SEARCH);

const getQueryType = (query) => {
    if(isQuerySearch(query)){
        return TYPE_QUERY_SEARCH;
    } else {
        return TYPE_QUERY_NONE;
    }
};

const processQuerySearch = (bot, queryID, queryString, fromUser) => {
    const match = queryString.match(regexQueryAccount);

    const [query, commandSymbol, command, paramSymbol, param] = match;

    console.log(match);

};

const processInlineQuery = (bot) => {
    return (message) => {
        const { id, query, from } = message;

        switch(getQueryType(query)){
            case TYPE_QUERY_SEARCH:
                if(regexQueryAccount.exec(query)) {
                    processQuerySearch(bot, id, query, from);
                }
                break;
            default:
                const answers = [{
                    type: 'article',
                    id: '0',
                    title: 'Unknown Command',
                    message_text: 'Unknown Command',
                }];

                bot.answerInlineQuery(id, JsonEncode(answers));
                break;
        }
    };
};

export default processInlineQuery;
