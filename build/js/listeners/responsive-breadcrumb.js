    // responsive breadcrumb listener - add me to your app.js "Listeners" section

    $(window).resize(function() {

        ellipses1 = $("#breadcrumb :nth-child(2)")
        if ($("#breadcrumb a:hidden").length >0) {ellipses.show()} else {ellipses.hide()}
        
        //Note: #bc1 == your breadcrumb
        
    })