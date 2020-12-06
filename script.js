console.log("FireStore !")

db.collection("courses").get()
    .then(res => res.docs.forEach(course => {
        console.log(course.data())
    }))
    .catch(err => console.log(err))