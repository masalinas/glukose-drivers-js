var usb = require('usb');
var util = require('util');
var buffer = require('buffer');
var protocols = require('./protocols/abbott-freestyle-optium-neo/master');

var vendorId = 0x1a61;
var productId = 0x3850;

var rawPacket;

// search for Abbott Freestyle Optium Neo Glucometer device
process.stdout.write("Searching for device 0x" + vendorId.toString(16) + " 9x"+productId.toString(16)+"...");
var usbGlucometer = usb.findByIds(vendorId, productId);

if(usbGlucometer) {
	console.log(util.format(" Found device at bus %d address %d", usbGlucometer.busNumber, usbGlucometer.deviceAddress));
}
else {
	console.log(" Device not found, exiting");
	process.exit();
}

// open device
usbGlucometer.open();
console.log("Glucose device is opened");

// get default device interface
var interface = usbGlucometer.interface(0);

// kerdel dettach device to control myself
if (interface.isKernelDriverActive())
    interface.detachKernelDriver();

// gotta claim away from OS (should hear windows disconnect usbTempSensor sound)
interface.claim();

// get device descriptors to log
var configurationDescriptor = usbGlucometer.configurationDescriptor;
var deviceDescriptor = usbGlucometer.deviceDescriptor;

// get default device interface endpoint
var endpoint = interface.endpoints[0];
//var endpoint = interface.endpoint(129);

// start device endpoint polling
endpoint.startPoll(1, 64);

// define endpoint listeners
endpoint.on("data",function(buffer){

    //Whole number portion of temperature is in byte #3 in plain hex
    //Fractional part of temperature is in byte #4 as a proportion of 256
    //currentTemp = buffer[2]+(buffer[3]/256);
    rawPacket = buffer;
    console.log("RawPacket: " + rawPacket);
});

endpoint.on("error", function(error) {
    console.log("Endpoint 2 Error:" + error);
});

endpoint.on("end",function() {
    console.log("Endpoint 2 stream ending");
    endpoint.stopPoll(function(data) {
        console.log(data);
    });

    usbGlucometer.close();
});

