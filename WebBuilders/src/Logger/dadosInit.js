function logo(text) {
    if (text == undefined) {
        text = ""
    }
    console.log(`
---------------------------------------------------------------
__          __  _     ____        _ _     _               
\\ \\        / / | |   |  _ \\      (_) |   | |              
 \\\ \\  /\\  / /__| |__ | |_) |_   _ _| | __| | ___ _ __ ___ 
  \\ \\/  \\/ / _ \\ '_ \\|  _ <| | | | | |/ _\` |/ _ \\ '__/ __|
   \\  /\\  /  __/ |_) | |_) | |_| | | | (_| |  __/ |  \\__ \\
    \\/  \\/ \\___|_.__/|____/ \\__,_|_|_|\\__,_|\\___|_|  |___/
    ${text}
---------------------------------------------------------------`)

}
module.exports.logo = logo;