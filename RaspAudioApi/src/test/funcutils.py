def openfile(filename):
    f = open(filename, "r")
    res = f.read()
    f.close()
    return res