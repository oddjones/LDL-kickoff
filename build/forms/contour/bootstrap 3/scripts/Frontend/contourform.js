(function ($) {
    

    
    $.validator.setDefaults({
        ignore: ":hidden"
    });
    
    $.validator.unobtrusive.adapters.addBool("requiredcb", "required");

    $.validator.addMethod('contour_selectonefromlist', function (value, element) {
        var valid = false;
        $("input", $(element).closest(".checkboxlist, .radiobuttonlist")).each(function (i) {
            if ($(this).is(':checked')) { valid = true; }
        });
        return valid;
    });

    $.validator.unobtrusive.adapters.addBool("requiredlist", "contour_selectonefromlist");

    $.validator.addMethod('contour_regex', function (value, element) {

        var regex = $(element).attr("data-regex");
        var val = $(element).val();
        if (val.length == 0) { return true; }
        return val.match(regex);
    });

    $.validator.unobtrusive.adapters.addBool("regex", "contour_regex");

    $(function () {

        $("#PreviousClicked").val("");
       
        
        $(".datepickerfield").datepicker({ dateFormat: contourDateFormat });
        
        $(".cancel").click(function () {
            $("#PreviousClicked").val("clicked");
        });
        

        
        $('input[type=submit]').not('.cancel').click(function (evt) {
            evt.preventDefault();
            var self = $(this);
            var frm = self.closest('form');
            frm.validate();
            if (frm.valid()) {
                frm.submit();
                self.attr('disabled', 'disabled');

            }
        });
    });
    
} (jQuery));

