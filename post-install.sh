MIEMO_COMPILER_ARCHIVE="http://192.168.1.81:3001/miemo.tar.gz"
MIEMO_COMPILER_ARCHIVE_NAME="miemo.tar.gz"

MIEMO_STATIC_ARCHIVE="http://192.168.1.81:3001/miemo_static.tar.gz"
MIEMO_STATIC_ARCHIVE_NAME="miemo_static.tar.gz"

echo "/!\\ WARNING"
echo "PLEASE ENSURE THIS SCRIPT IS LOADED WITH REGULAR USER (miemo)"
echo "POST INSTALL SCRIPT WILL RUN IN 10 SECOND"

sleep 10

echo ">> INSTALLING NODE"

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm ls-remote

nvm install v16.17.0

nvm use v16.17.0

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

echo ">> NODE VERSION"

node -v

cd /tmp

echo ">> DOWNLOADING MIEMO"

wget $MIEMO_COMPILER_ARCHIVE

tar -zxvf $MIEMO_COMPILER_ARCHIVE_NAME

cd "/tmp/MiEmo Webapp"

echo ">> COMPILING MIEMO-WEBAPP ..."

mkdir -p /home/miemo/webapp/

npm install --global yarn

yarn && yarn build --mode prod-arcade

cp -r /tmp/MiEmo\ Webapp/dist/* /home/miemo/webapp/

echo ">> INSTALLING MIEMO-GAME"

mkdir -p /home/miemo/miemo-game

cp -r /tmp/miemo-game/* /home/miemo/miemo-game/

cd /home/miemo/miemo-game

python3 -m venv venv
. venv/bin/activate
pip install -r requirements.txt
deactivate

echo ">> ENABLING SERVICES"

systemctl --user enable miemo-webapp
systemctl --user enable miemo-audio
systemctl --user enable miemo-webclient
systemctl --user enable miemo-static
systemctl --user enable miemo-game

echo ">> PREPARING STATIC RESSOURCES"

mkdir -p /tmp/static
mkdir -p /home/miemo/static

cd /tmp/static
wget $MIEMO_STATIC_ARCHIVE

echo ">> EXTRACTING STATIC RESSOURCES"
echo "[!] THIS TAKE A WHILE PLEASE WAIT"

tar -zxzf $MIEMO_STATIC_ARCHIVE_NAME

cp -r * /home/miemo/static/

echo ">> POST INSTALL SCRIPT COMPLETE"
echo ">> YOU CAN NOW REBOOT THE COMPUTER"