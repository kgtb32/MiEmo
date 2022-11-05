#!/bin/bash
clear
dialog --title "INSTALLING MIEMO" --backtitle "miemo (ARCADE MODE) V2.0" \
--msgbox "/!\\ WARNING /!\\\n\nPLEASE MAKE SURE MIEMO IS\nDOWNLOADED BEFORE\nAND PACKAGES INSTALLED\nPRESS CTRL+C IF NOT" 20 50

cd /tmp/miemo/RaspBluetoothAPI

dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "CREATING VENV" 10 60 0 &
python3 -m venv venv
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "ACTIVATING ..." 10 60 25 &
. venv/bin/activate

dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "DOWNLOADING PIP DEPS" 10 60 50 &
pip install -r requirements.txt &>> /tmp/miemo_install.log
pip install pyinstaller &>> /tmp/miemo_install.log

dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "COMPILING MIEMO-BLUETOOTH TO EXE" 10 60 75 &
pyinstaller --onefile --windowed --paths venv/lib/python3.9/site-packages/ src/BluetoothServer.py &>> /tmp/miemo_install.log

dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "PLEASE WAIT ..." 3 60 &
cp -r dist/BluetoothServer /usr/bin/miemo-bluetooth

deactivate
clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "MIEMO BLUETOOTH INSTALLED." 3 60 &