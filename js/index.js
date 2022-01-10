// ------------------------------------------------------------------------------
// 輸入
const packageLocation = document.getElementById("input-location"),
    phoneNumber = document.getElementById("input-phone-number"),
    customerName = document.getElementById("input-name"),
    note = document.getElementById("input-note"),
    inputBtn = document.getElementById("input-btn"),
    key = "packageStorage";

let packageData = [
    {
        "位置": "後",
        "後三碼": 123,
        "名字": "傅勝華",
        "註記": "博客來"
    },
    {
        "位置": "後",
        "後三碼": 456,
        "名字": "HAHA",
        "註記": ""
    },
    {
        "位置": "後",
        "後三碼": 456,
        "名字": "HAHA",
        "註記": ""
    },
    {
        "位置": "後",
        "後三碼": 789,
        "名字": "HIHI",
        "註記": "LALALA"
    },
    {
        "位置": "後",
        "後三碼": 789,
        "名字": "HIHI",
        "註記": "LALALA"
    },
    {
        "位置": "後",
        "後三碼": 789,
        "名字": "HIHI",
        "註記": "LALALA"
    }
];


// 輸入按鈕事件
inputBtn.addEventListener("click", function () {
    // 儲存資料進 packageData
    packageData.push(
        {
            "位置": packageLocation[packageLocation.selectedIndex].text,
            "後三碼": parseInt(phoneNumber.value),
            "名字": customerName.value,
            "註記": note.value
        }
    )

    // emptyInput();

    renderEveryPackageData(packageList);

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
// 查詢
const findPhoneNumber = document.getElementById("find-phone-number"),
    findBtn = document.getElementById("find-btn"),
    findList = document.getElementById("find-list");

let foundPackageList = []

findBtn.addEventListener("click", function () {
    foundPackageList = [];

    for (let i = 0; i < packageData.length; i++) {

        if (packageData[i]["後三碼"] === parseInt(findPhoneNumber.value)) {
            foundPackageList.push(packageData[i]);
        }
    }

    console.log(foundPackageList);
})




// ------------------------------------------------------------------------------
// 清單
const packageList = document.getElementById("package-list");

renderEveryPackageData(packageList);


// 渲染初始化
function renderPackageDataInitialize(renderOn) {
    renderOn.innerHTML = `
        <tr>
            <th>位置</th>
            <th>後三碼</th>
            <th>名字</th>
            <th>備註</th>
        </tr>
    `;
}

// 渲染清單
function renderPackageData(renderOn, renderIndex) {
    renderOn.innerHTML += `
            <tr>
                <td>${packageData[renderIndex]["位置"]}</td>
                <td>${packageData[renderIndex]["後三碼"]}</td>
                <td>${packageData[renderIndex]["名字"]}</td>
                <td>${packageData[renderIndex]["註記"]}</td>
            </tr>`
}

// 渲染清單的每一項
function renderEveryPackageData(renderOn) {
    renderPackageDataInitialize(renderOn);

    for (let i = 0; i < packageData.length; i++) {
        renderPackageData(renderOn, i);
    }
}