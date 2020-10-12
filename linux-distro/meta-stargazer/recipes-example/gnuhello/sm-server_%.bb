LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"

SRC_URI += "file://sm-server.service \
            file://sm-server.sh"

inherit systemd

SYSTEMD_PACKAGES = "${PN}"
INITSCRIPT_PACKAGES = "${PN}"

SYSTEMD_AUTO_ENABLE = "enable"
SYSTEMD_SERVICE_${PN} = "sm-server.service"

FILES_${PN} += "${systemd_unitdir}/system/sm-server.service"
FILES_${PN} += "${systemd_unitdir}/system/sm-server.sh"

do_install() {
  install -d ${D}/${systemd_unitdir}/system
  install -m 0644 ${WORKDIR}/sm-server.service ${D}/${systemd_unitdir}/system
  install -m 0644 ${WORKDIR}/sm-server.sh ${D}/${systemd_unitdir}/system
}

REQUIRED_DISTRO_FEATURES= "systemd"
