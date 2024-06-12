
// drag 設定
document.querySelector(".box.drag").draggable = true;
document.querySelector(".box.drag").addEventListener("dragstart", onDragStart);

// drop 設定
document.querySelectorAll(".box.drop").forEach((element) => {
    element.addEventListener("drop", onDrop);
    element.addEventListener("dragover", onDragover);
    element.addEventListener("dragenter", onDragenter);
    element.addEventListener("dragleave", onDragleave);
});

/**
 * ドラッグ処理
 * @param {Event} event 
 */
function onDragStart(event) {
    event.dataTransfer.setData("text", event.currentTarget.id);
}

/**
 * ドロップ処理
 * @param {Event} event 
 */
function onDrop(event) {
    event.currentTarget.classList.remove("dragging");
    const boxs = [...document.querySelectorAll(".box")];
    if (boxs.indexOf(event.currentTarget) === 0) {
        event.currentTarget.before(document.getElementById(event.dataTransfer.getData("text")));
    } else {
        event.currentTarget.after(document.getElementById(event.dataTransfer.getData("text")));
    }
}

/**
 * 操作が要素上に入ってきたとき
 * @param {Event} event 
 */
function onDragenter(event) {
    event.currentTarget.classList.toggle("dragging");
}

/**
 * 操作が要素上から出たとき
 * @param {Event} event 
 */
function onDragleave(event) {
    event.currentTarget.classList.toggle("dragging");
}

/**
 * 操作が要素上を通過してるとき
 * @param {Event} event 
 */
function onDragover(event) {
    event.preventDefault();
}
