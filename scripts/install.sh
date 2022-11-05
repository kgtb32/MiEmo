#!/bin/bash
echo "/!\ WARNING /!\\"
echo "ENSURE TO RUN THIS SCRIPT IN SUDO MODE (su root) "
echo "INSTALL SCRIPT WILL RUN IN 10 SECONDS"
#sleep 10


apt update
apt install dialog -y

result=$(dialog --backtitle "miemo (ARCADE MODE) V2.0" --output-fd 1 --checklist 'MIEMO PRE INSTALL (choose) \n[classic install enable all]:' 15 40 5 \
1 'INSTALL APT PACKAGES' off \
2 'INSTALL/CONFIGURE FLATPAK (INSTALL RETROARCH)' off \
3 'CONFIGURE SUDO RIGHTS' off \
4 'DOWNLOAD MIEMO' off \
5 'CONFIGURE LIGHTDM AND GRUB' off \
6 'INSTALL MIEMO-BACKEND MICROSERVICE' off \
7 'INSTALL MIEMO-WIFI MICROSERVICE' off \
8 'INSTALL MIEMO-AUDIO MICROSERVICE' off \
9 'INSTALL MIEMO-BLUETOOTH MICROSERVICE' off \
10 'INSTALL MIEMO-EMOTION SERVICE' off \
11 'INSTALL SYSTEMCTL SERVICES' off \
12 'ENABLE SYSTEMCTL SERVICES' off \
13 'CONFIGURE PLYMOUTH' off 
)


choices_selected=($result);

for i in "${choices_selected[@]}"
do
:
    case $i in 
    1)
        bash install/00_apt.sh
        ;;
    2)
        bash install/01_flatpak.sh
        ;;
    3)
        bash install/02_rights.sh
        ;;
    4)
        bash install/03_dl.sh
        ;;
    5)
        bash install/04_grub.sh
        ;;
    6)
        bash install/05_miemo_backend.sh
        ;;
    7)
        bash install/06_miemo_wifi.sh
        ;;
    8)
        bash install/07_miemo_audio.sh
        ;;
    9)
        bash install/08_miemo_bluetooth.sh
        ;;
    10)
        bash install/09_miemo_emotion.sh
        ;;
    11)
        bash install/10_install_sysctl.sh
        ;;
    12)
        bash install/11_enable_systemctl.sh
        ;;
    13)
        bash install/12_install_plymouth.sh
        ;;
    *)
        echo 'unknown'
        ;;
    esac
done

reset
