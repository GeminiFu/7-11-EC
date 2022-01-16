const sideBody = document.getElementById("side-ody"),
    mainBody = document.getElementById("main-body");



// ------------------------------------------------------------------------------
// 輸入
const showInputBtn = document.getElementById("show-input-btn"),
    key = "packageStorage",
    keyForNewGuy = "ImNew";


let packageLocation,
    phoneNumber,
    customerName,
    inputBtn,
    editLocationData,
    deleteAll,
    topThreeDataBody,
    packageData = [],
    inputIntervalId;

// 第一次進來沒有 localStorage.getItem(key) 的判定
if (localStorage.getItem(key) !== "" && localStorage.getItem(key) !== null) {
    packageData = JSON.parse(localStorage.getItem(key));
}

// 在 mainBody 顯示 inputBody
showInputBtn.addEventListener("click", function () {


    // 渲染輸出頁面
    mainBody.innerHTML = `
    <!-- 輸入 -->
    <div id="input-body show">
        <select name="input-location" id="input-location">
            <option value="">後</option>
            <option value="">旁</option>
            <option value="">倉</option>
            <option value="">DM</option>
            <option value="">博克萊</option>
        </select>
        <input type="number" id="input-phone-number" placeholder="後三碼">
        <input type="text" id="input-name" placeholder="名字">

        <div>
            <button id="input-btn">送出</button>
        </div>

        <table>
            <tbody id="input-top-three-body">
            </tbody>
        </table>

        <!-- 編輯位置 -->
        <button id="edit-location-data">編輯位置</button>
        <!-- 刪除資料鈕 -->
        <button id="delete-all">刪除所有資料</button>
    </div>
    `

    // 抓取節點
    getInputElement();

    // 輸入按鈕事件
    inputBtnClickEvent();

    phoneNumber.focus();

    // 輸入後三碼點擊事件
    phoneNumberClickEvent();

    // 點擊後三碼
    phoneNumber.click();

    // 渲染前三項
    renderTopThree(topThreeDataBody);

    deleteAllBtnClickEvent();

    editLocationDataClickEvent();
})

// 抓取節點
function getInputElement() {
    packageLocation = document.getElementById("input-location");
    phoneNumber = document.getElementById("input-phone-number");
    customerName = document.getElementById("input-name");
    inputBtn = document.getElementById("input-btn"),
        editLocationData = document.getElementById("edit-location-data"),
        deleteAll = document.getElementById("delete-all"),
        topThreeDataBody = document.getElementById("input-top-three-body");
}


// 輸入按鈕事件
function inputBtnClickEvent() {
    inputBtn.addEventListener("click", function () {
        // 儲存資料進 packageData
        packageData.unshift(
            {
                "位置": packageLocation[packageLocation.selectedIndex].text,
                "後三碼": parseInt(phoneNumber.value),
                "名字": customerName.value
            }
        )

        // 存進 localStorage
        localStorage.setItem(key, JSON.stringify(packageData));

        // 清空 input 內容
        // emptyInput(phoneNumber, customerName);

        // 重新渲染輸出畫面
        showInputBtn.click();
    });
}


// 渲染前三項
function renderTopThree(renderOn) {
    let topThreePackageData = [],
        dataLength = packageData.length;

    if (dataLength >= 3) {
        dataLength = 3;
    }


    for (let i = 0; i < dataLength; i++) {
        topThreePackageData.push(packageData[i]);
    }



    render(renderOn, topThreePackageData);
}

// phoneNumber 點擊事件
function phoneNumberClickEvent() {
    phoneNumber.addEventListener("click", function () {
        let intervalId;

        phoneNumber.value = "";

        intervalId = setInterval(() => {
            if (phoneNumber.value.length === 3) {
                customerName.focus();

                clearInterval(intervalId);
            }
        }, 100);
    });
}

// 清除所有資料
function deleteAllBtnClickEvent() {
    deleteAll.addEventListener("click", function () {
        packageData = [];
        localStorage.setItem(key, "");
    });
}

// Enter 事件
window.addEventListener("keydown", function (e) {
    let keyCode = e.code;
    if (keyCode === "Enter") {

        inputBtn.click();
    }
})

// TODO: 紀錄日期，過了一天，讓清除資料 high light


// TODO: 編輯位置點擊事件
function editLocationDataClickEvent() {
    editLocationData.addEventListener("click", function () {
        console.log(this);
        // 打開一個 location data body 視窗在 mainBody
        mainBody.innerHTML += `
        <div id="location-data-background">
            <table>
                <tbody id ="location-data-body"></tbody>
            </table>
        </div>
    `
        let locationDataBody = document.getElementById("location-data-body");

        // 在 location data body 渲染 packageLocation 裡的 option
        for (let i = 0; i < packageLocation.children.length; i++) {
            locationDataBody.innerHTML += `
            <tr>
                <td>${packageLocation.children[i].text}</td>
                <td><button class="location-delete-btn">X</button></td>
            </tr>
            `
        }

        locationDataBody.innerHTML += `
        <tr>
            <td><button>新增位置</button></td>
            <td><button id="leave-edit-location-btn">離開</button></td>
        <tr>
        `

        locationDeleteBtn();

        leaveEditLocation();
    })
}

// location delete btn
function locationDeleteBtn() {
    let locationDeleteBtnArr = document.getElementsByClassName("location-delete-btn");

    for (let i = 0; i < locationDeleteBtnArr.length; i++) {
        locationDeleteBtnArr[i].addEventListener("click", function () {
            console.log(this.parentNode.parentNode);

            let thisTr = this.parentNode.parentNode;

            thisTr.parentNode.removeChild(thisTr)
        })
    }
}

