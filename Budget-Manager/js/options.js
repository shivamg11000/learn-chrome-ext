$(document).ready(function(){

    // if limit exists previously
    chrome.storage.sync.get('limit', function(budget){
        $("#limit").val(budget.limit)
    })


    $("#saveLimit").click(function(){
        const limit = $("#limit").val()


        if(limit){
            chrome.storage.sync.set({"limit": parseInt(limit)}, function(){
                close()
            })
        }

    })

    
    $("#resetTotal").click(function(){
        chrome.storage.sync.set({"limit": 0}, function(){
            const notifOptions = {
                type: "basic",
                iconUrl: "icon48.png",
                title: "Total Reseted",
                message: "oh! You reseted the total spend to 0"
            }
            chrome.notifications.create("resetTotalNotify", notifOptions)
        })

    })

})