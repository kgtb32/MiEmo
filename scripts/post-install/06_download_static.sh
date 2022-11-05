#!/bin/bash

MIEMO_STATIC_ARCHIVE=$(dialog --title "INSTALLING MIEMO" --output-fd 1 \
--backtitle "miemo (ARCADE MODE) V2.0" \
--inputbox "ENTER THE MIEMO STATIC ARCHIVE URL" 8 50)

sleep 1

MIEMO_STATIC_ARCHIVE_NAME=$(dialog --title "INSTALLING MIEMO" --output-fd 1 \
--backtitle "miemo (ARCADE MODE) V2.0" \
--inputbox "ENTER THE MIEMO STATIC ARCHIVE NAME" 8 50)

dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "CLEANING DL DIRECTORY" 10 60 10 &
rm -rf /home/miemo/static
rm -rf /tmp/static

dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "CREATING DIRECTORIES" 10 60 20 &
mkdir -p /tmp/static
mkdir -p /home/miemo/static
cd /tmp/static
clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "Miemo static will be downloaded \nin /tmp/static directory" 6 34 ; sleep 2


clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "DOWNLOADING STATIC RESSOURCES ...\nthis can take a while" 10 60 50 &
wget $MIEMO_STATIC_ARCHIVE -a /tmp/miemo_post_install.log

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "EXTRACTING RESSOURCES\nthis takes a while ..." 10 60 75 &
tar -zxvf $MIEMO_STATIC_ARCHIVE_NAME &>> /tmp/miemo_post_install.log

rm /tmp/static/$MIEMO_STATIC_ARCHIVE_NAME

cp -r /tmp/static/* /home/miemo/static/

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "Miemo static downloaded" 6 34 ; sleep 2