// leave edit location btn
function leaveEditLocation() {
    let leaveEditLocationBtn = document.getElementById("leave-edit-location-btn"),
        allEditLocation = document.getElementById("location-data-background");

    leaveEditLocationBtn.addEventListener("click", function () {
        console.log(this);

        mainBody.removeChild(allEditLocation);
    })
}

// ------------------------------------------------------------------------------
// 查詢
const showFindBtn = document.getElementById("show-find-btn");


let findPhoneNumber,
    findBtn,
    findList,
    foundPackageList = [];

// 在 mainBody 顯示 findBody
showFindBtn.addEventListener("click", function () {
    mainBody.innerHTML = `
    <div id="find-body">
            <input type="number" id="find-phone-number">
            <button id="find-btn">送出</button>
        </div>

        <table>
            <tbody id="find-list"></tbody>
        </table>
    `

    getFindElement();

    findBtnClickEvent();

    findPhoneNumber.focus();

    findPhoneNumberClickEvent();
})



// findPhoneNumber 點擊事件
function findPhoneNumberClickEvent() {
    findPhoneNumber.addEventListener("click", function () {
        let intervalId;

        findPhoneNumber.value = "";

        intervalId = setInterval(() => {
            if (findPhoneNumber.value.length === 3) {
                findBtn.click();

                clearInterval(intervalId);
            }
        }, 100);
    });
}

// 抓取 find 節點
function getFindElement() {
    findPhoneNumber = document.getElementById("find-phone-number");
    findBtn = document.getElementById("find-btn");
    findList = document.getElementById("find-list");
}

// 查詢按鈕
function findBtnClickEvent() {
    findBtn.addEventListener("click", function () {
        foundPackageList = [];

        for (let i = 0; i < packageData.length; i++) {

            if (packageData[i]["後三碼"] === parseInt(findPhoneNumber.value)) {
                foundPackageList.push(packageData[i]);
            }
        }

        render(findList, foundPackageList);

        findPhoneNumber.click();
    })
}

showFindBtn.click();

// ------------------------------------------------------------------------------
// 清單
const showListBtn = document.getElementById("show-list-btn");

let packageList;

// 在 mainBody 顯示 listBody
showListBtn.addEventListener("click", function () {
    mainBody.innerHTML = `
    <div id="list-body">
        <table>
            <tbody id="package-list">
                <tr>
                    <th>位置</th>
                    <th>後三碼</th>
                    <th>名字</th>
                </tr>
            </tbody>
        </table>
    </div>
    `

    getListElement()

    render(packageList, packageData);
})

// 抓取 list 節點
function getListElement() {
    packageList = document.getElementById("package-list");
}

// 渲染清單
function render(renderOn, renderObject) {
    // 渲染開頭欄位
    renderOn.innerHTML = `
        <tr>
            <th>位置</th>
            <th>後三碼</th>
            <th>名字</th>
            <th></th>
        </tr>
    `;

    // 渲染目標的每個項目
    for (let i = 0; i < renderObject.length; i++) {
        renderOn.innerHTML += `
            <tr>
                <td>${renderObject[i]["位置"]}</td>
                <td>${renderObject[i]["後三碼"]}</td>
                <td>${renderObject[i]["名字"]}</td>
                <td><button class="delete-package-list-item" data-target="${i}">X</button></td>
            </tr>`
    }

    listDeleteBtn();
}

// 清單項目的刪除按鈕事件
function listDeleteBtn() {
    let listDeleteBtnArray = document.getElementsByClassName("delete-package-list-item");

    for (let i = 0; i < listDeleteBtnArray.length; i++) {
        listDeleteBtnArray[i].addEventListener("click", function () {
            const thisTr = this.parentNode.parentNode;
            tbody = thisTr.parentNode;

            let targetNumber = this.dataset.target;

            // 從 packageData 移除
            packageData.splice(targetNumber, 1);

            // 儲存進 localStorage
            localStorage.setItem(key, JSON.stringify(packageData));

            // 從 tbody 移除
            tbody.removeChild(thisTr);
        })
    }
}







































// 備用資料
// packageData = [
//     {
//         "位置": "後",
//         "後三碼": 123,
//         "名字": "傅勝華",
//         "註記": "博客來"
//     },
//     {
//         "位置": "後",
//         "後三碼": 456,
//         "名字": "HAHA",
//         "註記": ""
//     },
//     {
//         "位置": "後",
//         "後三碼": 456,
//         "名字": "HAHA",
//         "註記": ""
//     },
//     {
//         "位置": "後",
//         "後三碼": 789,
//         "名字": "HIHI",
//         "註記": "LALALA"
//     },
//     {
//         "位置": "後",
//         "後三碼": 789,
//         "名字": "HIHI",
//         "註記": "LALALA"
//     },
//     {
//         "位置": "後",
//         "後三碼": 789,
//         "名字": "HIHI",
//         "註記": "LALALA"
//     },
//     {
//         "位置": "後",
//         "後三碼": 123,
//         "名字": "傅勝華",
//         "註記": "博客來"
//     },
//     {
//         "位置": "後",
//         "後三碼": 123,
//         "名字": "傅勝華",
//         "註記": "博客來"
//     },
//     {
//         "位置": "後",
//         "後三碼": 123,
//         "名字": "傅勝華",
//         "註記": "博客來"
//     },
//     {
//         "位置": "後",
//         "後三碼": 456,
//         "名字": "傅勝華",
//         "註記": "博客來"
//     }
// ]