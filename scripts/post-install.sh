#!/bin/bash

echo "/!\\ WARNING"
echo "PLEASE ENSURE THIS SCRIPT IS LOADED WITH REGULAR USER (miemo)"
echo "POST INSTALL SCRIPT WILL RUN IN 10 SECOND"

sleep 10

result=$(dialog --backtitle "miemo (ARCADE MODE) V2.0" --output-fd 1 --checklist 'MIEMO POST INSTALL (choose) \n[classic install enable all]:' 15 40 5 \
1 'INSTALL NODE' off \
2 'DOWNLOAD MIEMO' off \
3 'DEPLOY MIEMO WEBAPP' off \
4 'INSTALL MIEMO-GAME' off \
5 'ENABLE USER SERVICES' off \
6 'DOWNLOAD STATIC RESSOURCES' off
)

choices_selected=($result);

for i in "${choices_selected[@]}"
do
:
    case $i in 
    1)
        bash post-install/01_node_install.sh
        ;;
    2)
        bash install/03_dl.sh
        ;;
    3)
        bash post-install/03_deploy_webapp.sh
        ;;
    4)
        bash post-install/04_install_miemo_game.sh
        ;;
    5)
        bash post-install/05_enable_services.sh
        ;;
    6)
        bash post-install/06_download_static.sh
        ;;
    *)
        echo 'unknown'
        ;;
    esac
done