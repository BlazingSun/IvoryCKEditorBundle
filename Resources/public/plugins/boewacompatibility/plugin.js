/**
 * Created by Jannik on 25.07.14.
 */
CKEDITOR.plugins.add( 'boewacompatibility', {
    init: function( editor ) {
        editor.on('instanceReady', function() {
            $(window).trigger('resize');
            jQuery( editor.element.$ ).on('remote.replace.content', function() {
                    //Damit der Editor sich updated wenn das unterliegende Element verändert wird
                    console.log(jQuery( editor.element.$).html());
                    editor.setData(jQuery( editor.element.$).html());
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