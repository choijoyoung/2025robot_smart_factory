function 불량일때 () {
    for (let index = 0; index < 3; index++) {
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
        basic.pause(200)
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        basic.pause(200)
    }
    motor.MotorRun(motor.Motors.M1, motor.Dir.CW, 255)
    motor.servo(motor.Servos.S8, 0)
    basic.pause(3500)
    motor.motorStop(motor.Motors.M1)
    motor.servo(motor.Servos.S8, 90)
}
function 정상일때 () {
    for (let index = 0; index < 3; index++) {
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
        basic.pause(200)
        strip.showColor(neopixel.colors(NeoPixelColors.Blue))
        basic.pause(200)
    }
    motor.MotorRun(motor.Motors.M1, motor.Dir.CW, 255)
    basic.pause(6000)
}
let ID = 0
let strip: neopixel.Strip = null
huskylens.initI2c()
huskylens.initMode(protocolAlgorithm.ALGORITHM_TAG_RECOGNITION)
strip = neopixel.create(DigitalPin.P14, 8, NeoPixelMode.RGB)
strip.clear()
strip.showColor(neopixel.colors(NeoPixelColors.Black))
basic.forever(function () {
    motor.servo(motor.Servos.S8, 90)
    huskylens.request()
    if (huskylens.isAppear_s(HUSKYLENSResultType_t.HUSKYLENSResultBlock)) {
        ID = huskylens.readBox_s(Content3.ID)
        motor.motorStop(motor.Motors.M1)
        basic.pause(500)
        while (0 < pins.digitalReadPin(DigitalPin.P13)) {
            motor.MotorRun(motor.Motors.M1, motor.Dir.CW, 255)
        }
        basic.pause(200)
        motor.motorStop(motor.Motors.M1)
        basic.pause(1000)
        if (ID == 1 || ID == 2 || ID == 3) {
            정상일때()
        } else if (ID == 4) {
            불량일때()
        }
    } else {
        motor.motorStop(motor.Motors.M1)
        basic.pause(100)
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
        motor.servo(motor.Servos.S8, 90)
    }
})
