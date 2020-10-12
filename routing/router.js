const Recruiter = require('../league/recruiter');

class Router {
    static route(route, message, database) {

        let recruit = new Recruiter(database, message);

        switch(route) {
            case "recruit":
                recruit.recruitChampion();
                break;
            default:
                message.reply("Not a valid command! Use !help for all commands.");
        }
    }
}
module.exports = Router;