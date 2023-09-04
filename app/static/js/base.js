// window.onload = ()=>{

// }

const loader = document.getElementById('loading');

    window.addEventListener('load', function() {
        loader.classList.add('loaded');
      });

    // loadingのtransitionが動作完了後に動かすイベントリスナー
    loading.addEventListener('transitionend', function() {
        loader.style.visibility = "hidden";
    });