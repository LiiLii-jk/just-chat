import type { Plugin } from 'vite'
import type { AddressInfo } from 'net'
import { spawn } from 'child_process'
import fs from 'node:fs'
import esbuild from 'esbuild'
import electron from 'electron'

const initElectron = () => {
    esbuild.buildSync({
        entryPoints: ['src/background.ts'],
        bundle: true,
        outfile: 'dist/background.js',
        platform: 'node',
        target: 'node16',
        external: ['electron']
    })
}

export const ElectronDevPlugin = ():Plugin => {
    return {
        name: 'electron-dev',
        configureServer(server) {
            initElectron()
            server.httpServer?.once('listening', () => {
                //获取vite服务信息
                const addressInfo = server.httpServer?.address() as AddressInfo
                //拼接IP信息
                const IP = `http://localhost:${addressInfo.port}`
                
                let electronProcess = spawn(electron.toString(),['dist/background.js',IP])
                fs.watchFile("src/background.ts",()=>{
                    electronProcess.kill()
                    initElectron()
                    electronProcess = spawn(electron.toString(),['dist/background.js',IP])
                })
                electronProcess.stderr?.on("data",(data)=>{
                    console.log(`日志:${data}`)
                })
            })
        }
    }
}