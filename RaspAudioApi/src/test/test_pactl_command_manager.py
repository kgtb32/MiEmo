import unittest

from ..model.commands.pactl_command import pactl_command_manager
from .funcutils import openfile

class TestPactlCommandManager(unittest.TestCase):
    def test_is_failed(self):
        self.assertFalse(pactl_command_manager().is_failed("Échec de la connexion"))
        self.assertFalse(pactl_command_manager().is_failed("Sink Invalide"))
        self.assertTrue(pactl_command_manager().is_failed("La connexion à réussi !"))
        print("test is failed : OK")
    def test_parse_info(self):
        res = pactl_command_manager().parse_info(openfile("./src/test/mock/pactl_info.txt"))
        self.assertTrue(type(res) == dict)
        self.assertTrue(len(list(res.keys())) > 0)
        self.assertTrue("source-par-défaut" in list(res.keys())) #valeur utilisée en front, le reste est innutile pour le moment
        print("test parse info : OK")

    def __init__(self):
        self.test_is_failed()
        self.test_parse_info()
