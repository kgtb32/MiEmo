# -*- coding: utf-8 -*-
import re

SINK_REGEX = r"Destination #\d"

class pactl_command_manager:

    def parse_info(self, result):
        result_split = result.split("\n")
        result_split.pop()
        return dict(map(
            lambda line: [
                self.convert_key_to_proper_json(line.split(":",1)[0]),
                line.split(":",1)[1].strip()
            ],
            result_split
        ))
    
    def convert_key_to_proper_json(self,key):
        return key.strip().replace(" ","-").lower()
