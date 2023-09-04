console.log(data)
let l = document.getElementById("linelist");
l.addEventListener('change', e =>{
    console.log(e.currentTarget.value);
    location.href = '/list%' + e.currentTarget.value;
});

function get(){
    fetch("/", {
        method: "GET",
      }).then(response => response.text())
      .then(text => {
        console.log(text);
      });
}

function get_err(){
    //正常でないステータスコードを失敗にする例
    fetch("/non-existent-page")
    .then(async response => {
    if (response.ok) {
        return response.text();
    } else {
        throw new Error(`Request failed: ${response.status}`);
    }
    })
    .catch(err => console.error(err)); // Error: Request failed: 404
}