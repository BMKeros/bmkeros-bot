const isCommand = (text) => text.startsWith('/');
const isUsername = (text) => text.startsWith('@');

const parseUsername = (username) =>  !isUsername(username) ? `@${username}` : username;

export {
    isCommand,
    isUsername,
    parseUsername,
};

