#/bin/bash
clear
dialog --title "INSTALLING MIEMO" --backtitle "miemo (ARCADE MODE) V2.0" \
--msgbox "/!\\ WARNING /!\\\n\nPLEASE MAKE SURE MIEMO IS\nDOWNLOADED BEFORE\nAND RIGHTS CONFIGURED.\nPRESS CTRL+C IF NOT" 20 50

cp /tmp/miemo/config/lightdm.conf /etc/lightdm/lightdm.conf
cp /tmp/miemo/config/grub /etc/default/grub

dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "Processing, please wait" 3 34 &
echo $(sudo update-grub2) >> /tmp/miemo_install.log
