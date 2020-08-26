const say = require('say')

// say.speak('Hello there how are you, how can I help?', "Alex").then(function(){
//     console.log(say);
// })

say.speak("we have found over 15 results, would you like to hear them all ?", "Alex", 1, function(err){
    if(err){console.log(err)};
    console.log("done");
})