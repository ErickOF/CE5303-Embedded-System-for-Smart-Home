# Creating structure
mkdir ~/libmath

# Copy files
cp -r ./* ~/libmath/

# Go to the directory
cd ~/libmath/

# Run Autoconf
autoreconf --install

# Set installation
mkdir build
cd build
mkdir usr

# Config
../configure --prefix=/home/erickof/libmath/build/usr