// send command device
//device.controlTransfer(bmRequestType, bRequest, wValue, wIndex, data_or_length, callback(error, data))
usbGlucometer.controlTransfer(0x21, 0x0A, 0x00, 0x00, protocols.buf01_init, function(err, data) {
    if (err)
        console.log("Error in opening control transfer buf01:" + err.stack);

    //Prepare next reading
    usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf02_time, function(err, data) {
        if (err)
            console.log("Error in opening control transfer buf02_time:" + err.stack);

        //Prepare next reading
        usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf03_time, function(err, data) {
            if (err)
                console.log("Error in opening control transfer buf03_time:" + err.stack);

            //Prepare next reading
            usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf04_time, function(err, data) {
                if (err)
                    console.log("Error in opening control transfer buf04_time:" + err.stack);

                //Prepare next reading
                usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf05_time, function(err, data) {
                    if (err)
                        console.log("Error in opening control transfer buf05_time:" + err.stack);

                    //Prepare next reading
                    usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf06_serlnum, function(err, data) {
                        if (err)
                            console.log("Error in opening control transfer buf06_serlnum:" + err.stack);

                        //Prepare next reading
                        usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf07_swver, function(err, data) {
                            if (err)
                                console.log("Error in opening control transfer buf07_swver:" + err.stack);

                            //Prepare next reading
                            usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf08_date, function(err, data) {
                                if (err)
                                    console.log("Error in opening control transfer buf08_date:" + err.stack);

                                //Prepare next reading
                                usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf09_time, function(err, data) {
                                    if (err)
                                        console.log("Error in opening control transfer buf09_time:" + err.stack);

                                    //Prepare next reading
                                    usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf10_ptname, function(err, data) {
                                        if (err)
                                            console.log("Error in opening control transfer buf10_ptname:" + err.stack);

                                        //Prepare next reading
                                        usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf11_ptid, function(err, data) {
                                            if (err)
                                                console.log("Error in opening control transfer buf11_ptid:" + err.stack);

                                            //Prepare next reading
                                            usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf12_mtrmode, function(err, data) {
                                                if (err)
                                                    console.log("Error in opening control transfer buf12_mtrmode:" + err.stack);

                                                //Prepare next reading
                                                usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf13_timefmt, function(err, data) {
                                                    if (err)
                                                        console.log("Error in opening control transfer buf13_timefmt:" + err.stack);

                                                    //Prepare next reading
                                                    usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf14_gunits, function(err, data) {
                                                        if (err)
                                                            console.log("Error in opening control transfer buf14_gunits:" + err.stack);

                                                        //Prepare next reading
                                                        usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf15_indicators, function(err, data) {
                                                            if (err)
                                                                console.log("Error in opening control transfer buf15_indicators:" + err.stack);

                                                            //Prepare next reading
                                                            usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf16_mldose, function(err, data) {
                                                                if (err)
                                                                    console.log("Error in opening control transfer buf16_mldose:" + err.stack);

                                                                //Prepare next reading
                                                                usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf17_bsldose, function(err, data) {
                                                                    if (err)
                                                                        console.log("Error in opening control transfer buf17_bsldose:" + err.stack);

                                                                    //Prepare next reading
                                                                    usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf18_dosrsttime, function(err, data) {
                                                                        if (err)
                                                                            console.log("Error in opening control transfer buf18_dosrsttime:" + err.stack);

                                                                        //Prepare next reading
                                                                        usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf19_bsltitsetup, function(err, data) {
                                                                            if (err)
                                                                                console.log("Error in opening control transfer buf19_bsltitsetup:" + err.stack);

                                                                            //Prepare next reading
                                                                            usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf20_corsetone, function(err, data) {
                                                                                if (err)
                                                                                    console.log("Error in opening control transfer buf20_corsetone:" + err.stack);

                                                                                //Prepare next reading
                                                                                usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf21_corsettwo, function(err, data) {
                                                                                    if (err)
                                                                                        console.log("Error in opening control transfer buf21_corsettwo:" + err.stack);

                                                                                    //Prepare next reading
                                                                                    usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf22_qctstschdl, function(err, data) {
                                                                                        if (err)
                                                                                            console.log("Error in opening control transfer buf22_qctstschdl:" + err.stack);

                                                                                        //Prepare next reading
                                                                                        usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf23_titdate, function(err, data) {
                                                                                            if (err)
                                                                                                console.log("Error in opening control transfer buf23_titdate:" + err.stack);

                                                                                            //Prepare next reading
                                                                                            usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf24_indicatoronoff, function(err, data) {
                                                                                                if (err)
                                                                                                    console.log("Error in opening control transfer buf24_indicatoronoff:" + err.stack);

                                                                                                //Prepare next reading
                                                                                                usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf25_event, function(err, data) {
                                                                                                    if (err)
                                                                                                        console.log("Error in opening control transfer buf25_event:" + err.stack);

                                                                                                    //Prepare next reading
                                                                                                    usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf26_result, function(err, data) {
                                                                                                        if (err)
                                                                                                            console.log("Error in opening control transfer buf26_result:" + err.stack);

                                                                                                        //Prepare next reading
                                                                                                        usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf27_date, function(err, data) {
                                                                                                            if (err)
                                                                                                                console.log("Error in opening control transfer buf27_date:" + err.stack);

                                                                                                            //Prepare next reading
                                                                                                            usbGlucometer.controlTransfer(0x21, 0x09, 0x200, 0x00, protocols.buf28_time, function(err, data) {
                                                                                                                if (err)
                                                                                                                    console.log("Error in opening control transfer buf28_time:" + err.stack);
                                                                                                            });
                                                                                                        });
                                                                                                    });
                                                                                                });
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
});

// If there is an error or the process doesn't exit cleanly and release the device,
// it can be necessary to remove the device and plug it back in between runs.
// Normally this is not the case but during testing and before getting it working it was
// necessary to clean up when hitting ctrl-c
process.on('SIGINT', function() {
	console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );

	/*try {
		endpoint.stopPoll(function(data) {
            console.log(data);
        });
	}
	catch(err) {
		console.log("Some issues stopping stream 2");
	}*/

	if (interface !== undefined) {
		interface.release(function (err) {
			console.log("Trying to release interface 1: " + err);

			interface.attachKernelDriver();
		});
	}

	try{
		usbGlucometer.close();
		console.log("Glucose device is closed");
	}
	catch(err) {
	}

	process.exit( );
});