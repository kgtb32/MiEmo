import os,sys,time,pexpect
class btmanager:
    def list_all_networks(self):
      p = pexpect.spawn('bluetoothctl devices', encoding='utf-8')
      p.timeout = 30
      p.logfile_read = sys.stdout
      mylist = [pexpect.EOF]
      p.expect(mylist)
      return p.before

    def connect(self, address):
      response=''
      p = pexpect.spawn('bluetoothctl', encoding='utf-8')
      p.logfile_read = sys.stdout
      p.expect('#')
      p.sendline("remove "+address)
      p.expect("#")
      p.sendline("scan on")
      p.expect("")
      con_success = "Connection successful"
      mylist = ["Discovery started","Failed to start discovery","Device {} not available".format(address),"Failed to connect",con_success]
      tries = 0
      while response != con_success and tries < 10:
        p.expect(mylist)
        response=p.after
        p.sendline("connect "+address)
        time.sleep(1)
        tries += 1
      p.sendline("quit")
      p.close()
      if(response == con_success):
        return True
      return False
