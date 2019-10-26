

// const deleteBtn = document.getElementById('delete-btn');
// console.log(deleteBtn);


// deleteBtn.addEventListener("click", function () {
//     console.log('btn has been clicked')
// })

// const button = document.getElementById('delete-btn');
// button.addEventListener('click', function(e) {
//   console.log('button was clicked');
// });

function deletePost (id) {
    console.log(id)
    $.ajax({
        url: '/posts',
        type: 'DELETE',
        data: {
            id: id
        },
        success: function(result) {
            location.reload()
            // Do something with the result
        }
    });
}

