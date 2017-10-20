
$(function(){
    let socialLinks = []
    const inputTemplate = '<div><input type="text" class="social-link link0" placeholder="https://"/><span>X</span></div>'

    // load social links if stored/exist previously
    chrome.storage.sync.get('socialLinks', function(object){
        if(!object)
            return null

        socialLinks = [...object.socialLinks]
        for(let i = (socialLinks.length-3) ; i>0; i--){
            $('.social-link-wrapper').append(inputTemplate)
        }

        let i = 0;
        $('.social-link').each(function(){
            $(this).val(socialLinks[i++])
        })
    })
    
    // add more social links input
    $("#add-more").click(function(){
        if($(".social-link").length < 12)  // limit the social links to 12
           $(".social-link-wrapper").append(inputTemplate)
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
        socialLinks = []


        // get the social links from the input tags
        $(".social-link").each(function(){
            const url = $(this).val()
            
            if(validateUrl(url)){
                /(https:\/\/|http:\/\/).+/i.test(url) ? socialLinks.push(url) : socialLinks.push('https://' + url)  
            }
        })


        chrome.storage.sync.set({'socialLinks': socialLinks})

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

    // remove the input tags
    $(document).on('click', '.social-link-wrapper span', function(){
        $(this).parent().remove()
    })

})

// url validation
function validateUrl(url){
    const re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i
    return re.test(url)
}