import {app,BrowserWindow} from 'electron'

app.whenReady().then(() => {
    const win = new BrowserWindow({
        height:600,
        width:800,
        webPreferences: {
            nodeIntegration:true,  //可以在渲染进程中使用nodeApi 安全考虑
            contextIsolation: false, //关闭渲染进程沙箱，
            webSecurity: false, //关闭跨域检测
        }
    })

    // win.webContents.openDevTools()

    if(process.argv[2]){
        win.loadURL(process.argv[2])
    }else{
        win.loadFile("index.html")
    }
})