# Cyclius Calculator Mod
Hello, this is my first ever mod for cookie clicker, its based on a <a href="https://zypa.github.io/cyclius-calc/">website</a> i made of the same name, now the features are just implemented directly into the game.
As this is my first Cookie Clicker mod id love to hear feedback on how to improve it.

If you have any sort of experience with the modding api for Cookie Clicker and have the time to look through the code (dont worry, its a very small mod), it would be awesome if you could give feedback in regards to what i did wrong etc, as this mod was put together in a hurry, i have probably not used the correct hooks or anything like that.

<img src="preview.png"></img>

# Current features:
- Shows you the current bonuses of all the slots.
- Shows you whether theyre increasing or decreasing.
- Suggests what the best slot would be right now. (Currently it has no idea what your currently active slot is. so it cant make decisions based on that. it only looks an hour ahead, and checks which slot has the highest average score for that hour.)
- Poorly optimized code :D (the mod is so small that it shouldnt really be an issue tho.)

# Planned features:
- Make the suggestion part, also consider your currently active slot.
- Optimize the code.

# Known issues:
- If your game is very slow to load, the mod wont work. currently the threshold is more than 5 seconds to fully load. this is because i currently have no way to check if the pantheon has been initialized, and if the mod loads before the pantheon is initialized it throws an error, so currently ive set it to just wait 5 seconds to load the mod. and therefor if the pantheon hasnt been initialized after 5 seconds, you will not be able to use the mod,
