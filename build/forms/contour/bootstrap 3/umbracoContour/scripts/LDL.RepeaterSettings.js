$(document).ready(function () {

    // reference the div element that contains the repeater settings
    var repeatingSettingsDiv = $('#RepeaterSettings');

    // Set up event handlers
    $(repeatingSettingsDiv).find("a#loadRepeaterFields").click(LoadRepeaterFields);
    $(repeatingSettingsDiv).find("input").change(SetRepeaterFields);
    $(repeatingSettingsDiv).find("select").change(SetRepeaterFields);
    $(repeatingSettingsDiv).find("a.RepeaterDelete").click(DeleteRepeaterField);
    //$(repeatingSettingsDiv).on("click", "a#loadRepeaterFields", LoadRepeaterFields);
    //$(repeatingSettingsDiv).on("change", "input", SetRepeaterFields);
    //$(repeatingSettingsDiv).on("change", "select", SetRepeaterFields);
    //$(repeatingSettingsDiv).on("click", "a.RepeaterDelete", DeleteRepeaterField);
    

    // Update the emailConditionsValues input element fomr data specified in the inputs and selects
    function SetRepeaterFields(event) {
        var formDataJson = $(repeatingSettingsDiv).find(':input').jsonify({ stringify: true });
        $('#repeaterValues').val(formDataJson);
    }

    // Delete an email condition
    function DeleteRepeaterField(event) {
        event.preventDefault();
        var currentItem = $(this).parent('div');

        var otherItems = currentItem.siblings('.LdlRepeaterItem');

        var numberOtherItems = otherItems.length;

        if (numberOtherItems > 0) {
            currentItem.slideUp('slow', function () {
                currentItem.remove();

                otherItems.each(function () {
                    resetAttributeNames($(this));
                });
                // Update emailConditionsValues
                SetRepeaterFields(event);
            });
        }
        else {
            resetAttributeNames(currentItem);
            currentItem.find(':input').val("");
            // Update emailConditionsValues
            SetRepeaterFields(event);
        }
    }

    // Populate the form fields for the email conditions
    function LoadRepeaterFields(event) {
        // The repeater will initially be hidden so that the user needs to load the fields
        // so that any inappropriate modifications to the fields by Contour can be corrected
        $(repeatingSettingsDiv).find('.LdlRepeater').show('slow');

        var formDataJson = $('#repeaterValues').val();

        var formData = $.parseJSON(formDataJson);

        // Loop through the form data and determine how many email condition rules exist (just see how many input start with a name equal to 'email_')
        var numberConditions = 0;
        $.each(formData, function (key, val) {
            if (key.indexOf("label_") == 0) {
                numberConditions++;
            }
        });

        // Delete all but the first repeating items (this is required as different form fields may have a different number of fields in a repeater)
        $(repeatingSettingsDiv).find('.LdlRepeaterItem').each(function(index) {
            if (index > 0)
            {
                $(this).remove();
            }
        });


        // Check how many repeating items are present (should be equal to 1)
        numberRepeatingItems = $(repeatingSettingsDiv).find('.LdlRepeaterItem').length;

        // Add any additions repeating items that are required
        if (numberRepeatingItems < numberConditions) {
            var itemsRequired = numberConditions - numberRepeatingItems;
            if (itemsRequired > 0) {
                var repeaterContainer = $(repeatingSettingsDiv).find('.LdlRepeater').last();
                for (var i = 1; i <= itemsRequired; i++) {
                    AddRepeatingItem(repeaterContainer);
                }
            }
        }

        // Contour is assignig the setting to the first option of the select
        $(repeatingSettingsDiv).find('select option:first-child').attr('value', '');
        
        // Contour is removing the values from radio buttons, therefore populate the values again
        $(repeatingSettingsDiv).find(':radio').each(function () {
            var inputValue = $(this).data("radio-value");
            $(this).val(inputValue);
        });

        $.each(formData, function (key, val) {
            $(repeatingSettingsDiv).find(':text[name="' + key + '"]').val(val);
            $(repeatingSettingsDiv).find(':radio[name="' + key + '"][value="' + val + '"]').attr('checked', true);
            $(repeatingSettingsDiv).find('select[name="' + key + '"]').val(val);
        });
    }
});