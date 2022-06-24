class bluetooth_parser:
    def debloat_text(self, text):
        return str(text).replace("\r", "").replace("\n", "")
    
    def parse_bluetooth_line(self, line):
        bt_dev_info = line.split(" ", 2)
        print(bt_dev_info)
        return {"mac": bt_dev_info[1], "name": self.debloat_text(bt_dev_info[2])}

    def parse_bluetooth_info(self, result):
        bluetooth_devices = []
        for line in result:
            bluetooth_devices.append(self.parse_bluetooth_line(line))
        return bluetooth_devices