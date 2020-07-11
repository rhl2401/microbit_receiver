function task_3 () {
    task_ongoing = 1
    while (true) {
        basic.showIcon(IconNames.No)
        if (task_3_receiver_activated == 1) {
            break;
        }
    }
    running_time = input.runningTime()
    while (current_timer < 0) {
        current_timer = running_time + countdown_timer_run - input.runningTime()
        basic.showNumber(Math.floor(current_timer / 1000))
        if (task_3_finish_activated == 1) {
            break;
        }
    }
    if (current_timer > 0 && task_3_finish_activated == 1) {
        for (let index = 0; index < 2; index++) {
            basic.showString("AABBABA")
        }
    } else {
        basic.showIcon(IconNames.Sad)
        basic.pause(5000)
    }
    task_ongoing = 0
}
function task_6 () {
    task_ongoing = 1
    while (steps < 500) {
        if (input.isGesture(Gesture.Shake)) {
            steps += 1
            basic.showNumber(steps)
        }
    }
    for (let index = 0; index < 2; index++) {
        basic.showString("BABABBA")
    }
    task_ongoing = 0
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
    // Opgave 5 er uden brug af modtageren
    if (task_no == 1) {
        task_1()
    } else if (task_no == 2) {
        task_2()
    } else if (task_no == 3) {
        task_3()
    } else if (task_no == 4) {
        task_4()
    } else if (task_no == 5) {
    	
    } else if (task_no == 6) {
        task_6()
    } else {
    	
    }
}
function morse (text: string) {
    if (text == "A") {
        music.playTone(440, music.beat(BeatFraction.Quarter))
        music.rest(music.beat(BeatFraction.Eighth))
        music.playTone(440, music.beat(BeatFraction.Whole))
    } else {
        music.playTone(440, music.beat(BeatFraction.Whole))
        music.rest(music.beat(BeatFraction.Eighth))
        music.playTone(440, music.beat(BeatFraction.Quarter))
        music.rest(music.beat(BeatFraction.Eighth))
        music.playTone(440, music.beat(BeatFraction.Quarter))
        music.rest(music.beat(BeatFraction.Eighth))
        music.playTone(440, music.beat(BeatFraction.Quarter))
    }
    music.rest(music.beat(BeatFraction.Breve))
}
input.onButtonPressed(Button.AB, function () {
    if (task_ongoing == 0) {
        task_manager()
    }
})
function task_4 () {
    task_ongoing = 1
    basic.pause(1000)
    morse("A")
    morse("B")
    morse("A")
    morse("A")
    morse("A")
    morse("B")
    morse("A")
    morse("B")
    morse("B")
    morse("A")
    task_ongoing = 0
}
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
        if (value == 5) {
            task_3_finish_activated = 1
        }
    }
    basic.pause(500)
    basic.clearScreen()
    incoming_signal = 0
    task_3_receiver_activated = 0
    task_3_finish_activated = 0
})
let task_no = 0
let beacon_leds: number[] = []
let steps = 0
let task_3_finish_activated = 0
let current_timer = 0
let running_time = 0
let task_3_receiver_activated = 0
let task_ongoing = 0
let countdown_timer_run = 0
let incoming_signal = 0
radio.setGroup(128)
serial.redirectToUSB()
serial.setBaudRate(BaudRate.BaudRate115200)
incoming_signal = 0
countdown_timer_run = 15000
basic.forever(function () {
    if (task_ongoing == 0 && incoming_signal == 0) {
        basic.showIcon(IconNames.SmallDiamond)
    }
})
