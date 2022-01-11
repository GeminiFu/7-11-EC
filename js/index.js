// ------------------------------------------------------------------------------
// 輸入
const packageLocation = document.getElementById("input-location"),
    phoneNumber = document.getElementById("input-phone-number"),
    customerName = document.getElementById("input-name"),
    note = document.getElementById("input-note"),
    inputBtn = document.getElementById("input-btn"),
    key = "packageStorage",
    keyForNewGuy = "ImNew";

let packageData = [];

// 第一次進來沒有 localStorage.getItem(key) 的判定
if (localStorage.getItem(key) !== "" && localStorage.getItem(key) !== null) {
    packageData = JSON.parse(localStorage.getItem(key));
}

// 輸入按鈕事件
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
})

// 刪除 input的內容
function emptyInput() {
    phoneNumber.value = "";
    customerName.value = "";
    note.value = "";
}

// 清除所有資料
const deleteAll = document.getElementById("delete-all");

deleteAll.addEventListener("click", function () {
    packageData = [];
    localStorage.setItem(key, "");

    render(packageList, packageData);
})

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

    render(findList, foundPackageList);

})




// ------------------------------------------------------------------------------
// 清單
const packageList = document.getElementById("package-list");

let deleteBtnArray = [];

render(packageList, packageData);

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