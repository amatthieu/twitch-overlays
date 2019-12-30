import {pass, username, channel} from '../../properties/chat.json'

function parseMessage({data: rawMessage}) {
  var parsedMessage = {
      message: null,
      tags: null,
      command: null,
      original: rawMessage,
      channel: null,
      username: null
  };

  if(rawMessage[0] === '@'){
      var tagIndex = rawMessage.indexOf(' '),
      userIndex = rawMessage.indexOf(' ', tagIndex + 1),
      commandIndex = rawMessage.indexOf(' ', userIndex + 1),
      channelIndex = rawMessage.indexOf(' ', commandIndex + 1),
      messageIndex = rawMessage.indexOf(':', channelIndex + 1);

      parsedMessage.tags = rawMessage.slice(0, tagIndex);
      parsedMessage.username = rawMessage.slice(tagIndex + 2, rawMessage.indexOf('!'));
      parsedMessage.command = rawMessage.slice(userIndex + 1, commandIndex);
      parsedMessage.channel = rawMessage.slice(commandIndex + 1, channelIndex);
      parsedMessage.message = rawMessage.slice(messageIndex + 1);
  } else if(rawMessage.startsWith("PING")) {
      parsedMessage.command = "PING";
      parsedMessage.message = rawMessage.split(":")[1];
  }

  return parsedMessage;
}

const websocket = new WebSocket('wss://irc-ws.chat.twitch.tv:443/', 'irc')

websocket.onopen = () => {
  websocket.send('CAP REQ :twitch.tv/tags twitch.tv/commands twitch.tv/membership')
  websocket.send(`PASS ${pass}`)
  websocket.send(`NICK ${username}`)
  websocket.send(`JOIN ${channel}`)
}

websocket.onclose = () => {
  websocket.close()
}

function onMessage (callback) {
  websocket.onmessage = (raw) => {
    let entry = parseMessage(raw)
    if(entry.command === 'PING') {
      websocket.send(`PONG :${entry.message}`)
    } else {
      if(entry.command === 'PRIVMSG') {
        callback(entry)
      }
      callback(entry)
    }
  }
}

/**
 * Reacts on message received from channel chat
 * Should only be used to react to chat ()
 */
export default onMessage
