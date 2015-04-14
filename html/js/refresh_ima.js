window.imagenVacia = 'data:image/gif;base64,R0lGODlhAQABAI' + 
                     'AAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
 
window.mostrarVistaPrevia = function mostrarVistaPrevia(){
 
    var Archivos,
        Lector;
 
    //Para navegadores antiguos
    if(typeof FileReader !== "function" ){
        alert('vista no disponible');
        return;
    }
 
    Archivos = jQuery('#imagen')[0].files;
    if(Archivos.length>0){
         
        Lector = new FileReader();
        Lector.onloadend = function(e){
            var origen,
                tipo;
 
            //Envía la imagen a la pantalla
            origen = e.target; //objeto FileReader
             
            //Prepara la información sobre la imagen
            tipo = window.obtenerTipoMIME(origen.result.substring(0, 30));
             
            //Si el tipo de archivo es válido lo muestra, 
            //sino muestra un mensaje 
            if(tipo!=='image/jpg' && tipo!=='image/jpeg' && tipo!=='image/png' && tipo!=='image/gif'){
                jQuery('#title_image').attr('src', window.imagenVacia);
                alert('El formato de imagen no es válido: debe seleccionar una imagen JPG, PNG o GIF.');
            }else{
                jQuery('#title_image').attr('src', origen.result);
                console.log(origen.result)
            }
 
        };
        Lector.onerror = function(e){
            console.log(e)
        }
        Lector.readAsDataURL(Archivos[0]); 
 
    }else{
        var objeto = jQuery('#archivo');
        objeto.replaceWith(objeto.val('').clone());
        jQuery('#title_image').attr('src', window.imagenVacia);  
    };
 
 
};
 
//Lee el tipo MIME de la cabecera de la imagen
window.obtenerTipoMIME = function obtenerTipoMIME(cabecera){
    return cabecera.replace(/data:([^;]+).*/, '\$1');
} 