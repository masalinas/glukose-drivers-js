# glukose-drivers
NodeJs glucometer protocol implementation using Reverse Engineering Hacking techniques

# Hacked Devices
- [FreeStyle Optium Neo Glucometer from Abbott](http://www.abbottdiabetescare.es/freestyle-optium-neo)

# Sniffing Tools
The sniffing tool used for reverse engineering the glucometer device protocols is the Windows tool called [USBTrace](http://www.sysnucleus.com/)

# The application uses
- [NodeJs](https://nodejs.org/en/) version 0.12.2: JavaScript runtime built on Chrome's V8 JavaScript engine.
- [USB node module] (https://www.npmjs.com/package/usb) version 1.1.1: Library to access USB devices.

# Installation
- Add the USB rules (60-freestyle-optium-neo.rules) on your Linux Box directory(/etc/udev/rules.d) using the script contributed in the project, you only must change the group user used when you start your node app. Then refresh udev with the command: sudo udevadm trigger to reflect changes.

# Licenses
The source code is released under Apache 2.0.
