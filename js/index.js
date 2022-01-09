const packageLocation = document.getElementById("location"),
    phoneNumber = document.getElementById("phone-number"),
    customerName = document.getElementById("name"),
    note = document.getElementById("note"),
    sendBtn = document.getElementById("send-btn"),
    key = "packageStorage";

let packageData = [];

console.log(sendBtn);

sendBtn.addEventListener("click", function () {
    packageData.push(
        {
            "位置": packageLocation[packageLocation.selectedIndex].text,
            "後三碼": phoneNumber.value,
            "名字": customerName.value,
            "註記": note.value
        }
    )
    console.log(packageData);

    localStorage.setItem(key, JSON.stringify(packageData));
})