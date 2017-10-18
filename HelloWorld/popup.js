
$(document).ready(function(){
    
    const $name = $("#name")
    const $greet = $("#greet")

    $name.keyup(function(){
        $greet.html("Hello " + $name.val())
    })

})
