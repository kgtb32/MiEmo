#!/bin/bash
clear
MIEMO_GAME_STATIC=$(dialog --title "INSTALLING MIEMO" --output-fd 1 \
--backtitle "miemo (ARCADE MODE) V2.0" \
--inputbox "ENTER THE MIEMO-GAME STATIC ARCHIVE URL" 8 50)

MIEMO_GAME_NAME=$(dialog --title "INSTALLING MIEMO" --output-fd 1 \
--backtitle "miemo (ARCADE MODE) V2.0" \
--inputbox "ENTER THE MIEMO-GAME STATIC ARCHIVE NAME" 8 50)

dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "CLEANING MIEMO-GAME\nSTATIC DIRECTORY" 10 60 10 &
rm -rf /home/miemo/miemo-game/static/
rm /home/miemo/miemo-game/db.sqlite3

dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "DOWNLOADING MIEMO-GAME STATIC..." 10 60 20 &
mkdir -p /tmp/miemo-game-static/
cd /tmp/miemo-game-static/

wget $MIEMO_GAME_STATIC -a /tmp/miemo_post_install.log
clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "INSTALLING MIEMO-GAME STATIC...\nthis takes a while ..." 10 60 75 &

cd /home/miemo/miemo-game
tar -zxvf /tmp/miemo-game-static/$MIEMO_GAME_NAME &>> /tmp/miemo_post_install.log

rm -rf /tmp/miemo-game-static/
clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "miemo-game static installed" 6 34 ; sleep 2
clear
