		
		var moment=require('moment')
		var fs = require('fs');
		var wd = require('wd')
		var http = require("http");
		var io = require('socket.io-client') //creating a client socket to connect to aqua server
        var Controller = require('appium-controller')
        var mysql = require('mssql')
        //var Jimp = require('jimp');// for image crop
        //var BlinkDiff=require('blink-diff')//for image comparision

        /*  var server = http.createServer(function(request, response) {
		 console.log(request);
		 console.log(response)
		 }); */

				//var iop = require('socket.io')(server); 
				
		var args = process;
		var splitcmd = args.title.split(' ')
	
		console.log(splitcmd,'starting...............')
		var jsonname=splitcmd[splitcmd.length - 1]
			console.log(jsonname)
		var sockno = splitcmd[splitcmd.length - 2]
			console.log(sockno)

			//  var socket = io.connect('http://localhost:'+port);
			 
			 /******************ZMQ******************/

	var zmq = require('zmq')
//console.log(zmq, "zmq")
	var dealer = zmq.socket('dealer');
//	console.log(dealer, "dwealer print")
	//dealer.identity = 'Bot1'
	dealer.data = 'datainside'




console.log("automation on port-" + sockno)
dealer.connect('tcp://localhost:' + sockno);


// Register to monitoring events
dealer.on('connect', function(fd, ep) {
    console.log('connect, endpoint:', ep);
});
dealer.on('connect_delay', function(fd, ep) {
    console.log('connect_delay, endpoint:', ep);
});
dealer.on('connect_retry', function(fd, ep) {
    console.log('connect_retry, endpoint:', ep);
});
dealer.on('listen', function(fd, ep) {
    console.log('listen, endpoint:', ep);
});
dealer.on('bind_error', function(fd, ep) {
    console.log('bind_error, endpoint:', ep);
});
dealer.on('accept', function(fd, ep) {
    console.log('accept, endpoint:', ep);
});
dealer.on('accept_error', function(fd, ep) {
    console.log('accept_error, endpoint:', ep);
});
dealer.on('close', function(fd, ep) {
    console.log('close, endpoint:', ep);
});
dealer.on('close_error', function(fd, ep) {
    console.log('close_error, endpoint:', ep);
});
dealer.on('disconnect', function(fd, ep) {
    console.log('disconnect, endpoint:', ep);
});

// Handle monitor error
dealer.on('monitor_error', function(err) {
    console.log('Error in monitoring: %s, will restart monitoring in 5 seconds', err);
    setTimeout(function() {
        dealer.monitor(500, 0);
    }, 5000);
});

// Call monitor, check for events every 500ms and get all available events.
console.log('Start monitoring...');
dealer.monitor(500, 0);

dealer.on('message', function(msg) {


})





/**********end********************/


			
      //var us = require('underscore')
		var stepno, stepdescription, expected, Hop, screenname, imgname, fieldname, type, keyword, selectorval;
		var testdata, brdreference, application, automatable, errdetails, status, exedatetime;
		var mainid='android.support.v4.widget.DrawerLayout'

		global.status = "";
	    global.msg = "";
        global.eventStatus="";
		var currentpath = __dirname;
		var datajsonpath = currentpath + '/'+ jsonname +'.json'
		//var datajsonpath = currentpath + '/preseller1.json'
		var rawdatafromfile = fs.readFileSync(datajsonpath,"utf8");
		rawdatafromfile.toString()
		rawdatafromfile = rawdatafromfile.trim()
		var scriptdetails = JSON.parse(rawdatafromfile);
		var stepdata = scriptdetails.scriptstep;
		var argodata=scriptdetails.argodata
		var socket_no=argodata.driver.port
		console.log( argodata)
		var appconfig=argodata.desiredCapabilities.app.split('/')
		console.log(appconfig)
		var crypto = require('crypto');
		var d;
		var date = new Date().toString();
		date = date.replace(/ /g, "-")
		date = date.replace(/:/g, "-")
		console.log(date)
		//console.log(stepdata)
    //  appiumController.startAppium( )
		//console.log(argodata)

		/*browserName:'chrome', 
		androidPackage:"com.android.chrome",
		browserConnectionEnabled:true,
		mobileEmulationEnabled:true,
		chromeOptions: {
        'androidPackage': 'com.android.chrome',
       }*/
		var  desiredCapabilities = {
		platformName: argodata.desiredCapabilities.platformName,
		platformVersion: argodata.desiredCapabilities.platformVersion,
		deviceName:  argodata.desiredCapabilities.deviceName,
		automationName: argodata.desiredCapabilities.automationName,		
		autoGrantPermissions:argodata.desiredCapabilities.autoGrantPermissions,
		appPackage:appconfig[0],
		uid: argodata.desiredCapabilities.uid,
		appActivity:appconfig[1],
		// appWaitActivity:'com.ivy.cpg.view.login.LoginScreen,com.ivy.sd.png.view.ScreenActivationActivity,com.ivy.sd.png.view.DummyLaunchActivity,com.ivy.sd.png.view.InitiativeActivity',
		//	  appActivity: 'com.ivy.sd.png.view.ScreenActivationActivity',
		// app: currentpath + "/ivycpg_v128_1515.apk",
		//useNewWDA: argodata.desiredCapabilities.useNewWDA,
		noReset: argodata.desiredCapabilities.noReset
		//appPackage:"com.msf.currenex.mobile",
		//appActivity:"com.msf.currenex.mobile.login.LoginActivity"
		}
        var driver = wd.promiseChainRemote({
          host: argodata.driver.host,
          port: argodata.driver.port          
        })

