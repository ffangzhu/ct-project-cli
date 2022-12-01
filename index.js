#!/usr/bin/env node
const {resolve} = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer') // 对话式询问
const handlebars = require('handlebars') // 写入模版
const { Command } = require('commander'); // 命令行框架
const ora = require('ora'); // loading效果
const chalk = require('chalk') // 文本美化
const logSymbols = require('log-symbols')
const download = require('download-git-repo') // 下载git仓库代码
const copy = require('./copy')
const {mkdirs} = require('./mkdir')

const program = new Command();

program
  .version('0.0.1') // -V | --version


// const template = {
//     'template-a': {
//         url: 'https://github.com/ffangzhu/webpack-exercise',
//         downloadUrl: 'https://github.com:ffangzhu/webpack-exercise#main',
//         description: '这是模版A'
//     },
//     'template-b': {
//         url: 'https://github.com/ffangzhu/webpack-exercise',
//         downloadUrl: 'https://github.com:ffangzhu/webpack-exercise#main',
//         description: '这是模版B'
//     }
// }

// program
//   .command('list')
//   .description('查看所有模版')
//   .action(() => {
//     for(key in template){
//         console.log(` ${key} ${template[key].description}`)
//     }
//   });

program
  .command('init <project>')
  .description('初始化项目模板')
  .action((projectName) => {
  const path1  =  `${resolve('./')}/${projectName}`
  const spinner = ora('正在下载项目模板...').start()
     mkdirs(projectName)
        try {
            copy(path1)
            spinner.succeed() // 下载成功提示
            inquirer.prompt([{
                type: "input",
                message: "请输入项目名称",
                name: "name",
            },{
                type: "input",
                message: "请输入项目简介",
                name: "description",
            },{
                type: "input",
                message: "请输入作者名称",
                name: "author",
            }]).then((answers)=>{
                const packagePath = `${projectName}/package.json`
                const packageContent = fs.readFileSync(packagePath,'utf-8')
                const packageResult = handlebars.compile(packageContent)(answers)
                fs.writeFileSync(packagePath, packageResult)
                console.log(logSymbols.success,chalk.green('初始化模版成功'))
            });
            
          } catch(err) {
            spinner.fail() // 下载失败提示
            console.log(logSymbols.error,chalk.green('初始化模版失败'))
          }
   
    // download(template[templateName].downloadUrl,projectName, {clone: true},(err)=>{
    //     console.log(err?'err': 'suss')
    // })
   
  });

program.parse();