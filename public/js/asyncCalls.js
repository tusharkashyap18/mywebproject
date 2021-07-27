const deleteStory=(btn)=>{
  var id=btn.id;
  Swal.fire({
      title: 'Are you sure you want to delete Story?',
      text: "You cannot revert this action!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yeah!'
    }).then((result) => {
      console.log(result);
      if(result.value==true){
        const deleteElement=btn.closest('tr');
        fetch('/stories/'+id,{
            method:'DELETE'
            //headers:{  'CSRF-Token': token}
        }).then(result=>{
            console.log(result);
            M.toast({html: 'Successfully Deleted!',outDuration:300,class:'rounded'});
            deleteElement.remove();
        }).catch(err=>{
            console.log(err);
        })  
      }
      })    
}