/*socket_call(socket_no);

function socket_call(socket_no) {
    var serv_status =  server.listen(socket_no)
    console.log("trying to establish conn on port--"+socket_no) 
  if (serv_status.listening) {
  console.log("socket_no running on "+socket_no)
}}


iop.on('connection', function(socketp) {
console.log(socketp)

socketp.on('mob-exeres', function(data) {
console.log(data)

        tempobj.scriptstep = []
        scriptdetails.scriptstep[global.cflag].executiondate = errexedatetime
        scriptdetails.scriptstep[global.cflag].status = "broke";
        scriptdetails.scriptstep[global.cflag].actual = "script failure";
        tempobj.currobj = scriptdetails.scriptstep[global.cflag]
        socket.emit('auto-exeres', tempobj)

});

});*/
       // console.log(eval("select * from Appdata_GRN_Detail where GD_GH_Id='"+Currentdate()+"'"))
          // console.log(driver,"68")
		function getImageData(val) {
			var readStream = fs.createReadStream(val);
			var hash = crypto.createHash('sha1')
			global.array = [];
			readStream.on('data', function(chunk) {
				//hash.update(chunk)
				global.array.push(chunk)
			  })
			  .on('end', function(chunk) {
				global.dateobj;
				global.dateobj = Buffer.concat(global.array).toString('base64')
				//global.dateobj.newdate=new Date();
				//console.log(global.dateobj)

				console.log(hash.digest('hex'), "41");
			  })
			  return global.dateobj
		}
		function delay() {
    // `delay` returns a promise
        return new Promise(function(resolve, reject) {
        console.log("inside  delay functions promise");
        console.log("the global eventStatus is: "+global.eventStatus)
        let e = global.eventStatus;
        global.eventStatus = "";
        if (e == "success") {
            resolve(e);
        }
        if (e == "fail") {
            console.log("Enter Fail Text")
            resolve(e);
        }
        console.log("End of Delay function");
    });
    }
        function sendtramdata(stepval,ind,status,errdetails,exedatetime,image ){
		//function sendtramdata(status, errdetails, exedatetime, stepdata, imgname) {
			console.log("sending data to tram......")
			//getImageData(foldername + "/" + imgname)
			// console.log(global.dateobj)
			/*
			  console.log(global.dateobj)*/
			var tempobj = {
			  "tindetails": scriptdetails.tindetails,
			  "username": scriptdetails.username,
			  "insindex": scriptdetails.insindex,
			  "argodata": scriptdetails.argodata,
			
			}
			//var tempobj={}
			tempobj.scriptstep = []
			stepval.browser = "chrome";
			stepval.executiondate = exedatetime
			stepval.screenshot =image
			stepval.status = status;
			stepval.actual = errdetails;
			tempobj.scriptstep.push(stepval)
			tempobj.currobj = stepval
			//console.log(tempobj,"80")
		//	console.log("stepval.screenshot", stepval.screenshot , " endiiinggggggggggggggggggggg")
			if(ind==stepdata.length-1)
			{
				console.log("Appium Stop")
				var auto_json = JSON.stringify(tempobj)
				dealer.send(auto_json);
				dealer.close();

			//	socket.emit('auto-exeres', tempobj)
				Controller.stopAppium({port:argodata.driver.port});

			} else {
				console.log("Result has been emitted to agent")
			//	socket.emit('auto-exeres', tempobj)
			var auto_json = JSON.stringify(tempobj)
				dealer.send(auto_json);
			//	dealer.close();
			}
		 	
			//console.log(tempobj,"-------------------------")
		}


		//==============================================================================
//function block
//------------------------------------------------------------------------------
//Function for ensuring that the test cafe script continues and does not end abruptly
function delay() {
    // `delay` returns a promise
    return new Promise(function(resolve, reject) {
        console.log("inside  delay functions promise");
        console.log("the global eventstatus is: "+global.eventStatus)
        let e = global.eventStatus;
        global.eventStatus = "";
        if (e == "success") {
            resolve(e);
        }
        if (e == "fail") {
            console.log("Enter Fail Text")
            resolve(e);
        }
        console.log("End of Delay function");
    });
}

function scrollToView(start,direction,distance){
	// Start is the starting point - object with properties x and y - absolute position
	// direction is string with values up or down for vertical scroll; left or right for horizontal scroll
	// distance is object with properties x and y - must give the distance to be moved in x axis and in y axis
	// target location will be calculated by subtracting distance from start point if upward movement and by addition if downward movement

	console.log("start",start, "direction",direction, "distance", distance)
	if (direction == "up"){
		var target = parseInt(start.y) - parseInt(distance.y)
		var action = new wd.TouchAction(driver);
		action.press(start);
		action.wait(2000)
		action.moveTo({x: start.x, y: target});
		action.release().perform();


	}

	else if (direction == "down"){

		var target = parseInt(start.y) + parseInt(distance.y)
		var action = new wd.TouchAction(driver);
		action.press(start);
		action.wait(2000)
		action.moveTo({x: start.x, y: target});
		action.release().perform();
		

	}
	else if (direction == "left"){

		var target = parseInt(start.x) - parseInt(distance.x)
		var action = new wd.TouchAction(driver);
		action.press(start);
		action.wait(2000)
		action.moveTo({x: target, y: start.y});
		action.release().perform();

	}

	else if (direction == "right"){

		var target = parseInt(start.x) + parseInt(distance.x)
		var action = new wd.TouchAction(driver);
		action.press(start);
		action.wait(2000)
		action.moveTo({x: target, y: start.y});
		action.release().perform();

	}

}


