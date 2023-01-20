const toastAlert = document.querySelector("#alert")
const charging = document.querySelector(".charging")
const chargingTime = document.querySelector(".chargingTime")
const levelBattery = document.querySelector(".levelBattery")

window.onload = () => {
  if (!navigator.getBattery) {
    alert('Battery Status Api Is Not Supported On Your Browser')
  }

  if (!navigator.onLine) {
    toastAlert.classList.add("online")
    toastAlert.innerHTML = "Is Not Online"

    setTimeout(() => {
      toastAlert.innerHTML = ""
    }, 3000)
  }

  toastAlert.classList.add("online")
  toastAlert.innerHTML = "Status: Online"

  setTimeout(() => {
    toastAlert.innerHTML = ""
  }, 3000)
}

navigator.getBattery().then((battery) => {
  function UpdateBatteryInfo() {
    BaterryChargingInfo()
    LevelChargingInfo()
  }

  UpdateBatteryInfo()

  // Event dispared when is charging change ||
                      //                    \/

  battery.addEventListener("chargingchange", () => {
    UpdateBatteryInfo()
  })

  // Event dispared when is level of battery change ||
                              //                    \/

  battery.addEventListener("levelchange", () => {
    UpdateBatteryInfo()
  })

  function LevelChargingInfo() {
    let levelBaterry = parseInt(battery.level * 100 + "%")
    levelBattery.innerHTML = levelBaterry + "%"
  }

  function BaterryChargingInfo() {
    if (battery.charging) {
      charging.innerHTML = "Charging"

      if (battery.chargingTime) {  
        let hour = parseInt(battery.chargingTime / 3600)
        let minutes = parseInt(battery.chargingTime / 60 - hour * 60)
  
        console.log(minutes)
  
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
})