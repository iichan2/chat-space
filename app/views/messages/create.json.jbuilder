json.user_name    @message.user.name
json.(@message, :content, :image)
json.time         @message.created_at.strftime("%Y/%m/%d  %H:%M")
json.id           @message.id