#!/bin/bash
clear
dialog --title "INSTALLING MIEMO" --backtitle "miemo (ARCADE MODE) V2.0" \
--msgbox "/!\\ WARNING /!\\\n\nPLEASE MAKE SURE MIEMO IS\nDOWNLOADED BEFORE\nAND PACKAGES INSTALLED\nPRESS CTRL+C IF NOT" 20 50

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "COPYING PLYMOUTH THEME ..." 3 60 &

cp -r /tmp/miemo/miemo-plymouth/* /usr/share/plymouth/themes/
cp /tmp/miemo/miemo-plymouth/plymouthd.defaults /usr/share/plymouth/plymouthd.defaults

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "Please Wait ..." 3 60 &

sudo update-alternatives --install /usr/share/plymouth/themes/default.plymouth default.plymouth /usr/share/plymouth/themes/miemo/miemo.plymouth 100 &>> /tmp/miemo_install.log
echo "SELECT ITEM Automatic"
sudo update-alternatives --config default.plymouth

sudo update-initramfs -u &>> /tmp/miemo_install.log

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "Plymouth installed" 3 60 &




