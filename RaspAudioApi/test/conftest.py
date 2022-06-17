import pytest

from AudioBackendServer import AudioBackendServer

@pytest.fixture
def audio():
    AudioBackendServer({"TESTING": True})
    with AudioBackendServer.TestAudio() as audio:
        yield audio