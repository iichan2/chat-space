$(document).on('turbolinks:load', function(){
// ユーザーリストをだす
  var search_list = $("#user-search-result");

  function appendUser(user) {
     var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${ user.name }</p>
                    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${ user.name }">追加</div>
                  </div>`
    appendMessage(message)
  }                
   function appendErrMsgToHTML(msg) {
      var html = `<li>
                    <div class='listview__element--right-icon'>${ msg }</div>
                 </li>`
    search_list.append(html);
  }
  $('#user-search-field').on('keyup',function(e){
   e.preventDefault();
   var input = $('#user-search-field').val();

   $.ajax({
    type: 'GET',
    url: '/users',
    data: { keyword: input },
    dataType: 'json'
   })
   .done(function(users) {
     $("#user-search-result").empty();
     if (users.length !== 0) {
      users.forEach(function(user){
        appendUser(user);
      });
    }
    else {
      appendErrMsgToHTML("一致するユーザーはいません");
     }
   })
   .fail(function() {
    alert('ユーザー検索に失敗しました');
  })
  });
// リストからユーザーを追加する
var add_list = $(".chat-group-users");

function addUser(id, name) {

  var html = `<div class='chat-group-user'>
               <input name='group[user_ids][]' type='hidden' value='${ id }'>
               <p class='chat-group-user__name'>${ name }</p>
               <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
   add_list.append(html);
}
  $('#user-search-result').on('click',".chat-group-user__btn--add",function(){
  $(this).parent().remove()
  var name = $(this).data('user-name');
  var id = $(this).data('user-id');
    addUser(id, name);  
  });
// 追加リストから削除する
  $('.chat-group-form__field--right').on('click','.js-remove-btn',function(){
  $(this).parent().remove()
  });
});