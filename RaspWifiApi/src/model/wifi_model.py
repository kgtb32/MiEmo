from wifi_wrapper import WiFi

class wifi_model:
    def __init__(self):
        self.wifi = WiFi()
        self.wifi_enabled = self.wifi.wifi_enabled()

    def list_all_wifi_networks(self):
        if(not self.wifi_enabled):
            return []
        else:
            return self.wifi.scan()
