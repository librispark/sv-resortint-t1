define(['Handlebars'], function ( Handlebars ){

    function prepPMSInputForm(dummy, options) {
        console.log('hi andy');
        var validateOnChange = function(){
            $('#pmsDatesForm').validate();
            if ($('#pmsDatesForm').valid()) {
                $('#pmsFormSubmit').addClass('btn-primary').removeClass('disabled');
            }
        }
        var bookDateOffset = app.customization.spaBooking.allowBookingToday ? 0 : 1,
            dates = $( "#pmsArrivalDate, #pmsDepartureDate" ).datepicker({
                defaultDate: "+" + bookDateOffset + "d",
                changeMonth: true,
                numberOfMonths: 2,
                dateFormat: "yy-mm-dd",
                minDate: "+" + bookDateOffset + "d",
                maxDate: "+3M",
                onSelect: function( selectedDate ) {
                    var option = this.id == "pmsArrivalDate" ? "minDate" : "maxDate",
                        instance = $( this ).data( "datepicker" ),
                        date = $.datepicker.parseDate(
                            instance.settings.dateFormat ||
                                $.datepicker._defaults.dateFormat,
                            selectedDate, instance.settings );
                    dates.not( this ).datepicker( "option", option, date );
                    validateOnChange();
                }
            })
        $('#pmsArrivalDate').val(Date.today().add(bookDateOffset).days().toString('yyyy-MM-dd'));
        $('#pmsDepartureDate').val(Date.today().add(bookDateOffset+1).days().toString('yyyy-MM-dd')).datepicker('option', {'defaultDate': "+"+(bookDateOffset+1)+"d","minDate":"+"+(bookDateOffset+1)+"d"});
        $('#pmsDatesForm .required').change(validateOnChange);
        /*$('#pmsFormSubmit').click(function(){
         app.dispatcher.dispatch( 'roomsBooking', 'Rate',
         [
         Date.parse( $('#pmsArrivalDate').val() ).toString('yyyy-MM-dd000000'),
         Date.parse( $('#pmsDepartureDate').val() ).toString('yyyy-MM-dd000000'),
         $('#pmsNumAdults').val(),
         $('#pmsNumYouth').val(),
         $('#pmsNumChildren').val(),
         $('#pmsNumJrChildren').val(),
         $('#pmsPromoCode').val()
         ]);
         });*/
        $('#pmsFormSubmit').on( 'click', function (obj) {
            if($('#pmsDatesForm').valid()) {
                obj.target.href += "/" + Date.parse( $('#pmsArrivalDate').val() ).toString('yyyy-MM-dd000000')
                    + "/" + Date.parse( $('#pmsDepartureDate').val() ).toString('yyyy-MM-dd000000')
                    + "/" + $('#pmsNumAdults').val()
                    + "/" + $('#pmsNumYouth').val()
                    + "/" + $('#pmsNumChildren').val()
                    + "/" + $('#pmsNumJrChildren').val()
                    + "/" + $('#pmsPromoCode').val();
            } else {
                return false;
            }

        });
    }

    Handlebars.registerHelper( 'prepPMSInputForm', prepPMSInputForm );
    return prepPMSInputForm;
});
        
