import Discord from "discord.js";
import axios from "axios";
import dotenv from "dotenv";
import { categories } from "./categories.js";
import emojis from "./emojis.js";
import ImagesCache from "./images-cache.js";
import {
  defaultMessage,
  waifuMessage,
  nsfwBlockMessage,
  errorMessage,
} from "./commands.js";

dotenv.config();

const sendWaifuMessage = async (message, url, categoryName) => {
  const waifu = await message.channel.send(waifuMessage(url, categoryName));
  await waifu.react(emojis.smiley);
  await waifu.react(emojis.thumbsUp);
  await waifu.react(emojis.thumbsDown);
};

const client = new Discord.Client();

client.once("ready", () => {
  console.log("Bot ready...");
  console.log(
    `Bot available in ${
      client && client.guilds && client.guilds.cache && client.guilds.cache.size
    } guilds`
  );
  client.user.setActivity(`type ?help`);
});

client.on("message", async (message) => {
  const prefix = "?";

  if (!message.content.startsWith(prefix)) return;

  try {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLocaleLowerCase();

    if (command === "help") {
      return message.channel.send(defaultMessage());
    }

    if(command === "sendpackage"){
      categories.forEach(e => {

      callApiWaifu(message, e)
      });
      return
    }

    const categoryObject = categories.find((it) => it.command === command);

    if (!categoryObject) return;
    
    callApiWaifu(message, categoryObject)

  }
    catch (err) {
      return message.channel.send(errorMessage());
    }
  });

async function callApiWaifu(message, categoryObject){


  const type = categoryObject.sfw ? "sfw" : "nsfw";
  const category = categoryObject.name;


  if (ImagesCache.hasImages(type, category)) {
    const url = ImagesCache.getImage(type, category);
    await sendWaifuMessage(message, url, category);
    return;
  }

  const instance = axios.create({
    baseURL: "https://api.waifu.pics/many",
    timeout: 1000,
  });
  const response = await instance.post(`/${type}/${category}`, {
    exclude: [],
  });
  const data = response?.data;

  if (!data || !data.files) return;

  const { files } = data;
  ImagesCache.setImages(type, category, files);
  const url = ImagesCache.getImage(type, category);
  await sendWaifuMessage(message, url, category);


} 



client.login(process.env.DISCORD_TOKEN);
