import fs from 'fs';
//var au = require('autoit'); //code fpr autoit
import {
    ClientFunction,
    ElementRef
} from 'testcafe';
//import VueSelector from 'testcafe-vue-selectors';
import {
    Selector
} from 'testcafe';
import async from 'async';
const readline = require('readline');
//console.log('Press any key...');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var mysql = require('mssql')
var ip = require('ip');
var moment = require('moment')
var Imap = require("imap");
var MailParser = require("mailparser").MailParser;
var Promise = require("bluebird");
//var io = require('socket.io-client') //creating a client socket to connect to aqua server
var p; // pageload return variable

var exec = require('child_process').exec;
var LOG = require("./pdfreader/lib/LOG.js").toggle(false);
var lib = require("./pdfreader");
var PdfReader = lib.PdfReader;
var Rule = lib.Rule;
//import * as screenshots from 'desktop-screenshot'
//install screenshot desktop ----------------------------------------------------
//npm install --save screenshot-desktop -g --------------------------------------
const screenshot = require('screenshot-desktop')
var os_info = require('os')
const hname = os_info.hostname();
const uname = os_info.userInfo().username
////console.log(os_info,os_info.homedir(),os_info.tmpdir(),os_info.tmpDir(),hname,uname,"13")
const userDir = os_info.homedir().replace(/\\/g, "/")
//import * as screenshots from 'desktop-screenshot'

//const nodeCmd = require('node-cmd');

//console.log("Rabobank Autotc version 11.0")



//==============================================================================
//variable declaration block
var clientip = ip.address() // my ip address
////console.log(clientip, '19=============')

var args = process;
var splitcmd = args.title.split(' ')
////console.log(args.title.split(' '))
////console.log('starting...............')
var jsonname = splitcmd[splitcmd.length - 1]
var sockno = splitcmd[splitcmd.length - 2]
////console.log(sockno, "+++++++++++++++++++++")
var foldername = splitcmd[splitcmd.length - 3]
////console.log(foldername)
var stepno, stepdescription, expected, Hop, screenname, imgname, fieldname, fieldtype, keyword, selectorval, selectorvalue, mobileselectorvalue, name, retdata;
var testdata, brdreference, application, automatable, errdetails, status, exedatetime, ngmodel, tagname, reactid, mainframename, iframestatus;
var AngularProperty = "";
var d;

var currentpath = __dirname;
var datajsonpath = currentpath + '/' + jsonname + '.json'
var rawdatafromfile = fs.readFileSync(datajsonpath);
var scriptdetails = JSON.parse(rawdatafromfile);
var stepdata = scriptdetails.scriptstep;
var insdetails = scriptdetails.tindetails;
var userdetails = scriptdetails.username;
////console.log(userdetails , "userdetails");
var crypto = require('crypto');
var instancename = scriptdetails.tindetails.name;
////console.log("instancename", instancename)

var dateinmac = new Date().toString();
var Time = new Date()
global.lang = true;
global.status = "";
global.msg = "";
dateinmac = dateinmac.replace(/ /g, "-")
dateinmac = dateinmac.replace(/:/g, "-")
////console.log(dateinmac, "Date above test")

//==============================================================================

/******************ZMQ******************/

var zmq = require('zmq')

var dealer = zmq.socket('dealer');

//dealer.identity = 'Bot1'
dealer.data = 'datainside'

////console.log("automation on port-" + sockno)
dealer.connect('tcp://localhost:' + sockno);


// Register to monitoring events
dealer.on('connect', function (fd, ep) {
    //console.log('connect, endpoint:', ep);
});
dealer.on('connect_delay', function (fd, ep) {
    //console.log('connect_delay, endpoint:', ep);
});
dealer.on('connect_retry', function (fd, ep) {
    //console.log('connect_retry, endpoint:', ep);
});
dealer.on('listen', function (fd, ep) {
    //console.log('listen, endpoint:', ep);
});
dealer.on('bind_error', function (fd, ep) {
    //console.log('bind_error, endpoint:', ep);
});
dealer.on('accept', function (fd, ep) {
    //console.log('accept, endpoint:', ep);
});
dealer.on('accept_error', function (fd, ep) {
    //console.log('accept_error, endpoint:', ep);
});
dealer.on('close', function (fd, ep) {
    //console.log('close, endpoint:', ep);
});
dealer.on('close_error', function (fd, ep) {
    //console.log('close_error, endpoint:', ep);
});
dealer.on('disconnect', function (fd, ep) {
    //console.log('disconnect, endpoint:', ep);
});

// Handle monitor error
dealer.on('monitor_error', function (err) {
    //console.log('Error in monitoring: %s, will restart monitoring in 5 seconds', err);
    setTimeout(function () {
        dealer.monitor(500, 0);
    }, 5000);
});

// Call monitor, check for events every 500ms and get all available events.
//console.log('Start monitoring...');
dealer.monitor(500, 0);

dealer.on('message', function (msg) {


})




/**********end********************/

//Function for ensuring that the test cafe script continues and does not end abruptly
function delay() {
    // `delay` returns a promise

    //console.log("Start of Delay function (inside delay): " + new Date().toString());
    return new Promise(function (resolve, reject) {

        setTimeout(function () {
            //console.log("inside  delay functions promise");
            //console.log("the global eventstatus is: " + global.eventStatus)
            let e = global.eventStatus;
            global.eventStatus = "";
            if (e == "success") {
                return resolve(e);
            }
            if (e == "fail") {
                return resolve(e);
            }
            //console.log("End of Delay function");

        }, 700);

    })

    //  //console.log("End of Delay function (inside delay): " + new Date().toString());

}



fixture`Automation Testing Started...`

    .before(() => {
        //console.log("test before");
        //console.log('global.cflag starting', global.cflag, 'global.cflag ending')
        var exemesg = {
            status: "testcafe started"
        }
        var exemesg_auto_json = JSON.stringify(exemesg)

        dealer.send(exemesg_auto_json);


    })


    .after(() => {
        //console.log("Test after")


        /*//console.log("terst after")
        //console.log(global.cflag,"-----83")
        //console.log(scriptdetails)*/
        //  //console.log(scriptdetails.scriptstep.length)

        if (global.cflag == scriptdetails.scriptstep.length - 1) {
            //console.log("No script err")
            global.lang = "";

            dealer.close();



        } else {
            //console.log("brokeee")
            var errexedatetime = new Date();

            var tempobj = {
                "tindetails": scriptdetails.tindetails,
                "username": scriptdetails.username,
                "insindex": scriptdetails.insindex,
                "argodata": scriptdetails.argodata
            }
            tempobj.scriptstep = []


            scriptdetails.scriptstep[global.cflag].executiondate = errexedatetime

            scriptdetails.scriptstep[global.cflag].status = "ERROR";
            scriptdetails.scriptstep[global.cflag].actual = "";

            tempobj.currobj = scriptdetails.scriptstep[global.cflag]

            var auto_json = JSON.tringify(tempobj)
            //console.log("emitting to agent from port-" + sockno)
            dealer.send(auto_json);
            dealer.close();
            //socket.emit('auto-exeres', tempobj)
        }

    })
// Fixture end




////console.log("Imgname before getimageData function", imgname);


async function readscreenshot(val) {

    return new Promise(async function (resolve, reject) {
        try {
            //console.log("Read screenshot")
            var bitmap = fs.readFileSync(val);
            var image = bitmap.toString('base64')
            //console.log("image in readscreenshot", "image")
            resolve(image)
        }
        catch (err) {
            //console.log("Read screenshot catch block")
            var image = "x";
            // reject(image)
            resolve(image)
            //console.log("error", err)
            // delete err;
        }

    });



}


function sendtramdata(status, errdetails, exedatetime, stepdata, imgname) {
    //  //console.log(imgname, "6999999999999999999999");



    //console.log("sending data to tram......")



    async.auto({



        getImageData: async function (callback) {
            //console.log('in getimagedata');
            ////console.log(tasks.length , "inside ")
            ////console.log(cargoi)

            if ((stepdata.keyword == 'sql') || (stepdata.keyword == 'email') || (stepdata.keyword == 'pdf') || (stepdata.type == 'file') || (stepdata.step_skip)) {
                var noneedscreenshot = true;
                //console.log("'noneedscreenshot ----->", noneedscreenshot)
            } else {
                noneedscreenshot = false
            }

            if (noneedscreenshot == false) {
                // global.eventStatus = "success";
                //console.log('foldername', foldername, 'imgname', imgname)
                var folderpath = (foldername + "/" + imgname)

                // d = await delay();


                noneedscreenshot = "";


                var val = folderpath;
                try {
                    var image = await readscreenshot(val);


                    //console.log("image in the sendtram", "image")
                    // var bitmap = fs.readFileSync(val);

                    //var image = bitmap.toString('base64')


                    // //console.log('before callback working inside')
                    callback(null, image);
                }
                catch (err) {
                    //console.log("SCreenshot fun catch block")
                    image = "x"
                    callback(null, 'x');
                }




                /* //console.log("image in the sendtram", "image")
                 // var bitmap = fs.readFileSync(val);
  
                  //var image = bitmap.toString('base64')
              	
  
                  //console.log('before callback working inside')
                  callback(null, image); */

            } else {
                //console.log('before callback working inside')
                callback(null, 'x');
            }
        },

        write_file: ['getImageData', function (results, callback) {
            //console.log('in write_file----');
            var scrshot1 = JSON.stringify(results)
            var scrshot2 = scrshot1.split(':');

            var scrshot = scrshot2[1].split('}');
            ////console.log("Start ",scrshot[0],"splitting up", scrshot[1], "End")
            var correctimg = scrshot[0]
            // //console.log("Start ",correctimg,"splitting up",)

            var tempobj = {
                "tindetails": scriptdetails.tindetails,
                "username": scriptdetails.username,
                "insindex": scriptdetails.insindex,
                "argodata": scriptdetails.argodata
            }
            tempobj.scriptstep = []
            stepdata.browser = "chrome";
            stepdata.executiondate = exedatetime
            stepdata.screenshot = correctimg;
            stepdata.status = status;
            stepdata.actual = errdetails;
            //tempobj.scriptstep.push(stepdata)
            tempobj.currobj = stepdata
            // socket.emit('auto-exeres', tempobj)
            //console.log("tempobj", "-------------------------")
            var auto_json = JSON.stringify(tempobj)
            dealer.send(auto_json)

            // var resultdatajson = JSON.stringify(scriptdetails);
            // fs.writeFileSync('Execution_Result.json', resultdatajson );
            callback(null, 'filename');
        }]
    }, function (err, results) {
        // //console.log('err = ', err);
        // //console.log('results of Async Auto = ', results);
    });
}



// Randome name functions start
function randomname(aN) {

    var antext = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < aN; i++)
        antext += possible.charAt(Math.floor(Math.random() * possible.length));


    return antext;
}

function randomnumber(N) {

    var nu = "";
    var possible = "0123456789";

    for (var i = 0; i < N; i++)
        nu += possible.charAt(Math.floor(Math.random() * possible.length));

    return nu;
}

function randomdate(incr) {
    ////console.log('jn')
    var today = new Date();
    var date;
    //console.log("lang", global.lang)
    if (global.lang) {
        var utcDate = moment(today).utc().add(parseInt(incr), 'days').format('YYYY[/]MM[/]DD');
        var locaDate = moment(today).add(parseInt(incr), 'days').format('YYYY[/]MM[/]DD');
    }
    else {
        var utcDate = moment(today).utc().add(parseInt(incr), 'days').format('DD[/]MM[/]YYYY');
        var locaDate = moment(today).add(parseInt(incr), 'days').format('DD[/]MM[/]YYYY');
    }

    if (utcDate < locaDate)
        return utcDate;
    else
        return locaDate


    //date = moment(today).add(parseInt(incr), 'days').format('DD[/]MM[/]YYYY')
    //return date;
}


function randomtime(incr, tformat) {
    var now = moment().utc().add(incr, 'h').format('MMM DD h:mm A');
    //console.log("china date n time:",now)

    //var now = "13/02/2019 02:56 PM"
    if (tformat == "h") {
        var now = moment(now).format('HH');
        //console.log("inside hour", now)
    }
    else {
        var now = moment(now).utc().add(0, tformat).format('MMM DD h:mm A');
        var now = moment(now).format('mm');
        //console.log("inside min", now)
    }
    //date = moment(today).add(parseInt(incr), 'days').format('DD[/]MM[/]YYYY')
    return now;
}
// Rand 




// Random function ends

// Checkbox code as a function
async function checkbox(selectorval, testdata, fieldname, screenname, t) {

    if (testdata == "x" || testdata == "" || testdata == undefined) {
        await t.click(Selector(selectorval)).then(function (passmsg) {
            global.eventStatus = "success";
            global.status = "Pass"
            global.msg = "The checkbox option '" + testdata + "' was successfully selected in the field '" + fieldname + "' in the page '" + screenname + "' ";

        }, function (failmsg) {
            global.status = "Fail"
            global.msg = "ERROR: Unable to select the checkbox option '" + testdata + "' in ' " + screenname + "' page. SYSTEM ERROR: " + failmsg;
            global.eventStatus = "fail";
        });
        d = await delay();
    } else {
        var testdataboolean;
        const Checkboxstatus = await Selector(selectorval).checked;
        const ariapressstatus = await Selector(selectorval).attributes['aria-pressed']
        if ((testdata.toLowerCase().trim()) == "check") {
            testdataboolean = true;
            global.eventStatus = "success";
        } else {
            testdataboolean = false;
            global.eventStatus = "success";
        }

        //testdata = testdata.toLowerCase().trim();
        //console.log("testdata: " + testdata + "   Actual value: " + Checkboxstatus)
        if (Checkboxstatus == testdataboolean) {
            //console.log("inside the pass block");
            global.eventStatus = "success";
            global.status = "Pass"
            //  //console.log("the test data is:  " + testdata)
            if (testdata == "check") {
                global.msg = "The checkbox '" + fieldname + "' in the page '" + screenname + "' " + "is in the checked(" + Checkboxstatus + ") status";
            } else {

                global.msg = "The checkbox '" + fieldname + "' in the page '" + screenname + "' " + "is in the unchecked(" + Checkboxstatus + ") status";
                global.status = "Pass"
                //console.log("inside the success block");
            }
        } else {
            //console.log("inside the Fail block");

            if (testdata == "uncheck") {
                //   //console.log("clciked")
                await (t.click(selectorval)).then(function (passmsg) {

                    global.eventStatus = "success";
                    global.status = "Pass"
                    global.msg = "The checkbox option '" + testdata + "' was successfully selected in the field '" + fieldname + "' in the page '" + screenname + "' ";

                }, function (failmsg) {
                    global.status = "Fail"
                    global.msg = "ERROR: Unable to select the checkbox option '" + testdata + "' in ' " + screenname + "' page. SYSTEM ERROR: " + failmsg;
                    global.eventStatus = "fail";
                });
                d = await delay();

            } else {
                //console.log("clciked")
                await (t.click(selectorval)).then(function (passmsg) {

                    global.eventStatus = "success";
                    global.status = "Pass"
                    global.msg = "The checkbox option '" + testdata + "' was successfully selected in the field '" + fieldname + "' in the page '" + screenname + "' ";

                }, function (failmsg) {
                    global.status = "Fail"
                    global.msg = "ERROR: Unable to select the checkbox option '" + testdata + "' in ' " + screenname + "' page. SYSTEM ERROR: " + failmsg;
                    global.eventStatus = "fail";
                });
                d = await delay();


            }
        }
    }
    //  //console.log(global.msg);
}
// End of checkbox function

// Button code as a function
async function button(selectorval, fieldname, screenname, t) {
    await t.click(Selector(selectorval)).then(function (passmsg) {
        global.eventStatus = "success";
        global.status = "Pass"
        global.msg = "The button was successfully clicked in the field '" + fieldname + "' in the page '" + screenname + "' ";

    }, function (failmsg) {
        global.status = "Fail"
        global.msg = "ERROR: Unable to click on the button '" + fieldname + "' in ' " + screenname + "' page. SYSTEM ERROR: " + failmsg;
        global.eventStatus = "fail";
    });
    d = await delay();
    //   //console.log(global.msg);
}

//End of button function

// Window Button (Sikuli) Batch file call function call
function runSikuli() {
    try {
        var autoit_terminal = require('child_process')
        /*to trigger vbscript*/
        var autoit_comm = autoit_terminal.spawn('cmd');
        autoit_comm.stdout.on('data', function (data) {
            // //console.log('stdout: ' + data );
        });
        autoit_comm.on('exit', function (code) {
            global.eventStatus = "success";
            global.status = "Pass"
            global.msg = "The window button was successfully clicked  ";
            //	//console.log( global.status, "pass msg")
            // //console.log('child process exited with code ' + code);
        });
        setTimeout(function () {
            ////console.log('Sending stdin to terminal');
            autoit_comm.stdin.write('dir\n');
            autoit_comm.stdin.write('keypres.bat\n');

            autoit_comm.stdin.end();
        }, 100);
    }
    catch (err) {
        global.status = "Fail"
        global.msg = "ERROR: Unable to click on the button";
        global.eventStatus = "fail";
        //	//console.log( global.status, "fail msg")
    }
    // d = await delay();
    //  nodeCmd.run('abcdefg.bat');
}
// end of window button function


