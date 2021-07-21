const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/
fifaData.filter(function (item) {
    return item.Year === 2014;
})

const finals2014 = fifaData.filter(function (item) {
    return item.Year === 2014 && item.Stage === "Final";
});
console.log("task 1:", finals2014);
//(a) Home Team name for 2014 world cup final
console.log("task 1a:", finals2014[0]["Home Team Name"]);
//(b) Away Team name for 2014 world cup final
console.log("task 1b:", finals2014[0]["Away Team Name"]);
//(c) Home Team goals for 2014 world cup final
console.log("task 1c:", finals2014[0]["Home Team Goals"]);
//(d) Away Team goals for 2014 world cup final
console.log("task 1d:", finals2014[0]["Away Team Goals"]);
//(e) Winner of 2014 world cup final */
console.log("task 1e:", finals2014[0]["Win conditions"]);

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/
//pass in data as a parameter - this will be the fifaData when you pass in your argument - this is an arry
//filter here - to filter for the stage of final
//returning the array

function getFinals(data) {
    const newArray = data.filter(function (item) {
        return item.Stage === "Final"
    });
    return newArray;
}

console.log("task 2:", getFinals(fifaData));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(data, getFinalscb) {
    const years = getFinalscb(data).map(function (item) {
        return item.Year;
    })
    return years;
}

console.log("task 3:", getYears(fifaData, getFinals));
//another method!
//const finalYears = getFinals();
//const years = [];
//finalYears.forEach(game=>{years.push(game.Year)})
//return years;

//receive data (fifaData)/  getFinalscb
//map through the finals cb to get all of the years (item.Year)
//return the array


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */

function getWinners(data, getFinalscb) {
    const winners = getFinalscb(data).map(function (item) {
        if (item["Home Team Goals"] > item["Away Team Goals"]) {
            return item["Home Team Name"];
        } else {
            return item["Away Team Name"];
        }
    })
    return winners;
}

console.log("task 4:", getWinners(fifaData, getFinals));

//another way
//function getWinners(data, getFinalscb) {
//  return getFinalscb(data).map(item =>["Home Team Goals"] > item["Away Team Goals"] ? item["Home Team Name"] : item["Away Team Name"]);)
//} //else is what is after the colon ? says condition goes before if true return this else: return this
//console.log ("task 4:", getWinners(fifaData, getFinals))


//receive 2 parameters - data (fifaData) / getFinalscb
//want an array of winners





/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getYears from task 3
3. Receive a callback function getWinners from task 4
4. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(data, getYearscb, getWinnerscb) {
    const winners = getWinnerscb(data, getFinals);
    // console.log("winners", winners);
    const years = getYearscb(data, getFinals);
    // console.log("years", years)
    return winners.map(function (item, index) {
        return `In ${years[index]}, ${item} won the world cup!`
    })
}
//return winners.map((item, index)=> `In ${years[index]}, ${item} won the world cup`); //arrow function version
console.log("task 5:", getWinnersByYear(fifaData, getYears, getWinners));

//probably use map here



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(getFinalscb) {
    const averageTeamGoals = getFinalscb.reduce(function (acc, item) {
        return acc + item["Home Team Goals"] + item["Away Team Goals"];
        //acc = accumulater//
    }, 0);

    //arrow function version: const averageTeamGoals = getFinalscb.reduce(acc, item)=>acc + item["Home Team Goals"] + item["Away Team Goals"],0);
    return (averageTeamGoals / getFinalscb.length).toFixed(2)//how many decimal places we want
}
console.log("task 6:", getAverageGoals(getFinals(fifaData)));
//people get tripped up getting things to a second decimal place. Look up .toFixed()



/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, initials) {
    const worldCupFinal = data.filter(item => item.Stage === "Final");
    return worldCupFinal.reduce((win, item) => {
        if (item["Home Team Initials"] === initials && item["Home Team Goals"] > item["Away Team Goals"]) {
            return ++win;
        } else if (item["Away Team Initials"] === initials && item["Away Team Goals"] > item["Home Team Goals"]) {
            return ++win;
        } else {
            return win;
        }
    }, 0)
}

console.log("Stretch 1:", getCountryWins(fifaData, "BRA"))
// const worldCupFinal = array.filter(item => item.Stage === "Final");
// const filteredArray = worldCupFinal.filter(item => initials === item["Home Team Initials"] || initials === item["Away Team Initials"]);


//     const worldCupWins = getFinalscb(data).map(function (item) {

//         if (item["Home Team Goals"] > item["Away Team Goals"]) {
//             return item["Home Team Initials"];
//         } else {
//             return item["Away Team Initials"];
//         }
//     })
//     return winners;
// }

// console.log(fileteredArray)
// const worldCupWins = filteredArray.filter()
/* code here */
// const worldCupGames = array.filter(item => item.Stage === 'Final');
// const worldCupWinners = worldCupGames.map(item => item['Home Team Goals'] > item['Away Team Goals'] ? item["Home Team Initials"] : item['Away Team Initials'])

// const numberOfWins = worldCupWinners.reduce((acc, item) {
//     if (item === initials) {
//         acc +=
//     }
// }, 0)
// return numberOfWins;



// console.log("Stretch 1:", getCountryWins(fifaData, "GER"));



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {
    //const goals = data.map(game => [game["Home Team Goals"], game["Away Team Goals"]]);
    /* code here */

}


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo() {
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
