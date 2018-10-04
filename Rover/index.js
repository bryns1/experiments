const watch = require('node-watch')
const fs = require('fs')
const { spawn } = require('child_process')
const { highlight } = require('cli-highlight')
const chalk = require('chalk')
const path = require('path')

const cmd = 'py ./scaffold/game.py'
let py = Python(cmd)

watch('.', { 
  recursive: true,
  filter: f => !/node_modules/.test(f) && /.*.py/.test(f)
}, function(evt, name) {
  console.log('%s changed.', name)
  console.log('Restarting')
  py.cancel()
  py = Python(cmd)
});

const commands = [
  {
    alias: ['restart', 'rs', 'r'],
    fun: () => {
      py = Python(cmd)
    }
  }
]

process.stdin.on('data', data => {
  if(py.status() === 'RUNNING') return 
  const cmd = data.toString().trim()

  for(const data of commands){
    if(data.alias.includes(cmd)){
      data.fun()
    }
  }
})


function Python(src){
  const [cmd, ...args] = src.split(' ')
  let cancelled = false
  process.stdout.write('\x1Bc');  
  console.log(chalk.grey('# Using Python3'))
  console.log(`Running ${chalk.magenta(args[0].split('/').pop())}`)
  console.log(chalk.grey('========================================================='))
  const child = spawn(cmd, args)
  let status = 'RUNNING'
  const pythonLogOpts = {language: 'python', ignoreIllegals: true}
  const pipeIn = data => child.stdin.write(data)
  
  const exit = () => {
    cancelled = true
    status = "EXITED"
    console.log(chalk.red('exited'))
    process.stdin.removeListener('data', pipeIn)
  }


  process.stdin.on('data', pipeIn)

  child.stdout.on('data', (data) => {
    console.log(chalk.yellow(data.toString()))
  });

  child.stderr.on('data', (data) => {
    console.log(chalk.red(data.toString()))
  })
  // child.on('SIGINT', exit());
  child.on('close', exit);

  return {
    cancel: () => {
      if(!cancelled){
        child.kill('SIGINT')
        exit()
        return true
      }else{
        return false
      }
    },
    status: () => status
  }
}