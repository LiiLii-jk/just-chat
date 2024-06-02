import type { Plugin } from 'vite'
import fs from 'node:fs'
import esbuild from 'esbuild'
import * as electronBuilder from 'electron-builder'
import path from 'path'

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

export const ElectronBuildPlugin = (): Plugin => {
    return {
        name: 'electron-build',
        closeBundle() {
            initElectron()
            //electron-builder 
            const json = JSON.parse(fs.readFileSync('package.json', 'utf-8'))
            json.main = 'background.js'
            fs.writeFileSync('dist/package.json', JSON.stringify(json, null, 4))
            fs.mkdirSync('dist/node_modules')
            electronBuilder.build({
                config: {
                    directories: {
                        output: path.resolve(process.cwd(), 'release'),
                        app: path.resolve(process.cwd(), 'dist')
                    },
                    asar: true,
                    appId: 'liilii.com',
                    productName: 'chat',
                    nsis: {
                        oneClick: false,
                        allowToChangeInstallationDirectory: true
                    }
                }
            })
        }
    }
}