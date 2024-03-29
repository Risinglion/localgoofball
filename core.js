import csv from 'csv-parser'
import fs from 'fs'

/*
Function to quickly test the bot
*/
export function sayHi(data, interaction){
    let response
    if (!interaction.guild_id) {
        response = 'Hello there!';
    }
    else {
        if(data.resolved){
            if(data.resolved.users){
                const user = data.resolved.users[Object.keys(data.resolved.users)[0]];
                let userId = user.id;
                let username = user.username;
                if(user.id == 754217406012063836)
                response = `Hello there, <@${userId}>! Ahem! I mean Femboy!`
                else if(user.id == 1024356476401221713)
                response = `<@${userId}> stay away from me! <:loid_dethstare:1037035828129562654>`
                else
                response = `Hello there, <@${userId}>!`
            }
        }
        else{
            let userid = interaction.member.user.id;
            let username = interaction.member.user.username;
            response = 'Hello ' + username + '!';
        }
    }
    return response;
}
/*
Function to get roll number from user id
*/
export function getRoll(data, interaction){
    let response = "Function returned nothing"
    let roll = 0
    if (!interaction.guild_id) {
        response = 'This function is out of scope for DMs'
    }
    else {
        if(data.resolved){
            if(data.resolved.users){
                const user = data.resolved.users[Object.keys(data.resolved.users)[0]];
                const username = user.username;
                let userId = user.id;
                roll = getRollFromId(userId)
                if(roll == undefined)
                    response = "User is not registered"
                else
                    response = `**Username: ** ${username}\n**Roll Number:** *${roll}*`
            }
        }
        else{
            response = "User is not registered"
        }
    }
    return response;
}
/*
Function to search for a user with a given user id
Uses the S3CordMain.json file
userId is the primary key
*/
function getRollFromId(userId){
    const data = JSON.parse(fs.readFileSync('sheets/S3CordMain.json'))
    return data[userId]
}

/*
Function to search for a user details with a given roll number
Uses the RollUser.json file
roll is the primary key
*/
export function getDetails(data, interaction){
    const details = getDetailsFromRoll(data.options[0].value)
    if(details == undefined)
        return false
    return details
}

/*
Function to search for a user with a given roll number
Uses the RollUser.json file
roll is the primary key
*/
function getDetailsFromRoll(roll){
    roll = roll.toUpperCase()
    const data = JSON.parse(fs.readFileSync('sheets/RollUser.json'))
    console.log(data[roll])
    return data[roll]
}



/*******************/
/*******WIP********/
