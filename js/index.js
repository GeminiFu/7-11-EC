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
    note,
    inputBtn,
    deleteAll,
    packageData = [];

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
        </select>
        <input type="text" id="input-phone-number" placeholder="後三碼" value="123">
        <input type="text" id="input-name" placeholder="名字" value="傅勝華">
        <input type="text" id="input-note" placeholder="註記" value="博客來">
        <button id="input-btn">送出</button>

        <!-- 刪除資料鈕 -->
        <button id="delete-all">刪除所有資料</button>
    </div>
    `

    getInputElement();
})

// 抓取節點
function getInputElement() {
    packageLocation = document.getElementById("input-location");
    phoneNumber = document.getElementById("input-phone-number");
    customerName = document.getElementById("input-name");
    note = document.getElementById("input-note");
    inputBtn = document.getElementById("input-btn"),
        deleteAll = document.getElementById("delete-all");


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
                "名字": customerName.value,
                "註記": note.value
            }
        )

        // emptyInput();

        render(packageList, packageData);

        // 存進 localStorage
        localStorage.setItem(key, JSON.stringify(packageData));
    });
}

// 刪除 input的內容
function emptyInput() {
    phoneNumber.value = "";
    customerName.value = "";
    note.value = "";
}

// 清除所有資料
function deleteAllBtnClickEvent() {
    deleteAll.addEventListener("click", function () {
        packageData = [];
        localStorage.setItem(key, "");

        render(packageList, packageData);
    });
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
            <input type="text" id="find-phone-number">
            <button id="find-btn">送出</button>
        </div>

        <table>
            <tbody id="find-list"></tbody>
        </table>
    `

    getFindElement();
})

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
                    <th>備註</th>
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
            <th>備註</th>
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
                <td>${renderObject[i]["註記"]}</td>
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