var fs=require('fs');
var wd=require('wd');
var cmd=process;//taking input from the command line
var js=cmd.title.split(" ");//splitting the command from a space
var json_name=js[js.length-2];//evaluates the name of the json provided in the command
var testOn=js[js.length-1];//evaluates the test tool:appium or browserestack
console.log("JSON name is:",json_name);
var currentpath=__dirname;//to determine the current path
var jsonpath=currentpath + '/' ;
var jsonpath1=jsonpath+json_name+".json";//deciding the path of the josn
var jfile=fs.readFileSync(jsonpath1);//to read the complete json file
jfile.toString();//converting to string for desired operation
var mydata = JSON.parse(jfile);//parsing the json file
console.log("starting");
testOn=testOn.toLowerCase();
console.log("runnning test on",testOn);

if(testOn=="browserstack"){
var desiredcapabilities=mydata.argodata.desiredCapabilitiesBS;
console.log("initializing driver for ",testOn);
driver = wd.promiseRemote("http://hub-cloud.browserstack.com/wd/hub");}//driver initialization for browserstack


if(testOn=="appium"){
var desiredcapabilities=mydata.argodata.desiredCapabilitiesAppium;
driver = wd.promiseChainRemote({//driver initialization for appium
    host: "127.0.0.1",
    port: "4723"})}

console.log(desiredcapabilities);

async function print(printstep,status,printmsg,shot){
    await console.log(printstep);
    await console.log(status);
    await console.log(printmsg);
    //await console.log(shot);
    console.log("       ");
}
async function screenshot(){
    var img=await driver.takeScreenshot();
    return img;
}
console.log("initializing desired capabilities for :",testOn);

