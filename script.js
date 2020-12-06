console.log("FireStore !")
const myList = document.querySelector('ul');
const form = document.querySelector('form');

// -------------------------------------- Fucntion :  ----------------------------------------------------------------------------
run = () => {
    db.collection("courses").onSnapshot(sanp => {
        //  console.log(sanp.docChanges());
        sanp.docChanges().forEach(course => {
            if (course.type === "added")
                add(course.doc.data(), course.doc.id)
            else {
                del(course.doc.id)
            }
        })
    })

}
add = (course, id) => {
    myList.innerHTML += "<li class='list-group-item' data-id='" + id + "'> <h3> " +
        course.title +
        "</h3> <small>" + course.created_at.toDate() + "</small> \
                <button class='btn btn-danger btn-sm my-3'> Delete </button>             \
         </li>";
}
del = (id) => {
    const courses = document.querySelectorAll('li');
    courses.forEach(course => {
        if (course.getAttribute('data-id') === id)
            course.remove();
    })
}

// --------------------------------------------------------------------------------------------------------------------------

run();



//-------------------------------------- Actions :  --------------------------------------------------------------------------------
myList.addEventListener('click', e => {
    if (e.target.tagName == "BUTTON") {
        let id = e.target.parentElement.getAttribute('data-id')

        db.collection('courses').doc(id).delete()
            .then(() => console.log('Deleted'))
            .catch(err => console.log(err))
    }
})
form.addEventListener('submit', e => {
    e.preventDefault()
    const now = new Date();
    let course = {
        title: document.querySelector('#course').value,
        created_at: firebase.firestore.Timestamp.fromDate(now)
    }
    db.collection("courses").add(course)
        .then(res => console.log(res, "course added "))
        .catch(err => console.error(err))

})