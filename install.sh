MIEMO_COMPILER_ARCHIVE="http://192.168.1.81:3001/miemo.tar.gz"
MIEMO_COMPILER_ARCHIVE_NAME="miemo.tar.gz"

echo "/!\ WARNING /!\\"
echo "ENSURE TO RUN THIS SCRIPT IN SUDO MODE (su root) "
echo "INSTALL SCRIPT WILL RUN IN 10 SECONDS"

sleep 10

echo ">> INITIAL VERSION V.2.0.0_x64 - 27 sept 2022"

sleep 1

echo ">> INSTALLING REQUIRED APT PACKAGES"

apt update -y
apt update
apt upgrade -y
apt install -y htop openbox xterm unzip pulseaudio network-manager ssh chromium plymouth sudo thunar lxpanel lightdm wget snapd bash docker.io docker-compose python3-venv python3-pip xfce4-notifyd git linux-headers-generic build-essential dkms -y
snap install retroarch

# OK 

echo ">> CONFIGURING RIGHTS"

sudo usermod -a -G sudo miemo


echo ">> DOWNLOADING "

cd /tmp
wget $MIEMO_COMPILER_ARCHIVE

tar -zxvf $MIEMO_COMPILER_ARCHIVE_NAME

echo ">> CONFIGURING LIGHTDM AND GRUB"

cp config/lightdm.conf /etc/lightdm/lightdm.conf
cp config/grub /etc/default/grub

sudo update-grub2

echo ">> COMPILING WIFI DRIVERS"

cd /tmp
git clone https://github.com/Mange/rtl8192eu-linux-driver
cd rtl8192eu-linux-driver
. dkms.conf
mkdir /usr/src/$PACKAGE_NAME-$PACKAGE_VERSION
cp -r * /usr/src/$PACKAGE_NAME-$PACKAGE_VERSION
dkms add $PACKAGE_NAME/$PACKAGE_VERSION
dkms autoinstall $PACKAGE_NAME/$PACKAGE_VERSION
echo "blacklist rtl8xxxu" | tee /etc/modprobe.d/rtl8xxxu.conf
echo "options 8192eu rtw_power_mgnt=0 rtw_enusbss=0" | tee /etc/modprobe.d/8192eu.conf
update-grub
update-initramfs -u

echo ">> INSTALLING miemo ..."


mkdir -p /home/miemo/backend/

cp -r Api/* /home/miemo/backend/

cd RaspWifiApi/

python3 -m venv venv
. venv/bin/activate

pip install -r requirements.txt
pip install pyinstaller 

pyinstaller --onefile --windowed --paths venv/lib/python3.9/site-packages/ src/WifiServer.py

cp -r dist/WifiServer /usr/bin/miemo-wifi

deactivate

cd /tmp/RaspAudioApi

python3 -m venv venv
. venv/bin/activate

pip install -r requirements.txt
pip install pyinstaller

pyinstaller --onefile --windowed --paths venv/lib/python3.9/site-packages/ src/AudioBackendServer.py

cp -r dist/AudioBackendServer /usr/bin/miemo-audio

deactivate

cd /tmp/RaspBluetoothAPI

python3 -m venv venv
. venv/bin/activate

pip install -r requirements.txt
pip install pyinstaller

pyinstaller --onefile --windowed --paths venv/lib/python3.9/site-packages/ src/BluetoothServer.py

cp -r dist/BluetoothServer /usr/bin/miemo-bluetooth

deactivate

cp /tmp/config/runMiemoWebapp /usr/bin/
cp /tmp/config/runMiemoBackend /usr/bin/
cp /tmp/config/runMiemoWebClient /usr/bin/
cp /tmp/config/runMiemoStatic /usr/bin/
cp /tmp/config/runMiemoGame /usr/bin

chmod a+x /usr/bin/runMiemoWebapp
chmod a+x /usr/bin/runMiemoBackend
chmod a+x /usr/bin/runMiemoWebClient
chmod a+x /usr/bin/runMiemoStatic
chmod a+x /usr/bin/runMiemoGame

echo ">> INSTALLING miemo-emotion"

cp /tmp/docker-compose.yml /home/miemo/

echo ">> INSTALLING services"

cd /tmp

cp -r services-admin/* /etc/systemd/system/

mkdir -p /home/miemo/.local/share/systemd/user

cp -r services-user/* /home/miemo/.local/share/systemd/user/
chown -R miemo:miemo /home/miemo/.local/share/systemd/user/*

echo ">> ENABLING services"

systemctl enable miemo-bluetooth
systemctl enable miemo-backend
systemctl enable miemo-wifi
systemctl enable miemo-emotion

echo ">> CONFIGURING plymouth"

#TODO configure plymouth

echo ">> INSTALL COMPLETE THIS MACHINE MUST BE RESTARTED"
echo ">> RESTARTING IN 30 SEC ............."

sleep 30

systemctl reboot