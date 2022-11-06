#!/bin/bash

CORES_ARCHIVE_URL=$(dialog --title "INSTALLING MIEMO" --output-fd 1 \
--backtitle "miemo (ARCADE MODE) V2.0" \
--inputbox "ENTER THE RETROARCH CORES ARCHIVE URL" 8 50)

CORES_ARCHIVE_NAME=$(dialog --title "INSTALLING MIEMO" --output-fd 1 \
--backtitle "miemo (ARCADE MODE) V2.0" \
--inputbox "ENTER THE RETROARCH CORES ARCHIVE NAME" 8 50)

dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "CLEANING DL DIRECTORY" 10 60 10 &

rm -rf ~/.var/app/org.libretro.RetroArch/config/retroarch/cores/
rm -rf /tmp/cores/

dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "CREATING DIRECTORIES" 10 60 20 &

mkdir -p ~/.var/app/org.libretro.RetroArch/config/retroarch/cores/
mkdir -p /tmp/cores/

dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "DOWNLOADING CORES ..." 10 60 25 &

cd /tmp/cores/

wget $CORES_ARCHIVE_URL -a /tmp/miemo_post_install.log

dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "EXTRACTING CORES\nthis takes a while ..." 10 60 75 &

tar -zxvf $CORES_ARCHIVE_NAME &>> /tmp/miemo_post_install.log
rm $CORES_ARCHIVE_NAME

cp -r /tmp/cores/* ~/.var/app/org.libretro.RetroArch/config/retroarch/cores/

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "Retroarch cores installed" 6 34 ; sleep 2
