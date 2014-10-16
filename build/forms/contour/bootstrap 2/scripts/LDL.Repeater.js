$(document).ready(function () {

    // Assign an onclick event handler to all Repeater Add links
    $(".LdlRepeaterAdd").click(function (event) {
        event.preventDefault();
        AddRepeatingItem($(this).parent());
    });

    // Assign an onClick event handler to all Repeater Delete links
    $(".LdlRepeaterDelete").click(function (event) {
        event.preventDefault();
        var currentItem = $(this).parent('div');

        var otherItems = currentItem.siblings('.LdlRepeaterItem');

        var numberOtherItems = otherItems.length;

        if (numberOtherItems > 0) {
            currentItem.slideUp('slow', function () {
                currentItem.remove();

                // reset indexes
                otherItems.each(function () {
                    resetAttributeNames($(this));
                });
            });
        } else {
            resetAttributeNames(currentItem);
            currentItem.find(':input').val("");
        }
    });   
});

// Add another email condition
function AddRepeatingItem(repeaterContainer) {
    // Fetch the last repearing item and clone it
    var lastRepeatingGroup = $(repeaterContainer).find('.LdlRepeaterItem').last();
    var clone = lastRepeatingGroup.clone(true);

    // Reset form values (this will need extending if other form field types are used)
    $(clone).find('input:text').val("");
    $(clone).find('input:radio').removeAttr("checked");
    $(clone).find('a.LdlRepeaterDelete').show();

    // Change the IDs of the cloned element
    var idx = lastRepeatingGroup.index();
    resetAttributeNames(clone, idx + 1);

    // Insert the repeating element
    clone.insertAfter(lastRepeatingGroup);

    // Reinstate validation rules (setting the clone parameter to true did not appear to clone the jquery validate event handler)
    $(clone).find(':input[data-val="true"]').each(function () {
        $(this).rules('add', {
            required: true
        });
    });

    // Reinstate date picker
    var datePicker = $(clone).find('.datepickerfield');
    $(datePicker).datepicker("destroy");
    $(datePicker).removeClass("hasDatepicker").removeAttr('id');
    $(datePicker).datepicker({
        dateFormat: contourDateFormat,
        changeMonth: true,
        changeYear: true,
        yearRange: 'c-100:c+100'
    });
}

// -- Modify attributes of the cloned elements
var attrs = ['for', 'id', 'name', 'data-valmsg-for'];
function resetAttributeNames(section, idx) {
    var tags = section.find('input, label, select, span, textarea');
    var sectionIndex = '';
    if (idx != undefined) {
        sectionIndex = idx;
    }
    else {
        sectionIndex = section.index();
    }
    tags.each(function () {
        var $this = $(this);
        $.each(attrs, function (i, attr) {
            var attr_val = $this.attr(attr);
            if (attr_val) {
                $this.attr(attr, attr_val.replace(/_\d+$/, '_' + (sectionIndex + 1)))
            }
        })
    })
}