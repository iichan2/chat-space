$(function(){
  function buildHTML(message){
    var html = `<div class="message">
                 <div class="message-status">
                   <div class="talker">
                     ${ message.name }
                   </div>
                   <div class="date">
                     ${ message.created_at }
                   </div>
                 </div>
                   <div class="text">
                    <p class="content">
                      ${ message.content }
                    </p>   
                   </div>
                </div>`
    return  html;
  }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('messages').append(html);
      $('#message_content').val('');
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('エラー');
      $('.form__submit').prop('disabled', false);
    })
  })
});