import { InteractionType, InteractionResponseType } from 'discord-interactions'
import {VerifyDiscordRequest} from './utils/requests.js'
import fs from 'fs'
import express from 'express'
import https from 'https'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
app.set('view engine', 'ejs')

app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }))

app.post('/interactions', async function (req, res) {
    const { type, id, data, token, member } = req.body;
  
    if (type === InteractionType.PING) {
      return res.send({ type: InteractionResponseType.PONG });
    }
  
    if (type === InteractionType.APPLICATION_COMMAND) {
      console.log(data);
    }
})

//generic message at port 3000
app.post('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})