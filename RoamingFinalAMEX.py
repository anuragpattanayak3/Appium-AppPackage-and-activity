import json,ast
import unicodedata
import shutil
import os
import base64

class unicode(unicode):
      def __repr__(self):
            return __builtins__.unicode.__repr__(self).lstrip("u")


with open("C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\sikuli_test.json") as f:
 data=json.load(f)

import copy

res_data = copy.copy(data) # shallow copy

if(data['argodata']['browser']=="ie"):
      openApp("C:\\Program Files\\internet explorer\\iexplore.exe")
else:
      openApp("C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe")            
#tempobj = null
#print(data)
def finalResult(stpobj):
      #print(stp)
      #print("-----------")

      #print(data['tindetails'])
      res_data['scriptstep'] = ""
      res_data['tindetails'] = data['tindetails']
      res_data['username'] = data['username']
      res_data['insindex'] = data['insindex']
      res_data['argodata'] = data['argodata']
      res_data['currobj'] = stpobj

      #print(res_data)
 
      #res2 = ast.literal_eval(json.dumps(str(res_data)))
      res2 = str(res_data)
      res3 = res2.replace('u\'', '\'')
      res4 = res3.replace('\'', '\"')
      res5 = res4.replace('True', '\"true\"')
      res6 = res5.replace('False', '\"false\"')
      res7 = res6.replace('None', '\"none\"')
      #print(type(res_data))
      f = open("sikuli_test_resfromauto.txt", "w",1) 
      print ( res_data['currobj']['stepno'] )
      f.write(res7)
      f.close()
      
folder ="C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot"
for the_file in os.listdir(folder):
    file_path = os.path.join(folder, the_file)
    try:
        if os.path.isfile(file_path):
            os.unlink(file_path)
    except Exception as e:
        print(e)

