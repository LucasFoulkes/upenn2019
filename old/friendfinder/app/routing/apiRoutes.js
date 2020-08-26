var friends = require("../data/data.js");


module.exports = function (app) {
    app.get('/api/friends', (req, res) => res.json(friends));

    app.post("/api/friends", (req, res) => {
        var friend = {}
        friend.name = req.body.name
        friend.image = req.body.image
        friend.questions = req.body.questions.map(i => parseInt(i))

        console.log("friend: "+friend)

        var lastDiference = Infinity;
        var match = {};
        for (i in friends) {
            var difference = 0;
            for (j in friends[i].questions) {
                difference += Math.abs(parseInt(friends[i].questions[j]) - parseInt(friend.questions[j]));
            };
            if (difference < lastDiference) {
                lastDiference = difference
                match = friends[i]
            }
        };
        friends.push(friend);
        res.json(match);

    });

};
