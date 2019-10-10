$(document).on('turbolinks:load', function(){
  function buildHTML(message){
  
  let image =  message.image.url? `<div class="image"><img src=${message.image.url}></div> `:" ";
    let html = `<div class="message" data-message-id="${message.id}">
                 <div class="message-status">
                   <div class="talker">
                     ${ message.user_name }
                   </div>
                   <div class="date">
                     ${ message.time }
                   </div>
                 </div>
                   <div class="text">
                    <p class="content">
                      ${ message.content }
                    </p>
                      ${image}
                   </div>
                </div>`
    return  html;
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.submit-btn').prop('disabled', false);
      console.log($('.messages')[0])
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('エラー');
      $('.form__submit').prop('disabled', false);
    })  
  })

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $(".message:last").data("message-id")
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: 'api/messages',
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages)
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.forEach(function(message){
      //メッセージが入ったHTMLを取得
      insertHTML = buildHTML(message);
      //メッセージを追加
      $('.messages').append(insertHTML);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      });
    })
    .fail(function() {
      console.log('error');
    });
  };
  setInterval(reloadMessages, 5000);
});



