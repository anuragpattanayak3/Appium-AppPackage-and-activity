var reverse = require('reverse-string');
var fs=require('fs');
const nodeCmd = require('node-cmd');
nodeCmd.run('Dumpsys.bat');//getting the app package and activity into a javascript file
setTimeout(function() {
  fs.readFile('appPackage.js', function(err, buf) {
    buf=buf.toString();
    var str=buf;//storing the complete output in a variable str
    str=str.replace("}"," ");
    str.trim();
    str1=str.split("/");
    var str2=reverse(str1[0])
    str2=str2.split(" ");
    revappPackage=str2[0];
    appPackage=reverse(revappPackage);
    appActivity=str1[1];
    var aquaVariable=appPackage+"/"+appActivity;
    aquaVariable=aquaVariable.trim();
    console.log(aquaVariable,"data to be sent");
    var obj={objvalue:aquaVariable}
    var jsonfile = JSON.stringify(obj);
    console.log(jsonfile,"jsonfile to be sent");
    fs.writeFileSync('./mjson.json',jsonfile )
  }
  )}
,1500)
setTimeout(function() {
fs.unlink("appPackage.js", function (err) {
  if (err) throw err;
  console.log('File deleted!');
})},2000)