import { User } from '../../database/models';

const processStart = (bot) => {
    return (message) => {
        // console.log("processStart", message);
        User.create({
            chat_id: '15148651',
            first_name: 'tony',
            last_name: 'carrizo',
            username: 'boanergepro',
            createdAt: Date.now(),
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };
};

export default processStart;
