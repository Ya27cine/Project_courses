console.log("FireStore !")
const myList = document.querySelector('ul');
const form = document.querySelector('form');

// -------------------------------------- Fucntion :  ----------------------------------------------------------------------------
run = () => {
    db.collection("courses").get()
        .then(res => res.docs.forEach(course => {
            //console.log(course.id)
            add(course.data(), course.id);
        }))
        .catch(err => console.log(err))
}
add = (course, id) => {
        myList.innerHTML += "<li class='list-group-item' data-id='" + id + "'> <h3> " +
            course.title +
            "</h3> <small>" + course.created_at.toDate() + "</small> \
                <button class='btn btn-danger btn-sm my-3'> Delete </button>             \
         </li>";
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