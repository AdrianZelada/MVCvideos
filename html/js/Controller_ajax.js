function Ajax_add_upload(action,resp){  
    //funcion de que nos permite hacer las llamadas ajax reutilizable    
     $.ajax({
            url: "../routes.php",           
            type: 'POST',
            data:{
                controller: action,
                array: fill_object(resp)
            },
            success: function(data) {                               
               swal("Bien!!!", "Video Agregado Con Exito", "success");
               refresh();
            }           
        });    
}
function Ajax_delete(){
    // borra un elemento de la base de datos    
    $.ajax({
        url: "../routes.php",           
        type: 'POST',
        data:{ 
            controller:'delete_item',
            id:_id,        
        },
        success: function(data) {
            console.log(data);
        }           
   });
}


function refresh(){
    //---------- Refresca las vistas al hacer una accion
    $.ajax({
        url: "../routes.php",           
        type: 'POST',       
        async: true,
        data:{
            controller:'get_all'
        },
        success: function(data) {
            // console.log(data);
            Camp=$.parseJSON(data);       
            console.log(Camp);
        }           
   });
}