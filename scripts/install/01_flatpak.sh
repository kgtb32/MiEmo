#!/bin/sh
sleep 1

echo $(flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo) >> /tmp/miemo_install.log

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "INSTALLING RETROARCH" 10 60 25 &

sleep 1

echo $(flatpak install flathub org.libretro.RetroArch -y) >> /tmp/miemo_install.log

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "INSTALLING FIREFOX" 10 60 50 &
echo $(flatpak install flathub org.mozilla.firefox -y) >> /tmp/miemo_install.log

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "INSTALLING CHROME" 10 60 75 &
echo $(flatpak install flathub com.google.Chrome -y) >> /tmp/miemo_install.log

clear
dialog  --backtitle "miemo (ARCADE MODE) V2.0" --infobox "FLATPAK CONFIGURED AND RETROARCH INSTALLED" 3 60 ; sleep 2

