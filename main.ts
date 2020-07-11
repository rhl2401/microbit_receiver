function convert_number_to_led_plot (num: number) {
    beacon_leds = [num % 5 - 1, (num - num % 5) / 5]
    return beacon_leds
}
function task_1 () {
    input.setAccelerometerRange(AcceleratorRange.EightG)
    while (true) {
    	
    }
}
function task_2 () {
    for (let index = 0; index < 2; index++) {
        basic.showString("Vzopy pc dpvd qpx djg")
    }
    task_ongoing = 0
}
function task_manager () {
    if (task_no == 1) {
        task_1()
    }
    task_ongoing = 1
}
input.onButtonPressed(Button.AB, function () {
    task_manager()
})
radio.onReceivedValue(function (name, value) {
    if (name == "beacon" && task_ongoing == 0) {
        if (radio.receivedPacket(RadioPacketProperty.SignalStrength) > -75) {
            serial.writeNumber(radio.receivedPacket(RadioPacketProperty.SignalStrength))
            led.plot(convert_number_to_led_plot(value)[0], convert_number_to_led_plot(value)[1])
            task_no = value
        }
    }
    basic.pause(500)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
})
let task_no = 0
let task_ongoing = 0
let beacon_leds: number[] = []
radio.setGroup(128)
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate115200)
basic.forever(function () {
	
})
