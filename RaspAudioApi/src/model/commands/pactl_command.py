import subprocess

from .pactl_command_manager import pactl_command_manager

class pactl_command:

    def __init__(self):
        self.cmd_manager = pactl_command_manager()

    def run_command(self, command_array):
        cmd = subprocess.run(command_array, stdout=subprocess.PIPE, stderr=subprocess.PIPE, encoding="UTF-8")
        return str(cmd.stdout) + str(cmd.stderr)

    def info(self):
        return self.cmd_manager.parse_info(self.run_command(["pactl","info"]))
    
    def sinks_list(self):
        return self.cmd_manager.parse_sinks_list(self.run_command(["pactl","list","sinks"]))
        
    def set_sink_volume(self, sink, volume):
        return self.cmd_manager.parse_set_volume(self.run_command(["pactl","set-sink-volume",sink,str(volume)+"%"]))

    def set_default_sink(self, sink):
        return self.cmd_manager.parse_set_default_sink(self.run_command(["pactl", "set-default-sink",sink]))