driver
  .init(desiredcapabilities)//desired capabilities initialization
  .then(async function abc (){
for(var i=0;i<mydata.Sheet1.length;i++)
{//for iterating upto the number of steps
    var steps=mydata.Sheet1[i];//storing the data of Sheet1 in the steps variable
    var keyword=steps.keyword;
    var type=steps.type;
    var screenname=steps.screenname;
    var fieldname=steps.fieldname;
    var testdata=steps.testdata;
    var css=steps.css;
    var xpath=steps.xpath;
    await driver.setImplicitWaitTimeout(4000);
switch(keyword)
{
    case "input"://for input feature
    console.log("running for input keyword");
    var status=printstep=printmsg=null;
        switch(type)
        {//determining type of the step
        case "textbox" :console.log("running for "+ type +" type input");
                        if(steps.hasOwnProperty('xpath')==true){
                        selector='xpath';
                        selectorvalue=xpath;}
                        else if(steps.hasOwnProperty('css')==true){
                        selector="id";
                        selectorvalue=css;}
                        try{
                        var e=await driver.elementOrNull(selector,selectorvalue);
                        await driver.type(e,testdata);
                        var image=await screenshot();
                        printstep=((i+1));
                        status="pass";
                        printmsg=(testdata+" is entered successfully in "+screenname+" screen and " +fieldname+ " field ");
                        print(printstep,status,printmsg,image);}//calling print function for displaying desired values
                        catch(NoSuchElementException){//catches any possible error
                            try {
                                await driver.setImplicitWaitTimeout(4000);
                                selector="id";
                                selectorvalue=css;
                                var e=await driver.elementOrNull(selector,selectorvalue);
                                await driver.type(e,testdata);
                                printstep=((i+1));
                                status="pass";
                                printmsg=(testdata+" is entered successfully in "+screenname+" screen and " +fieldname+ " field ");
                                print(printstep,status,printmsg,image);}
                            catch (error) {
                                printstep=((i+1));
                                status="fail";
                                printmsg=("---error occured at step  "+(i+1)+" : please check the selector and the xpath");
                                print(printstep,status,printmsg);//calling print function for displaying desired values
                            }
                        }
                        break;
        case "button"  :console.log("running for "+ type +" type input");
                        if(steps.hasOwnProperty('xpath')==true){
                        selector='xpath';
                        selectorvalue=xpath;}
                        else if(steps.hasOwnProperty('css')==true){
                        selector="id";
                        selectorvalue=css;}
                        try{e=await driver.elementOrNull(selector,selectorvalue);
                        await driver.clickElement(e);
                        var image=await screenshot();
                        printstep=((i+1));
                        status="pass";
                        printmsg=(fieldname+" is clicked successfully in "+screenname+" screen ");
                        print(printstep,status,printmsg,image);}
                        catch(NoSuchElement){//catches any possible error
                            try {
                                await driver.setImplicitWaitTimeout(4000);
                                selectorvalue=css;
                                selector="id";
                                var e=await driver.elementOrNull(selector,selectorvalue);
                                await driver.clickElement(e);
                                printstep=((i+1));
                                status="pass";
                                printmsg=(fieldname+" is clicked successfully in "+screenname+" screen ");                               
                                print(printstep,status,printmsg,image);}
                            catch (error) {
                                printstep=((i+1));
                                status="fail";
                                printmsg=("---error occured at step  "+(i+1)+" : please check the selector and the xpath");
                                print(printstep,status,printmsg);//calling print function for displaying desired values
                            }
                        }
                        break;
        case "checkbox":console.log("running for "+ type +" type input");
                        if(steps.hasOwnProperty('xpath')==true){
                        selector='xpath';
                        selectorvalue=xpath;}
                        else if(steps.hasOwnProperty('css')==true){
                        selector="id";
                        selectorvalue=css;}
                        try{e=await driver.elementOrNull(selector,selectorvalue);
                        await driver.clickElement(e);
                        var image=await screenshot();
                        printstep=((i+1));
                        status="pass";
                        printmsg=(fieldname+" is clicked successfully in "+screenname+" screen ");
                        print(printstep,status,printmsg,image);}
                        catch(NoSuchElement){//catches any possible error
                            try {
                                await driver.setImplicitWaitTimeout(4000);
                                selectorvalue=css;
                                selector="id";
                                var e=await driver.elementOrNull(selector,selectorvalue);
                                await driver.clickElement(e);
                                printstep=((i+1));
                                status="pass";
                                printmsg=(fieldname+" is clicked successfully in "+screenname+" screen ");                               
                                print(printstep,status,printmsg,image);}
                            catch (error) {
                                printstep=((i+1));
                                status="fail";
                                printmsg=("---error occured at step  "+(i+1)+" : please check the selector and the xpath");
                                print(printstep,status,printmsg);//calling print function for displaying desired values
                            }
                        }
                        break; 
        case "combobox":console.log("running for "+type+ "type input");
                        if(steps.hasOwnProperty('xpath')==true){
                        selector='xpath';
                        selectorvalue=xpath;}
                        else if(steps.hasOwnProperty('css')==true){
                        selector="id";
                        selectorvalue=css;}
                        try{
                        ee=await driver.elementOrNull(selector,selectorvalue);
                        await driver.clickElement(e);//for clicking on the css to get the list of options
                        var data=css.split("/");//to get theselectorproperty
                        var len=data.length;//length is calculated
                        var id1=data[len-1];//the id is selected and stored in id1
                        e=document.getElementById(id1);
                        steps1=testdata;//testdata derived from json
                        setSelectedValue(e,steps1);
                        function setSelectedValue(selectObj,steps1) {
                            for (var j = 0; j < selectObj.options.length; j++) {
                                if (selectObj.options[j].getText()== steps1) {
                                    selectObj.options[j].selected = true;
                                    return;//returns to the calling part after the operation is complete
                                }
                            }
                        }
                        var image=await screenshot();
                        printstep=("for step :",(i+1));
                        status="Pass";
                        printmsg=(testdata+" is selected successfully in "+screenname+" screen and " +fieldname+ " field ");
                        print(printstep,status,printmsg,image);}
                        catch(NoSuchElement)//catches any possible error
                        {
                            try {
                                await driver.setImplicitWaitTimeout(4000);
                                selectorvalue=css;
                                selector="id";
                                var e=await driver.elementOrNull(selector,selectorvalue);
                                await driver.clickElement(e);
                                printstep=((i+1));
                                status="pass";
                                printmsg=(testdata+" is selected successfully in "+screenname+" screen and " +fieldname+ " field ");                               
                                print(printstep,status,printmsg,image);}
                            catch (error) {
                                printstep=((i+1));
                                status="fail";
                                printmsg=("---error occured at step  "+(i+1)+" : please check the selector and the xpath");
                                print(printstep,status,printmsg);//calling print function for displaying desired values
                            }
                        }
                        break; 
        default        :printstep=((i+1));
                        printmsg=("---error occured : Type Error .at step:" + (i+1));
                        status="fail";
                        print(printstep,status,printmsg);//calling print function for displaying desired values
                        }
                        break;
    case "verify":
   
    switch(type){

        case "text"     :console.log("running for "+ type +" type verify");//isDisplayed functionality
                        if(steps.hasOwnProperty('xpath')==true){
                        selector='xpath';
                        selectorvalue=xpath;}
                        else if(steps.hasOwnProperty('css')==true){
                        selector="id";
                        selectorvalue=css;}
                        try{
                        e=await driver.elementOrNull(selector,selectorvalue);
                        console.log("inside 1st try");
                        var textt = await driver.getAttribute(e,'text');
                        var image=await screenshot();
                        console.log("control is here");
                        if(textt==testdata){
                        printstep=((i+1));
                        status="pass";
                        printmsg=(testdata+" is verified successfully with the text  " + textt  + " in " +screenname+" screen ");
                        print(printstep,status,printmsg,image);
                        }
                            else
                            {
                                printstep=((i+1));
                                status="fail";
                                printmsg=(testdata+" is not verified with the text " +  textt  + " in "+screenname+" screen ");
                                print(printstep,status,printmsg,image);
                            }
                        }
                        catch(ElementNotPresent)//catches any possible error
                        {
                            try {
                                await driver.setImplicitWaitTimeout(4000);
                                selectorvalue=css;
                                selector="id";
                                var e=await driver.elementOrNull(selector,selectorvalue);
                                await driver.clickElement(e);
                                printstep=((i+1));
                                status="pass";
                                printmsg=(fieldname+" is verified successfully with the text  "+textt+"  in  "+screenname+"  screen ");                               
                                print(printstep,status,printmsg,image);
                                }
                            catch (error) {
                                printstep=((i+1));
                                status="fail";
                                printmsg=("---error occured at step  "+(i+1)+" : please check the selector and the xpath");
                                print(printstep,status,printmsg);//calling print function for displaying desired values
                            }
                        }    
                        break;
        default        :printstep=((i+1));
                        printmsg=("---error occured : type Error .at step:" + (i+1));
                        status="fail";
                        print(printstep,status,printmsg);}//calling print function for displaying desired values                
                        break;
    case "isdisabled":  console.log("running for "+ keyword +" type");
                        if(steps.hasOwnProperty('xpath')==true){
                        selector='xpath';
                        selectorvalue=xpath;
                    }
                        else if(steps.hasOwnProperty('css')==true)
                        {
                        selector="id";
                        selectorvalue=css;
                    }
                        try{e=await driver.elementOrNull(selector,selectorvalue);
                        var disab=await driver.getAttribute(e,"enabled")
                        console.log(disab, "diasabled");
                        if(disab!='false')
                        {
                        var image=await screenshot();
                        printstep=((i+1));
                        console.log("printstep", printstep)
                        status="fail";
                        printmsg=(fieldname+" is not disabled in "+screenname+" screen "); 
                        print(printstep,status,printmsg,image);
                    }
                        else
                         {
                        var image=await screenshot();
                        status="pass";
                        printmsg=(fieldname+" is disabled in "+screenname+" screen "); 
                        printstep=((i+1));
                        print(printstep,status,printmsg,image);
                        }}
                        catch(NoSuchElement){//catches any possible error
                            try { await driver.setImplicitWaitTimeout(4000);
                                selectorvalue=css;
                                selector="id";
                                var e=await driver.elementOrNull(selector,selectorvalue);
                                var disab=await driver.getAttribute(e,'enabled');
                                if(disab!='false'){   
                                    printstep=((i+1));
                                    status="fail";
                                    printmsg=(fieldname+" is not disabled in "+screenname+" screen "); 
                                    print(printstep,status,printmsg,image);}
                                    else {
                                    var image=await screenshot();
                                    status="pass";
                                    printmsg=(fieldname+" is disabled in "+screenname+" screen "); 
                                    print(printstep,status,printmsg,image);
                                    }}
                                catch (error) {
                                printstep=((i+1));
                                status="fail";
                                printmsg=("---error occured at step  "+(i+1)+" : please check the selector and the xpath");
                                print(printstep,status,printmsg);//calling print function for displaying desired values
                                }
                            }
                        break;

        case "otp" :    await driver.startActivity({
                        appPackage: messagePackage,//gyd6fff6ffg87tg8ifgyufffffffffffffffffffffffffffffffffffffffff
                        appActivity: messageActivity//uyvovvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
                        })
                        //var e=await driver.elementOrNull(selector,selectorvalue)
                        var e=await driver.elementOrNull(selector,"//android.widget.TextView[@text=testdata]")
                        await driver.clickElement(e);
                        var str=await driver.elementOrNull("xpath","//android.widget.TextView[@bounds='[96,339][411,447]']")//hufyibiyybbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                        str=await driver.getAttribute(str,"text")
                        var i=z=0;
                        str=str.toLowerCase();
                        for(i=0;i<str.length;i++)
                              {
                                  if(str.charCodeAt(i)==32&&str.charCodeAt(i+1)==105&&str.charCodeAt(i+2)==115&&str.charCodeAt(i+3)==32|| str.charCodeAt(i)==32&&str.charCodeAt(i+1)==97&&str.charCodeAt(i+2)==115&&str.charCodeAt(i+3)==32)
                                  {
                                    var str1=str[i]+str[i+1]+str[i+2];  
                                    break; 
                                  }
                              }
                              var num1=num2=[]
                              for(var n=0;n<i;n++)
                              {
                                  if(str.charCodeAt(n)>=48&&str.charCodeAt(n)<=57)
                                    {num1.push(str[n])//numbers before " is "    
                              }
                              }
                              for(p=i+4;p<str.length;p++)
                              {
                                  if(str.charCodeAt(p)>=48&&str.charCodeAt(p)<=57)
                                  {
                                    num2.push(str[p])//numbers after " is "
                                  }
                              
                                   if(str.charCodeAt(p)==32){
                                   break;}
                              }
                              var q=(p)-(i+4)
                              var numotp1= parseInt( num1.join(''), 10)
                              var numotp2= parseInt( num2.join(''), 10)    
                              if(q<(i+4)){
                              console.log(numotp2)
                              var otp=num1}
                              else{
                              console.log(numotp1);
                              otp=num2}
                            await driver.back();
                            var ee1=await driver.elementOrNull(selector,selectorvalue)
                            await driver.type(ee1,otp)
                              break;

        default        :printstep=((i+1));
                        printmsg=("---error occured : keyword Error .at step:" + (i+1));
                        status="fail";
                        print(printstep,status,printmsg);//calling print function for displaying desired values
                        continue;
}}
})
.fin(function() { return driver.quit(); })//quitting after completion to avoid timeout
.done();        