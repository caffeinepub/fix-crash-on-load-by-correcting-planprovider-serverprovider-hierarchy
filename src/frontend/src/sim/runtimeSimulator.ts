import { MinecraftServer, ConsoleEntry, Player } from '../servers/serverTypes';

const CONSOLE_MESSAGES = [
  '[Server thread/INFO]: Time elapsed: {time} ms',
  '[Server thread/INFO]: Saving chunks for level \'ServerLevel[world]\'',
  '[Server thread/INFO]: ThreadedAnvilChunkStorage: All chunks are saved',
  '[Server thread/INFO]: Automatic saving is now enabled',
  '[User Authenticator #1/INFO]: UUID of player {player} is {uuid}',
  '[Server thread/WARN]: Can\'t keep up! Is the server overloaded?',
  '[Server thread/INFO]: [VoiceChat] Server started on port 24454',
  '[Server thread/INFO]: Preparing spawn area: {percent}%'
];

const PLAYER_NAMES = [
  'Steve', 'Alex', 'Notch', 'Herobrine', 'Creeper_King', 'Diamond_Miner',
  'Ender_Dragon', 'Zombie_Slayer', 'Builder_Pro', 'Redstone_Master',
  'PvP_Legend', 'Farmer_Joe', 'Explorer_Sam', 'Architect_Max', 'Warrior_Luna'
];

const CHAT_MESSAGES = [
  'Hey everyone!',
  'Anyone want to build together?',
  'Found diamonds!',
  'Where is the spawn?',
  'Nice base!',
  'Can someone help me?',
  'Trading emeralds',
  'Epic build!',
  'GG',
  'Thanks!',
  'Cool server',
  'Let\'s go mining',
  'Watch out for creepers!',
  'Anyone have food?'
];

const COMMANDS = [
  '/gamemode creative',
  '/tp ~ ~ ~',
  '/time set day',
  '/weather clear',
  '/give @s diamond 64',
  '/home',
  '/spawn',
  '/tpa'
];

let lastPlayerActivity: Record<string, number> = {};

export function generateConsoleLine(server: MinecraftServer): ConsoleEntry | null {
  if (Math.random() > 0.3) return null;
  
  const template = CONSOLE_MESSAGES[Math.floor(Math.random() * CONSOLE_MESSAGES.length)];
  const message = template
    .replace('{time}', Math.floor(Math.random() * 1000).toString())
    .replace('{player}', PLAYER_NAMES[Math.floor(Math.random() * PLAYER_NAMES.length)])
    .replace('{uuid}', `${Math.random().toString(36).substr(2, 8)}-${Math.random().toString(36).substr(2, 4)}`)
    .replace('{percent}', Math.floor(Math.random() * 100).toString());
  
  return {
    timestamp: Date.now(),
    message,
    type: message.includes('WARN') ? 'warning' : 'info'
  };
}

export function generatePlayerActivity(server: MinecraftServer): { players: Player[]; logEntry?: ConsoleEntry } | null {
  const now = Date.now();
  const lastActivity = lastPlayerActivity[server.id] || 0;
  
  if (now - lastActivity < 10000) {
    return { players: server.onlinePlayers };
  }
  
  lastPlayerActivity[server.id] = now;
  
  const currentPlayers = [...server.onlinePlayers];
  const action = Math.random();
  
  if (action < 0.3 && currentPlayers.length < 5) {
    const newPlayer: Player = {
      name: PLAYER_NAMES[Math.floor(Math.random() * PLAYER_NAMES.length)],
      joinedAt: now,
      ping: Math.floor(Math.random() * 100) + 20
    };
    
    if (!currentPlayers.find(p => p.name === newPlayer.name)) {
      currentPlayers.push(newPlayer);
      return {
        players: currentPlayers,
        logEntry: {
          timestamp: now,
          message: `[Server thread/INFO]: ${newPlayer.name} joined the game`,
          type: 'player'
        }
      };
    }
  } else if (action < 0.5 && currentPlayers.length > 0) {
    const playerIndex = Math.floor(Math.random() * currentPlayers.length);
    const player = currentPlayers[playerIndex];
    currentPlayers.splice(playerIndex, 1);
    
    return {
      players: currentPlayers,
      logEntry: {
        timestamp: now,
        message: `[Server thread/INFO]: ${player.name} left the game`,
        type: 'player'
      }
    };
  } else if (action < 0.7 && currentPlayers.length > 0) {
    const player = currentPlayers[Math.floor(Math.random() * currentPlayers.length)];
    const message = CHAT_MESSAGES[Math.floor(Math.random() * CHAT_MESSAGES.length)];
    
    return {
      players: currentPlayers,
      logEntry: {
        timestamp: now,
        message: `<${player.name}> ${message}`,
        type: 'player'
      }
    };
  } else if (action < 0.85 && currentPlayers.length > 0) {
    const player = currentPlayers[Math.floor(Math.random() * currentPlayers.length)];
    const command = COMMANDS[Math.floor(Math.random() * COMMANDS.length)];
    
    return {
      players: currentPlayers,
      logEntry: {
        timestamp: now,
        message: `[Server thread/INFO]: ${player.name} issued server command: ${command}`,
        type: 'info'
      }
    };
  }
  
  return { players: currentPlayers };
}
