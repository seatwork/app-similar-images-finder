/**
 * --------------------------------------------------------
 * Application Main Process
 * Author: Ai Chen
 * Copyright (c) 2020 Cloudseat.net
 * --------------------------------------------------------
 */
const electron = require('electron')
const path = require('path')

const icon = path.join(__dirname, 'assets/logo.png')
const indexPage = path.join(__dirname, 'gui/index.html')
const preload = path.join(__dirname, 'gui/preload.js')

/* --------------------------------------------------------
 * Create Main Window
 * ----------------------------------------------------- */
let mainWindow

function createWindow() {
    // Hide the menu of application
    electron.Menu.setApplicationMenu(null)

    // Create the browser window.
    mainWindow = new electron.BrowserWindow({
        width: 800, // Make sure the aspect ratio of video is 16:9
        height: 500,
        icon: icon,
        webPreferences: {
            nodeIntegration: true, // Make sure integrate node in renderer.js
            enableRemoteModule: true
        }
    })

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // and load the main.html of the app.
    mainWindow.loadFile(indexPage)

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

/* --------------------------------------------------------
 * Init Application Instance
 * ----------------------------------------------------- */

const app = electron.app
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) { app.quit() } else {

    // Someone tried to run a second instance, we should focus our window.
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore()
            mainWindow.focus()
        }
    })

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', createWindow)

    // Quit when all windows are closed.
    app.on('window-all-closed', function() {
        // On macOS it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') app.quit()
    })

}
