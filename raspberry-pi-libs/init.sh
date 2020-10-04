# Creating structure
mkdir ~/libsmarthome

# Copy files
cp -r ./* ~/libsmarthome/

# Go to the directory
cd ~/libsmarthome/

# Run Autoconf
autoreconf --install

# Set installation folders
mkdir build
cd build
mkdir usr

# Config
../configure --prefix=/home/erickof/libsmarthome/build/usr

# Build Lib
make

# Installation
make install
