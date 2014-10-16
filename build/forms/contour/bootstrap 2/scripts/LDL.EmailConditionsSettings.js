$(document).ready(function () {

    // reference the div element that contains the email conditions
    var emailConditionsSettingsDiv = $('#EmailConditions');

    // Set up event handlers
    $(emailConditionsSettingsDiv).find("a#loadConditions").click(LoadEmailConditionsValues);
    $(emailConditionsSettingsDiv).find("input").change(SetEmailConditionsValues);
    $(emailConditionsSettingsDiv).find("select").change(SetEmailConditionsValues);
    $(emailConditionsSettingsDiv).find("a.EmailConditionsDelete").click(DeleteEmailCondition);
    //$(emailConditionsSettingsDiv).on("click", "a#loadConditions", LoadEmailConditionsValues);
    //$(emailConditionsSettingsDiv).on("change", "input", SetEmailConditionsValues);
    //$(emailConditionsSettingsDiv).on("change", "select", SetEmailConditionsValues);
    //$(emailConditionsSettingsDiv).on("click", "a.EmailConditionsDelete", DeleteEmailCondition);

    // Update the emailConditionsValues input element fomr data specified in the inputs and selects
    function SetEmailConditionsValues(event) {
        var formDataJson = $(emailConditionsSettingsDiv).find(':input').jsonify({ stringify: true });
        $('#emailConditionsValues').val(formDataJson);
    }

    // Delete an email condition
    function DeleteEmailCondition(event) {
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
                SetEmailConditionsValues(event);
            });
        }
        else {
            resetAttributeNames(currentItem);
            currentItem.find(':input').val("");
            // Update emailConditionsValues
            SetEmailConditionsValues(event);
        }
    }

    // Populate the form fields for the email conditions
    function LoadEmailConditionsValues(event) {
        // The repeater will initially be hidden so that the user needs to load the fields
        // so that any inappropriate modifications to the fields by Contour can be corrected
        $(emailConditionsSettingsDiv).find('.LdlRepeater').show('slow');

        var formDataJson = $('#emailConditionsValues').val();

        var formData = $.parseJSON(formDataJson);

        // Loop through the form data and determine how many email condition rules exist (just see how many input start with a name equal to 'email_')
        var numberConditions = 0;
        $.each(formData, function (key, val) {
            if (key.indexOf("email_") == 0) {
                numberConditions++;
            }
        });

        // Check how many repeating items are present
        numberRepeatingItems = $(emailConditionsSettingsDiv).find('.LdlRepeaterItem').length;

        // Add any additions repeating items that are required
        if (numberRepeatingItems < numberConditions) {
            var itemsRequired = numberConditions - numberRepeatingItems;
            if (itemsRequired > 0) {
                var repeaterContainer = $(emailConditionsSettingsDiv).find('.LdlRepeater').last();
                for (var i = 1; i <= itemsRequired; i++) {
                    AddRepeatingItem(repeaterContainer);
                }
            }
        }

        // Contour is assignig the setting to the first option of the select
        $(emailConditionsSettingsDiv).find('select option:first-child').attr('value', '');

        $.each(formData, function (key, val) {
            $(emailConditionsSettingsDiv).find(':input[name="' + key + '"]').val(val);
        });
    }
});
