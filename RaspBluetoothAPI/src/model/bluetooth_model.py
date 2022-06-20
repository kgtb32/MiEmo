from model.btmanager import btmanager
from model.bluetooth_parser import bluetooth_parser

class bluetooth_model:
	def __init__(self):
		self.manager = btmanager()
		self.parser = bluetooth_parser()
	
	def parse_scan_result(self, result):
		res = result.split("\n")
		return self.parser.parse_bluetooth_info(res[:len(res)-1])

	def list_all_networks(self):
		return self.parse_scan_result(self.manager.list_all_networks())

