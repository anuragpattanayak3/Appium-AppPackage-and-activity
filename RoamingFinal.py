import json,ast
import unicodedata
import shutil
import os
import base64
class unicode(unicode):
      def __repr__(self):
            return __builtins__.unicode.__repr__(self).lstrip("u")


openApp("C:\\Program Files\\internet explorer\\iexplore.exe")
with open("C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\sikuli_test.json") as f:
 data=json.load(f)

import copy

res_data = copy.copy(data) # shallow copy


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

      #os.fsync(f)
      
        
     
            
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
    types=data['scriptstep'][i]['type']
    stpobj=data['scriptstep'][i]
    wait(2)
    if(i==1):
      stpobj['signals']="true"
    wait(3)
    if keyword=="input":
        if types=="clickaction":
            imagepath=data['scriptstep'][i]['img_path']
            try:
                  click(imagepath)
                  stpobj=data['scriptstep'][i]
                  stpobj['status']="Pass"
                  stpobj['actual']="The field was cliked successfully."
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  print stpobj['status']
                  finalResult(stpobj)
            except:
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Fail"
                  stpobj['actual']="The field was cliked successfully."
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
                  stpobj['actual']="The field was doubleclick successfully."
                  print stpobj['status']
                  finalResult(stpobj)
            except:
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Fail"
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
                  stpobj['actual']="The field was url entered  successfully."
                  print stpobj['status']                
                  finalResult(stpobj)
            except:
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Fail"
                  stpobj['actual']="The field was url entered  successfully."
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
                  print stpobj['status']        
                  finalResult(stpobj)
            except:
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Fail"
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
                  print stpobj['status']             
                  finalResult(stpobj)
            except:
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Fail"
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
                  print stpobj['status']             
                  finalResult(stpobj)
            except:
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Fail"
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

    if(keyword=="verify"):
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
                  print stpobj['status']                 
                  finalResult(stpobj)
            except:
                  print "Image not found!!!kindly check"
                  countimg=countimg+1
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Fail"
                  print stpobj['status']
                  finalResult(stpobj)
                  
        if(types=="Text"):
            #imagepath=data['scriptstep'][i]['img_path']
            testdata=data['scriptstep'][i]['testdata']
            wait(10)
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
                  finalResult(stpobj)
            if abc==tdata[4]:
                  stpobj=data['scriptstep'][i]
                  wait(5)
                  click(Region(tdata[0],tdata[1],tdata[2],tdata[3]))
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Pass"
                  finalResult(stpobj)
            else :
                  stpobj=data['scriptstep'][i]
                  imgss=capture(SCREEN)
                  shutil.move(imgss, 'C:\\Users\\tgt109\\Downloads\\Agent_Demo_from_Adhi\\root\\AutomationCode\\Sikulix\\SikulixDownloads\\RoamingFinal.sikuli\\ScreenShot\\img_'+ stpobj['name'] + stpobj['stepno'] + '.png')
                  stpobj['status']="Fail"
                  finalResult(stpobj)
    if(stpobj['status']=="Fail"):
        count=count+1
        if(count==3):
            print "Exit after 3 times failing"   
            break
        else:
            continue   
    if (countimg==2):
        print "Exit due to not finding the given image 2 times"
        break
    else:
        continue            
wait(5)
popup("Execution is over!!!")
print "End of execution"
#stpobj['progress']="100"                        