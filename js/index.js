// 輸入
const packageLocation = document.getElementById("input-location"),
    phoneNumber = document.getElementById("input-phone-number"),
    customerName = document.getElementById("input-name"),
    note = document.getElementById("input-note"),
    inputBtn = document.getElementById("input-btn"),
    key = "packageStorage";

let packageData = [];

// 輸入按鈕事件
inputBtn.addEventListener("click", function () {
    // 儲存資料進 packageData
    packageData.push(
        {
            "位置": packageLocation[packageLocation.selectedIndex].text,
            "後三碼": phoneNumber.value,
            "名字": customerName.value,
            "註記": note.value
        }
    )

    // emptyInput();

    // 存進 localStorage
    localStorage.setItem(key, JSON.stringify(packageData));
})

// 刪除 input的內容
function emptyInput() {
    phoneNumber.value = "";
    customerName.value = "";
    note.value = "";
}

// ------------------------------------------------------------------------------
// 尋找

// ------------------------------------------------------------------------------
// 清單
const packageList = document.getElementById("package-list");


console.log(packageData.length)

// 以輸入按鈕為觸發放入 packageData
inputBtn.addEventListener("click", function () {
    packageList.innerHTML = `
        <tr>
            <th>位置</th>
            <th>後三碼</th>
            <th>名字</th>
            <th>備註</th>
        </tr>
    `;

    for (let i = 0; i < packageData.length; i++) {
        packageList.innerHTML += `
            <tr>
                <td>${packageData[i]["位置"]}</td>
                <td>${packageData[i]["後三碼"]}</td>
                <td>${packageData[i]["名字"]}</td>
                <td>${packageData[i]["註記"]}</td>
            </tr>`
    }
})