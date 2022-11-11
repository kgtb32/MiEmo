#!/bin/sh
sleep 1
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "UPDATING APT CACHE" 10 60 0 &
sh -c 'echo "deb https://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list'
echo $(apt update -y) >> /tmp/miemo_install.log
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "UPDATING APT CACHE" 10 60 25 &
echo $(apt update) >> /tmp/miemo_install.log
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "UPDATING APT CACHE" 10 60 50 &
sleep 5
echo $(apt upgrade -y) >> /tmp/miemo_install.log
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "INSTALLING APT PACKAGES" 10 60 75 &
echo$(apt install -y htop openbox xterm unzip pulseaudio network-manager ssh google-chrome-stable plymouth sudo thunar lxpanel lightdm wget flatpak bash docker.io docker-compose python3-venv python3-pip xfce4-notifyd git linux-headers-generic build-essential dkms -y) >> /tmp/miemo_install.log
sleep 5
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "APT PACKAGE INSTALL COMPLETE" 3 34
sleep 2