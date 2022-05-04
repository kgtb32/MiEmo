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
    
    def get_all_sinks(self,cmd_result):
        res = re.split(SINK_REGEX, cmd_result)
        res.pop(0)
        return res

    def array_or_key_depth(self, line):
        key_val = line.split(":", 1)
        current=self.convert_key_to_proper_json(key_val[0])
        if(len(key_val) == 1 or key_val[1] == ""):
            return self.convert_key_to_proper_json(key_val[0]), [], current
        else:
            return self.convert_key_to_proper_json(key_val[0]), key_val[1].strip(), current

    def key_depth_to_object(self, line):
        key_val = line.split("=", 1)
        if(len(key_val) == 1):
            return line.strip().replace("\"","")
        else:
            return {self.convert_key_to_proper_json(key_val[0]):key_val[1].strip().replace("\"","")}

    def parse_sinks_list(self, result):
        sinks_res = []
        for sink in self.get_all_sinks(result):
            current = ""
            final_sink = {}
            for line in sink.split("\n"):
                if line.strip() != "":
                    n = line.count("\t")
                    if n == 1:
                        key,val,current = self.array_or_key_depth(line)
                        final_sink[key] = val
                    else:
                        final_sink[current].append(self.key_depth_to_object(line))
            sinks_res.append(final_sink)
        return sinks_res