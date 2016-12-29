var exec = require('ssh-exec')

var err = function (err, stdout, stderr){
  console.log("that is bad: " +err,stdout,stderr);
}

//exec('ls -lh', 'ubuntu@my-remote.com').pipe(process.stdout)

// exec("cd git/notekeeper/;git pull;npm install; forever -m 5 -w --watchDirectory . start app.js",{
//   user: "ubuntu",
//   host: "process.env.DEPLOY_SERVER",
//   key: "process.env.KEYFILE"
// }).pipe(process.out)~/.ssh/
//console.log(process.env)
/*
exec('cd git/notekeeper/;git pull', {
  user:'ubuntu',
  host:process.env.DEPLOY_HOST, 
  key:process.env.KEY_FILE
}).pipe(process.stdout)


exec('cd git/notekeeper/;echo $PATH', {
  user:'ubuntu',
  host:process.env.DEPLOY_HOST,
  key:process.env.KEY_FILE
}).pipe(process.stdout)
*/
var stream = exec('bash -i',{ 
  user:'ubuntu',
  host:process.env.DEPLOY_HOST,
  key:process.env.KEY_FILE
})

stream.write('cd git/notekeeper \n')
stream.write('git pull \n')
stream.write('echo $PATH \n')
stream.write('npm install \n')
stream.write('date \n')
stream.write('forever -m 5 -w --watchDirectory . start app.js \n')
stream.write('exit \n')
stream.pipe(process.stdout)

