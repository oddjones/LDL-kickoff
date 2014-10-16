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
       
        
        $(".datepickerfield").datepicker({
            dateFormat: contourDateFormat,
            changeMonth: true,
            changeYear: true,
            yearRange: 'c-100:c+100'
        });
        
        $(".cancel").click(function () {
            $("#PreviousClicked").val("clicked");
        });
        

        
        $('input[type=submit]').not('.cancel').click(function (evt) {
            evt.preventDefault();
            var self = $(this);
            var frm = self.closest('form');

            // Validation for address lookup form fields should only be executed during submit
            if ($(".LdlAddressLookup[data-field-mandatory='1'] input.LdlAddressLookupPostcode").length) {
                $(".LdlAddressLookup[data-field-mandatory='1'] input.LdlAddressLookupPostcode").rules("add", {
                    postcodeLookup: ""
                });
            }

            frm.validate();
            if (frm.valid()) {
                frm.submit();
                self.attr('disabled', 'disabled');
            } else {
                // Find the first element with a span element with generated=true or class=ield-validation-error (spans communicating error messages) and scroll to it
                // The different selectors are required for different verions of jQuery Validate
                var firstErrorSpan = $(frm).find('div.contourField span[generated="true"], div.contourField span[class="field-validation-error"]').first();
                $(window).scrollTop($(firstErrorSpan).offset().top);

                // Remove any Address Lookup validation events
                if ($(".LdlAddressLookup[data-field-mandatory='1'] input.LdlAddressLookupPostcode").length) {
                    $(".LdlAddressLookup[data-field-mandatory='1'] input.LdlAddressLookupPostcode").rules("remove", 'postcodeLookup');
                }
            }
        });
    });
    
} (jQuery));

