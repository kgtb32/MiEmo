import subprocess

from .pactl_command_manager import pactl_command_manager

class pactl_command:

    def __init__(self):
        self.cmd_manager = pactl_command_manager()

    def run_command(self, command_array):
        return subprocess.run(command_array, stdout=subprocess.PIPE, encoding="UTF-8").stdout

    def info(self):
        return self.cmd_manager.parse_info(self.run_command(["pactl","info"]))
    
    def sinks_list(self):
        return self.cmd_manager.parse_sinks_list(self.run_command(["pactl","list","sinks"]))
        