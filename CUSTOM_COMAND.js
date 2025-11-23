//Metadata for the mod
ModAPI.meta.title(CUSTOM COMMAND");
ModAPI.meta.credits("MMM-tek");
ModAPI.meta.description("");
ModAPI.dedicatedServer.appendCode(function () {
    ModAPI.addEventListener("processcommand", (event) => {
        if (event.command.toLowerCase().startsWith("/test")) {
            ModAPI.require('player');
                if ('hi!'.charAt(0) !== "/") {
                    ModAPI.player.sendChatMessage({
                    message: 'hi!'
                    })
                }
        }
    });
});
