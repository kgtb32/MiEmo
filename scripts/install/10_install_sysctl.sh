#!/bin/bash
clear
dialog --title "INSTALLING MIEMO" --backtitle "miemo (ARCADE MODE) V2.0" \
--msgbox "/!\\ WARNING /!\\\n\nPLEASE MAKE SURE MIEMO IS\nDOWNLOADED BEFORE\nAND PACKAGES INSTALLED\nPRESS CTRL+C IF NOT" 20 50


clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "PROCESSING ..." 3 60 &

cp /tmp/miemo/config/runMiemoWebapp /usr/bin/
cp /tmp/miemo/config/runMiemoWebClient /usr/bin/
cp /tmp/miemo/config/runMiemoStatic /usr/bin/
cp /tmp/miemo/config/runMiemoGame /usr/bin

chmod a+x /usr/bin/runMiemoWebapp
chmod a+x /usr/bin/runMiemoWebClient
chmod a+x /usr/bin/runMiemoStatic
chmod a+x /usr/bin/runMiemoGame

cp -r /tmp/miemo/services-admin/* /etc/systemd/system/

mkdir -p /home/miemo/.local/share/systemd/user

cp -r /tmp/miemo/services-user/* /home/miemo/.local/share/systemd/user/
chown -R miemo:miemo /home/miemo/.local/share/systemd/user/*


clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "SERVICES INSTALLED" 3 60 &

