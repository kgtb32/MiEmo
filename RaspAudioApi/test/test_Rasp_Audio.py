
from test.conftest import conftest



def test_should_status_code_ok(audio):
	response = audio.get('/index')
	assert response.status_code == 200