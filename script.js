console.log("FireStore !")
const myList = document.querySelector('ul');

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



class Course {

    constructor() {
        this.html = document.createElement('li').classList.add('list-group-item')
        this.title = '';
        this.created_at = null;
    }

    create() {
        console.log(this.html.append(this.nodeTitle())
            .append(this.setCreatedAt()));
    }

    nodeTitle() {
        let el = document.createElement('h3');
        el.innerText = this.title;
        return el;
    }

    nodeCreatedAt() {
        let el = document.createElement('small');
        el.innerText = this.created_at;
        return el;
    }

    setTitle(title) { this.title = title; }
    setCreatedAt(create_at) { this.created_at = create_at; }

}