async function scrollToFindCombolist(selector_type,selector_val,testdata,direc,mode){
	var temp1;var temp2="";var flag=false;
						 	do{
						 		temp1=temp2;
						 		console.log(temp1,temp2,selector_val)						 		
						 		var finddata=await driver.elementOrNull('xpath',selector_val+"[@text='" + testdata + "']")
						 		if(finddata==null)
						 		{
						 			    await driver.setImplicitWaitTimeout(8000)
						 			    var selector2=await driver.elements(selector_type,selector_val)			
						 		        var gettext=await selector2[selector2.length-1].text()
						 		        console.log(selector2.length,gettext)
                                        temp2=gettext;
						 		    	var start=await selector2[selector2.length-1].getLocation()
						 		    	var direction=direc
						 		    	var distance=await selector2[0].getLocation()
						 		    	if(direction=='up'){
						 		    	distance.x=start.x-distance.x
						 		    	distance.y=start.y-distance.y+10
						 		    	console.log(distance,start)
						 		    	scrollToView(start,direction,distance)

						 		    	}else if(direction=='down'){
                                        console.log(start,distance)
						 		    	start.x=start.x-distance.x
						 		    	start.y=start.y-distance.y
						 		    	console.log(start,distance)
						 		    	scrollToView(distance,direction,start)	
						 		    	}
						 		    											
						 		}else {console.log("found")						 		      
						 			if(mode=='click'){
						 		    	flag=true;
						 		    	await driver.clickElement(finddata)						 		    		
						 		    	}else if(mode=='verify'){
						 		    	 flag=true;
						 		    	 global.status = "Pass";global.eventStatus="success"
								         global.msg = "The button '" + fieldname + "' on the page '" + screenname + "' was successfully clicked";
									}
									break;
						 		}
						 		
						 	}while(temp1!=temp2)

						 	return flag;					 	

}
async function scrollToFindElement(selector_type,selector_val,testdata,direc,mode)
{
	console.log("scrollToFindElement function")
	var temp1;var temp2="";var flag=false;
	var finddata;var s_type;var s_val;
	        if(selector_type=='id'){
	             s_type='xpath' 
	             s_val="//android.widget.TextView[@text='"+testdata+"']"
	         }else {
	         	s_type=selector_type;
	         	s_val=selector_val
	         }
						 		              
						 	do{
						 		temp1=temp2;
						 		console.log(temp1,temp2,selector_val)		
						 		finddata=	await driver.elementOrNull(s_type,s_val)		 		
						 		
						 		if(finddata==null)
						 		{
						 			    await driver.setImplicitWaitTimeout(4000)
						 			    var selector2;

						 			    selector_type=='xpath' ? selector2=await driver.elements('xpath', "//android.widget.TextView")
						 		                       : selector2=await driver.elements(selector_type,"[@class=android.widget.EditText]");
						 		                   //await driver.elements(selector_type,selector_val)	

						 		        /*for(var j=0;j<selector2;j++){
						 		          	console.log(await selector2[j].text())
						 		         }   */ 
						 		         console.log()     		
						 		        var gettext=await selector2[selector2.length-1].text()
						 		        console.log(selector2.length,gettext)
                                        temp2=gettext;
						 		    	var start=await selector2[selector2.length-1].getLocation()
						 		    	var direction=direc
						 		    	var distance=await selector2[0].getLocation()
						 		    	console.log(start,distance)
						 		    	if(direction=='up'){
						 		    	distance.x=start.x-distance.x
						 		    	distance.y=start.y-distance.y
						 		    	console.log(start,distance)
						 		    	scrollToView(start,direction,distance)

						 		    	}else if(direction=='down'){
						 		    	console.log(start,distance)
						 		    	start.x=start.x-distance.x
						 		    	start.y=(start.y-distance.y)-10
						 		    	console.log(start,distance)
						 		    	scrollToView(distance,direction,start)						 		    		
                                        
						 		    	}
						 		    											
						 		}else {console.log("found")						 		      
						 			if(mode=='click'){
						 		    	flag=true;
						 		    	await driver.clickElement(finddata)						 		    		
						 		    	}else if(mode=='verify'){
						 		    	 flag=true;
						 		    	 
									}
									break;
						 		}
						 		
						 	}while(temp1!=temp2)

						 	return flag;					 	
}


async function scrollTotextboxElement(selector_type,selector_val,testdata,direc,mode)
{
	console.log("scrollTotextboxElement function")
	console.log(selector_type,selector_val, direc, mode )
	var temp1;var temp2="";var flag=false;
	var finddata;var s_type;var s_val;
	       
						 		              
						 	do{
						 		temp1=temp2;
						 		console.log(temp1,temp2,selector_val)		
						 		finddata=	await driver.elementOrNull(selector_type,selector_val)		 		
						 		
						 		if(finddata==null)
						 		{
						 			    await driver.setImplicitWaitTimeout(4000)
						 			    var selector2;

						 			    selector2=await driver.elements('xpath', "//android.widget.Button")
						 		                     
						 		                   //await driver.elements(selector_type,selector_val)	

						 		        /*for(var j=0;j<selector2;j++){
						 		          	console.log(await selector2[j].text())
						 		         }   */ 
						 		         console.log("INside if condn", selector2 )     		
						 		        var gettext=await selector2[selector2.length-1].text()
						 		        console.log(selector2.length,gettext)
                                        temp2=gettext;
						 		    	var start=await selector2[selector2.length-1].getLocation()
						 		    	var direction=direc
						 		    	var distance=await selector2[0].getLocation()
						 		    	console.log(start,distance)
						 		    	if(direction=='up'){
						 		    	distance.x=start.x-distance.x
						 		    	distance.y=start.y-distance.y
						 		    	console.log(start,distance)
						 		    	scrollToView(start,direction,distance)

						 		    	}else if(direction=='down'){
						 		    	console.log(start,distance)
						 		    	start.x=start.x-distance.x
						 		    	start.y=(start.y-distance.y)-10
						 		    	console.log(start,distance)
						 		    	scrollToView(distance,direction,start)						 		    		
                                        
						 		    	}
						 		    											
						 		}else {console.log("found")						 		      
						 			if(mode=='click'){
						 		    	flag=true;
						 		    	await driver.clickElement(finddata)						 		    		
						 		    	}else if(mode=='verify'){
											 console.log("Mode as Verify")
											 e1 = await driver.elementOrNull(selector_type,selector_val)
										
						 		    	 flag=true;
						 		    	 
									}
									break;
						 		}
						 		
						 	}while(temp1!=temp2)

						 	return flag;					 	
}


