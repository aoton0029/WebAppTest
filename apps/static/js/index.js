// 年と月の初期データ
var data = {
    year: 2024,
    month: 'March' // 月の名前や数字に合わせて変更してください
  };
  
  // 定期的にPOSTリクエストを送信する関数
  function sendPostRequest() {
    fetch('/generate_image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.blob()) // レスポンスをBlob形式で取得
    .then(blob => {
      // blobを画像として表示する例
      var imageUrl = URL.createObjectURL(blob);
      var imgElement = document.createElement('img');
      imgElement.src = imageUrl;
  
      // 既存の画像を削除して新しい画像を表示
      var existingImg = document.getElementById('dynamic-image');
      if (existingImg) {
        document.body.removeChild(existingImg);
      }
      imgElement.id = 'dynamic-image';
      document.body.appendChild(imgElement);
    })
    .catch(error => console.error('Error:', error));
  }
  
  // 5秒ごとにPOSTリクエストを送信する（1000ミリ秒 = 1秒）
  setInterval(sendPostRequest, 5000); // 5000ミリ秒 = 5秒