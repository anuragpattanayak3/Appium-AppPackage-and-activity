Set DoNotLockMySystem = CreateObject("WScript.Shell") 

SysLock = 0

Do
                SysLock = SysLock + 1
                WScript.Sleep 60000
                DoNotLockMySystem.Sendkeys "{NUMLOCK}"
                DoNotLockMySystem.Sendkeys "{NUMLOCK}"
Loop Until SysLock = 10800

Set DoNotLockMySystem = Nothing