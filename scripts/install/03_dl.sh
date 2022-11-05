#!/bin/bash
sleep 1

MIEMO_COMPILER_ARCHIVE=$(dialog --title "INSTALLING MIEMO" --output-fd 1 \
--backtitle "miemo (ARCADE MODE) V2.0" \
--inputbox "ENTER THE MIEMO PROJECT ARCHIVE URL" 8 50)

sleep 1

MIEMO_COMPILER_ARCHIVE_NAME=$(dialog --title "INSTALLING MIEMO" --output-fd 1 \
--backtitle "miemo (ARCADE MODE) V2.0" \
--inputbox "ENTER THE MIEMO PROJECT ARCHIVE NAME" 8 50)

echo ">> CLEANING POSSIBLY OLD DOWNLOADS"
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "CLEANING DL DIRECTORY" 10 60 10 &

echo $(rm -rf /tmp/miemo) >> /tmp/miemo_install.log

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "Miemo will be downloaded \nin /tmp/miemo directory" 6 34 ; sleep 2

mkdir -p /tmp/miemo
cd /tmp/miemo

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "DOWNLOADING MIEMO" 10 60 50 &
wget $MIEMO_COMPILER_ARCHIVE -a /tmp/miemo_install.log

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "EXTRACTING MIEMO" 10 60 75 &
tar -zxvf $MIEMO_COMPILER_ARCHIVE_NAME >> /tmp/miemo_install.log

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "Miemo downloaded" 6 34 ; sleep 2

