$(function(){
  function buildHTML(message){
  
  let image =  message.image.url? `<div class="image"><img src=${message.image.url}></div> `:" ";
    let html = `<div class="message">
                 <div class="message-status">
                   <div class="talker">
                     ${ message.user_name }
                   </div>
                   <div class="date">
                     ${ message.time.strftime("%Y/%m/%d %H:%M")}
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
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});

 
    })
    .fail(function(){
      alert('エラー');
      $('.form__submit').prop('disabled', false);
    })
  })
});