test('Rabo Automation Test', async t => {

    //=============================client function==================================
    await t.eval(new Function(fs.readFileSync('./jquery.js').toString()));

    //------------------------------------------------------------------------------
    //Client function to check browser page load
    const pageLoadCheck = ClientFunction(() => {

        var x = 0;
        return new Promise(function (resolve, reject) {
            if (document.readyState === 'interactive' || document.readyState === 'complete') {
                //if (document.readyState === 'complete') {
                x = x + 1;
                //  console
                resolve("success");
            } else if (x = 10) {
                resolve("fail");
            }
        });

    });

    //------------------------------------------------------------------------------

    await t.maximizeWindow().setTestSpeed(0.9)

    for (var i = 0; i < stepdata.length; i++) {
        var spawn123 = require('child_process')//Install child process module if needed --------------------------------------
        spawn123.exec('dontlock.vbs', function (error, stdout, stderr) {
            console.log("executing");
        });
        global.status = "";
        global.msg = "";
        global.cflag = i
        global.eventStatus = "";

        AngularProperty = "";
        stepno = stepdata[i].stepno;
        stepdescription = stepdata[i].stepdescription;
        expected = stepdata[i].expected;
        Hop = stepdata[i].Hop;
        screenname = stepdata[i].screenname;
        var dateinmacfor = new Date().toString();
        dateinmacfor = dateinmacfor.replace(/ /g, "-")
        dateinmacfor = dateinmacfor.replace(/:/g, "-")
        // //console.log(dateinmac, "Date above test")
        // //console.log("Date before imgname", dateinmacfor);
        imgname = instancename + userdetails + dateinmac + "/" + i + ".png"

        fieldname = stepdata[i].fieldname;
        //fieldtype = stepdata[i].fieldtype.toLowerCase().trim();
        fieldtype = stepdata[i].type.toLowerCase().trim();
        keyword = stepdata[i].keyword.toLowerCase();
        keyword = keyword.trim();
        selectorval = stepdata[i].selector;
        // mobileselectorvalue =  stepdata[i].mobile_selector;
        ngmodel = stepdata[i].ngmodel;
        tagname = stepdata[i].tagname;
        reactid = stepdata[i].reactid;
        mainframename = stepdata[i].mainframename;
        //angularModel = stepdata[i].angularmodel;
        testdata = stepdata[i].testdata;
        testdata = testdata.trim();
        brdreference = stepdata[i].brdreference;
        application = stepdata[i].application;
        automatable = stepdata[i].automatable;
        retdata = stepdata[i].variable;
        var testcasename = stepdata[i].name;

        //  console.log("stepno:" + stepno + "  screenname" + screenname + "  fieldname:" + fieldname + "   fieldtype: " + fieldtype + "  keyword: " + keyword);
        //console.log("testdata: " + testdata + "   selectorval: " + selectorval);



        var fieldsplit = fieldtype.split(">>")
        fieldtype = fieldsplit[0];
        var tabletype = fieldsplit[1];
        //  //console.log("fieldtype", fieldtype, "tabletype", tabletype)

        // random generator  function call testdata check 
        if (testdata.indexOf("{") != -1) { /// updated on 22 Jan 2019
            var namecheck = testdata.includes(",")
            if (testdata.indexOf("randomtime") != -1) {
                namecheck = false;
            }

            //	//console.log(namecheck, "namecheck");
            if (namecheck) {
                var tedalen = testdata.length
                testdata = testdata.substring(1, tedalen - 1)
                //   //console.log(testdata, "testdata")
                var randatsplit = testdata.split(",");
                var fundata = randatsplit[1]
                // //console.log(fundata, "fundata")
                testdata = eval(fundata)
                stepdata[i].testdata = String(randatsplit[0] + testdata)
                testdata = randatsplit[0] + testdata;
                //  //console.log(testdata, "???????????????", stepdata[i].testdata)
            } else {
                //  //console.log(testdata, "--------Before")
                /// ------ updated on 22 Jan 2019 ---------

                var flen = testdata.indexOf("{")
                var dlen = testdata.indexOf("}")
                var tedalen = testdata.length
                var edata = testdata.substring(flen + 1, dlen)
                var rdata = testdata.substring(flen, dlen + 1)
                //testdata = testdata.substring(1, tedalen-1)

                //testdata = eval(testdata.substring(testdata.indexOf("^")+1))
                // //console.log(edata, "after converting", rdata)
                edata = eval(edata)
                edata = edata.toString();

                testdata = testdata.replace(rdata, edata)

                /// ------ updated on 22 Jan 2019 ---------

                stepdata[i].testdata = testdata.toString()

                ////console.log (typeof stepdata[i].testdata,"i::",i," <<<<<<<<<<<<<<<<<<Type under Eval");

                // //console.log(testdata, "???????????????", stepdata[i].testdata)
            }
            /*   var cflag = 0;
            var variablenamename = retdata;
			
            for (var reti = i; reti < stepdata.length; reti++) {
                var rettestdata = stepdata[reti].testdata;
				//console.log("rettestdata",rettestdata, "variablenamename",variablenamename)
                if (rettestdata == variablenamename) {
                    // testdata = textvalue
                    rettestdata = testdata
                    stepdata[reti].testdata = String(rettestdata)
                    cflag++
                    //console.log("inside if cflag", cflag)

                }
            }
            retdata = "";
            variablenamename = "";
            //console.log(testdata, "testdata", cflag)
            //console.log("inserted successfully"); */

        }

        // step skip
        var step_skip = stepdata[i].step_skip
        //  //console.log(typeof step_skip, "<<<<<<<<<<<<<<=====>>>>>step_skip")
        if (step_skip) {
            global.status = "Skipped";
            global.msg = "This step has been skipped";
            status = global.status;
            errdetails = global.msg;

            sendtramdata(status, errdetails, exedatetime, stepdata[i], imgname);

        } else {


            var objectsuccess = []
            var objectfailure = []

            // Normal Selector Check

            async function selector_elmntcheck() {
                //  var objectsuccess = []
                //  var objectfailure = []
                //console.log('ele check ', selectorval)



                ////console.log('crrrrr', ctx)

                //      t.meta('severity', 'critical')
                //      t.meta('testID', 'TC-0013')
                var selcheckforifr = selectorval.split(">>")


                const ele = await elementselector(selcheckforifr[0]);


                //  //console.log('element existinng' ,await ele.exists)

                //comboobjects.push(ele)


                if (ele == null) {

                    objectfailure.push(ele)
                    return ele
                    //({"error" : "Selector - Failed" + selectorval})  

                } else {

                    // //console.log("Printing elements in else loop")
                    objectsuccess.push(ele)
                    return ele;

                }
            }
            // Function to get elements with selector
            const elementselector = (async function (slectorelement) {

                //console.log('inside eleement slector', slectorelement, "check selector")

                if (slectorelement == null || slectorelement == "") {

                    //console.log("Selector value null")

                    return (null)
                }

                //console.log('inside eleement slector', slectorelement)

                var sf = await Selector(slectorelement)
                var valueofsel = await sf();
                // //console.log('element ----', valueofsel,sf)
                return (valueofsel);
            });

            // IFrame Switching logic
            if ((fieldtype == "url") || (keyword == "email") || (keyword == "pdf") || (fieldtype == "treestructure") || (fieldtype == "file") || (fieldtype == "windowbutton")) {

                var noneedtoiframecheck = true
            }
            else {
                var noneedtoiframecheck = false
            }
            //  //console.log(noneedtoiframecheck , "noneedtoiframecheck")
            if (noneedtoiframecheck == false) {
                //console.log("Iframe checking")

                await t.wait(2000)
                var hi1 = await Promise.all([selector_elmntcheck()]);
                //  //console.log('total length', hi1.length)
                // //console.log('obj of hi',hi1)

                //validating the selectors
                //console.log('sucess', objectsuccess.length)
                //console.log('failure', objectfailure.length)

                var iframeselsplit = selectorval.split(">>");
                var splittedsele = await iframeselsplit[0];
                // var seleobj = objectfailure[obj1];
                // //console.log("Selector of success" , objectsuccess)
                // //console.log(seleobj, "Selector value");
                if (objectsuccess.length == '0') {
                    var ifagname = await Selector("iframe");
                    var ifcount = await ifagname.count;
                    //console.log("ifcount", ifcount)
                    for (var ifi = 0; ifi < ifcount; ifi++) {
                        //console.log("for loop");
                        var seleec = await Selector(splittedsele);
                        var sel = await seleec();
                        ////console.log("seleec", sel, ifi)

                        var ifraeach = await ifagname.nth(ifi)
                        var ifrele = await ifraeach();
                        var ifratagname = await ifraeach.tagName;
                        var iframeid = await ifraeach.id;
                        //	//console.log("iframeid", iframeid ,"ifratagname", ifratagname )
                        try {
                            //try {
                            //	//console.log("try block");
                            if (iframeid != null || iframeid != undefined) {
                                var ifse1 = "iframe[id='" + iframeid + "']";
                                //var ifse1 = "#"+ iframeid
                                //var ifse1 = String(ifse2);

                                //	//console.log("ifse1", ifse1, typeof ifse1 )
                                //var iframeselid = await Selector(ifse1)
                                //var diviframe =  ifse1.includes('div')
                                //if(diviframe)
                                //{
                                //	var ifsediv = "#"+ iframeid

                                //await t.switchToMainWindow();
                                //	await t.switchToIframe(ifsediv)
                                //}
                                //else
                                //{
                                if (iframeid != "div_Home") {
                                    await t.switchToIframe(ifse1)
                                }
                                //}
                            }
                            else {
                                await t.switchToIframe(ifraeach)
                            }

                            //}
                            //catch(err)
                            //{
                            //	//console.log("err" , err);
                            //	var iframeselid = await Selector(iframeid)
                            //await t.switchToIframe(iframeselid)	
                            //}

                            var seleec = await Selector(splittedsele);
                            var sel = await seleec();


                            ////console.log("selec iframe", sel, ifi, "Inside iframe")
                            if (sel == null) {
                                //console.log("Element not available in iframe");
                                var ifrfag = false;

                            }
                            else {
                                //console.log("Element available in iframe")
                                var ifrfag = true;
                            }

                            if (ifrfag == false) {
                                ////console.log("Element not present in this frame ", ifi, "Swiching to mainwindow")

                                await t.switchToMainWindow();

                            }

                        }
                        catch (err) {
                            await t.switchToMainWindow();
                            global.status = "Fail";
                            global.msg = "Please Check the Selector";
                            ////console.log("seleec", sel , "catch block", ifi , err)

                        }
                        if (ifrfag) {
                            // await t.click(Selector(sel));	
                            var iframestatus = true;
                            break;
                        }

                    }

                    if (ifcount == 0) {
                        global.status = "Fail";
                        global.msg = "Please Check the Selector";
                    }
                    noneedtoiframecheck = "";
                }
            }








            switch (keyword) {
                case "input":

                    switch (fieldtype) {

                        case "url":

                            //console.log("inside the URL keyword");
                            await t.navigateTo(testdata).then(async function (passmsg) {
                                global.status = "Pass";
                                global.msg = "The ''" + testdata + "'' URL was successfully opened in the browser";
                                global.eventStatus = "success";
                                // //console.log("global.status:" + global.status);
                            },
                                function (failmsg) {
                                    global.status = "Fail"
                                    global.msg = "The ''" + testdata + "'' URL failed to open in the browser. SYSTEM ERROR: " + failmsg;
                                    global.eventStatus = "fail";
                                    //  //console.log(global.msg);
                                });
                            d = await delay();
                            // //console.log("global.status:  " + global.status);

                            break;


                        case "menu":

                            var splitdata = selectorval.split(",");
                            var menuHoverStatus = "success"
                            ////console.log(splitdata, "->>>>>>>>>>>>>>>>>>>>>>>>")
                            await t.hover(Selector(splitdata[0])).then(function (passmsg) {
                                global.eventStatus = "success";

                            }, function (failmsg) {
                                global.status = "Fail"
                                global.msg = "ERROR: Unable to click the menu '" + fieldname + "' in the ' " + screenname + "' page. SYSTEM ERROR: " + failmsg;
                                global.eventStatus = "fail";
                            })

                            d = await delay();

                            if (menuHoverStatus == "success") {

                                await t.click(Selector(splitdata[1])).then(function (passmsg) {
                                    global.eventStatus = "success";
                                    global.status = "Pass";
                                    global.msg = "The menu '" + testdata + "' was successfully opened on the page'" + screenname + "' ";
                                }, function (failmsg) {
                                    global.status = "Fail"
                                    global.msg = "ERROR: Unable to click the menu '" + fieldname + "' in the ' " + screenname + "' page. SYSTEM ERROR: " + failmsg;
                                    global.eventStatus = "fail";
                                })
                                d = await delay();
                            }

                            break;

                        case "treestructure":
                            var ts = selectorval.split(">>")
                            var tscount = await ts.length;
                            ////console.log("count of sele", tscount)
                            var maintreets = await Selector(ts[0]);
                            var folderts = await ts[1];
                            var optionts = await ts[2];
                            //var tsmainsel = await maintreets();
                            await t.wait(10000)
                            await t.click(maintreets)
                            var frameinside = await maintreets.find('iframe')
                            var framedet = await frameinside();
                            var framecounts = await frameinside.count;
                            ////console.log("framecounts", framecounts)
                            //await t.wait(2000)
                            ////console.log("framedet", framedet, "outside frame loop")
                            if (framecounts != 0) {
                                await t.switchToIframe(frameinside)
                                iframestatus = true;
                            }
                            await t.wait(2000)
                            await t.click(folderts)
                            await t.wait(3000)
                            await t.click(Selector(optionts)).then(function (passmsg) {
                                global.eventStatus = "success";
                                global.status = "Pass";
                                global.msg = "The option '" + fieldname + "' was successfully clicked on the page'" + screenname + "' ";
                            }, function (failmsg) {
                                global.status = "Fail"
                                global.msg = "ERROR: Unable to click the menu '" + fieldname + "' in the ' " + screenname + "' page. SYSTEM ERROR: " + failmsg;
                                global.eventStatus = "fail";
                            })
                            d = await delay();

                            break;



                        case "listbox":
                            var tabletestdata = testdata.split("||");
                            var listsele = selectorval.split(">>")
                            var listdatacount = await tabletestdata.length;
                            //  //console.log("listdatacount", listdatacount)
                            //  //console.log("<---", tabletestdata[0], ">>", tabletestdata[1], "-->")
                            var parentcontainer = await Selector(listsele[0]).find('option')
                            var parcont = await parentcontainer.count
                            //console.log(parcont, "parcont")
                            if (listdatacount == 1) {
                                var co = await Selector(parentcontainer).withText(tabletestdata[0])
                                //   //console.log("Clicked")
                                await t.click(co, {
                                    ctrl: true
                                }).then(function (passmsg) {
                                    global.eventStatus = "success";
                                    global.status = "Pass"
                                    global.msg = "The listbox '" + fieldname + "' on the page '" + screenname + "' was successfully selected";

                                }, function (failmsg) {
                                    global.status = "Fail"
                                    global.msg = "ERROR: Unable to select the listbox '" + fieldname + "' in the ' " + screenname + "' page. SYSTEM ERROR: " + failmsg;
                                    global.eventStatus = "fail";
                                });
                                //  d = await delay();
                                await t.click(listsele[1]).then(function (passmsg) {
                                    global.eventStatus = "success";
                                    global.status = "Pass"
                                    global.msg = "The listbox '" + fieldname + "' on the page '" + screenname + "' was successfully clicked";

                                }, function (failmsg) {
                                    global.status = "Fail"
                                    global.msg = "ERROR: Unable to click the listbox '" + fieldname + "' in the ' " + screenname + "' page. SYSTEM ERROR: " + failmsg;
                                    global.eventStatus = "fail";
                                });
                                //  d = await delay();

                            } else {
                                //console.log("Mutilple list")
                                var listflag;
                                for (var testdcount = 0; testdcount < listdatacount; testdcount++) {
                                    // //console.log(tabletestdata[testdcount], testdcount, "testdcount")
                                    var co = await Selector(parentcontainer).withText(tabletestdata[testdcount]);
                                    await t.click(co, {
                                        modifiers: {
                                            ctrl: true
                                        }
                                    }).then(function (passmsg) {
                                        global.eventStatus = "success";
                                        global.status = "Pass"
                                        global.msg = "The listbox '" + fieldname + "' on the page '" + screenname + "' was successfully clicked";

                                    }, function (failmsg) {
                                        global.status = "Fail"
                                        global.msg = "ERROR: Unable to click the listbox '" + fieldname + "' in the ' " + screenname + "' page. SYSTEM ERROR: " + failmsg;
                                        global.eventStatus = "fail";
                                    });
                                    // d = await delay();
                                    await t.click(listsele[1]).then(function (passfmsg) {
                                        global.eventStatus = "success";
                                        global.status = "Pass"
                                        global.msg = "The listbox '" + fieldname + "' on the page '" + screenname + "' was successfully clicked";

                                    }, function (failmsg) {
                                        global.status = "Fail"
                                        global.msg = "ERROR: Unable to listbox the Button '" + fieldname + "' in the ' " + screenname + "' page. SYSTEM ERROR: " + failmsg;
                                        global.eventStatus = "fail";
                                    });
                                    //d = await delay();


                                    // //console.log("Clicked")
                                }

                            }
                            break;


                        case "button":
                            if ((testdata == " ") || (testdata == "") || (testdata == "x") || (testdata == "X")) {
                                if (fieldname == "bt_logout")
                                    global.lang = true;

                                await t.click(Selector(selectorval)).then(function (passmsg) {
                                    global.eventStatus = "success";
                                    global.status = "Pass"
                                    global.msg = "The button '" + fieldname + "' on the page '" + screenname + "' was successfully clicked";

                                }, function (failmsg) {
                                    global.status = "Fail"
                                    global.msg = "ERROR: Unable to click the Button '" + fieldname + "' in the ' " + screenname + "' page. SYSTEM ERROR: " + failmsg;
                                    global.eventStatus = "fail";
                                });
                                d = await delay();
                                //await t.debug()
                            }
                            else {
                                await t.click(Selector(selectorval)).withText(testdata).then(function (passmsg) {
                                    global.eventStatus = "success";
                                    global.status = "Pass"
                                    global.msg = "The button '" + fieldname + "' on the page '" + screenname + "' was successfully clicked";

                                }, function (failmsg) {
                                    global.status = "Fail"
                                    global.msg = "ERROR: Unable to click the Button '" + fieldname + "' in the ' " + screenname + "' page. SYSTEM ERROR: " + failmsg;
                                    global.eventStatus = "fail";
                                });
                                d = await delay();
                            }
                            break;

                        case "windowbutton":
                            try {
                                // //console.log("Window button field type");
                                await runSikuli();
                                await t.wait(12000);
                                global.eventStatus = "success";
                                global.status = "Pass"
                                global.msg = "The window button was successfully clicked  ";
                            }
                            catch (err) {
                                global.status = "Fail"
                                global.msg = "ERROR: Unable to click on the button";
                                global.eventStatus = "fail";
                                // //console.log( global.status, "fail msg", err) 
                            }
                            break;

                        case "upload":
                            try {
                                await t.wait(5000);
                                var child = require('child_process').execFile;

                                var executablePath = "C:\\batUploadClick.bat";

                                child(executablePath, function (err, data) {
                                    //  //console.log(err)
                                    // //console.log(data.toString());
                                    //  //console.log("after the autoIt execution - inside the child process")

                                });

                                await t.wait(35000);

                                var executablePath1 = "C:\\batUploadClicknext.bat";

                                child(executablePath1, function (err, data) {
                                    //  //console.log(err)
                                    //  //console.log(data.toString());
                                    //  //console.log("after the autoIt execution 2- inside the child process")

                                });
                                // //console.log("after the autoIt execution - completed -outside the child process")
                                await t.wait(4000);

                                break;

                            } catch (err) {
                                // //console.log("Inside the upload keyword catch block");
                                break;

                            }

                        case "confirm-ok":
                            // //console.log("inside the delete keyword")
                            var confirm_sel = await Selector(selectorval)
                            var check_confirm = await Selector(selectorval).exists ? await Selector(selectorval).visible : false;
                            if (check_confirm) {
                                var que = testdata
                                await t.setNativeDialogHandler((type, text) => {
                                    if (type === 'confirm' && text.trim() === que)
                                        return true;
                                    return null;
                                }, { dependencies: { que } })
                                await t.click(confirm_sel).then(function (passmsg) {
                                    global.eventStatus = "success"; global.status = "Pass"
                                    global.msg = "The button '" + fieldname + "' on the page '" + screenname + "' was successfully Clicked";
                                }, function (failmsg) {
                                    global.eventStatus = "fail"; global.status = "Fail"
                                    global.msg = "The button '" + fieldname + "' on the page '" + screenname + "' was not successfully Clicked";
                                });
                                var gethistory = await t.getNativeDialogHistory()
                                /*if(gethistory[0].type=='confirm')
                                {   global.eventStatus = "fail"; global.status = "Fail"
                                    global.msg = "The button '" + fieldname + "' on the page '" + screenname + "' was not successfully Clicked";                               
                                }*/
                                // //console.log(await t.getNativeDialogHistory(),"1167")    
                            } else {
                                global.eventStatus = "fail"; global.status = "Fail"
                                global.msg = "The selector ''" + selectorval + "'' was not existing in the screen ''" + screenname + "''";
                            }

                            d = await delay();
                            break;

                        case "confirm-cancel":
                            var confirm_sel = await Selector(selectorval)
                            var check_confirm = await Selector(selectorval).exists ? await Selector(selectorval).visible : false;
                            if (check_confirm) {
                                //  //console.log("inside the delete keyword")
                                var que = testdata
                                await t.setNativeDialogHandler(() => {
                                    return null;
                                })
                                await t.click(confirm_sel).then(function (passmsg) {
                                    global.eventStatus = "success"; global.status = "Pass"
                                    global.msg = "The button '" + fieldname + "' on the page '" + screenname + "' was successfully cancelled";
                                }, function (failmsg) {
                                    global.eventStatus = "fail"; global.status = "Fail"
                                    global.msg = "The button '" + fieldname + "' on the page '" + screenname + "' was not successfully cancelled";
                                });
                                //  //console.log(await t.getNativeDialogHistory(),"1167")
                            } else {
                                global.eventStatus = "fail"; global.status = "Fail"
                                global.msg = "The selector ''" + selectorval + "'' was not existing in the screen ''" + screenname + "''";
                            }
                            d = await delay();
                            break;

                        case "textbox":
                            // var x = await elementScroll(selectorval);
                            //console.log("inside the textbox keyword")
                            // await t.debug()
                            try {
                                await t.click(Selector(selectorval))
                                    .pressKey('ctrl+a')
                                    .pressKey('delete')
                                if (fieldname == "tb_Closing_Date" || fieldname == "tb_Value_Date" || fieldname == "tb_transfer_date" || fieldname == "tb_processing date") {


                                    const setValue = ClientFunction(value => getEl().value = value)
                                    //const input = Selector(selectorval)
                                    //await t.debug()
                                    //console.log("Inside If condition")
                                    await setValue.with({
                                        dependencies: {
                                            getEl: Selector(selectorval)
                                        }
                                    })(testdata).then(function (passmsg) {
                                        global.eventStatus = "success";
                                        global.status = "Pass"
                                        global.msg = "The '" + testdata + "' was successfully entered in the text box'" + fieldname + "' in the '" + screenname + "' page";

                                    }, function (failmsg) {
                                        global.status = "Fail"
                                        global.msg = "Unable to enter the '" + testdata + "' in the text box'" + fieldname + "' in the '" + screenname + "' page. SYSTEM ERROR: " + failmsg;
                                        global.eventStatus = "fail";
                                    });

                                } else {
                                    if (fieldname == "tb_lang" && testdata != "Simplified Chinese (????)") {
                                        testdata = "English"
                                        global.lang = false;
                                    }
                                    //console.log("Under Else Loop : :", testdata);

                                    //var test1 = testdata.toString()

                                    ////console.log (typeof testdata," <<<<<<<<<<<<<<<<<<Type of testdata under textbox");
                                    ////console.log (typeof test1," <<<<<<<<<<<<<<<<<<Type of test1 under textbox");

                                    await t.typeText(Selector(selectorval), testdata).then(function (passmsg) {
                                        //  //console.log("Inside Pass");
                                        global.eventStatus = "success";
                                        global.status = "Pass"
                                        global.msg = "The '" + testdata + "' was successfully entered in the text box'" + fieldname + "' in the '" + screenname + "' page";

                                    }, function (failmsg) {
                                        global.status = "Fail"
                                        global.msg = "Unable to enter the '" + testdata + "' in the text box'" + fieldname + "' in the '" + screenname + "' page. SYSTEM ERROR: " + failmsg;
                                        global.eventStatus = "fail";
                                    });
                                }
                            } catch (err) {
                                // //console.log("Error:" + err)
                                global.status = "Fail"
                                global.msg = "Unable to enter the '" + testdata + "' in the text box'" + fieldname + "' in the '" + screenname + "' page. SYSTEM ERROR: " + failmsg;
                                global.eventStatus = "fail";
                            }

                            d = await delay();
                            await t.pressKey('tab');
                            break;



                        case "checkbox":

                            if (testdata == "x" || testdata == "") {
                                await t.click(Selector(selectorval)).then(function (passmsg) {
                                    global.eventStatus = "success";
                                    global.status = "Pass"
                                    global.msg = "The checkbox option '" + testdata + "' was successfully selected in the field '" + fieldname + "' in the page '" + screenname + "' ";

                                }, function (failmsg) {
                                    global.status = "Fail"
                                    global.msg = "ERROR: Unable to select the checkbox option '" + testdata + "' in ' " + screenname + "' page. SYSTEM ERROR: " + failmsg;
                                    global.eventStatus = "fail";
                                });
                                d = await delay();
                            } else {
                                var testdataboolean;
                                const Checkboxstatus = await Selector(selectorval).checked;
                                if ((testdata.toLowerCase().trim()) == "check") {
                                    testdataboolean = true;
                                    global.eventStatus = "success";
                                } else {
                                    testdataboolean = false;
                                    global.eventStatus = "success";
                                }

                                //testdata = testdata.toLowerCase().trim();
                                //console.log("testdata: " + testdata + "   Actual value: " + Checkboxstatus)
                                if (Checkboxstatus == testdataboolean) {
                                    //console.log("inside the pass block");
                                    global.eventStatus = "success";
                                    global.status = "Pass"
                                    // //console.log("the test data is:  " + testdata)
                                    if (testdata == "check") {
                                        global.msg = "The checkbox '" + fieldname + "' in the page '" + screenname + "' " + "is in the checked(" + Checkboxstatus + ") status";
                                    } else {

                                        global.msg = "The checkbox '" + fieldname + "' in the page '" + screenname + "' " + "is in the unchecked(" + Checkboxstatus + ") status";
                                        global.status = "Pass"
                                        // //console.log("inside the success block");
                                    }
                                } else {
                                    //console.log("inside the Fail block");

                                    if (testdata == "uncheck") {
                                        ////console.log("clciked")
                                        await (t.click(selectorval)).then(function (passmsg) {

                                            global.eventStatus = "success";
                                            global.status = "Pass"
                                            global.msg = "The checkbox option '" + testdata + "' was successfully selected in the field '" + fieldname + "' in the page '" + screenname + "' ";

                                        }, function (failmsg) {
                                            global.status = "Fail"
                                            global.msg = "ERROR: Unable to select the checkbox option '" + testdata + "' in ' " + screenname + "' page. SYSTEM ERROR: " + failmsg;
                                            global.eventStatus = "fail";
                                        });
                                        d = await delay();

                                    } else {
                                        // //console.log("clciked")
                                        await (t.click(selectorval)).then(function (passmsg) {

                                            global.eventStatus = "success";
                                            global.status = "Pass"
                                            global.msg = "The checkbox option '" + testdata + "' was successfully selected in the field '" + fieldname + "' in the page '" + screenname + "' ";

                                        }, function (failmsg) {
                                            global.status = "Fail"
                                            global.msg = "ERROR: Unable to select the checkbox option '" + testdata + "' in ' " + screenname + "' page. SYSTEM ERROR: " + failmsg;
                                            global.eventStatus = "fail";
                                        });
                                        d = await delay();


                                    }
                                }
                            }
                            break;






                        case "combobox":


                            //var objectsuccess = []
                            // var objectfailure = []


                            var hi = await Promise.all([selector_elmntcheck()]);
                            // //console.log('total length', hi.length)
                            // //console.log('obj of hi',hi)

                            //validating the selectors
                            //console.log('sucess', objectsuccess.length)
                            //console.log('failure', objectfailure.length)
                            var selflag = true;
                            if (objectsuccess.length > 0) {
                                //console.log("success count if loop")

                                for (var obj1 = 0; obj1 < objectsuccess.length; obj1++) {
                                    //   //console.log("success count for loop")
                                    var seleobj = objectsuccess[obj1];
                                    //  //console.log("Selector of success" , objectsuccess)
                                    /* for(var ob; ob<=hi.length; ob++)

                                {
                                if(hi[ob]!=undefined)
                               {
                                
                                //console.log('hiiiii length',hi.length)
                                
                                //console.log('obj of hi',hi)
                            }
                        }

*/
                                    if (selflag == true) {
                                        try {
                                            // //console.log(seleobj, "Selector value");
                                            var firstcb = seleobj;
                                            var comboboxClickStatus = "success"
                                            var cb = await firstcb
                                            // //console.log(cb , "main combo select")
                                            var tag = cb.tagName
                                            //  //console.log(tag, "tagname")
                                            global.eventStatus = "success";
                                        } catch (err) {
                                            global.status = "Fail"
                                            global.msg = "Unable to locate the field '" + fieldname + "' in the page ' " + screenname + "'. ERROR: " + err;
                                            global.eventStatus = "fail";
                                            d = await delay();
                                            break;
                                        }
                                        d = await delay();

                                        if (comboboxClickStatus == "success") {

                                            if (tag == 'md-select') {
                                                var checelem = await Selector('md-option').child('div').withText(testdata)
                                                var elee = await checelem();
                                                //   //console.log(elee , "selec for wrong testdata")
                                                if (elee == null) {
                                                    //  //console.log("Inside element of combobox is wrong")
                                                    global.status = "Fail"
                                                    global.msg = "Please Check the testdata for the field" + fieldname + "' in the page ' " + screenname;
                                                    break;


                                                }
                                                //  //console.log("Inside if Tag  section")

                                                var checkele = await Selector('md-option').child('div').withText(testdata).visible;
                                                // //console.log(checkele, "Checking element")
                                                var element = await Selector('md-option').child('div').withText(testdata)


                                                var count = await element.count
                                                //  //console.log(count, "count")
                                                var ele = await element()
                                                // //console.log(ele , "element details")
                                                var vis = await ele.visible
                                                // //console.log(vis, "visibility details")
                                                var intex = await ele.innerText
                                                // //console.log(intex, "innertext details")

                                                if (checkele == true) {
                                                    // //console.log("Checking element if loop")
                                                    await t.click(element).then(function (passmsg) {
                                                        // //console.log("Clicked")
                                                        global.status = "Pass"
                                                        global.eventStatus = "success";
                                                        global.msg = "The '" + testdata + "' was successfully selected from the dropdown '" + fieldname + "' in the page ' " + screenname + "' ";

                                                    }, function (failmsg) {
                                                        global.status = "Fail"
                                                        global.eventStatus = "fail";
                                                        global.msg = "Unable to select the  '" + testdata + "' from the dropdown '" + fieldname + "' in the page ' " + screenname + "'. ERROR: " + failmsg;

                                                    });
                                                    d = await delay();


                                                } else {
                                                    //   //console.log("Checking element else loop")
                                                    //  await t.pressKey('esc');
                                                    //  await t.wait(2000)
                                                    await t.click(Selector(cb)).then(function (passmsg) {
                                                        global.status = "Pass";
                                                        global.eventStatus = "success";
                                                        // //console.log('262')
                                                    }, function (failmsg) {
                                                        //  //console.log('265')
                                                        global.status = "Fail";
                                                        global.eventStatus = "fail";
                                                    });
                                                    d = await delay();

                                                    await t.wait(2000);




                                                    if (count == 1) {
                                                        await t.click(Selector('md-option').child('div').withText(testdata)).then(function (passmsg) {
                                                            // //console.log("Clicked")
                                                            global.status = "Pass"
                                                            global.eventStatus = "success";
                                                            global.msg = "The '" + testdata + "' was successfully selected from the dropdown '" + fieldname + "' in the page ' " + screenname + "' ";

                                                        }, function (failmsg) {
                                                            global.status = "Fail"
                                                            global.eventStatus = "fail";
                                                            global.msg = "Unable to select the  '" + testdata + "' from the dropdown '" + fieldname + "' in the page ' " + screenname + "'. ERROR: " + failmsg;

                                                        });
                                                        d = await delay();

                                                    } else {
                                                        //console.log("Else section")
                                                        for (var j = 0; j < count; j++) {

                                                            // //console.log("For loop");
                                                            var isvisible = await (Selector('md-option').child('div').withText(testdata)).nth(j).visible;
                                                            var coEach = await (Selector('md-option').child('div').withText(testdata)).nth(j)
                                                            var x = await coEach();

                                                            ////console.log(isvisible);

                                                            if (isvisible == true) {

                                                                var xInnertext = x.innerText;
                                                                //  //console.log(xInnertext, "xInnertext");
                                                                if (xInnertext.trim() == testdata) {
                                                                    //    //console.log("innerText if loop")

                                                                    await t.click(coEach).then(function (passmsg) {
                                                                        //      //console.log('271')
                                                                        global.status = "Pass"
                                                                        global.eventStatus = "success";
                                                                        global.msg = "The '" + testdata + "' was successfully selected from the dropdown '" + fieldname + "' in the page ' " + screenname + "' ";
                                                                    }, function (failmsg) {
                                                                        //    //console.log('275')
                                                                        global.status = "Fail"
                                                                        global.eventStatus = "fail";
                                                                        global.msg = "Unable to select the  '" + testdata + "' from the dropdown '" + fieldname + "' in the page ' " + screenname + "'. ERROR: " + failmsg;
                                                                    });
                                                                    d = await delay();

                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            } else {
                                                await t.wait(2000);
                                                //console.log("Payment section")
                                                await t.click(Selector(cb)).then(function (passmsg) {
                                                    global.status = "Pass";
                                                    global.eventStatus = "success";
                                                    //  //console.log('262')
                                                }, function (failmsg) {
                                                    //  //console.log('265')
                                                    global.status = "Fail";
                                                });

                                                await t.click(Selector('select').child('option').withText(testdata)).then(function (passmsg) {
                                                    global.status = "Pass"
                                                    global.msg = "The '" + testdata + "' was successfully selected from the dropdown '" + fieldname + "' in the page ' " + screenname + "' ";

                                                }, function (failmsg) {
                                                    global.status = "Fail"
                                                    global.eventStatus = "fail";
                                                    global.msg = "Unable to select the  '" + testdata + "' from the dropdown '" + fieldname + "' in the page ' " + screenname + "'. ERROR: " + failmsg;

                                                });
                                                d = await delay();
                                            }
                                        }
                                        if (global.status == "Pass") {
                                            selflag = false;
                                        }
                                        //  //console.log("Flag status", selflag);

                                    }

                                }

                            }





                            break;

                        case "table":

                            if (screenname == "PCNAPS_Authorization") {
                                var tabletestdata = testdata.split(">>");
                                var tableselector = selectorval.split(">>")
                                var tase = await Selector(tableselector[0])
                                var tabse = await tase();
                                var tagoftable = await tabse.tagName
                                var tads = await Selector(tableselector[0]).find('td')
                                var tdtextval = await Selector(tableselector[0]).find('td').exists;
                                // //console.log("tdtextval iframe::" + tdtextval)
                                if (tdtextval == true) {
                                    var tacount = await tads.count
                                    var tavis = await tads.visible
                                    //console.log("iframe section visible", tavis)
                                    // //console.log("count td iframe", tacount)
                                    for (var t1i = 0; t1i < tacount; t1i++) {
                                        var inda = await tads.nth(t1i).visible
                                        var inputvalue = await tads.nth(t1i)
                                        ////console.log("inda", inda)
                                        if (inda == true) {


                                            var inintext = await tads.nth(t1i).innerText;
                                            var inputtag = await tads.nth(t1i).find('input')
                                            var inputag = await inputtag();

                                            var inputtagval = await Selector(tads.nth(t1i)).find('input').exists;
                                            // //console.log("inputtagval iframe::" + inputtagval)
                                            if (inputtagval == true) {
                                                var inputidvalue = await inputag.value;
                                                inintext = inintext.trim()
                                                testdata = tabletestdata[0].trim()
                                                inputidvalue = inputidvalue.trim()
                                                var inintextre = inintext.replace(/\s/g, "")
                                                var textdatare = testdata.replace(/\s/g, "")
                                                inintextre = inintextre.toLowerCase();
                                                textdatare = textdatare.toLowerCase();
                                                // //console.log("inputidvalue iframe::" + inputidvalue)
                                                // //console.log("inintext", inintext, inintextre)

                                                // //console.log("testdata", testdata, textdatare)
                                                if (inputidvalue == textdatare) {
                                                    // //console.log("TEstdata matched")
                                                    var sibval = await Selector(inputvalue).sibling();
                                                    var sibdatatext = await sibval.innerText;
                                                    var sibdatacount = await sibval.count;
                                                    // //console.log(sibdatacount, "sibdatacount", sibdatatext, "sibdatatext")

                                                    for (var sibi = 0; sibi < sibdatacount; sibi++) {
                                                        var sibivalu = await sibval.nth(sibi);
                                                        var sibivalue = await sibivalu()

                                                        var siblink = await Selector(sibivalu).find('input');
                                                        var siblinkcont = await siblink.count;
                                                        var siblinkid = await siblink();
                                                        if (siblinkcont != 0) {
                                                            await t.click(siblink).then(function (passmsg) {
                                                                idstatus = true;
                                                                global.eventStatus = "success";
                                                                global.status = "Pass"
                                                                global.msg = "The button was successfully clicked in the field '" + fieldname + "' in the page '" + screenname + "' ";

                                                            }, function (failmsg) {
                                                                global.status = "Fail"
                                                                global.msg = "ERROR: Unable to click on the button '" + fieldname + "' in ' " + screenname + "' page. SYSTEM ERROR: " + failmsg;
                                                                global.eventStatus = "fail";
                                                            });
                                                            d = await delay();


                                                            if (idstatus) {
                                                                //  //console.log("idstatus", idstatus)
                                                                break;
                                                            }
                                                        }
                                                        else {
                                                            global.status = "Fail"
                                                            global.msg = "Unable to select the checkbox from the table '" + fieldname + "' in the page ' " + screenname;
                                                            global.eventStatus = "fail";

                                                        }
                                                    }
                                                    if (idstatus) {
                                                        //  //console.log("idstatus", idstatus)
                                                        break;
                                                    }

                                                }
                                                else {
                                                    global.status = "Fail"
                                                    global.msg = "Please check the testdata,, Unable to select the checkbox from the table '" + fieldname + "' in the page ' " + screenname;
                                                    global.eventStatus = "fail";

                                                }
                                            }
                                        }
                                        else {
                                            global.status = "Fail"
                                            global.msg = "Please check the testdata,, Unable to select the checkbox from the table '" + fieldname + "' in the page ' " + screenname;
                                            global.eventStatus = "fail";

                                        }



                                    }

                                }
                                else {
                                    global.status = "Fail"
                                    global.msg = "Please check the selector for the table";
                                    global.eventStatus = "fail";

                                }
                            }

                            else {
                                if (tabletype != "checkbox") {
                                    var tabletestdata = testdata.split(">>");
                                }
                                var tableselector = selectorval.split(">>")
                                // //console.log("<---", tabletestdata[0], ">>", tabletestdata[1], "-->")
                                var tase = await Selector(tableselector[0])
                                var tabse = await tase();
                                var tagoftable = await tabse.tagName
                                var tablecellselection = await Selector(tableselector[0]).find('td');
                                var tableselcount = await tablecellselection.count
                                // //console.log("taa", tagoftable, tableselcount, "taa")
                                var idstatus = false;
                                if (tableselcount == 0) {
                                    //  var tabletestdata = testdata.split(">>")
                                    var tads = await Selector(tableselector[0]).find('div')
                                    var tacount = await tads.count
                                    var tavis = await tads.visible
                                    // //console.log("visible", tavis)
                                    // //console.log("count div", tacount)

                                    switch (tabletype) {

                                        case "checkbox":
                                            var tabletestdata = testdata.split(">>");
                                            for (var t1i = 0; t1i < tacount; t1i++) {
                                                var inda = await tads.nth(t1i).visible
                                                var inputvalue = await tads.nth(t1i)
                                                ////console.log("inda", inda)
                                                if (inda == true) {
                                                    var inintext = await tads.nth(t1i).innerText;
                                                    inintext = inintext.trim()
                                                    testdata = tabletestdata[0].trim()
                                                    var inintextre = inintext.replace(/\s/g, "")
                                                    var textdatare = testdata.replace(/\s/g, "")
                                                    // //console.log("inintext", inintext, inintextre)
                                                    inintextre = inintextre.toLowerCase();
                                                    textdatare = textdatare.toLowerCase();

                                                    // //console.log("testdata", testdata, textdatare)
                                                    var tablecheckdata = inintextre.includes(textdatare)
                                                    ////console.log ("tablecheckdata : :",tablecheckdata);
                                                    if (inintextre == textdatare) {
                                                        //console.log("TEstdata matched")
                                                        var sibval = await Selector(inputvalue).sibling();
                                                        var sibdatatext = await sibval.innerText;
                                                        var sibdatacount = await sibval.count;
                                                        //  //console.log(sibdatacount, "sibdatacount", sibdatatext, "sibdatatext")
                                                        if (sibdatacount == 1) {
                                                            var siblink = await Selector(sibval).find('input');
                                                            var siblinkid = await siblink();
                                                            var sibidvalue = await siblinkid.id
                                                            var idchecker = sibidvalue.includes(tableselector[1])
                                                            //  //console.log(idchecker, tableselector[1])
                                                            if (idchecker) {
                                                                idstatus = true
                                                                await checkbox(siblinkid, tabletestdata[1], fieldname, screenname, t);
                                                                //  d = await delay();

                                                            } else {
                                                                global.status = "Fail"
                                                                global.msg = "Unable to select the checkbox from the table '" + fieldname + "' in the page ' " + screenname;
                                                                global.eventStatus = "fail";

                                                            }
                                                            if (idstatus) {
                                                                //  //console.log("idstatus", idstatus)
                                                                break;
                                                            }



                                                        } else {
                                                            for (var sibi = 0; sibi < sibdatacount; sibi++) {
                                                                var sibivalu = await sibval.nth(sibi);
                                                                var sibivalue = await sibivalu()

                                                                var siblink = await Selector(sibivalu).find('input');
                                                                var siblinkcont = await siblink.count;
                                                                var siblinkid = await siblink();
                                                                if (siblinkcont != 0) {
                                                                    // //console.log(sibivalue, "sibivalue", sibi, "siblinkcont", siblinkcont)
                                                                    //  //console.log("siblinkid" , siblinkid)
                                                                    var sibidvalue = await siblinkid.id
                                                                    //  //console.log("sibidvalue", sibidvalue)
                                                                    var idchecker = sibidvalue.includes(tableselector[1])
                                                                    //  //console.log(idchecker, tableselector[1])
                                                                    if (idchecker) {
                                                                        idstatus = true
                                                                        await checkbox(siblinkid, tabletestdata[1], fieldname, screenname, t);
                                                                        //  d = await delay();

                                                                    } else {
                                                                        global.status = "Fail"
                                                                        global.msg = "Unable to select the checkbox from the table '" + fieldname + "' in the page ' " + screenname;
                                                                        global.eventStatus = "fail";

                                                                    }

                                                                    if (idstatus) {
                                                                        //  //console.log("idstatus", idstatus)
                                                                        break;
                                                                    }
                                                                }
                                                            }
                                                            if (idstatus) {
                                                                // //console.log("idstatus", idstatus)
                                                                break;
                                                            }
                                                        }


                                                    } else {
                                                        global.status = "Fail"
                                                        global.msg = "Please check the testdata,, Unable to select the checkbox from the table '" + fieldname + "' in the page ' " + screenname;
                                                        global.eventStatus = "fail";

                                                    }
                                                }
                                                else {
                                                    global.status = "Fail"
                                                    global.msg = "Please check the testdata,, Unable to select the checkbox from the table '" + fieldname + "' in the page ' " + screenname;
                                                    global.eventStatus = "fail";

                                                }

                                            }
                                            break;

                                        case "button":

                                            for (var t1i = 0; t1i < tacount; t1i++) {
                                                var inda = await tads.nth(t1i).visible
                                                var inputvalue = await tads.nth(t1i)
                                                ////console.log("inda", inda)
                                                if (inda == true) {
                                                    var inintext = await tads.nth(t1i).innerText;
                                                    inintext = inintext.trim()
                                                    testdata = tabletestdata[0].trim()
                                                    var inintextre = inintext.replace(/\s/g, "")
                                                    var textdatare = testdata.replace(/\s/g, "")
                                                    inintextre = inintextre.toLowerCase();
                                                    textdatare = textdatare.toLowerCase();
                                                    // //console.log("inintext", inintext, inintextre)

                                                    //  //console.log("testdata", testdata, textdatare)
                                                    if (inintextre == textdatare) {
                                                        //console.log("TEstdata matched")
                                                        var sibval = await Selector(inputvalue).sibling();
                                                        var sibdatatext = await sibval.innerText;
                                                        var sibdatacount = await sibval.count;
                                                        //  //console.log(sibdatacount, "sibdatacount", sibdatatext, "sibdatatext")
                                                        if (sibdatacount == 1) {
                                                            var siblink = await Selector(sibval).find('span');

                                                            var sibidvalue = await siblinkid.id
                                                            // //console.log("sibidvalue", sibidvalue)

                                                            if (global.lang == false) {
                                                                var idchecker = sibidvalue.includes(tableselector[1])
                                                                ////console.log(idchecker, tableselector[1])
                                                            }

                                                            else {
                                                                var idchecker = sibidvalue.includes(tableselector[2])
                                                                //	//console.log(idchecker, tableselector[2])
                                                            }


                                                            if (idchecker) {
                                                                idstatus = true
                                                                // await checkbox(siblinkid,tabletestdata[1],fieldname,screenname,t);
                                                                await button(siblinkid, fieldname, screenname, t);
                                                            } else {
                                                                global.status = "Fail"
                                                                global.msg = "Unable to select the button from the table '" + fieldname + "' in the page ' " + screenname;
                                                                global.eventStatus = "fail";

                                                            }
                                                        } else {
                                                            for (var sibi = 0; sibi < sibdatacount; sibi++) {
                                                                var sibivalu = await sibval.nth(sibi);
                                                                var sibivalue = await sibivalu()

                                                                var siblink = await Selector(sibivalu).find('span');
                                                                var siblinkcont = await siblink.count;

                                                                //console.log("siblinkcont", siblinkcont)
                                                                if (siblinkcont != 0) {
                                                                    for (var butsib = 0; butsib < siblinkcont; butsib++) {
                                                                        // //console.log(sibivalue, "sibivalue" , sibi, "siblinkcont" , siblinkcont)
                                                                        //  //console.log("siblinkid" , siblinkid)
                                                                        var siblinkid1 = await siblink.nth(butsib);
                                                                        var siblinkid = await siblinkid1();
                                                                        //  var sibibutvalu = await siblinkid.nth(butsib);
                                                                        var sibidvalue = await siblinkid.id
                                                                        // //console.log("sibidvalue", sibidvalue)

                                                                        if (global.lang == false) {
                                                                            var idchecker = sibidvalue.includes(tableselector[1])
                                                                            ////console.log(idchecker, tableselector[1])
                                                                        }

                                                                        else {
                                                                            var idchecker = sibidvalue.includes(tableselector[2])
                                                                            //	//console.log(idchecker, tableselector[2])
                                                                        }

                                                                        if (idchecker) {
                                                                            idstatus = true
                                                                            var butidstatus = true
                                                                            // await checkbox(siblinkid,tabletestdata[1],fieldname,screenname,t);
                                                                            await button(siblinkid, fieldname, screenname, t);
                                                                            // d = await delay();									
                                                                        } else {
                                                                            global.status = "Fail"
                                                                            global.msg = "Unable to select the button from the table '" + fieldname + "' in the page ' " + screenname;
                                                                            global.eventStatus = "fail";

                                                                        }
                                                                        if (butidstatus) {
                                                                            //  //console.log("butidstatus", butidstatus)
                                                                            break;
                                                                        }

                                                                    }

                                                                    if (idstatus) {
                                                                        // //console.log("idstatus", idstatus)
                                                                        break;
                                                                    }
                                                                }
                                                            }
                                                            if (idstatus) {
                                                                //  //console.log("idstatus", idstatus)
                                                                break;
                                                            }
                                                        }


                                                    } else {
                                                        global.status = "Fail"
                                                        global.msg = "Please check the testdata, Unable to select the button from the table '" + fieldname + "' in the page ' " + screenname;
                                                        global.eventStatus = "fail";

                                                    }
                                                }
                                                else {
                                                    global.status = "Fail"
                                                    global.msg = "Please check the testdata,, Unable to select the checkbox from the table '" + fieldname + "' in the page ' " + screenname;
                                                    global.eventStatus = "fail";

                                                }

                                            }
                                            break;

                                        default:
                                            global.status = "Fail"
                                            global.msg = "Please check the table type";
                                            break;
                                    }
                                } else {
                                    var tads = await Selector(tableselector[0]).find('td')
                                    var tdtextval = await Selector(tableselector[0]).find('td').exists;
                                    //console.log("tdtextval::" + tdtextval)
                                    if (tdtextval == true) {
                                        var tacount = await tads.count
                                        var tavis = await tads.visible
                                        // //console.log("visible", tavis)
                                        //console.log("count td", tacount)

                                        switch (tabletype) {

                                            case "checkbox":

                                                var multitabledata = testdata.split("||")
                                                var multitabledatalength = multitabledata.length
                                                //console.log(multitabledatalength, "multitabledatalength")

                                                for (var multidatai = 0; multidatai < multitabledatalength; multidatai++) {
                                                    var tabletestdata = multitabledata[multidatai].split(">>")
                                                    //  //console.log("tabledta 1", tabletestdata[0] ,"tabledata2", tabletestdata[1], "testdata split")

                                                    for (var t1i = 0; t1i < tacount; t1i++) {
                                                        var inda = await tads.nth(t1i).visible
                                                        var inputvalue = await tads.nth(t1i)
                                                        ////console.log("inda", inda)
                                                        if (inda == true) {


                                                            var inintext = await tads.nth(t1i).innerText;
                                                            inintext = inintext.trim()
                                                            testdata = tabletestdata[0].trim()
                                                            var inintextre = inintext.replace(/\s/g, "")
                                                            var textdatare = testdata.replace(/\s/g, "")
                                                            inintextre = inintextre.toLowerCase();
                                                            textdatare = textdatare.toLowerCase();
                                                            // //console.log("inintext", inintext, inintextre)

                                                            // //console.log("testdata", testdata, textdatare)
                                                            if (inintextre == textdatare) {
                                                                //console.log("TEstdata matched")
                                                                var sibval = await Selector(inputvalue).sibling();
                                                                var sibdatatext = await sibval.innerText;
                                                                var sibdatacount = await sibval.count;
                                                                //console.log(sibdatacount, "sibdatacount", sibdatatext, "sibdatatext")
                                                                if (sibdatacount == 1) {
                                                                    var siblink = await Selector(sibval).find('div');
                                                                    var siblinkid = await siblink();
                                                                    var sibidvalue = await siblinkid.aria - label
                                                                    var idchecker = sibidvalue.includes(tableselector[1])
                                                                    //  //console.log(idchecker, tableselector[1])
                                                                    if (idchecker) {
                                                                        idstatus = true
                                                                        await checkbox(siblinkid, tabletestdata[1], fieldname, screenname, t);
                                                                        //  d = await delay();

                                                                    } else {
                                                                        global.status = "Fail"
                                                                        global.msg = "Unable to select the checkbox from the table '" + fieldname + "' in the page ' " + screenname;
                                                                        global.eventStatus = "fail";

                                                                    }
                                                                    if (idstatus) {
                                                                        //  //console.log("idstatus", idstatus)
                                                                        break;
                                                                    }



                                                                } else {
                                                                    for (var sibi = 0; sibi < sibdatacount; sibi++) {
                                                                        var sibivalu = await sibval.nth(sibi);
                                                                        var sibivalue = await sibivalu()

                                                                        var siblink = await Selector(sibivalu).find('div');
                                                                        var siblinkcont = await siblink.count;
                                                                        var siblinkid = await siblink();
                                                                        if (siblinkcont != 0) {
                                                                            // //console.log(sibivalue, "sibivalue", sibi, "siblinkcont", siblinkcont)
                                                                            //   //console.log("siblinkid" , siblinkid)
                                                                            var sibidvalue = await siblinkid.attributes['aria-label']
                                                                            //  //console.log("sibidvalue", sibidvalue)
                                                                            var idchecker = sibidvalue.includes(tableselector[1])
                                                                            //   //console.log(idchecker, tableselector[1])
                                                                            if (idchecker) {
                                                                                idstatus = true
                                                                                await checkbox(siblinkid, tabletestdata[1], fieldname, screenname, t);
                                                                                //  d = await delay();

                                                                            } else {
                                                                                global.status = "Fail"
                                                                                global.msg = "Unable to select the checkbox from the table '" + fieldname + "' in the page ' " + screenname;
                                                                                global.eventStatus = "fail";

                                                                            }

                                                                            if (idstatus) {
                                                                                //  //console.log("idstatus", idstatus)
                                                                                break;
                                                                            }
                                                                        }
                                                                    }
                                                                    if (idstatus) {
                                                                        //  //console.log("idstatus", idstatus)
                                                                        break;
                                                                    }
                                                                }


                                                            } else {
                                                                global.status = "Fail"
                                                                global.msg = "Please check the testdata,, Unable to select the checkbox from the table '" + fieldname + "' in the page ' " + screenname;
                                                                global.eventStatus = "fail";

                                                            }



                                                        }
                                                        else {
                                                            global.status = "Fail"
                                                            global.msg = "Please check the testdata,, Unable to select the checkbox from the table '" + fieldname + "' in the page ' " + screenname;
                                                            global.eventStatus = "fail";

                                                        }
                                                    }
                                                }
                                                break;


                                            case "button":

                                                for (var t1i = 0; t1i < tacount; t1i++) {
                                                    var inda = await tads.nth(t1i).visible
                                                    var inputvalue = await tads.nth(t1i)
                                                    ////console.log("inda", inda)
                                                    if (inda == true) {
                                                        var inintext = await tads.nth(t1i).innerText;
                                                        inintext = inintext.trim()
                                                        testdata = tabletestdata[0].trim()
                                                        var inintextre = inintext.replace(/\s/g, "")
                                                        var textdatare = testdata.replace(/\s/g, "")
                                                        inintextre = inintextre.toLowerCase();
                                                        textdatare = textdatare.toLowerCase();
                                                        //  //console.log("inintext", inintext, inintextre)

                                                        //  //console.log("testdata", testdata, textdatare)
                                                        if (inintextre == textdatare) {
                                                            //  //console.log("TEstdata matched")
                                                            var sibval = await Selector(inputvalue).sibling();
                                                            var sibdatatext = await sibval.innerText;
                                                            //  //console.log(sibdatatext, ">>>>>>>>>>>>>>>>>");
                                                            var sibdatacount = await sibval.count;
                                                            //console.log(sibdatacount, "sibdatacount", sibdatatext, "sibdatatext")
                                                            if (sibdatacount == 1) {
                                                                var siblink = await Selector(sibval).find('img');
                                                                var siblinkid = await siblink();
                                                                //console.log("sibivalue", sibi, "siblinkcont", siblinkcont)
                                                                // //console.log("siblinkid", siblinkid)
                                                                var sibidvalue = await siblinkid.attributes['title']
                                                                //  //console.log("sibidvalue", sibidvalue)
                                                                await button(siblinkid, fieldname, screenname, t)
                                                                //  d = await delay();

                                                            } else {
                                                                for (var sibi = 0; sibi < sibdatacount; sibi++) {
                                                                    var sibivalu = await sibval.nth(sibi);
                                                                    var sibivalue = await sibivalu()

                                                                    var siblink = await Selector(sibivalu).find('img');
                                                                    var siblinkcont = await siblink.count;

                                                                    // //console.log("siblinkcont", siblinkcont)
                                                                    if (siblinkcont != 0) {
                                                                        for (var butsib = 0; butsib < siblinkcont; butsib++) {

                                                                            var siblinkid1 = await siblink.nth(butsib);
                                                                            var siblinkid = await siblinkid1();
                                                                            // //console.log( "sibivalue" , sibi, "siblinkcont" , siblinkcont)
                                                                            ////console.log("siblinkid" , siblinkid)
                                                                            var sibidvalue = await siblinkid.attributes['title']
                                                                            // //console.log("sibidvalue", sibidvalue)
                                                                            if (global.lang == false) {
                                                                                var idchecker = sibidvalue.includes(tableselector[1])
                                                                                ////console.log(idchecker, tableselector[1])
                                                                            }

                                                                            else {
                                                                                var idchecker = sibidvalue.includes(tableselector[2])
                                                                                //	//console.log(idchecker, tableselector[2])
                                                                            }

                                                                            if (idchecker) {
                                                                                idstatus = true
                                                                                var butidstatus = true
                                                                                // await checkbox(siblinkid,tabletestdata[1],fieldname,screenname,t);
                                                                                await button(siblinkid, fieldname, screenname, t);
                                                                                // d = await delay();
                                                                            } else {
                                                                                global.status = "Fail"
                                                                                global.msg = "Unable to select the button from the table '" + fieldname + "' in the page ' " + screenname;
                                                                                global.eventStatus = "fail";

                                                                            }

                                                                            if (butidstatus) {
                                                                                // //console.log("butidstatus", butidstatus)
                                                                                butidstatus = "";
                                                                                break;
                                                                            }
                                                                        }

                                                                        if (idstatus) {
                                                                            // //console.log("idstatus", idstatus)
                                                                            break;
                                                                        }



                                                                    }
                                                                }
                                                                if (idstatus) {
                                                                    //  //console.log("idstatus", idstatus)
                                                                    idstatus = "";
                                                                    break;
                                                                }
                                                            }


                                                        } else {
                                                            global.status = "Fail"
                                                            global.msg = "Please check the testdata,  Unable to select the button from the table '" + fieldname + "' in the page ' " + screenname;
                                                            global.eventStatus = "fail";

                                                        }
                                                    }

                                                }

                                                break;

                                            case "radiobutton":
                                                for (var t1i = 0; t1i < tacount; t1i++) {
                                                    var inda = await tads.nth(t1i).visible
                                                    var inputvalue = await tads.nth(t1i)
                                                    ////console.log("inda", inda)
                                                    if (inda == true) {
                                                        var inintext = await tads.nth(t1i).innerText;
                                                        inintext = inintext.trim()
                                                        testdata = tabletestdata[0].trim()
                                                        var inintextre = inintext.replace(/\s/g, "")
                                                        var textdatare = testdata.replace(/\s/g, "")
                                                        inintextre = inintextre.toLowerCase();
                                                        textdatare = textdatare.toLowerCase();
                                                        // //console.log("inintext", inintext, inintextre)

                                                        //  //console.log("testdata", testdata, textdatare)
                                                        if (inintextre == textdatare) {
                                                            //  //console.log("TEstdata matched")
                                                            var sibval = await Selector(inputvalue).sibling();
                                                            var sibdatatext = await sibval.innerText;
                                                            var sibdatacount = await sibval.count;
                                                            //  //console.log(sibdatacount, "sibdatacount", sibdatatext, "sibdatatext")
                                                            var tddatavalue = await Selector(inputvalue).find('div')
                                                            var tddatacont = await tddatavalue.count;
                                                            if (tddatacont != 0) {
                                                                for (var tdi = 0; tdi < tddatacont; tdi++) {

                                                                    var tdvalu = await tddatavalue.nth(tdi);
                                                                    var tdvalue = await tdvalu.id
                                                                    //  //console.log("tdvalue", tdvalue)
                                                                    var idchecker = tdvalue.includes(tabletestdata[0])
                                                                    //  //console.log(idchecker, tabletestdata[0])
                                                                    if (idchecker) {
                                                                        idstatus = true
                                                                        // await checkbox(siblinkid,tabletestdata[1],fieldname,screenname,t);
                                                                        await button(tdvalu, fieldname, screenname, t);
                                                                        // d = await delay();

                                                                    } else {
                                                                        global.status = "Fail"
                                                                        global.msg = "Unable to select the radiobutton from the table '" + fieldname + "' in the page ' " + screenname;
                                                                        global.eventStatus = "fail";

                                                                    }
                                                                    if (idstatus) {
                                                                        // //console.log("idstatus", idstatus)
                                                                        break;
                                                                    }
                                                                }
                                                            } else {
                                                                if (sibdatacount == 1) {
                                                                    var siblink = await Selector(sibval).find('div');
                                                                    var siblinkid = await siblink();
                                                                    var siblinkcont = await siblinkid.count;
                                                                    //  //console.log("sibivalue", sibi, "siblinkcont", siblinkcont)
                                                                    // //console.log("siblinkid", siblinkid)
                                                                    var sibidvalue = await siblinkid.id;
                                                                    //console.log("sibidvalue", sibidvalue)
                                                                    await button(siblinkid, fieldname, screenname, t)
                                                                    //  d = await delay();

                                                                } else {
                                                                    for (var sibi = 0; sibi < sibdatacount; sibi++) {
                                                                        var sibivalu = await sibval.nth(sibi);
                                                                        var sibivalue = await sibivalu()

                                                                        var siblink = await Selector(sibivalu).find('div');
                                                                        var siblinkcont = await siblink.count;
                                                                        if (siblinkcont != 0) {
                                                                            var siblinkid = await siblink();

                                                                            //   //console.log("sibivalue", sibi, "siblinkcont", siblinkcont)
                                                                            //  //console.log("siblinkid", siblinkid)
                                                                            var sibidvalue = await siblinkid.id
                                                                            // //console.log("sibidvalue", sibidvalue)
                                                                            var idchecker = sibidvalue.includes(tableselector[1])
                                                                            // //console.log(idchecker, tableselector[1])
                                                                            if (idchecker) {
                                                                                idstatus = true
                                                                                // await checkbox(siblinkid,tabletestdata[1],fieldname,screenname,t);
                                                                                await button(siblinkid, fieldname, screenname, t);

                                                                                // d = await delay();

                                                                            } else {
                                                                                global.status = "Fail"
                                                                                global.msg = "Unable to select the radiobutton from the table '" + fieldname + "' in the page ' " + screenname /* + "'. ERROR: " + failmsg */;
                                                                                global.eventStatus = "fail";
                                                                            }

                                                                            if (idstatus) {
                                                                                //  //console.log("idstatus", idstatus)
                                                                                break;
                                                                            }
                                                                        }
                                                                    }

                                                                }

                                                            }
                                                        } else {
                                                            global.status = "Fail"
                                                            global.msg = "Unable to select the link from the table '" + fieldname + "' in the page ' " + screenname /* + "'. ERROR: " + failmsg */;
                                                            global.eventStatus = "fail";

                                                        }
                                                    }
                                                    if (idstatus) {
                                                        // //console.log("idstatus", idstatus)
                                                        break;
                                                    }


                                                }


                                                break;

                                            case "link":
                                                for (var t1i = 0; t1i < tacount; t1i++) {
                                                    var inda = await tads.nth(t1i).visible
                                                    var inputvalue = await tads.nth(t1i)
                                                    ////console.log("inda", inda)
                                                    if (inda == true) {
                                                        var inintext = await tads.nth(t1i).innerText;
                                                        inintext = inintext.trim()
                                                        testdata = tabletestdata[0].trim()
                                                        var inintextre = inintext.replace(/\s/g, "")
                                                        var textdatare = testdata.replace(/\s/g, "")
                                                        inintextre = inintextre.toLowerCase();
                                                        textdatare = textdatare.toLowerCase();
                                                        // //console.log("inintext", inintext, inintextre)

                                                        //  //console.log("testdata", testdata, textdatare)
                                                        if (inintextre == textdatare) {
                                                            //console.log("TEstdata matched")
                                                            var sibval = await Selector(inputvalue).sibling();
                                                            var sibdatatext = await sibval.innerText;
                                                            var sibdatacount = await sibval.count;
                                                            //console.log(sibdatacount, "sibdatacount", sibdatatext, "sibdatatext")
                                                            var tddatavalue = await Selector(inputvalue).find('a')
                                                            var tddatacont = await tddatavalue.count;
                                                            if (tddatacont != 0) {
                                                                for (var tdi = 0; tdi < tddatacont; tdi++) {

                                                                    var tdvalu = await tddatavalue.nth(tdi);
                                                                    var tdvalue = await tdvalu.innerText
                                                                    //  //console.log("tdvalue", tdvalue)
                                                                    var idchecker = tdvalue.includes(tabletestdata[0])
                                                                    //   //console.log(idchecker, tabletestdata[0])
                                                                    if (idchecker) {
                                                                        idstatus = true
                                                                        // await checkbox(siblinkid,tabletestdata[1],fieldname,screenname,t);
                                                                        await button(tdvalu, fieldname, screenname, t);
                                                                        // d = await delay();

                                                                    } else {
                                                                        global.status = "Fail"
                                                                        global.msg = "Unable to select the link from the table '" + fieldname + "' in the page ' " + screenname;
                                                                        global.eventStatus = "fail";

                                                                    }
                                                                    if (idstatus) {
                                                                        // //console.log("idstatus", idstatus)
                                                                        break;
                                                                    }
                                                                }
                                                            } else {
                                                                if (sibdatacount == 1) {
                                                                    var siblink = await Selector(sibval).find('a');
                                                                    var siblinkid = await siblink();
                                                                    var siblinkcont = await siblinkid.count;
                                                                    //  //console.log("sibivalue", sibi, "siblinkcont", siblinkcont)
                                                                    // //console.log("siblinkid", siblinkid)
                                                                    var sibidvalue = await siblinkid.innerText;
                                                                    // //console.log("sibidvalue", sibidvalue)
                                                                    await button(siblinkid, fieldname, screenname, t)
                                                                    //  d = await delay();

                                                                } else {
                                                                    for (var sibi = 0; sibi < sibdatacount; sibi++) {
                                                                        var sibivalu = await sibval.nth(sibi);
                                                                        var sibivalue = await sibivalu()

                                                                        var siblink = await Selector(sibivalu).find('a');
                                                                        var siblinkcont = await siblink.count;
                                                                        if (siblinkcont != 0) {
                                                                            var siblinkid = await siblink();

                                                                            //   //console.log("sibivalue", sibi, "siblinkcont", siblinkcont)
                                                                            //  //console.log("siblinkid", siblinkid)
                                                                            var sibidvalue = await siblinkid.innerText
                                                                            //  //console.log("sibidvalue", sibidvalue)
                                                                            var idchecker = sibidvalue.includes(tabletestdata[1])
                                                                            // //console.log(idchecker, tabletestdata[1])
                                                                            if (idchecker) {
                                                                                idstatus = true
                                                                                // await checkbox(siblinkid,tabletestdata[1],fieldname,screenname,t);
                                                                                await button(siblinkid, fieldname, screenname, t);

                                                                                // d = await delay();

                                                                            } else {
                                                                                global.status = "Fail"
                                                                                global.msg = "Unable to select the link from the table '" + fieldname + "' in the page ' " + screenname + "'. ERROR: " /* + failmsg*/;
                                                                                global.eventStatus = "fail";
                                                                            }

                                                                            if (idstatus) {
                                                                                //  //console.log("idstatus", idstatus)
                                                                                break;
                                                                            }
                                                                        }
                                                                    }

                                                                }

                                                            }
                                                        } else {
                                                            global.status = "Fail"
                                                            global.msg = "Unable to select the link from the table '" + fieldname + "' in the page ' " + screenname + "'. ERROR: " /* + failmsg*/;
                                                            global.eventStatus = "fail";

                                                        }
                                                    }
                                                    if (idstatus) {
                                                        // //console.log("idstatus", idstatus)
                                                        break;
                                                    }


                                                }
                                                break;

                                            default:
                                                global.status = "Fail"
                                                global.msg = "Please check the table type";
                                                break;
                                        }
                                    } else {
                                        global.status = "Fail"
                                        global.msg = "Please check the selector for the table";
                                        global.eventStatus = "fail";
                                    }
                                }
                            } // ENd of normal table


                            break;



                        case "datepicker":

                            try {
                                var datepickerstatus = "success"
                                await t.click(Selector(selectorval)).then(async function (passmsg) {
                                    global.eventStatus = "success";

                                },
                                    function (failmsg) {
                                        global.status = "Fail"
                                        global.msg = "Unable to select the  '" + testdata + "' from the datepicker '" + fieldname + "' in the page ' " + screenname + "'. ERROR: " + err.message;
                                        global.eventStatus = "fail";
                                    });
                                d = await delay();

                                if (datepickerstatus == "success") {

                                    const test = Selector('strong')
                                    const nd = await test.innerText
                                    //console.log(nd, "Selector of strong")
                                    var c_date = new Date(nd)
                                    var e_date = new Date(testdata)
                                    //console.log(e_date, "data is")
                                    var day = e_date.getDate().toString()
                                    var yeardata = e_date.getYear().toString();
                                    var yearsys = c_date.getYear().toString();
                                    //console.log("year", yearsys, yeardata)
                                    //console.log("day", day)
                                    //console.log("month", e_date.getMonth(), c_date.getMonth())

                                    if (e_date.getMonth() === c_date.getMonth()) {
                                        //console.log("hhh")
                                        var ds = await Selector('td')
                                        var dfs = await ds();

                                        var ds2 = Number(await ds.count)
                                        while (ds2 >= 0) {
                                            ds2--;
                                            var ds3 = await Selector('td').nth(ds2)
                                            var dfs1 = await ds3()
                                            // //console.log(dfs1 , "selector chek")

                                            if (await ds3.innerText == Number(day)) {
                                                //  //console.log("true")
                                                var dfscnt = await ds3.count
                                                //   //console.log(dfscnt, "dfscnt")
                                                for (var datepi = 0; datepi < dfscnt; datepi++) {
                                                    //console.log('for sec')
                                                    var isvid = await (Selector('td')).nth(datepi).nth(ds2).visible
                                                    //console.log(isvid, "isvid");
                                                    if (isvid == true) {
                                                        var datte = await (Selector('td')).nth(datepi).nth(ds2)
                                                        await t.click(datte)
                                                    } else {
                                                        var datte = await (Selector('td').withText(day)).nth(datepi)
                                                        await t.click(datte)
                                                    }
                                                }
                                                break;
                                            }
                                        }
                                        global.status = "Pass";
                                        global.eventStatus = "success";
                                        global.msg = "The '" + testdata + "' was successfully selected from the datepicker '" + fieldname + "' in the page ' " + screenname + "' ";

                                        exedatetime = new Date();
                                        errdetails = "The ''" + testdata + "'' URL was successfully opened in the browser";
                                        break;

                                    } else {
                                        var monthdata
                                        if (yeardata == yearsys) {
                                            monthdata = c_date.getMonth()
                                            //console.log("Same Year")
                                        } else {
                                            var countyear = Math.abs(yeardata - yearsys)
                                            //console.log("countyear", countyear)
                                            //console.log("Different  Year")
                                            var icon = Selector('i').withText('chevron_right')
                                            var icons = Number(await icon.count)
                                            while (countyear > 0) {
                                                countyear--;
                                                //console.log(icons)
                                                await t.click(icon.nth(icons - 1))
                                            }

                                            monthdata = "0";
                                        }
                                        //console.log("month comp", e_date.getMonth(), monthdata)
                                        var count = Math.abs(e_date.getMonth() - Number(monthdata))
                                        //console.log("count", count)
                                        var icon = Selector('i').withText('chevron_right')
                                        var icons = Number(await icon.count)
                                        while (count > 0) {
                                            count--;
                                            //console.log(icons)
                                            await t.click(icon.nth(icons - 1))
                                        }

                                        var ds4 = await Selector('td')
                                        await t.wait(2000)
                                        var ds5 = Number(await ds4.count)
                                        while (ds5 >= 0) {
                                            ds5--;
                                            var ds6 = await Selector('td').nth(ds5)
                                            //console.log("'" + await ds6.innerText + "'    ", Number(day), "111444003333")

                                            if (Number(await ds6.innerText) == Number(day)) {

                                                //console.log("if section")
                                                var dfscnt = await ds6.count
                                                //console.log(dfscnt, "dfscnt")
                                                for (var datepi = 0; datepi < dfscnt; datepi++) {
                                                    //console.log('for sec')
                                                    var isvid = await (Selector('td')).nth(datepi).nth(ds5).visible
                                                    //console.log(isvid, "isvid");
                                                    if (isvid == true) {
                                                        var datte = await (Selector('td')).nth(datepi).nth(ds5)
                                                        await t.click(datte)
                                                    } else {
                                                        var datte = await (Selector('td').withText(day)).nth(datepi)
                                                        await t.click(datte)
                                                    }
                                                }
                                                break;
                                            }


                                        }
                                        global.status = "Pass";
                                        global.eventStatus = "success";
                                        global.msg = "The '" + testdata + "' was successfully selected from the datepicker '" + fieldname + "' in the page ' " + screenname + "' ";

                                        exedatetime = new Date();
                                        errdetails = "The ''" + testdata + "'' URL was successfully opened in the browser";
                                        //sendtramdata(status, errdetails, exedatetime, stepdata[i], imgname)

                                        //console.log(stepno, "Pass", testdata)
                                        break;
                                    }

                                }
                                d = await delay();

                            } catch (err) {
                                //console.log(err.type, "False");
                                global.status = "Fail"
                                global.msg = "Unable to select the  '" + testdata + "' from the datepicker '" + fieldname + "' in the page ' " + screenname + "'. ERROR: " + err.message;
                                global.eventStatus = "fail";

                            }

                            break;

                        case "radiobutton":

                            await t.click(Selector(selectorval)).then(function (passmsg) {
                                global.status = "Pass"
                                global.eventStatus = "success";
                                global.msg = "The radio button option  '" + testdata + "' in the page ' " + screenname + "' was successfully selected "

                            }, function (failmsg) {
                                global.status = "Fail"
                                global.msg = "Unable to select the radio button option '" + testdata + "' in the page ' " + screenname + "'. ERROR: " + failmsg;
                                global.eventStatus = "fail";
                            });
                            d = await delay();

                            break;


                        default:
                            global.status = "Fail"
                            global.msg = "Incorrect Keyword. Please check the test case";
                            break;


                    }

                    break;

                case "verify":

                    var checkdata = testdata.includes("(-ve)")
                    //console.log("checkdata", checkdata)
                    if (checkdata) {
                        var reversestatus = true;
                        var testdataneg = testdata.split('(-ve)')
                        testdata = testdataneg[0];
                        //console.log("Testadata Negative", testdata)
                    } else {
                        //console.log("Testadata is same", testdata)
                    }


                    switch (fieldtype) {

                        case "textbox":
                            try {
                                global.temp = "success";
                                var textboxval = await Selector(selectorval)
                                //.then(function(passmsg) {
                                global.eventStatus = "success";
                                global.temp = "success";

                            }

                            //function(failmsg) 
                            catch (err) {
                                global.status = "Fail"
                                global.msg = "Unable to locate the Textbox '" + fieldname + "' in the page '" + screenname + "'.System Error: " + err;
                                global.eventStatus = "fail";
                            }


                            if (global.temp == "success") {

                                var textboxvalue = await Selector(selectorval).value
                                if (textboxvalue == testdata) {
                                    global.status = "Pass";
                                    global.eventStatus = "success";
                                    global.msg = "The actual value '" + textboxvalue + "' in the textbox matches the expected value '" + testdata + "'. ";
                                } else {
                                    global.status = "Fail";
                                    global.msg = "The actual value '" + textboxvalue + "' in the textbox does not match the expected value '" + testdata + "'. ";
                                    global.eventStatus = "fail";
                                }
                                global.temp == "";
                            }
                            d = await delay();
                            break;


                        case "combobox":


                            var splitcombo = testdata.split(",");
                            var combolen = splitcombo.length;
                            //console.log(combolen)
                            var verifycomboboxstatus = "success"

                            await t.click(Selector(selectorval)).then(function (passmsg) {
                                global.status = "Pass";
                                global.eventStatus = "success";

                            }, function (failmsg) {
                                global.status = "Fail";
                                global.msg = "The '" + testdata + "' is not present in the dropdown '" + fieldname + "' in the page ' " + screenname + "' ";
                                global.eventStatus = "fail";
                            });
                            d = await delay();

                            if (verifycomboboxstatus == "success") {

                                try {

                                    for (var j = 0; j < combolen; j++) {
                                        var cb = await (Selector('ul').child('li').withText(splitcombo[j]))
                                        var comb = await cb()
                                        //console.log(comb);
                                        //console.log("For loop")
                                        if (splitcombo[j] == comb.textContent) {
                                            //console.log("final condn -- pass")
                                            var status = "true"
                                        }
                                    }

                                    if (status == "true") {
                                        global.status = "Pass"
                                        global.msg = "The '" + testdata + "' was successfully verified in the dropdown '" + fieldname + "' in the page ' " + screenname + "' ";
                                        global.eventStatus = "success";
                                        //console.log("verified")
                                    }
                                } catch (err) {
                                    global.status = "Fail"
                                    global.msg = "The '" + testdata + "' is not present in the dropdown '" + fieldname + "' in the page ' " + screenname + "'. System Error:  " + err;
                                    global.eventStatus = "fail";

                                }
                            }
                            d = await delay();

                            break;

                        case "checkbox":
                            var testdataboolean;
                            const Checkboxstatus = await Selector(selectorval).checked;
                            if ((testdata.toLowerCase().trim()) == "true") {
                                testdataboolean = true;
                                global.eventStatus = "success";
                            } else {
                                testdataboolean = false;
                                global.eventStatus = "success";
                            }
                            await delay();
                            //testdata = testdata.toLowerCase().trim();
                            //console.log("testdata: " + testdata + "   Actual value: " + Checkboxstatus)
                            if (Checkboxstatus == testdataboolean) {
                                //console.log("inside the pass block");
                                global.eventStatus = "success";
                                global.status = "Pass"
                                // //console.log("the test data is:  " + testdata)
                                if (testdata == "true") {
                                    global.msg = "The checkbox '" + fieldname + "' in the page '" + screenname + "' " + "is in the checked(" + Checkboxstatus + ") status";
                                } else {
                                    global.msg = "The checkbox '" + fieldname + "' in the page '" + screenname + "' " + "is in the Unchecked(" + Checkboxstatus + ") status";
                                    //console.log("inside the success block");
                                }
                            } else {
                                //console.log("inside the Fail block");
                                global.status = "Fail"
                                global.eventStatus = "fail";
                                if (testdata == "true") {
                                    global.msg = "The checkbox '" + fieldname + "' in the page '" + screenname + "' " + "is in the Unchecked(" + Checkboxstatus + ") status";
                                } else {
                                    global.msg = "The checkbox '" + fieldname + "' in the page '" + screenname + "' " + "is in the checked(" + Checkboxstatus + ") status";

                                }

                            }
                            await delay();

                            break;

                        case "table":

                            /// ------ updated on 22 Jan 2019 ---------

                            if (fieldsplit.length == 1) {

                                var tabletestdata = testdata.split(">>");
                                //console.log("<---", tabletestdata[0], ">>", tabletestdata[1], "-->")
                                var allcolverify = tabletestdata[0].toLowerCase();


                                if (allcolverify.indexOf("#all#") != -1) {
                                    var tads = await Selector(selectorval).find('div').find('td').withText(tabletestdata[1]).getAttribute('idx')
                                    //console.log("count div", tads)

                                    var tablecellobjs = await Selector(selectorval).find('td').withAttribute('idx', tads);
                                    var countoftablerowobjs = await tablecellobjs.count
                                    //console.log(countoftablerowobjs, "listdatacount")
                                    var contflag = 1;
                                    if (countoftablerowobjs == 0) {
                                        global.status = "Fail";
                                        global.eventStatus = "fail";
                                        global.msg = "The '" + testdata + "' was not successfully verified from the table '" + fieldname + "' in the page ' " + screenname + "' ";

                                    }
                                    for (var tdcount = 0; tdcount < countoftablerowobjs; tdcount++) {
                                        var tdvalue = await tablecellobjs.nth(tdcount)
                                        var tddata = await tablecellobjs.nth(tdcount).innerText;
                                        //console.log("for section")
                                        //console.log(tddata , "tddata")
                                        tddata = tddata.replace(/\s/g, '').toLowerCase();
                                        var tabletestdatatoverify = tabletestdata[1].replace(/\s/g, '').toLowerCase();
                                        if (tddata == tabletestdatatoverify) {
                                            //console.log("DAta verified")
                                            contflag++;
                                        }

                                    }
                                    //console.log("contflag", contflag)								
                                    if (contflag == countoftablerowobjs - 1) {
                                        global.status = "Pass";
                                        global.eventStatus = "success";
                                        global.msg = "The '" + tabletestdatatoverify + "' was successfully verified for these many records'" + contflag + "from the table " + fieldname + "' in the page ' " + screenname + "' ";
                                        //console.log("global.msg",global.msg)
                                    } else {
                                        global.status = "Fail";
                                        global.eventStatus = "fail";
                                        global.msg = "The '" + testdata + "' was not successfully verified from the table '" + fieldname + "' in the page ' " + screenname + "' ";

                                    }

                                    contflag = "";
                                }
                                else {
                                    var tablecellobjs = await Selector(selectorval).find('td');
                                    var countoftablecellobjs = await tablecellobjs.count
                                    //   var countoftablecellobjs = await tablecellobjs.count
                                    var tablestatusflag
                                    var listdatacount = await tabletestdata.length;
                                    //console.log(countoftablecellobjs, "listdatacount", listdatacount)
                                    if (countoftablecellobjs > 0) {
                                        for (var tdcount = 0; tdcount < countoftablecellobjs; tdcount++) {
                                            var tdvalue = await tablecellobjs.nth(tdcount)
                                            var tddata = await tablecellobjs.nth(tdcount).innerText;
                                            //console.log("for section")
                                            //console.log(tddata , "tddata")

                                            if (screenname == "Account_Statement" && global.lang == true && tabletestdata[0].indexOf("/") != -1) { tabletestdata[0] = moment(tabletestdata[0], ["DD/MM/YYYY", "YYYY/MM/DD"]).format('DD[/]MM[/]YYYY') }


                                            tddata = tddata.replace(/\s/g, '').toLowerCase();
                                            tabletestdata[0] = tabletestdata[0].replace(/\s/g, '').toLowerCase();

                                            //console.log("tddata" , tddata , "testdata[0]" , tabletestdata[0])
                                            // for (var testdcount = 0; testdcount < listdatacount; testdcount++) {
                                            if (tddata == tabletestdata[0]) {
                                                //console.log("If Section");
                                                //await t.click(Selector(tdvalue))
                                                var sibdata = await Selector(tdvalue).sibling();
                                                var sin = await sibdata()
                                                ////console.log(sin, "sin")
                                                var sibdatatext = await sibdata.innerText;
                                                var sibdatacount = await sibdata.count;
                                                //console.log(sibdatacount, "sibdatacount", sibdatatext, "sibdatatext")
                                                if (sibdatacount == 1) {
                                                    //await t.click(Selector(sibdata))
                                                    //console.log("Only one sibling")
                                                    sibdatatext = sibdatatext.replace(/\s|[,]/g, '')
                                                    if (screenname == "Account_Statement" && global.lang == true && tabletestdata[1].indexOf("/") != -1) { tabletestdata[1] = moment(tabletestdata[1], ["DD/MM/YYYY", "YYYY/MM/DD"]).format('DD[/]MM[/]YYYY') }
                                                    tabletestdata[1] = tabletestdata[1].replace(/\s/g, '')

                                                    if (sibdatatext == tabletestdata[1]) {
                                                        //console.log("DAta verified")
                                                        global.status = "Pass";
                                                        global.eventStatus = "success";
                                                        global.msg = "The '" + testdata + "' was successfully verified from the table '" + fieldname + "' in the page ' " + screenname + "' ";
                                                    } else {
                                                        global.status = "Fail";
                                                        global.eventStatus = "fail";
                                                        global.msg = "The '" + testdata + "' was not successfully verified from the table '" + fieldname + "' in the page ' " + screenname + "' ";
                                                        tablestatusflag = false;
                                                    }
                                                } else {
                                                    //console.log("Multiple sibling")
                                                    var elsetableflag;
                                                    // for (var testdcount = 1; testdcount < listdatacount; testdcount++) {
                                                    for (var sibi = 0; sibi < sibdatacount; sibi++) {


                                                        var sibivalue = await sibdata.nth(sibi).innerText;
                                                        //console.log(sibivalue, "sibivalue")
                                                        sibivalue = sibivalue.replace(/\s|[,]/g, '')
                                                        if (screenname == "Account_Statement" && global.lang == true && tabletestdata[1].indexOf("/") != -1) { tabletestdata[1] = moment(tabletestdata[1], ["DD/MM/YYYY", "YYYY/MM/DD"]).format('DD[/]MM[/]YYYY') }
                                                        tabletestdata[1] = tabletestdata[1].replace(/\s/g, '')
                                                        //console.log("sibivalue", sibivalue,"tabletestdata[1]",tabletestdata[1] )

                                                        if (sibivalue == tabletestdata[1]) {

                                                            //console.log(sibivalue, "DAta verified")

                                                            global.status = "Pass";
                                                            global.eventStatus = "success";
                                                            global.msg = "The '" + testdata + "' was successfully verified from the table '" + fieldname + "' in the page ' " + screenname + "' ";
                                                            elsetableflag = true;
                                                            tablestatusflag = true;

                                                            if ((elsetableflag) && (listdatacount > 2)) {
                                                                var lastvalue = await sibdata.nth(sibi).sibling()
                                                                var lastcount = await lastvalue.count
                                                                var lastatus;
                                                                var otherdata;
                                                                for (var datacount = 2; datacount < listdatacount; datacount++) {
                                                                    for (var txt = 0; txt < lastcount; txt++) {
                                                                        //console.log(txt, tabletestdata.length, "??????????")
                                                                        var lastteext = await lastvalue.nth(txt).innerText
                                                                        //await t.click(Selector(lastvalue))
                                                                        lastteext = lastteext.replace(/\s|[,]/g, '')
                                                                        if (screenname == "Account_Statement" && global.lang == true && tabletestdata[datacount].indexOf("/") != -1) { tabletestdata[datacount] = moment(tabletestdata[datacount], ["DD/MM/YYYY", "YYYY/MM/DD"]).format('DD[/]MM[/]YYYY') }
                                                                        tabletestdata[datacount] = tabletestdata[datacount].replace(/\s/g, '')
                                                                        //console.log(lastcount, "lastcount", "lastteext", lastteext)
                                                                        if (tabletestdata[datacount] == lastteext) {
                                                                            //console.log("2 data and above verified")
                                                                            global.status = "Pass";
                                                                            global.eventStatus = "success";
                                                                            global.msg = "The '" + testdata + "' was successfully verified from the table '" + fieldname + "' in the page ' " + screenname + "' ";
                                                                            lastatus = true
                                                                            otherdata = true
                                                                        } else {
                                                                            global.status = "Fail";
                                                                            global.eventStatus = "fail";
                                                                            global.msg = "The '" + testdata + "' was not successfully verified from the table '" + fieldname + "' in the page ' " + screenname + "' ";
                                                                            lastatus = false;
                                                                        }
                                                                        if (lastatus) {
                                                                            //console.log("mul data asfdgf status")
                                                                            lastatus = "";
                                                                            break;
                                                                        }


                                                                    }

                                                                }
                                                            }
                                                        } else {
                                                            global.status = "Fail";
                                                            global.eventStatus = "fail";
                                                            global.msg = "The '" + testdata + "' was not successfully verified from the table '" + fieldname + "' in the page ' " + screenname + "' ";
                                                            elsetableflag = false;
                                                            tablestatusflag = false;
                                                        }

                                                        if (elsetableflag) {
                                                            //console.log("status")
                                                            elsetableflag = "";
                                                            break;
                                                        }

                                                    }
                                                    d = await delay();

                                                }

                                            } else {
                                                global.status = "Fail";
                                                global.eventStatus = "fail";
                                                global.msg = "The '" + testdata + "' was not successfully verified from the table '" + fieldname + "' in the page ' " + screenname + "' ";
                                                elsetableflag = false;
                                                tablestatusflag = false;
                                            }
                                            if (tablestatusflag) {
                                                //console.log("main table status")
                                                tablestatusflag = "";
                                                break;
                                            }
                                        }
                                    } else {

                                        global.status = "Fail";
                                        global.eventStatus = "fail";
                                        global.msg = "Please check the selector for the table";
                                        elsetableflag = false;
                                        tablestatusflag = false;
                                    }

                                    if (reversestatus) {
                                        if (global.status == "Fail") {
                                            global.status = "Pass";
                                            global.eventStatus = "success";
                                            global.msg = "The '" + testdata + "' was successfully verified from the table '" + fieldname + "' in the page ' " + screenname + "' ";
                                        } else {
                                            global.status = "Fail";
                                            global.eventStatus = "fail";
                                            global.msg = "The '" + testdata + "' was not successfully verified from the table '" + fieldname + "' in the page ' " + screenname + "' ";
                                        }

                                        reversestatus = "";
                                    }

                                } // End of Normal table text verify

                            } // End of Verify text
                            switch (tabletype) {

                                case "image":

                                    var tabletestdata = testdata.split(">>");
                                    //console.log("<---", tabletestdata[0], ">>", tabletestdata[1], "-->")
                                    var tablecellobjs = await Selector(selectorval).find('td');
                                    var countoftablecellobjs = await tablecellobjs.count

                                    var tablestatusflag
                                    var listdatacount = await tabletestdata.length;
                                    //console.log(countoftablecellobjs, "listdatacount", listdatacount)
                                    for (var tdcount = 0; tdcount < countoftablecellobjs; tdcount++) {
                                        var tdvalue = await tablecellobjs.nth(tdcount)
                                        var tddata = await tablecellobjs.nth(tdcount).innerText;
                                        //console.log("for section")

                                        if (tddata.trim() == tabletestdata[0]) {
                                            //console.log("If Section");
                                            var sibdata = await Selector(tdvalue).sibling();
                                            var sin = await sibdata()
                                            var sflag = 0;

                                            var sibdatacount = await sibdata.count;
                                            //console.log(sibdatacount, "sibdatacount", tddata, "tddata")
                                            for (var dcount = 1; dcount < listdatacount - 1; dcount++) {
                                                for (var sibcount = 0; sibcount < sibdatacount; sibcount++) {
                                                    //console.log("datacount", dcount, "sibcount", sibcount, tabletestdata.length, "??????????")
                                                    var sibdatatext = await sibdata.nth(sibcount).innerText;

                                                    //console.log(sibdatacount, "sibdatacount", "sibdatatext", sibdatatext, "Testdata", tabletestdata[dcount])
                                                    if (tabletestdata[dcount] == sibdatatext.trim()) {
                                                        sflag++;
                                                        //console.log("SFLAG", sflag)
                                                        break;
                                                    }

                                                }

                                            }
                                            if (sflag == (dcount - 1)) {

                                                var img = await Selector(sibdata).find('img').withAttribute('alt', tabletestdata[dcount])
                                                var imgcount = await img.count
                                                if (imgcount == 1) {
                                                    global.status = "Pass";
                                                    global.eventStatus = "success";
                                                    global.msg = "The '" + testdata + "' was successfully verified from the table '" + fieldname + "' in the page ' " + screenname + "' ";
                                                    //console.log("@@@@@@@", imgcount)
                                                    //console.log("################## PASS", tabletestdata[dcount], sibdatacount)
                                                    break;
                                                } else {
                                                    global.status = "Fail";
                                                    global.eventStatus = "fail";
                                                    global.msg = "The '" + testdata + "' is not verified from the table '" + fieldname + "' in the page ' " + screenname + "' ";
                                                    //console.log("@@@@@@@", imgcount)
                                                    //console.log("!!!!!!!! FAIL", tabletestdata[dcount], sibdatacount)
                                                    break;
                                                }

                                            }

                                        } else {
                                            global.status = "Fail";
                                            global.eventStatus = "fail";
                                            global.msg = "The '" + testdata + "' is not verified from the table '" + fieldname + "' in the page ' " + screenname + "' ";
                                            //console.log("&&&&&&&& FAIL")
                                        }


                                    }

                                    d = await delay();
                                    break;
                            }
                            break;
                        /// ------ updated on 22 Jan 2019 ---------

                        case "text":
                            //   var x = await elementScroll(selectorval);
                            var textval = await Selector(selectorval).exists;
                            var selverifycount = await Selector(selectorval).count;
                            var statusverify;
                            //console.log("textval::" + textval, "selverifycount", selverifycount)
                            if (textval) {
                                for (var textco = 0; textco < selverifycount; textco++) {
                                    var coselval = await Selector(selectorval).nth(textco);
                                    var textcoval = await coselval.visible;
                                    if (textcoval == true) {
                                        var textvalue = await Selector(coselval).innerText;
                                        global.eventStatus = "success";
                                        var verifytextStatus = "success"
                                        //statusverify = true;
                                    } else {
                                        global.status = "Fail"
                                        global.msg = "The text value in the field ' " + fieldname + " ' is " + textvalue + " and does not match the expected value '" + testdata + "'";
                                        global.eventStatus = "fail";
                                    }
                                    d = await delay();

                                    if (verifytextStatus == "success") {

                                        textvalue = textvalue.trim();
                                        testdata = testdata.trim();

                                        var textvalue1 = textvalue.replace(/\s/g, '').toLowerCase()
                                        var testdata1 = testdata.replace(/\s/g, '').toLowerCase()

                                        //console.log("TextValue: : ", textvalue1);
                                        //console.log("Testdata: : ", testdata1);

                                        if (textvalue1.indexOf(testdata1) >= 0) {
                                            global.status = "Pass"
                                            global.eventStatus = "success";
                                            global.msg = "The text value in the field ' " + fieldname + " ' is " + textvalue + " and the same has been verified sucessfully against the expected value '" + testdata + "'";
                                            statusverify = true;

                                        } else {
                                            global.status = "Fail"
                                            global.msg = "The text value in the field ' " + fieldname + " ' is " + textvalue + " and does not match the expected value '" + testdata + "'";
                                            global.eventStatus = "fail";
                                        }
                                        d = await delay();
                                    }
                                    if (statusverify) {
                                        statusverify = "";
                                        break;
                                    }

                                }
                            }
                            else {
                                global.status = "Fail"
                                global.msg = "The text value in the field ' " + fieldname + " ' is " + textvalue + " and does not match the expected value '" + testdata + "'";
                                global.eventStatus = "fail";
                            }
                            break;




                        default:
                            global.status = "Fail"
                            global.msg = "Incorrect Keyword. Please check the test case";
                            break;


                    }

                    break;


                case "isdisplayed":

                    switch (fieldtype) {

                        case "text":

                            try {

                                if (fieldtype == "menu") {
                                    var splitdata = selectorval.split(",");
                                    await t.hover(Selector(splitdata[0]));
                                    await t.expect(Selector(splitdata[1])).ok('Menu Verified');
                                    //  await t.wait(1200)
                                    global.status = "Pass";
                                    global.msg = "The menu option '" + fieldname + "' is available in the page '" + screenname + "' as expected.";
                                    global.eventStatus = "success";
                                } else {
                                    // var x = await elementScroll(selectorval);
                                    //console.log("**************************")
                                    var d2 = Selector(selectorval)
                                    //console.log(await d2.innerText)
                                    await t.expect(Selector(selectorval).exists).ok("Object Verified");
                                    await t.wait(1200)
                                    global.status = "Pass";
                                    global.msg = "The Field '" + fieldname + "' in displayed in the page '" + screenname + "' as expected.";
                                    global.eventStatus = "success";
                                }
                                break;
                            } catch (err) {

                                if (fieldtype == "menu") {
                                    await t.wait(1200)
                                    global.status = "Fail"
                                    global.msg = "ERROR:The menu option '" + fieldname + "' is not available in the page '" + screenname + "' as expected. System Error: " + err;
                                    global.eventStatus = "fail";
                                } else {
                                    await t.wait(1200)
                                    global.status = "Fail"
                                    global.msg = "ERROR: The Field '" + fieldname + "' is not displayed in the page '" + screenname + "' as expected.";
                                    global.eventStatus = "fail";
                                }
                                d = await delay();
                                break;
                            }

                        case "file":
                            try {
                                if (testdata == "" || testdata == "x") {
                                    var inputfile = userDir + '/Downloads/';
                                }
                                else {
                                    //console.log("Else in file section")
                                    var inputfile = testdata + '/';
                                }
                                /*var reddr =fs.readdir(inputfile, function(err, files){
                                return files.map(function (fileName) {
                                return {name: fileName,time: fs.statSync(inputfile+fileName).mtime.getTime()
                                };
                                }).sort(function (a, b) { return a.time - b.time; }).map(function (v) { return v.name; });
                                  //console.log(reddr,"27",typeof reddr)
                                }); */
                                function readdir() {
                                    return new Promise(function (resolve, reject) {
                                        var reddr;
                                        fs.readdir(inputfile, function (err, files) {
                                            reddr = files.map(function (fileName) {
                                                return {
                                                    name: fileName, time: fs.statSync(inputfile + fileName).mtime.getTime()
                                                };
                                            }).sort(function (a, b) { return a.time - b.time; }).map(function (v) { return v.name; });
                                            // console.log(files,typeof files,"27")

                                            return resolve(reddr)
                                        });

                                    })
                                }

                                function readtime() {
                                    const stats = fs.statSync(inputfile)
                                    return stats.mtimeMs
                                }

                                var getdir = await readdir()
                                var timeoflastfile = await readtime()
                                var systimenow = new Date().getTime();
                                var timediff = ((systimenow - timeoflastfile) / 60000);
                                timediff = Math.round(timediff)
                                //console.log("timediff", timediff);

                                var typeofdownfile = inputfile + getdir[getdir.length - 1]
                                var filetypeis = typeof typeofdownfile
                                //console.log(typeofdownfile, "typeofdownfile");
                                typeofdownfile = typeofdownfile.toLowerCase();
                                selectorval = selectorval.toLowerCase();
                                await t.wait(4000)
                                if (timediff <= 2) {
                                    var checkingtype = typeofdownfile.includes(selectorval)
                                    //console.log('checkingtype', checkingtype);
                                    if (checkingtype) {

                                        global.status = "Pass"
                                        global.msg = "The file of type " + selectorval + "  has been successfully downloaded in the path " + typeofdownfile;
                                        global.eventStatus = "success";
                                        //console.log(global.msg, "global.msg global.msg global.msg")
                                    }
                                    else {
                                        global.status = "Fail"
                                        global.msg = "The file of type  " + selectorval + "  has not been successfully downloaded";
                                        global.eventStatus = "fail";
                                    }
                                }
                                else {
                                    global.status = "Fail"
                                    global.msg = "No file of type  " + selectorval + "  has not been downloaded recently ";
                                    global.eventStatus = "fail";
                                }

                            }
                            catch (err) {

                                //console.log("catch block",err)
                                global.status = "Fail"
                                global.msg = "Please check the filetype  " + selectorval + "  given in selector, file didnt get downloaded successfully  ";
                                global.eventStatus = "fail";
                            }
                            break;



                        default:
                            global.status = "Fail"
                            global.msg = "Incorrect Keyword. Please check the test case";
                            break;

                    }
                    break;


                case "sort":

                    var refelement = ""
                    var tableselector = selectorval.split(">>")
                    var tabletestdata = testdata.split(">>");
                    //console.log("<---", tabletestdata[0], ">>", tabletestdata[1], "-->")

                    var tads = await Selector(tableselector[0]).find('div').find('th').withText(tabletestdata[1]).getAttribute('idx')
                    //console.log("count div", tads)

                    var tablecellobjs = await Selector(selectorval).find('td').withAttribute('idx', tads);
                    var countoftablecellobjs = await tablecellobjs.count
                    //console.log(countoftablecellobjs, "listdatacount")
                    if (tabletestdata[0] == "asc") {
                        await t.click(Selector(tableselector[0]).find('div').find('th').withText(tabletestdata[1]))
                        await t.wait(2000)
                    } else if (tabletestdata[0] == "desc") {
                        await t.doubleClick(Selector(tableselector[0]).find('div').find('th').withText(tabletestdata[1]))
                        await t.wait(2000)
                    }
                    var txt = await tablecellobjs.nth(0).innerText;
                    refelement = await txt.replace(",", "")
                    for (var rcount = 0; rcount < countoftablecellobjs; rcount++) {
                        var txt1 = await tablecellobjs.nth(rcount).innerText;
                        var ctxt = await txt1.replace(",", "")
                        for (var tdcount = 0; tdcount < countoftablecellobjs; tdcount++) {
                            if (tabletestdata[0] == "asc") {
                                if ((refelement.localeCompare(ctxt, undefined, {
                                    numeric: true
                                }) == -1) || (refelement.localeCompare(ctxt, undefined, {
                                    numeric: true
                                }) == 0)) {
                                    //console.log(refelement, ctxt, refelement.localeCompare(ctxt, undefined, {
                                    //   numeric: true
                                    //  }))
                                    refelement = ctxt
                                    ////console.log("sorted")
                                    break;
                                } else {
                                    //console.log("Sorting error", refelement, ctxt, refelement.localeCompare(ctxt, undefined, {
                                    //    numeric: true
                                    // }))
                                    refelement = "Failed"
                                    break;
                                }
                            } else (tabletestdata[0] == "desc")
                            {
                                if ((refelement.localeCompare(ctxt, undefined, {
                                    numeric: true
                                }) == 1) || (refelement.localeCompare(ctxt, undefined, {
                                    numeric: true
                                }) == 0)) {
                                    //console.log(refelement, ctxt, refelement.localeCompare(ctxt, undefined, {
                                    //   numeric: true
                                    // }))
                                    refelement = ctxt
                                    break;
                                } else {
                                    //console.log("Sorting error", refelement, ctxt, refelement.localeCompare(ctxt, undefined, {
                                    //   numeric: true
                                    //  }))
                                    refelement = "Failed"
                                    break;
                                }
                            }
                        }
                        if (rcount == countoftablecellobjs - 1 && refelement != "Failed") {
                            //console.log("tdcount", rcount, "rcount", countoftablecellobjs - 1)
                            global.eventStatus = "success";
                            global.status = "Pass"
                            global.msg = "The data in column '" + tabletestdata[1] + "' has been sorted in " + tabletestdata[0] + "ending order in the page '" + screenname + "' ";
                            //  //console.log("PASS", global.msg)
                        } else if (refelement == "Failed") {
                            global.eventStatus = "Fail";
                            global.status = "Pass"
                            global.msg = "ERROR: The data in column '" + tabletestdata[1] + "' is not sorted in " + tabletestdata[0] + "ending order in the page '" + screenname + "' ";
                            //  //console.log("FAIL", global.msg)
                            break;
                        }


                    }
                    d = await delay();
                    break;

                case "pdf":

                    try {

                        const pdfvalue = testdata;



                        //var PdfReader = lib.Pdf123;
                        var Rule = lib.Rule;

                        var PFParser = require("pdf2json/pdfparser"); // doc: https://github.com/modesty/pdf2json


                        /*var IN_TESTFILE = "./test/med.pdf";*/

                        /*var TESTFILE = "./med_enc.pdf";

                        var OP_TESTFILE = "./med_withoutpass.pdf";

                        var keylength = "40"


                        ////console.log(PdfReader , "Printing PdfReader")
                        //console.log(Rule , "Printing Rule")


                        var password = "test123";  
                        var encrypt_command = 'qpdf --decrypt '+password+' '+password+' '+keylength+' -- '+TESTFILE+' '+TESTFILE;

                        var decrypt_command = 'qpdf --password='+password+' '+'--decrypt'+' '+TESTFILE+' '+OP_TESTFILE;

                        exec(decrypt_command,
                         function (error){
                           if (error !== null){
                            //console.log('exec error: ' + error);
                           }else{
                          //console.log('Your pdf is decrypted successfully.');


                          //console.log("--------Validating PDF--------")
                           }
                         }
                        );*/
                        var inputfile = userDir + '/Downloads/';

                        //  //console.log("inputfile is", inputfile)
                        /*var reddr =fs.readdir(inputfile, function(err, files){
                        return files.map(function (fileName) {
                        return {name: fileName,time: fs.statSync(inputfile+fileName).mtime.getTime()
                        };
                        }).sort(function (a, b) { return a.time - b.time; }).map(function (v) { return v.name; });
                          //console.log(reddr,"27",typeof reddr)
                        }); */
                        function readdir() {
                            return new Promise(function (resolve, reject) {
                                var reddr;
                                fs.readdir(inputfile, function (err, files) {
                                    const txtFiles = files.filter(el => /\.pdf$/.test(el))
                                    reddr = txtFiles.map(function (fileName) {
                                        return {
                                            name: fileName,
                                            time: fs.statSync(inputfile + fileName).mtime.getTime()
                                        };
                                    }).sort(function (a, b) {
                                        return a.time - b.time;
                                    }).map(function (v) {
                                        return v.name;
                                    });
                                    // //console.log(files,typeof files,"27")
                                    return resolve(reddr)
                                });

                            })
                        }

                        if (selectorval == 'x') {

                            var getdir = await readdir()
                            selectorval = inputfile + getdir[getdir.length - 1]
                            var TESTFILE = selectorval;
                        } else {
                            var TESTFILE = selectorval;
                            //console.log(TESTFILE, "2345")
                        }
                        /*
                        var OP_TESTFILE = "./test/med_pass.pdf";

                        var qpdf = require('node-qpdf');

                        var options = {
                            keyLength: 128,
                            password: 'qwerty'
                        }

                        qpdf.encrypt(TESTFILE, options ,OP_TESTFILE);*/

                        //qpdf.decrypt(TESTFILE, 'qwerty');



                        // step 1: print raw items



                        function printRawItems(callback) {
                            //console.log("called")
                            parseFileItems(TESTFILE, function (err, item) {
                                if (err)
                                    callback(err);
                                else if (!item)
                                    callback();
                                //else
                                // //console.log(item, "item is printed");

                            });
                        }

                        // step 2

                        function parseData(callback) {
                            function displayValue(value) {
                                // //console.log("extracted value:", value);
                            }

                            function displayTable(table) {
                                for (var i = 0; i < table.length; ++i) {
                                    ////console.log(table[i].join("\t"));
                                }
                            }
                            /*var rules = [
                              Rule.on(/^Hello \"(.*)\"$/).extractRegexpValues().then(displayValue),
                              Rule.on(/^Value\:/).parseNextItemValue().then(displayValue),
                              Rule.on(/^c1$/).parseTable(3).then(displayTable),
                              Rule.on(/^Values\:/).accumulateAfterHeading().then(displayValue),
                            ];
                            var processItem = Rule.makeItemProcessor(rules);
                            new PdfReader().parseFileItems(TESTFILE, function(err, item){
                              if (err)
                                callback(err);
                              else {
                                processItem(item);
                                if (!item)
                                  callback(err, item);
                              }
                            });*/
                        }

                        // run tests





                        //console.log("\ntest 1: raw items from sample.pdf\n");
                        printRawItems(function () {
                            //console.log("\ntest 2: parse values from sample.pdf\n");
                            parseData(function () {
                                //console.log("\ndone.\n");
                            });
                        });







                        /**
                         * PdfReader: class that reads a PDF file, and calls a function on each item found while parsing that file.
                         * @author Adrien Joly, http://github.com/adrienjoly
                         * This content is released under the MIT License.
                         * 
                         * An item object can match one of the following objects:
                         * - null, when the parsing is over, or an error occured.
                         * - {file:{path:string}}, when a PDF file is being opened.
                         * - {page:integer}, when a new page is being parsed, provides the page number, starting at 1.
                         * - {text:string, x:float, y:float, w:float, h:float...}, represents each text with its position.
                         * 
                         **/
                        //var LOG = require("./lib/LOG.js");

                        function forEachItem(pdf, handler) {

                            //   //console.log("Inside foreachitem function", pdf)


                            var pageNumber = 0;

                            var jtext = "";
                            for (var p in pdf.data.Pages) {
                                var page = pdf.data.Pages[p];
                                handler(null, {
                                    page: ++pageNumber
                                });
                                for (var t in page.Texts) {
                                    var item = page.Texts[t];
                                    item.text = decodeURIComponent(item.R[0].T);


                                    jtext += item.text + ' ';


                                }

                                ////console.log(jtext)
                                handler(null, jtext);



                                testdata = testdata;

                                testdata.trim();
                                testdata = "\\b" + testdata.replace(" ", "\\b \\b") + "\\b";
                                //   //console.log("Testdata is", testdata, "Jtext", jtext)
                                //jtext = jtext.replace(/[^a-zA-Z0-9]/g, '');
                                //testdata1 = testdata.replace(/[^a-zA-Z0-9]/g, '');
                                //	//console.log("Tstdata1 is", testdata, "Jtext after converting", jtext)
                                if (jtext.toLowerCase().match(testdata.toLowerCase()) == null) {
                                    //console.log("---------------------------------------------------------------------------------------------------------------------");
                                    //console.log("      ");
                                    //console.log("Validation Completed...")
                                    //console.log("No such word combination found.");
                                    global.status = "Fail";

                                    global.msg = "The ''" + pdfvalue + "'' is not available in the PDF";

                                } else {
                                    //console.log("------------------------------------------------------------------------------------------------------------");
                                    //console.log("      ");
                                    //console.log("Validation Completed...")
                                    //console.log("-------------Test Data Found----------------")
                                    //console.log(pageNumber, "Page number");
                                    ////console.log(page.Texts[t], "dfsgdhfjgkh");
                                    global.status = "Pass";
                                    global.msg = "The ''" + pdfvalue + "'' successfully verified in the PDF in page number" + ' ' + pageNumber + "";
                                    //  //console.log("Test Data Found")
                                    found();
                                }
                                //break;

                            }
                            handler();
                        }


                        function found() {

                            //console.log("")


                        }

                        function PdfReader(options) {
                            var LOG = require("./lib/LOG.js").toggle(true);

                            // //console.log(LOG, "whats in log")
                            LOG("PdfReader"); // only displayed if LOG.js was first loaded with `true` as init parameter
                            this.options = options || {};
                        }

                        /**
                         * parseFileItems: calls itemHandler(error, item) on each item parsed from the pdf file
                         **/
                        function parseFileItems(pdfFilePath, itemHandler) {
                            itemHandler(null, {
                                file: {
                                    path: pdfFilePath
                                }
                            });
                            var pdfParser = new PFParser();
                            pdfParser.on("pdfParser_dataError", itemHandler);
                            pdfParser.on("pdfParser_dataReady", function (pdfData) {
                                forEachItem(pdfData, itemHandler);
                            });
                            //var verbosity = this.options.debug ? 1 : 0;
                            var verbosity
                            pdfParser.loadPDF(pdfFilePath, verbosity);
                        };

                        /**
                         * parseBuffer: calls itemHandler(error, item) on each item parsed from the pdf file received as a buffer
                         */
                        function parseBuffer(pdfBuffer, itemHandler) {
                            //console.log("comes in hre")

                            itemHandler(null, {
                                file: {
                                    buffer: pdfBuffer
                                }
                            });
                            var pdfParser = new PFParser();
                            pdfParser.on("pdfParser_dataError", itemHandler);
                            pdfParser.on("pdfParser_dataReady", function (pdfData) {
                                forEachItem(pdfData, itemHandler);
                            });
                            var verbosity = this.options.debug ? 1 : 0;
                            pdfParser.parseBuffer(pdfBuffer, verbosity);
                        };


                        //module.exports = PdfReader;


                        await t.wait(20000);
                    } catch (err) {
                        global.status = "Fail";

                        global.msg = "Please Check whether PDF is available in the correct location";
                    }
                    break;

                case "retrieve":

                    try {
                        var textval = await Selector(selectorval).exists;
                        var Exp = /[0-9]/g; //05/02/2019
                        if (textval == true) {

                            //console.log("loginged")
                            //var variablenamename = retdata;

                            var variablenamename = testdata;

                            if (fieldtype == "text") {
                                var textvalue = await Selector(selectorval).innerText;
                            } else {
                                var textvalue = await Selector(selectorval).value;
                            }
                            //console.log(retdata,"retdata")
                            // var textvalue = await Selector(selectorval).innerText;
                            //console.log("BEFORE", textvalue) //05/02/2019

                            if (fieldname == "ret_batchID" || fieldname == "Runtime_Sysid") {
                                //console.log("inside the fieldname")
                                textvalue = textvalue.replace(/\D+/g, '')
                            }
                            if (fieldname == "ret_auto_fwd_date") {
                                //console.log("inside the fieldname")
                                textvalue = textvalue.replace(/\D+/g, '')
                                if (global.lang == false)
                                    textvalue = textvalue.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3');
                                else
                                    textvalue = textvalue.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1/$2/$3');
                            }
                            // ===========//05/02/2019 ==========
                            if (textvalue.match(Exp)) {
                                textvalue = textvalue.replace(/[,]/g, "")
                            }
                            //console.log("AFTER", textvalue) 

                            // ============ 05/02/2019 ============
                            var jsontostring = JSON.stringify(new Object(textvalue))
                            //console.log(jsontostring)

                            var retdata = textvalue
                            //console.log(retdata, "retdata")
                            //console.log("!!!!!!!!!!!!!!!!!!!!!!",variablenamename);
                            var cflag = 0;
                            //console.log(stepdata.length);
                            for (var reti = i; reti < stepdata.length; reti++) {
                                var rettestdata = stepdata[reti].testdata;
                                //console.log("!!!!!!!!!!!!!!!!!!!!!!",rettestdata,">>>>>",rettestdata.indexOf(variablenamename));
                                if (rettestdata.indexOf(variablenamename) >= 0) //str.indexOf("welcome")
                                {
                                    testdata = textvalue
                                    var str = rettestdata
                                    var vname = new RegExp(variablenamename, "g"); //05/02/2019 
                                    rettestdata = str.replace(vname, textvalue); //05/02/2019 
                                    //	//console.log ("Reti :: ",reti);
                                    stepdata[reti].testdata = String(rettestdata)
                                    //console.log("New Testdata ::: ", stepdata[reti].testdata);
                                    cflag++
                                    // //console.log("inside if cflag", cflag)

                                }
                                //console.log("5555555555555555555555555", stepdata[reti].keyword.toLowerCase().trim())
                            }
                            retdata = "";
                            //console.log(testdata, "testdata", cflag)

                            //console.log("inserted successfully");
                            global.status = "Pass"
                            global.eventStatus = "success";
                            global.msg = "The '" + variablenamename + "' was successfully retrieved from the '" + fieldname + "' in the page ' " + screenname + "' ";

                        } else {
                            //console.log("Fail")
                            global.status = "Fail"
                            global.eventStatus = "fail";
                            global.msg = "Unable to retrieve the  '" + variablenamename + "' from the '" + fieldname + "' in the page ' " + screenname
                        }
                    } catch (err) {
                        //console.log("Fail")
                        global.status = "Fail"
                        global.eventStatus = "fail";
                        global.msg = "Unable to retrieve the  '" + variablenamename + "' from the '" + fieldname + "' in the page ' " + screenname
                    }
                    break;


                case "bulkretrieve":

                    try {

                        var tableselector = selectorval.split(">>")
                        var tabletestdata = testdata.split(">>");
                        //console.log("<---", tabletestdata[0], ">>", tabletestdata[1], "-->")

                        var tads = await Selector(tableselector[0]).find('div').find('th').withText(tabletestdata[1]).getAttribute('idx')
                        //console.log("count div", tads)
                        var tablecellobjs = await Selector(selectorval).find('td').withAttribute('idx', tads);
                        var countoftablecellobjs = await tablecellobjs.count
                        //console.log(countoftablecellobjs, "listdatacount")

                        if (countoftablecellobjs != 0) {
                            //console.log("loginged")
                            var variablenamename = retdata;
                            for (var ret = 0; ret < countoftablecellobjs; ret++) {
                                var variabletext = await tablecellobjs.nth(ret).innerText;
                                //console.log(variabletext[ret])
                            }

                            //console.log(variabletext.length);
                            for (var reti = i; reti < stepdata.length; reti++) {
                                var rettestdata = stepdata[reti].testdata;
                                for (var bulkreti = 0; bulkreti < variabletext.length; bulkreti++) {
                                    if (rettestdata.indexOf((variablenamename + "[")) != -1) {
                                        var str = rettestdata
                                        rettestdata = str.replace((variablenamename + "[" + (bulkreti + 1) + "]"), variabletext[bulkreti]);
                                        stepdata[reti].testdata = String(rettestdata)
                                        //console.log("New Testdata ::: ", stepdata[reti].testdata);
                                        cflag++
                                        //     //console.log("inside if cflag", cflag)
                                    } else {
                                        break;
                                    }

                                }
                            }
                            retdata = "";
                            //console.log(testdata, "testdata", cflag)

                            //console.log("inserted successfully");
                            global.status = "Pass"
                            global.eventStatus = "success";
                            global.msg = "The '" + variablenamename + "' was successfully retrieved from the '" + fieldname + "' in the page ' " + screenname + "' ";

                        } else {
                            //console.log("Fail")
                            global.status = "Fail"
                            global.eventStatus = "fail";
                            global.msg = "Unable to retrieve the '" + variablenamename + "' from the '" + fieldname + "' in the page ' " + screenname
                        }
                    } catch (err) {
                        //console.log("Fail")
                        global.status = "Fail"
                        global.eventStatus = "fail";
                        global.msg = "Unable to retrieve the '" + variablenamename + "' from the '" + fieldname + "' in the page ' " + screenname
                    }
                    break;


                case "fileuploader":
                    await t.setFilesToUpload(selectorval, [testdata]).then(function (passmsg) {
                        global.status = "Pass"
                        global.eventStatus = "success";
                        global.msg = "The file '" + testdata + "' was successfully uploaded in the'" + screenname + "' page";
                    }, function (failmsg) {
                        global.status = "Fail"
                        global.msg = "Unable to upload the '" + testdata + "' in the '" + screenname + "' page. SYSTEM ERROR: " + failmsg;
                        global.eventStatus = "fail";
                    });
                    d = await delay();
                    break;


                case "isdisabled":
                    try {
                        var selecpro = await Selector(selectorval)
                        var selecheck = await selecpro();
                        //console.log(selecheck, "selecheck")
                        var checkdisable = await Selector(selecheck).hasAttribute('disabled');
                        var checkreadonly = await Selector(selecheck).hasAttribute('readonly');
                        var checkariareaonly = await Selector(selecheck).hasAttribute('aria-readonly');

                        //console.log("Properties", checkdisable, "2 nd prop 2222222", checkreadonly, checkariareaonly)
                        if (checkdisable || checkreadonly || checkariareaonly) {
                            global.status = "Pass"
                            global.msg = "The Field '" + fieldname + "' is disabled in the page '" + screenname + "' as expected.";
                            global.eventStatus = "success";
                            //break;
                        } else {
                            global.status = "Fail"
                            global.msg = "ERROR: The Field '" + fieldname + "' is not disabled in the page '" + screenname + "' as expected. System Error: " + err;
                            global.eventStatus = "fail";
                        }
                    } catch (err) {
                        global.status = "Fail"
                        global.msg = "ERROR: The Field '" + fieldname + "' is not disabled in the page '" + screenname + "' as expected. System Error: " + err;
                        global.eventStatus = "fail";
                        //break;
                    }
                    d = await delay();
                    break;




                default:
                    global.status = "Fail"
                    global.msg = "Incorrect Keyword. Please check the test case";
                    break;
            }


            //Switching to window from iframe
            if (iframestatus == true) {
                await t.switchToMainWindow()
                iframestatus = false
                //console.log(iframestatus , "iframestatus")
            }
            // End of Iframe Switching


            // Screenshot section
            //console.log(global.status + "   " + global.msg);
            status = global.status;
            errdetails = global.msg;
            exedatetime = new Date();
            //p = await pageLoadCheck();
            // //console.log('Calling pageload check', p)
            // global.eventStatus = p;
            // //console.log('from pageload check', global.eventStatus)
            // d = await delay();

            if ((keyword == 'pdf') || (keyword == 'email') || (fieldtype == 'file')) {
                var noimage = true
            } else {
                noimage = false
            }
            if (noimage == false) {
                // await t.takeScreenshot(imgname).then(async function(res){
                //     //console.log("inside Take Screenshot");
                //   await  sendtramdata(status, errdetails, exedatetime, stepdata[i], imgname);
                // });
                screenshot({ filename: folderpath })
                noimage = "";
            }
            else {
                sendtramdata(status, errdetails, exedatetime, stepdata[i], imgname);
            }





            /* // Holding next Step 
                if ((global.status == "Fail") && (keyword == "input")) {
                    try {
                        //console.log("Printing I", i)
                        sendtramdata(status, errdetails, exedatetime, stepdata[i], imgname);
                        
                        var step_fail = i + 1
                        //console.log("Total length", stepdata.length)
                        for (var kl = i + 1; kl < stepdata.length; kl++) {
                            var nexttcname = stepdata[kl + 1].name;
                            //console.log(testcasename, "testcase");
                            //console.log(nexttcname, "next testcase");
                            //console.log("I is ", i, "Kl is ", kl)
                            if (testcasename == nexttcname) {
                                //console.log("Same test case")
                                //console.log("On hold due to step failed @ " + step_fail)
                                var errdetails_1 = "On hold due to step failed @ " + step_fail;


                                
                                await t.wait(2000);
                                sendtramdata("Hold", errdetails_1, exedatetime, stepdata[kl], imgname);
                                i = kl

                            } else {
                                sendtramdata("Hold", errdetails_1, exedatetime, stepdata[kl], imgname);
                                //console.log("Different test case")
                                i = kl

                                break;
                            }

                        }

                    } catch (err) {
                        //console.log("End of last test case", err);
                        sendtramdata("Hold", errdetails_1, exedatetime, stepdata[kl], imgname);
                        //console.log("End of last test case");


                    }

                }



            // Sending Data to Tram
                if ((global.status != "Fail") && ((keyword == "input"))) {
                        //console.log("Input and not equal to Fail")
                    sendtramdata(status, errdetails, exedatetime, stepdata[i], imgname);
                } else if(keyword != "input"){
                    //console.log("Not equal to Input")
                    sendtramdata(status, errdetails, exedatetime, stepdata[i], imgname);
                } */


        } // Else cond for step skip
    } // end of main for
    step_skip = ""; idstatus = ""; butidstatus = "";
});