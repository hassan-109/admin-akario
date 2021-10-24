function deleteMember(id) {
    
 Swal.fire({
    title: 'Edit Or Delete',
    input: 'text',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'update',
    denyButtonText: `Delete`,
    inputValidator: (value) => {
      if (!value) {
        return 'You need to write something!'
      } 
      document.location = '/update/member/'+value+'/' + id
      Swal.fire(value + ' Saved!', '', 'success')
    }
  }).then((result) => {
    if (result.isDenied) {
        document.location = '/delete/member/' + id
    }
  })
}