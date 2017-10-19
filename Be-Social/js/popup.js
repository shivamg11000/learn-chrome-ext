
$(function(){
    let socialLinks = []

    
    // add more social links input
    $("#add-more").click(function(){
        if($(".social-link").length < 12)  // limit the social links to 12
           $(".social-link-wrapper").append('<input type="text" class="social-link" placeholder="https://"/></br>')
        else{
            // notify user
            const notifOptions = {
                type: 'basic',
                iconUrl: 'icon48.png',
                title: 'Limit reached!',
                message: "sorry! You can't add more social links",
            }

            // create notification @para notification id, notificationObject, callback
            chrome.notifications.create("limitNotif", notifOptions)
        }
    })

    
    // open tabs for the social links
    $("#open-tabs").click(function(){

        // get the social links from the input tags
        $(".social-link").each(function(){
            const url = $(this).val()
            validateUrl(url) ? socialLinks.push(url) : null
        })

        // get the current window id, total no of tabs in the current window
        chrome.tabs.query({currentWindow: true}, function(obj){
            const windowId = obj[0].windowId
            let totalTabs = obj.length
           
            // open all the social links in new tab
            socialLinks.forEach(function(url){
                chrome.tabs.create({
                    windowId: windowId,
                    index: totalTabs++,
                    url: url
                })
            })

            
        })
     
    })

    
    // type social links to the input tag
    $(document).on('keyup', '.social-link', function(){

        const re = /(https:\/\/)*(.+)/i
        const url = !re.exec($(this).val()) ?
                         $(this).val() : 
                         re.exec($(this).val())[2]  
    
        $(this).val("https://" + url)
    })


})

// url validation
function validateUrl(url){
    const re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i
    return re.test(url)
}