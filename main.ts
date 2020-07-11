function task_3 () {
    task_ongoing = 1
}
function convert_number_to_led_plot (num: number) {
    beacon_leds = [num % 5 - 1, (num - num % 5) / 5]
    return beacon_leds
}
function task_1 () {
    task_ongoing = 1
    input.setAccelerometerRange(AcceleratorRange.EightG)
    while (true) {
        if (input.acceleration(Dimension.Strength) > 6000) {
            for (let index = 0; index < 2; index++) {
                basic.showString("BABABB")
            }
        }
    }
    task_ongoing = 0
}
function task_2 () {
    task_ongoing = 1
    for (let index = 0; index < 2; index++) {
        basic.showString("Vzopy pc dpvd qpx djg")
    }
    task_ongoing = 0
}
function task_manager () {
    if (task_no == 1) {
        task_1()
    } else if (task_no == 2) {
        task_2()
    } else {
    	
    }
}
input.onButtonPressed(Button.AB, function () {
    if (task_ongoing == 0) {
        task_manager()
    }
})
radio.onReceivedValue(function (name, value) {
    incoming_signal = 1
    basic.clearScreen()
    if (name == "beacon" && task_ongoing == 0) {
        if (radio.receivedPacket(RadioPacketProperty.SignalStrength) > -75) {
            serial.writeNumber(radio.receivedPacket(RadioPacketProperty.SignalStrength))
            led.plot(convert_number_to_led_plot(value)[0], convert_number_to_led_plot(value)[1])
            task_no = value
        }
    } else if (task_ongoing == 1 && task_no == 3) {
        if (radio.receivedPacket(RadioPacketProperty.SignalStrength) > -75) {
            if (value == 3) {
                task_3_receiver_activated = 1
            }
        }
    } else if (task_ongoing == 1 && task_no == 3) {
        if (radio.receivedPacket(RadioPacketProperty.SignalStrength) > -75) {
            if (value == 18) {
                task_3_finish_activated = 1
            }
        }
    }
    basic.pause(500)
    basic.clearScreen()
    incoming_signal = 0
    task_3_receiver_activated = 0
    task_3_finish_activated = 0
})
let task_3_finish_activated = 0
let task_3_receiver_activated = 0
let task_no = 0
let beacon_leds: number[] = []
let task_ongoing = 0
let incoming_signal = 0
radio.setGroup(128)
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate115200)
incoming_signal = 0
basic.forever(function () {
    if (task_ongoing == 0 && incoming_signal == 0) {
        basic.showIcon(IconNames.SmallDiamond)
    }
})
