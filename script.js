console.log("FireStore !")
const myList = document.querySelector('ul');
const form = document.querySelector('form');


add = course => {
    myList.innerHTML += "<li class='list-group-item'> <h3> " +
        course.title +
        "</h3> <small>" + course.created_at.toDate() + "</small> </li>";
}


db.collection("courses").get()
    .then(res => res.docs.forEach(course => {
        add(course.data());
    }))
    .catch(err => console.log(err))


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