
const fs = require('fs');






// Create browser window
const {app, BrowserWindow ,ipcMain} = require('electron');
const path = require('path');
const url = require('url');

// Electron application Browser window  
let win;

app.on('ready', createWindow);

function createWindow () {
    console.log("\ncreateWindow\n")
    win = new BrowserWindow(
        {width: 800,
         height: 600,
         webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
          }
        });

    win.loadURL(url.format({
        pathname: path.join(__dirname, '/front/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.on('closed', () => {
        win = null;
    }
    );

}





function list_files_in_dir(dir){
    return fs.readdirSync(dir);
}
function getPorts() {
    

    var LsDev = list_files_in_dir("/dev")
    //remove item from LsDev if it is not a serial port
    LsDev = LsDev.filter(function(item){
    
        return item.includes("cu") || item.includes("ttyACM") || item.includes("ttyUSB");
    }).map(function(item){
        return "/dev/" + item
    }).sort()
    
    //Display "Available Ports Are :" in Console
    console.log("Available Ports Are :");
    
    LsDev.forEach(function(item){
        console.log(item)
    })
    console.log("\n\n")
    
    return LsDev;
}
ipcMain.on("ready", function(event, arg){
    //log ready on terminal
    console.log("ready")

    win.webContents.send('ports', getPorts());
    
    
});






