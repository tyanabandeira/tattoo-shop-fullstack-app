var edit = document.getElementsByClassName("fa-pencil-square-o");
var thumbDown = document.getElementsByClassName("fa-thumbs-down")
var trash = document.getElementsByClassName("fa-trash-o");


Array.from(thumbDown).forEach(function(element) {
  element.addEventListener('click', function(){
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    const thumbDown = parseFloat(this.parentNode.parentNode.childNodes[7].innerText)
    fetch('thumbDown', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': name,
        'msg': msg,
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});




Array.from(edit).forEach(function(element) {
      element.addEventListener('click', function(){
        const note = this.parentNode.childNodes[1]
        const _id = this.parentNode.parentNode.getAttribute('id')
        console.log(_id)
        note.focus()
        note.addEventListener('keyup', (e)=>{
          const newNote = e.target.value
           fetch('newNote', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            _id,
            newNote
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
        })
        })
       
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const _id = this.parentNode.parentNode.getAttribute('id').trim()
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            _id 
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
