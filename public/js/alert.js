function deleteOrEditMember(item, id) {
  var tmr = 0;
  var islong = 0;
  $(item)
    .mousedown(() => {
        tmr = setTimeout(() => {
            // Handle the long-press
            Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              if (result.isConfirmed) {
                document.location = "/delete/member/" + id;
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                );
              }
            });
            islong = 2;
          }, 2000);
      })
    .mouseup(function () {
      if (islong == 0) {
        // Handle the click
        Swal.fire({
          title: "Edit",
          input: "text",
          showCancelButton: true,
          confirmButtonText: "update",
          inputValidator: (value) => {
            if (!value) {
              return "You need to write something!";
            }
            document.location = "/update/member/" + value + "/" + id;
            Swal.fire(value + " Saved!", "", "success");
          },
        });
      }
      islong = 0;
      clearTimeout(tmr);
    });
}
