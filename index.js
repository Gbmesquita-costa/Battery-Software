const charging = document.querySelector(".charging")
const chargingTime = document.querySelector(".chargingTime")

const levelBattery = document.querySelector(".levelBattery")
const batteryFill = document.querySelector(".batteryFill")

navigator.getBattery().then((battery) => {
  function UpdateBatteryInfo() {
    BaterryChargingInfo()
    
    LevelChargingInfo()
    UpdateBatteryLevel()
  }

  UpdateBatteryInfo()

  // Event triggered when charging status changes
  battery.addEventListener("chargingchange", () => {
    UpdateBatteryInfo()
  })

  // Event triggered when battery level changes
  battery.addEventListener("levelchange", () => {
    UpdateBatteryInfo()
  })

  function LevelChargingInfo() {
    let levelBaterry = parseInt(battery.level * 100)
    levelBattery.innerHTML = levelBaterry + "%"
  }

  function BaterryChargingInfo() {
    if (battery.charging) {
      charging.innerHTML = "Charging"

      if (battery.chargingTime) {
        let hour = parseInt(battery.chargingTime / 3600)
        let minutes = parseInt(battery.chargingTime / 60 - hour * 60)

        chargingTime.innerHTML = `${hour}hr ${minutes}mins remaining`
      }
    } else {
      charging.innerHTML = "Not Charging"

      if (parseInt(battery.dischargingTime)) {
        let hour = parseInt(battery.dischargingTime / 3600)
        let minutes = parseInt(battery.dischargingTime / 60 - hour * 60)

        chargingTime.innerHTML = `${hour}hr ${minutes}mins remaining`
      }
    }
  }

  function UpdateBatteryLevel() {
    let levelBaterry = parseInt(battery.level * 100)

    levelBattery.innerHTML = levelBaterry + "%"
    batteryFill.style.width = `${levelBaterry}%`

    // Set different colors based on battery level
    if (levelBaterry === 100) {
      batteryFill.style.backgroundColor = "#2ecc71" // Green when 100%
    } else if (levelBaterry === 0) {
      batteryFill.style.backgroundColor = "#fff" // Empty when 0%
    } else {
      batteryFill.style.backgroundColor = "#3498db" // Default blue
    }
  }
})