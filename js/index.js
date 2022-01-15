const sideBody = document.getElementById("side-ody"),
    mainBody = document.getElementById("main-body");

// ------------------------------------------------------------------------------
// 輸入
const showInputBtn = document.getElementById("show-input-btn"),
    key = "packageStorage",
    keyForNewGuy = "ImNew";

let packageLocationion,
    phoneNumber,
    customerName,
    inputBtn,
    deleteAll,
    topThreeDataBody,
    packageData = [],
    inputIntervalId;

// 在 mainBody 顯示 inputBody
showInputBtn.addEventListener("click", function () {
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

        <!-- 刪除資料鈕 -->
        <button id="delete-all">刪除所有資料</button>
    </div>
    `

    getInputElement();

    phoneNumber.focus();
})

// 抓取節點
function getInputElement() {
    packageLocation = document.getElementById("input-location");
    phoneNumber = document.getElementById("input-phone-number");
    customerName = document.getElementById("input-name");
    inputBtn = document.getElementById("input-btn"),
        deleteAll = document.getElementById("delete-all"),
        topThreeDataBody = document.getElementById("input-top-three-body");


    inputBtnClickEvent();

    deleteAllBtnClickEvent();
}

// 第一次進來沒有 localStorage.getItem(key) 的判定
if (localStorage.getItem(key) !== "" && localStorage.getItem(key) !== null) {
    packageData = JSON.parse(localStorage.getItem(key));
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

        emptyInput();

        // 存進 localStorage
        localStorage.setItem(key, JSON.stringify(packageData));

        showInputBtn.click();

        renderTopThree(topThreeDataBody);
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

// 刪除 input的內容
function emptyInput() {
    phoneNumber.value = "";
    customerName.value = "";
}

// 清除所有資料
function deleteAllBtnClickEvent() {
    deleteAll.addEventListener("click", function () {
        packageData = [];
        localStorage.setItem(key, "");
    });
}

// TODO: 數字輸入三碼後，觸發事件

// TODO: focus 名字 input
function focusName() {
    customerName.focus();
}

// Enter 事件
window.addEventListener("keydown", function (e) {
    let keyCode = e.code;
    if (keyCode === "Enter") {

        inputBtn.click();
    }
})


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

    findPhoneNumber.focus();
})


// TODO: 數字輸入三碼後，觸發事件


showFindBtn.click();

// 抓取 find 節點
function getFindElement() {
    findPhoneNumber = document.getElementById("find-phone-number");
    findBtn = document.getElementById("find-btn");
    findList = document.getElementById("find-list");

    findBtnClickEvent();
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

        findPhoneNumber.value = "";
    })
}



// ------------------------------------------------------------------------------
// 清單
const showListBtn = document.getElementById("show-list-btn");

let packageList,
    deleteBtnArray = [];

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

    // 賦予 deleteBtn 點擊事件
    deleteBtnArray = document.getElementsByClassName("delete-package-list-item");

    deleteBtn(deleteBtnArray);
}

// 清單項目的刪除按鈕事件
function deleteBtn(obj) {
    for (let i = 0; i < obj.length; i++) {
        obj[i].addEventListener("click", function () {
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