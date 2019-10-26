/* global $, location */

function deletePost (id) {
  console.log(id)
  $.ajax({
    url: '/posts',
    type: 'DELETE',
    data: {
      id: id
    },
    success: function (result) {
      location.reload()
      // Do something with the result
    }
  })
}
