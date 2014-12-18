
$(document).ready(function () {

    // Address lookup
    $(".LdlAddressLookupManualLink").click(function (event) {
        event.preventDefault();

        // Fetch the div container for the address lookup form field
        var container = $(this).parents('div.LdlAddressLookup');
        $(container).find('div.LdlAddressLookupManualAddress').show();
    });

    // Introduce a validation method to check whether the user has used the Lookup Postcode function or input the address manually
    $.validator.addMethod(
        "postcodeLookup",
        function (value, element, params) {

            // Retrieve the Address lookup container
            var ldlAddressLookupContainer = $(element).parents('.LdlAddressLookup');

            // Determine the field id (guid) of the address lookup
            var fieldId = $(ldlAddressLookupContainer).data('field-id');

            // Check that either the address has been selected or input manually
            var uprn = fieldId + "_uprn";
            var uprn_value = $("select#" + uprn).find('option:selected').val();
            var address_line1 = fieldId + "_address_line1";
            var address_line1_value = $("input#" + address_line1).val();
            var address_city = fieldId + "_address_city";
            var address_city_value = $("input#" + address_city).val();
            var address_postcode = fieldId + "_address_postcode";
            var address_postcode_value = $("input#" + address_postcode).val();

            if (uprn_value == "" && (address_line1_value == "" || address_city_value == "" || address_postcode_value == ""))
            {
                return false;
            }

            return true;
        },
        "You need to use the Lookup Postcode button to find your address or input it manually."
    );

    // Apply validation to mandatory address field types
    if ($(".LdlAddressLookup[data-field-mandatory='1'] input.LdlAddressLookupPostcode").length) {
        $(".LdlAddressLookup[data-field-mandatory='1'] input.LdlAddressLookupPostcode").rules("add", {
            postcodeLookup: ""
        });
    }

    // Assign an onclick event handler for Address Lookup form fields
    $(".LdlAddressLookupButton").click(function (event) {
        jQuery.support.cors = true;

        // Fetch the div container for the address lookup form field
        var container = $(this).parent('div');

        var message = $(container).find('span.LdlAddressLookupMessage');
        var addressSelect = $(container).find('select');
        var addressSelectContainer = $(addressSelect).parent();

        // Hide the manual input address form fields
        $(container).find('div.LdlAddressLookupManualAddress').hide();

        // Determine the postcode
        var postcode = $(container).find('input.LdlAddressLookupPostcode').val();

        if ($.trim(postcode) == "") {
            $(message).text("Please enter a postcode to look up.");
            $(message).show();
            $(addressSelect).find('option[value!=""]').remove();
            $(addressSelectContainer).hide();
            return;
        }

        var url = "/Base/AddressBaseService/GetAddressesByPostcode/" + postcode;

        $.getJSON(url, function (data) {
            if (typeof (data) == "string") {
            }
            else {
                var i = 0;
                $(addressSelect).find('option[value!=""]').remove();

                $.each(data, function (key, val) {
                    $("<option/>", { html: val.AddressLines, value: val.UPRN + '##' + val.Number }).appendTo($(addressSelect));
                    i = i + 1;
                });

                if (i > 0) {
                    $(addressSelectContainer).show();
                    $(message).hide();
                } else {
                    $(message).text("There were no addresses matching the Postcode you entered.");
                    $(message).show();
                    $(addressSelectContainer).hide();
                }
            }
        }).error(function (jqXHR, textStatus, errorThrown) {
            $(message).text("There was an error finding your address.");
        });
    });
});