length=len(data['scriptstep'])
count=0
countimg=0
for i in range(length):
    keyword=data['scriptstep'][i]['keyword']
    screenname=data['scriptstep'][i]['screenname']
    fieldname=data['scriptstep'][i]['fieldname']
    types=data['scriptstep'][i]['type']
    stpobj=data['scriptstep'][i]
    wait(1)
    if(i==1):
      stpobj['signals']="true"
    wait(1)
    if keyword=="input":
        if types=="button":
            imagepath=data['scriptstep'][i]['img_path']
            try:
                  click(imagepath)
                  stpobj=data['scriptstep'][i]
                  stpobj['status']="Pass"
                  stpobj['actual']="The Field was clicked successfuly"
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  print stpobj['status']
                  finalResult(stpobj)
            except:
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Fail"
                  stpobj['actual']="The Field was not clicked successfuly"
                  print stpobj['status']
                  finalResult(stpobj)           

        if types=="doubleclick":
            imagepath=data['scriptstep'][i]['img_path']
            try:
                  doubleClick(imagepath)
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status'] = "Pass"
                  stpobj['actual']="The Field was doubleclicked successfuly"
                  print stpobj['status']
                  finalResult(stpobj)
            except:
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Fail"
                  stpobj['actual']="The Field was not doubleclicked successfuly"
                  print stpobj['status']
                  finalResult(stpobj)          
        if types=="url" :
            testdata=data['scriptstep'][i]['testdata']
            type(Key.BACKSPACE)
            try: 
                  type(testdata)
                  type(Key.ENTER)
                  wait(5)
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Pass"
                  stpobj['actual']="Navigated to the url"
                  print stpobj['status']                
                  finalResult(stpobj)
            except:
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Fail"
                  stpobj['actual']="Not Navigated to the url"
                  print stpobj['status']
                  finalResult(stpobj)
        if types=="allow" :
            try: 
                  click("1552044729853.png")
                  click("1552044763319.png")
                  click("1552044790735.png")
                  click("1552044997580.png")
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Pass"
                  print stpobj['status']                
                  finalResult(stpobj)
            except:
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Fail"
                  print stpobj['status']
                  finalResult(stpobj)
        if types=="textbox" :
            imagepath=data['scriptstep'][i]['img_path']
            wait(2)
            testdata=data['scriptstep'][i]['testdata']
            wait(2)
            try: 
                  click(imagepath)
                  type(testdata)
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Pass"
                  stpobj['actual']="The testdata was typed succesfully"  
                  print stpobj['status']        
                  finalResult(stpobj)
            except:
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Fail"
                  stpobj['actual']="The testdata was not typed succesfully"   
                  print stpobj['status']
                  finalResult(stpobj)       
        if types=="hoveraction" :
            imagepath=data['scriptstep'][i]['img_path']
            try:
                  hover(imagepath)
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Pass"
                  stpobj['actual']="Hovering action was successful"
                  print stpobj['status']             
                  finalResult(stpobj)
            except:
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Fail"
                  stpobj['actual']="Hovering action was not successful"
                  print stpobj['status']
                  finalResult(stpobj)
        if types=="typeaction" :
            testdata=data['scriptstep'][i]['testdata']
            wait(2)  
            try:
                  type(testdata)
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Pass"
                  stpobj['actual']="typing testdata action was successful"
                  print stpobj['status']             
                  finalResult(stpobj)
            except:
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Fail"
                  stpobj['actual']="typing testdata action was not successful"
                  print stpobj['status']
                  finalResult(stpobj)          
        if types=="offsetclick" :
            imagepath=data['scriptstep'][i]['img_path']
            tdata=imagepath.split(',')
            tdata[0]=int(tdata[0])
            tdata[1]=int(tdata[1])
            tdata[2]=int(tdata[2])
            try:
                  click(Pattern(tdata[0]).targetOffset(tdata[1],tdata[2]))
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status'] ="Pass"
                  print stpobj['status']
                  finalResult(stpobj)
            except:
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Fail"
                  print stpobj['status']
                  finalResult(stpobj)
        if types=="offsethover" :
            imagepath=data['scriptstep'][i]['img_path']
            tdata=imagepath.split(',')
            tdata[0]=int(tdata[0])
            tdata[1]=int(tdata[1])
            tdata[2]=int(tdata[2])
            try:
                  hover(Pattern(tdata[0]).targetOffset(tdata[1],tdata[2]))
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status'] ="Pass"
                  print stpobj['status']
                  finalResult(stpobj)
            except:
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Fail"
                  print stpobj['status']
                  finalResult(stpobj)
        if types=="offsetdoubleclick" :
            imagepath=data['scriptstep'][i]['img_path']
            tdata=imagepath.split(',')
            tdata[0]=int(tdata[0])
            tdata[1]=int(tdata[1])
            tdata[2]=int(tdata[2])
            try:
                  doubleClick(Pattern(tdata[0]).targetOffset(tdata[1],tdata[2]))
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status'] ="Pass"
                  print stpobj['status']
                  finalResult(stpobj)
            except:
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png') 
                  stpobj['status']="Fail"
                  print stpobj['status']
                  finalResult(stpobj)                         

    if(keyword=="isdisplayed"):
        imagepath=data['scriptstep'][i]['img_path']
        if(types=="image"):
            wait(5)
            try:
                  wait(imagepath,60)
                  wait(3)
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Pass"
                  stpobj['actual']="Image founf"
                  print stpobj['status']                 
                  finalResult(stpobj)
            except:
                  print "Image not found!!!kindly check"
                  countimg=countimg+1
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Fail"
                  stpobj['actual']="Image is not found"
                  print stpobj['status']
                  finalResult(stpobj)
                  
        if(types=="Text"):
            #imagepath=data['scriptstep'][i]['img_path']
            testdata=data['scriptstep'][i]['testdata']
            wait(5)
            tdata=testdata.split(',')
            tdata[0]=int(tdata[0])
            tdata[1]=int(tdata[1])
            tdata[2]=int(tdata[2])
            tdata[3]=int(tdata[3])
            try:
                  abc=Region(tdata[0],tdata[1],tdata[2],tdata[3]).text()
                  abc=abc.replace(" ","")
                  tdata[4]=tdata[4].replace(" ","")
            except:
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  print "Unable to find the region!!!kindly check"
                  stpobj['status']="Fail"
                  stpobj['actual']="finding testdata action was not successful and not clicked"
                  finalResult(stpobj)
            if abc==tdata[4]:
                  stpobj=data['scriptstep'][i]
                  wait(5)
                  click(Region(tdata[0],tdata[1],tdata[2],tdata[3]))
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Pass"
                  stpobj['actual']="finding testdata action was successful and clicked"
                  finalResult(stpobj)
            else :
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Fail"
                  stpobj['actual']="finding testdata action was not successful and not clicked"
                  finalResult(stpobj)

    if(keyword=="savedetails"):
        testdata=data['scriptstep'][i]['testdata']
            wait(5)
            tdata=testdata.split(',')
            tdata[0]=int(tdata[0])
            tdata[1]=int(tdata[1])
            tdata[2]=int(tdata[2])
            tdata[3]=int(tdata[3])
            try:
                  stpobj=data['scriptstep'][i]
                  abc=Region(tdata[0],tdata[1],tdata[2],tdata[3]).text()
                  abc=abc.replace(" ","")
                  (screennamefieldname)=abc
                  print "Details Saved!!!"
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Pass"
                  stpobj['actual']="saving testdata action was successful and clicked"
                  finalResult(stpobj)
            except:
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  print "Unable to find the region!!!kindly check"
                  stpobj['status']="Fail"
                  stpobj['actual']="saving testdata action was not successful and not clicked"
                  finalResult(stpobj)
                        
    if(keyword=="retrieve"):
        testdata=data['scriptstep'][i]['testdata']
            wait(5)
            tdata=testdata.split(',')
            tdata[0]=int(tdata[0])
            tdata[1]=int(tdata[1])
            tdata[2]=int(tdata[2])
            tdata[3]=int(tdata[3])
            try:
                  abc=Region(tdata[0],tdata[1],tdata[2],tdata[3]).text()
                  abc=abc.replace(" ","")
            except:
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  print "Unable to find the region!!!kindly check"
                  stpobj['status']="Fail"
                  stpobj['actual']="retrieving testdata action was not successful and not clicked"
                  finalResult(stpobj)
            matchingValue=tdata[4]
            if(abc==vars()['matchingValue']):
                  stpobj=data['scriptstep'][i]
                  wait(5)
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Pass"
                  stpobj['actual']="retrieving testdata action was successful and clicked"
                  finalResult(stpobj)
            else :
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Fail"
                  stpobj['actual']="retrieving testdata action was not successful and not clicked"
                  finalResult(stpobj)      

    if(stpobj['status']=="Fail"):
        count=count+1
        if(count==3):
            print "Exits after 3 times failing"   
            break
        else:
            continue   
    if (countimg==2):
        print "Exits due to not finding the given image 2 times"
        break
    else:
        continue            
wait(5)
popup("Execution is over!!!")
print "End of execution"
#stpobj['progress']="100"