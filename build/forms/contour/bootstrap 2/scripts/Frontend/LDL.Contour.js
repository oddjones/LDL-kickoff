
$(document).ready(function () {

    // Address lookup
    $(".LdlAddressLookupManualLink").click(function (event) {
        event.preventDefault();
        //show hidden "Clear Address" button (DJ)
        $(".LdlAddressClearButton").removeClass('hideme');
        console.log('here');
        //Hide default postcode lookup fields
        //$(".LDLAddressLookupPCField").addClass('hideme');

        // Fetch the div container for the address lookup form field
        var container = $(this).parents('div.LdlAddressLookup');
        $(container).find('div.LdlAddressLookupManualAddress').show();

        // Reset the select list
        var addressSelect = $(container).find('select');
        $(addressSelect).find('option[value!=""]').remove();
        var addressSelectContainer = $(addressSelect).parent();
        $(addressSelectContainer).hide();
    });

    // Select list of addresses
    $(".LdlAddressSelectList").change(function (event) {
        var container = $(this).parents('div.LdlAddressLookup');
        var message = $(container).find('span.LdlAddressLookupMessage');
        var selectListDiv = $(container).find('div.LdlAddressSelectListDiv');
        var hiddenClearBtn = $(container).find('.LdlAddressClearButton');//(DJ)

        var messageText = "";
        if ($(this).val() != "")
        {
            messageText = "You have selected " + $(this).find('option:selected').text();
        }

        $(message).text(messageText);
        $(message).show();

        //Unhide the Clear address button (DJ)
        $(hiddenClearBtn).removeClass('hideme');

        //Hide the lookup fields
        //$(".LDLAddressLookupPCField").addClass('hideme');

        // Ensure that the div element containing the select list is not in a visible region
        $(selectListDiv).addClass('hideme');
    });

    $(".LdlAddressClearButton").click(function (event) {
        event.preventDefault();
        $(".LdlAddressClearButton").addClass('hideme');//(DJ)
        //$(".LDLAddressLookupPCField").removeClass('hideme');//DJ

        // Fetch the div container for the address lookup form field
        var container = $(this).parents('div.LdlAddressLookup');

        // Reset the inputs and select list
        $(container).find(':input').val("");
        var addressSelect = $(container).find('select');
        $(addressSelect).find('option[value!=""]').remove();

        // hide the manual address inputs, select list and message span
        $(container).find('div.LdlAddressLookupManualAddress').hide();
        var addressSelectContainer = $(addressSelect).parent();
        $(addressSelectContainer).hide();
        var message = $(container).find('span.LdlAddressLookupMessage');
        $(message).hide();

        // Display the Address lookup button
        var lookupButton = $(container).find('button.LdlAddressLookupButton');
        $(lookupButton).show();

        // Ensure that the div element containing the select list is in a visible region
        var selectListDiv = $(container).find('div.LdlAddressSelectListDiv');
        $(selectListDiv).removeClass('hideme');
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

    // Assign an onclick event handler for Address Lookup form fields
    $(".LdlAddressLookupButton").click(function (event) {
        jQuery.support.cors = true;

        // Fetch the div container for the address lookup form field
        var container = $(this).parent('div');

        var message = $(container).find('span.LdlAddressLookupMessage');
        var addressSelect = $(container).find('select');
        var addressSelectContainer = $(addressSelect).parent();
        var lookupButton = $(container).find('button.LdlAddressLookupButton');

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
                    $(lookupButton).hide();
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