async function tester(){
          console.log(stepdata.length,"ENterrrrr")
		  for (var i=0;i<stepdata.length;i++){
		  	 //var path1 = "C:cd/appium/screens/log" + i.toString()
		     //console.log(path1)
                console.log(stepdata[i].hasOwnProperty('xpath'),stepdata[i].hasOwnProperty('css'),"363")
							
			// if(stepdata[i].xpath.toLowerCase() != 'x')
			if ((stepdata[i].hasOwnProperty('xpath'))&&(stepdata[i].xpath != 'x')) 
				{
					console.log("xpath")
					await test(stepdata[i],i,"xpath",stepdata[i].xpath).then(console.log(i,stepdata[i]))
					if(i < stepdata.length-1 )
					{
					var ss1;
						//if( (type=='image-capture' && stepdata[i].keyword=='verify'))
						//{
                         // var img_name= stepdata[i].testdata.split(',')
                         //  ss1=await getImageData('mobile_pic' + "/" +img_name[2]+".png")
                          // console.log("image-captured")
					//	}
					//	else  if(stepdata[i].screenname!=stepdata[i+1].screenname ||stepdata[i].keyword=='verify')
						// {
							  ss1=await driver.takeScreenshot();console.log("Screenshotttttttttt")				              
				        // }
					} else
					{
						var ss1=await driver.takeScreenshot();console.log("Screenshotttttttttt")
		                
					}
						console.log(global.status + "   " + global.msg);
						status = global.status;  errdetails = global.msg;  exedatetime = new Date();


				}//else if(stepdata[i].css.toLowerCase() != 'x')
				else if ((stepdata[i].hasOwnProperty('css'))&&(stepdata[i].css != 'x'))
						{ 
							console.log("selector")
							await test(stepdata[i],i,"id",stepdata[i].css).then(console.log(i,stepdata[i]))
							if(i < stepdata.length-1 ){
					    var ss1;
					   // if( (stepdata[i].type=='image-capture' && stepdata[i].keyword=='verify')){
                         // var img_name= stepdata[i].testdata.split(',')

                          // ss1=await getImageData('mobile_pic' + "/" +img_name[2]+".png")
                         //  console.log(ss1,"image-capture")
					 //   }else  if(stepdata[i].screenname!=stepdata[i+1].screenname || stepdata[i].keyword=='verify') {
							  ss1=await driver.takeScreenshot();console.log("Screenshotttttttttt")				              
				           //    }
				        } else{
						var ss1=await driver.takeScreenshot();console.log("Screenshotttttttttt")
		                
						}
						console.log(global.status + "   " + global.msg);
						status = global.status;  errdetails = global.msg;  exedatetime = new Date();

		                    
						}

		     await sendtramdata(stepdata[i],i,status,errdetails,exedatetime,ss1)
			}
		  //driver.safeExecuteAsync(function(){
			return "Tests have been run"
		}

 driver.init(desiredCapabilities)
      .then(function(){
		
        console.log("Before Starting Mobile Automation");
        var exemesg = {status:"testcafe started"}
        //var exemesg_auto_json=JSON.stringify(exemesg)
			//  socket.emit('auto-exeres', exemesg)
			var exemesg_auto_json = JSON.stringify(exemesg);

			dealer.send(exemesg_auto_json);
	
		tester()
        })


