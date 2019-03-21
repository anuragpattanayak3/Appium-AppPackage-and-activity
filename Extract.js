var fs=require('fs');
var currentpath=__dirname;//to determine the current path
var jfilename="mjson";
var jsonpath=currentpath + '/' ;
var jsonpath1=jsonpath+jfilename+".json";
var jfile=fs.readFileSync(jsonpath1);
jfile.toString();//converting to string type for desired operation
var mydata = JSON.parse(jfile);
console.log(mydata)
var extdata=mydata.objvalue;
console.log(extdata)