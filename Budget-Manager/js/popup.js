$(document).ready(function(){

    // initially set the previous total spent and the limit if exists
    chrome.storage.sync.get(['total', 'limit'], function(budget){ //budget is an js object which contain total and limit
        $("#total").html(parseInt(budget.total))
        $("#limit").html(parseInt(budget.limit))
        console.log(budget)
    })


    // add to the total and also alert when total exceeds limit
    $("#spendAmount").click(function(){
        chrome.storage.sync.get(['total', 'limit'], function(budget){
            let newTotal = 0

            // if total existed previously
            if (budget.total ){
                newTotal+= parseInt(budget.total)
            }

            let amount = $("#amount").val()
            if(amount){ 
                newTotal += parseInt(amount)
            }
            
            chrome.storage.sync.set({"total": newTotal}, function(){
                if(amount && newTotal >= budget.limit){  //if spend exceeds limit, notify user
                    const notifOptions = {
                        type: 'basic',
                        iconUrl: 'icon48.png',
                        title: 'Limit reached!',
                        message: "Uh, oh! Looks like you've reached your limit!",
                    }

                    // create notification @para notification id, notificationObject, callback
                    chrome.notifications.create("limitNotif", notifOptions)
                }
            })

            $("#total").html(newTotal)
            $("#amount").val('')
        })
    })
})