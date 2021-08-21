import Discord from "discord.js";
import { categories } from "./categories.js";
import emojis from "./emojis.js";

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const defaultMessage = () => {
  let categoryReturn = "";
  let firstNSFW = true;
  return new Discord.MessageEmbed()
    .setColor("#A1C9F7")
    .attachFiles(["./img/elpajas.jpg"])
    .setAuthor(
      "EL PAJAS")
    .addField(
      "Available commands: ",
      `?sendpackage
      ${categories
        .map((category) => {
          categoryReturn = `?${category.command}`;

          if (!category.sfw && firstNSFW) {
            categoryReturn = `\n?${category.command}`;
            firstNSFW = false;
          }

          return categoryReturn;
        })
        .join(
          "\n"
        )}\n\nGet a random cute waifu image everytime you type a command!        
        \n\n${emojis.smiley}\t[Add WaifuBot to your server](${
        "https://discord.com/oauth2/authorize?client_id=878465777689317376&scope=bot&permissions=8"
      } 'just do it :)')\t${emojis.smiley}`,
      true
    );
};

export const waifuMessage = (url, name) => {
  return new Discord.MessageEmbed()
    .setColor("#A1C9F7")
    .attachFiles([url])
    .setThumbnail(url)
    .setAuthor(
      "EL PAJAS"  )
    .setTitle(capitalize(name))
    .addField(`IMAGE ? out of ?+ SENT`, `NEXT ONE TO BE DELIVERED WITH THE NEXT COMMAND`);
};

export const nsfwBlockMessage = () => {
  return new Discord.MessageEmbed()
    .setColor("#EF4444")
    .attachFiles(["./img/kimochiwarui.jpg"])
    .setAuthor(
      "El pajas")
    .addField(
      `You're not allowed to use NSFW commands in this channel  ${emojis.sad}`,
      `This channel is SFW`
    );
};

export const errorMessage = () => {
  return new Discord.MessageEmbed()
    .setColor("#EF4444")
    .attachFiles(["./img/sad.gif"])
    .setAuthor(
      "El pajas",
    )
    .addField(
      `Something went wrong with your command  ${emojis.sad}`,
      `You may be able to try again`
    );
};