async function test(val,i,selector_type,selector_val){
			console.log("Inside test function with item ",i)

			global.status = "";
			global.msg = "";
            global.eventStatus="";
			stepno = val.stepno;
			stepdescription = val.stepdescription;
			expected = val.expected;
			// Not available in the merged JSON --- Hop = val.Hop;
			screenname = val.screenname;
			imgname = val.screenname + ".png"
			fieldname = val.fieldname;
			type = val.type.toLowerCase();
			keyword = val.keyword.toLowerCase();
			//selectorval = val.css;
			testdata = val.testdata;
		//	xpath = val.xpath
			id = selector_val
			selectorval = selector_val;

                if (testdata.substring(0, 1) == "^") {    
	        		console.log(testdata, "Data before convert",testdata.substring(1))            
	                testdata = eval(testdata.substring(1))
	                //testdata = eval(testdata.substring(testdata.indexOf("^")+1))
	               // testdata = stepdata
	                console.log(testdata, "Data after convert")
		        }
		        if (selector_val.substring(0, 1) == "^") {                
		                console.log(selector_val, "Selector before convert")
		                selector_val = eval(selector_val.substring(1))
		                console.log(selector_val, "Selector after convert")
		                selectorval = selector_val;
		                //testdata = eval(testdata.substring(testdata.indexOf("^")+1))
		        }
			//console.log(id)
			
			// Not available in the merged JSON ---brdreference = val.brdreference;
			// Not available in the merged JSON ---application = val.application;
			// Not available in the merged JSON ---automatable = val.automatable;
			//errdetails;
			//status;
			//exedatetime;

			console.log("stepno:" + stepno + "  screenname" + screenname + "  fieldname:" + fieldname + "   type: " + type + "  keyword: " + keyword);
			console.log("testdata: " + testdata + "   selectorval: " + selectorval);
console.log(await driver.getCurrentActivity(),"Appium current activity")
await driver.setImplicitWaitTimeout(10000)
switch (keyword)
{
		case "input":
				switch (type)
				 {
				 	case "url":
				 	//await driver.window("handle");

				 	await driver.get('http://appium.io')

				 	console.log("Naviagte into url")

				 	break;
				 	case "toggle":
				 	console.log("Eter into toggle")
				 	driver.executeScript("mobile: shell", 'adb shell settings get global airplane_mode_on');
				 	//driver.setConnection(Connection.AIRPLANE);


				 	//await driver.setNetworkConnection(0)//toggleAirplaneMode();
				 	

				 	break;
				 	
		
					 case "combobox":
					 //e1 = await driver.elementOrNull(selector_type,selector_val)
					 var find_el=await driver.elementOrNull(selector_type,selector_val)
					 if (!find_el ){
						 console.log("Not found sec")
					 global.status = "Fail";global.eventStatus="fail"
					 global.msg = "The element'" + fieldname + "' on the page '" + screenname + "' was not successfully selected from the dropdown";
					 } else {
						console.log("Found section from scroll")
					 //var c_option=await e1.getAttribute('className')
					  //await driver.click(selector_type,selector_val)
					  await driver.setImplicitWaitTimeout(Number('5'))
					 e1 = await driver.element(selector_type,selector_val)
					 await driver.clickElement(e1)
					 if(await driver.elementOrNull('xpath','//android.widget.TextView')){
					 console.log("Enter into textview")
					 var d1=await scrollToFindCombolist('xpath',"//android.widget.TextView",testdata,'down','click')

					 if(d1){																
					 global.status = "Pass";global.eventStatus="success"
					 global.msg = "The '" + testdata + "' was successfully selected from the dropdown '" + fieldname + "' in the page ' " + screenname + "' ";
					 }else{	
					 var d2=await scrollToFindCombolist('xpath',"//android.widget.TextView",testdata,'up','click')	
					 if(d2)	{
					 global.status = "Pass";global.eventStatus="success"
					 global.msg = "The '" + testdata + "' was successfully selected from the dropdown '" + fieldname + "' in the page ' " + screenname + "' ";

					 } else {
					 global.status = "Fail";global.eventStatus="fail"
					 global.msg = "The '" + testdata + "' was not successfully selected from the dropdown '" + fieldname + "' in the page ' " + screenname + "' ";

					 }	
					 }	
					 }else if(await driver.elementOrNull('xpath','//android.widget.CheckedTextView')){
						 console.log("enter into checkedtextview")
					 var d1=await scrollToFindCombolist('xpath',"//android.widget.CheckedTextView",testdata,'down','click')
					 if(d1){									
					 global.status = "Pass";global.eventStatus="success"
					 global.msg = "The '" + testdata + "' was successfully selected from the dropdown '" + fieldname + "' in the page ' " + screenname + "' ";
					 }else{	
					 var d2=	await scrollToFindCombolist('xpath',"//android.widget.CheckedTextView",testdata,'up','click')	
					 if(d2)	{
					 global.status = "Pass";global.eventStatus="success"
					 global.msg = "The '" + testdata + "' was successfully selected from the dropdown '" + fieldname + "' in the page ' " + screenname + "' ";

					 } else {
					 global.status = "Fail";global.eventStatus="fail"
					 global.msg = "The '" + testdata + "' was not successfully selected from the dropdown '" + fieldname + "' in the page ' " + screenname + "' ";

					 }	
					 }
					 }												                                           
					 }
					d=await delay()
		 break;	
 	
                    case "button":
							console.log(selectorval)
							console.log("inside the button keyword")
							//waitFor(wd.asserters.isDisplayed(fieldname),2000,function(err,el){
							//	console.log(el)
							//})
							e1 = await driver.elementOrNull(selector_type,selector_val)
							//await driver.setImplicitWaitTimeout(15000)
							if (e1 === null){
							console.log(fieldname," not found...waiting for 10 seconds")							
							e1 = await driver.elementOrNull(selector_type,selector_val)
							//await driver.setImplicitWaitTimeout(15000)
							if (e1 === null){
							//e2 = await driver.active();//console.log(e2)
							global.status = "Fail";global.eventStatus="fail"
							global.msg = "ERROR: Unable to click the button'" + fieldname + "' in the ' " + screenname + "' page. " ;
							}else{
							//console.log(await driver.getAttribute(e1,'resourceId')	)
							console.log(e1, "e1");
							await driver.clickElement(e1)
							global.status = "Pass";global.eventStatus="success"
							global.msg = "The button '" + fieldname + "' on the page '" + screenname + "' was successfully clicked";
							}
							}
							else{
								console.log(e1, "e1");
							console.log(fieldname," found... going to click it...")
							//console.log(await driver.getAttribute(e1,'resourceId'))

							await driver.clickElement(e1)							
							global.status = "Pass";global.eventStatus="success"
							global.msg = "The button '" + fieldname + "' on the page '" + screenname + "' was successfully clicked";
							}
					d=await delay()
					break;
							
					case "back-screen":
							//console.log(selectorval)
							console.log("inside the back keyword")
						    e1= await driver.back();							
							if (e1 === null){
										global.status = "Fail";global.eventStatus="fail"
										global.msg = "ERROR: Unable to enter the details '" + fieldname + "' in the ' " + screenname + "' page.  " ;
									}
									else{
										global.status = "Pass";global.eventStatus="success"
									    global.msg = "The element'" + fieldname + "' on the page '" + screenname + "' was successfully entered";
									}
								 d=await delay()
					break;
					
					case "textbox":
							//console.log(selectorval)
							console.log("inside the textbox keyword",testdata)

							e1 = await driver.elementOrNull(selector_type,selector_val)
							console.log(e1, "textbox checking")
								if (e1 === null){
									console.log(fieldname," not found...waiting for 10 seconds")	
									var d1=await scrollTotextboxElement(selector_type,selector_val,testdata,'up','verify')								
									
									//await driver.setImplicitWaitTimeout(10000)
									if(d1){ 
										await e1.clear();
										await driver.type(e1,testdata)
										await driver.hideDeviceKeyboard();										
										global.status = "Pass";global.eventStatus="success"
										global.msg = "The testdata'" + testdata + "in the field" + fieldname + "' on the page '" + screenname + "' was successfully entered";
									} else {
									    global.status = "Fail";global.eventStatus="fail"
										global.msg = "ERROR: Unable to enter the details '" + testdata + "' in the field' "+ fieldname + 'in the ' + screenname + "' page." ;
									    }	

								}else{
									console.log(fieldname," found .. going to type text into it")
									await e1.clear();
									await driver.type(e1,testdata)	
									await driver.hideDeviceKeyboard();								
									global.status = "Pass";global.eventStatus="success"
									global.msg = "The testdata'" + testdata + "in the field" + fieldname + "' on the page '" + screenname + "' was successfully entered";
								}

							//e1 = driver.elementIfExists(selector_type,fieldname)

                            d=await delay()
					break;	
				 	default:
                    global.status = "Fail";
					global.msg = "Fail:Incorrect Type '"+type+"' in Input keyword.Please check...";								
				 	break;

				  }
		break;
	
		case "verify":
				switch (type)
				 {  
				
				 	case "tabletext":
				 	          var tdata=testdata.split(/>>(.*)/);
						       e1= await driver.elementOrNull('xpath',"//android.widget.TextView[@text='"+ tdata[0]+"']")
						       console.log(e1)
						       if(e1!=null)
						       {
                                  var flag1=false;						                
						           var selector3 = await driver.elements("xpath","//*[@text='"+ tdata[0]+"']/following-sibling::"+selectorval)
						           console.log(selector3.length)
						           if(selector3.length==0){
						                 	global.status = "Fail";global.eventStatus="fail"
								             global.msg = "The element '" + txt + "' on the page '" + screenname + "' was successfully not verified against the expected value '" + tdata[1] + "'";
						           }
						           for(var ins in selector3)	{

						        	  var txt;
						        	  txt= tdata[1].substring(0,1)=='#' ? await driver.getAttribute(selector3[ins],'resourceId') : await selector3[ins].text() ;
						        	  var datas=tdata[1].substring(0,1)=='#' ? tdata[1].substring(1) : tdata[1];

						        	  if(txt==datas )	  { 	flag1=true;console.log("success: ",txt)     	  }
						        	  if(ins==selector3.length-1)	  {
						        	  	if(flag1){
                                            global.status = "Pass";global.eventStatus="success"
								            global.msg = "The element '" + txt + "' on the page '" + screenname + "' was successfully verified sucessfully against the expected value '" + tdata[1] + "'";
						 		    	}else{
	                                        global.status = "Fail";global.eventStatus="fail"
								            global.msg = "The element '" + txt + "' on the page '" + screenname + "' was successfully not verified against the expected value '" + tdata[1] + "'";
						        	  	}
						        	  }
						        	}
                                }else {
						          
						       	  //var arr=await driver.elements(selector_type,selector_val)
						       	 //  console.log("ENterrrrr",arr.length)
									var d2=await scrollToFindElement('xpath',"//android.widget.TextView[@text='"+tdata[0]+"']",tdata[0],'up','verify')
									 console.log('d2', d2)
						       	if(d2) 	{
                                   console.log("//*[@text='"+ tdata[0]+"']/following-sibling::"+selectorval)
                                   var flag1=false;						                
						           var selector3 = await driver.elements("xpath","//*[@text='"+ tdata[0]+"']/following-sibling::"+selectorval)
						           console.log(selector3.length)
						           if(selector3.length==0){
						                 	global.status = "Fail";global.eventStatus="fail"
								             global.msg = "The element '" + txt + "' on the page '" + screenname + "' was successfully not verified against the expected value '" + tdata[1] + "'";
						           }
						           for(var ins in selector3)	{

						        	  var txt;
						        	  txt= tdata[1].substring(0,1)=='#' ? await driver.getAttribute(selector3[ins],'resourceId') : await selector3[ins].text() ;
						        	  var datas=tdata[1].substring(0,1)=='#' ? tdata[1].substring(1) : tdata[1];

						        	  if(txt==datas )	  { 	flag1=true;console.log("success: ",txt)     	  }
						        	  if(ins==selector3.length-1)	  {
						        	  	if(flag1){
                                            global.status = "Pass";global.eventStatus="success"
								            global.msg = "The element '" + txt + "' on the page '" + screenname + "' was successfully verified sucessfully against the expected value '" + tdata[1] + "'";
						 		    	}else{
	                                        global.status = "Fail";global.eventStatus="fail"
											global.msg = "The element '" + txt + "' on the page '" + screenname + "' was successfully not verified against the expected value '" + tdata[1] + "'";
						        	  	}
						        	  }
						        	}
						       	}else { 
                                           global.status = "Fail";global.eventStatus="fail"
										   global.msg = "The element '" + txt + "' on the page '" + screenname + "' was successfully not verified against the expected value '" + tdata[1] + "'";
						       	}						       						       	
						       }
						      // d=await delay();
					break;	
					
                    case "text":
						e1 = await driver.elementOrNull(selector_type,selector_val)
						//console.log(e1)
						if (e1 === null){
									console.log(fieldname," not found...waiting for 10 seconds")									
									e1 = await driver.elementOrNull(selector_type,selector_val)
									//await driver.setImplicitWaitTimeout(5000)
									if (e1 === null){
										global.status = "Fail";global.eventStatus="fail"
										global.msg = "ERROR: Unable to find the value '" + fieldname + "' in the ' " + screenname + "' page." ;
										//console.log(global.msg)										
									}	else{	
										var testdata = testdata.split(",")
										var txt = await driver.getAttribute(e1,'text')
											
										var txt1=txt.replace(/\s/g,""); 
										//var txt1=txt.replace(/^\s+|\s+$/g,' ');
									     var txt2= txt1.includes(testdata);
                                        
										console.log(txt2, "..after wait")
										//if (txt === testdata){
											if (txt2){
										global.status = "Pass";global.eventStatus="success"
										global.msg = "The element'" + fieldname + "' on the page '" + screenname + "' displays the expected value '" + testdata;
										//console.log(global.msg)
										}else{
										global.status = "Fail";global.eventStatus="fail"
										global.msg = "The element'" + fieldname + "' on the page '" + screenname + "' does not display the expected value '"+ testdata;
										}
									}
								}
						else{		
							var txt = await driver.getAttribute(e1,'text')
										//var txt1=txt.replace(/\s/g,"");
										var txt1=txt; 
								//var txt1=txt.replace(/^\s+|\s+$/g,' ');
								var txt2= txt1.includes(testdata);
							console.log(txt2, ".. no wait",txt1)
							if (txt2 ){
							console.log(txt2, " has passed...")
							global.status = "Pass";global.eventStatus="success"
							global.msg = "The element'" + fieldname + "' on the page '" + screenname + "' displays the correct value";
							}else{
							global.status = "Fail";global.eventStatus="fail"
							global.msg = "The element'" + fieldname + "' on the page '" + screenname + "' does  not display the correct value";
							}
						}

                    d=await delay()
					break;
					
                   
				 	default:
                    global.status = "Fail";
					global.msg = "Fail:Incorrect Type '"+type+"' in Verify keyword.Please check...";
				 	break;

				  }
		break;	
     
		case "isdisplayed":
		
		switch (type)
		{
			case "text":
					try
					   {
						   console.log("inside isdisplayed")
						   /*const iscroll = Selector(stepdata[i].selector)
						   await t.eval(() => scroll().scrollIntoView(), {dependencies: {iscroll}})*/
						   await driver.elementIfExists(selector_type,selector_val,function(err,el){
							 if (err){
								 console.log("Element was NOT found... ")
								 global.status = "Fail";global.eventStatus="fail"
								 global.msg = "ERROR: Unable to find the element '" + fieldname + "' in the ' " + screenname + "' page. SYSTEM ERROR: " + err;
							 }
							 else{
								 console.log("Element was found... ")
								global.status = "Pass";global.eventStatus="success"
							  global.msg = "The element '" + fieldname + "' on the page '" + screenname + "' was identified";
							 }
						   })
						   //console.log(stepdata[i].stepno,"isDisplayed",stepdata[i].expected)
						 
					   } catch(err)
						 {
						   //console.log(stepdata[i].stepno,"Fail",err.type);
						         console.log("Element was NOT found... ")
								 global.status = "Fail";global.eventStatus="fail"
								 global.msg = "ERROR: Unable to find the element '" + fieldname + "' in the ' " + screenname + "' page. SYSTEM ERROR: " + err;
							 
						  
						 }
		d=await delay()
		break;

		case "tabletext":
		
			var tdata=testdata.split(/>>(.*)/);
			
			var d2= await driver.elementOrNull('xpath',"//android.widget.TextView[@text='"+ tdata[0]+"']")
			if(d2)
			{
			console.log("//*[@text='"+ tdata[0]+"']/following-sibling::android.widget.TextView")
			var flag1=false;						                
			var selector3 = await driver.elements("xpath","//*[@text='"+ tdata[0]+"']/following-sibling::"+selectorval)
			console.log(selector3.length)
			if(selector3.length==0){
					  global.status = "Fail";global.eventStatus="fail"
					 global.msg = "The field '" + fieldname + "' on the page '" + screenname + "' was successfully not displayed";
			}
			for(var ins in selector3)
			 {
				 var txt=await selector3[ins].text()
			   if((txt!="")||(txt!=null)) 	  { 	flag1=true;console.log("success: ",txt)     	  }
			   if(ins==selector3.length-1)
			   {
				   if(flag1){
					 global.status = "Pass";global.eventStatus="success"
					 global.msg = "The element '" + txt + "' on the page '" + screenname + "' was successfully displayed";
				  }else{
					 global.status = "Fail";global.eventStatus="fail"
					 global.msg = "The field '" + fieldname + "' on the page '" + screenname + "' was successfully not displayed";
				  
				   }
			   }
			 }
			}else { 
				var scrollelm=await scrollToFindElement('xpath',"//android.widget.TextView[@text='"+tdata[0]+"']",tdata[0],'up','verify')
					if(scrollelm) {
						console.log("//*[@text='"+ tdata[0]+"']/following-sibling::android.widget.TextView")
			var flag1=false;						                
			var selector3 = await driver.elements("xpath","//*[@text='"+ tdata[0]+"']/following-sibling::"+selectorval)
			console.log(selector3.length)
			if(selector3.length==0){
					  global.status = "Fail";global.eventStatus="fail"
					 global.msg = "The field '" + fieldname + "' on the page '" + screenname + "' was successfully not displayed";
			}
			for(var ins in selector3)
			 {
				 var txt=await selector3[ins].text()
			   if((txt!="")||(txt!=null)) 	  { 	flag1=true;console.log("success: ",txt)     	  }
			   if(ins==selector3.length-1)
			   {
				   if(flag1){
					 global.status = "Pass";global.eventStatus="success"
					 global.msg = "The element '" + txt + "' on the page '" + screenname + "' was successfully displayed";
				  }else{
					 global.status = "Fail";global.eventStatus="fail"
					 global.msg = "The field '" + fieldname + "' on the page '" + screenname + "' was successfully not displayed";
				  
				   }
			   }
			 }
					} else { 
					global.status = "Fail";global.eventStatus="fail"
					global.msg = "The field '" + fieldname + "' on the page '" + screenname + "' was successfully not displayed";
			}	
		}					       						       	
		
	   // d=await delay();
break;

default:
global.status = "Fail";
global.msg = "Fail:Incorrect verify Type.Please check test step";
break;

}
break;

case "retrieve":
		
		switch (type)
		{
			case "text":
					
						   console.log("inside retrieve")
						   /*const iscroll = Selector(stepdata[i].selector)
						   await t.eval(() => scroll().scrollIntoView(), {dependencies: {iscroll}})*/
						   await driver.elementIfExists(selector_type,selector_val,function(err,el){
							if (e1 === null){
								global.status = "Fail";global.eventStatus="fail"
								global.msg = "ERROR: Unable to retrieve the value '" + fieldname + "' in the ' " + screenname + "' page." ;
								//console.log(global.msg)										
							}	else{	
								var txt =  driver.getAttribute(e1,'text')
								var retdata2 = testdata.split("||");
								var retdata = retdata2[1]
								retdata = txt;
								global.status = "Pass";global.eventStatus="success"
								global.msg = "The element '" + retdata + "' on the page '" + screenname + "' was successfully retrieved";

							}
						});
					  
		d=await delay()
		break;

		case "tabletext":


			var retdata2 = testdata.split("||");
			var retdata = retdata2[1]			 
			var tdata=retdata.split(/>>(.*)/);
			
			var d2= await driver.elementOrNull('xpath',"//android.widget.TextView[@text='"+ tdata[0]+"']")
			if(d2)
			{
			console.log("//*[@text='"+ tdata[0]+"']/following-sibling::android.widget.TextView")
			var flag1=false;						                
			var selector3 = await driver.elements("xpath","//*[@text='"+ tdata[0]+"']/following-sibling::"+selectorval)
			console.log(selector3.length)
			if(selector3.length==0){
					  global.status = "Fail";global.eventStatus="fail"
					 global.msg = "The field '" + fieldname + "' on the page '" + screenname + "' was successfully not retrieved";
			}
			for(var ins in selector3)
			 {
				 var txt=await selector3[ins].text()
			   if((txt!="")||(txt!=null)) 	  { 	flag1=true;console.log("success: ",txt)     	  }
			   if(ins==selector3.length-1)
			   {
				   if(flag1){
					   tdata[1] = txt;
					 global.status = "Pass";global.eventStatus="success"
					 global.msg = "The element '" + txt + "' on the page '" + screenname + "' was successfully retrieved";
				  }else{
					 global.status = "Fail";global.eventStatus="fail"
					 global.msg = "The field '" + fieldname + "' on the page '" + screenname + "' was successfully not retrieved";
				  
				   }
			   }
			 }
			}else { 
					global.status = "Fail";global.eventStatus="fail"
					global.msg = "The field '" + fieldname + "' on the page '" + screenname + "' was successfully not displayed";
			}						       						       	
		
	   // d=await delay();
break;

default:
global.status = "Fail";
global.msg = "Fail:Incorrect verify Type.Please check test step";
break;

}
break;


		case "longpress":
						 try {
		el = selectorval;
		var cl_el =   el+ testdata+"']";
					 console.log(cl_el , "cl_el inside click")
				
					 var click_ele = await driver.elementOrNull('xpath', cl_el)
					 console.log("click_ele", click_ele);
					 let action = new wd.TouchAction(driver);
					 action.longPress({el: click_ele});																		
						await action.perform();
					 
					 console.log("Element was found... ")
					global.status = "Pass";global.eventStatus="success"
				  global.msg = "The element '" + fieldname + "' on the page '" + screenname + "' was long pressed";
				 
				} catch(err)
				{
				  //console.log(stepdata[i].stepno,"Fail",err.type);
						console.log("Element was NOT found... ")
						global.status = "Fail";global.eventStatus="fail"
						global.msg = "ERROR: Unable to long press the element '" + fieldname + "' in the ' " + screenname + "' page. SYSTEM ERROR: " + err;
					
				 
				}
d=await delay()
break;


case "click":
		try
		   {
			   /*const iscroll = Selector(stepdata[i].selector)
			   await t.eval(() => scroll().scrollIntoView(), {dependencies: {iscroll}})*/
			   el = selectorval;

					// console.log("Element was NOT found... ")
					// global.status = "Fail";global.eventStatus="fail"
					// global.msg = "ERROR: Unable to Click the element '" + fieldname + "' in the ' " + screenname + "' page. SYSTEM ERROR: " + err;
					 var cl_el =   el+ testdata+"']";
					 console.log(cl_el , "cl_el inside click")
				
					 var click_ele = await driver.elementOrNull('xpath', cl_el)
					 console.log("click_ele", click_ele);
					  driver.clickElement(click_ele)
					 console.log("Element was found... ")
					global.status = "Pass";global.eventStatus="success"
				  global.msg = "The element '" + fieldname + "' on the page '" + screenname + "' was clicked";
				 
			 
			   //console.log(stepdata[i].stepno,"isDisplayed",stepdata[i].expected)
			 
		  } catch(err)
			 {
			   //console.log(stepdata[i].stepno,"Fail",err.type);
				     console.log("Element was NOT found... ")
					 global.status = "Fail";global.eventStatus="fail"
					 global.msg = "ERROR: Unable to Click the element '" + fieldname + "' in the ' " + screenname + "' page. SYSTEM ERROR: " + err;
				 
			  
			 }
d=await delay()
break;

		default:
		global.status = "Fail";
		global.msg = "Fail:Incorrect Keyword '"+keyword+"'.Please check...";
		break;		  
}				
/* ------------------------------------------switch case end here----------------------------------------------------*/
}
