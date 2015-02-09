/**
 * Created by Jannik on 25.07.14.
 */
CKEDITOR.plugins.add( 'boewacompatibility', {
    init: function( editor ) {
        editor.on('instanceReady', function() {
            $(window).trigger('resize');
            jQuery( editor.element.$ ).on('remote.replace.content', function() {
                    //Damit der Editor sich updated wenn das unterliegende Element verändert wird
                    var decoded = $("<div/>").html(jQuery( editor.element.$).html()).text();
                    editor.setData(decoded);
                }
            );
            //FIXME: does not work like this, because the editor is inside an iframe
            $("#form",parent.document).on('form-pre-serialize',function(){
                if (typeof CKEDITOR !== 'undefined') {
                    for ( instance in CKEDITOR.instances ) {
                        CKEDITOR.instances[instance].updateElement();
                    }
                }
            });
        });
        editor.on('resize', function() {
                $(window).trigger('resize');
            }
        );

    }
});