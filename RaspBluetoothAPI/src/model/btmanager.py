import os,sys,time,pexpect
class btmanager:
    def list_all_networks(self):
      p = pexpect.spawn('bluetoothctl devices', encoding='utf-8')
      p.timeout = 30
      p.logfile_read = sys.stdout
      mylist = [pexpect.EOF]
      p.expect(mylist)
      return p.before
