// function Validation(opptions) {


//     var getTest = {};
 
//     function Validate(inputElement, rule) {

//         var getMethods =  getTest[rule.selection];
//         var errorMassage;
//        for (var getMethod of getMethods ) {
//             errorMassage = getMethod(inputElement.value)

//             if (errorMassage) break;
//        }
//         var massageElement = inputElement.parentElement.querySelector('.form-massage');
//         if (errorMassage) {
//            massageElement.innerText = errorMassage;
//         } else {
//            massageElement.innerText = '';
//         }

//         return errorMassage;
//     }

//     var formElement = document.querySelector(opptions.form);
//     if (formElement) {

//         formElement.onsubmit = function (e) {
//             e.preventDefault();

//             var isFormValid = true;

//             opptions.rules.forEach(function (rule) {
//                 var inputElement = formElement.querySelector(rule.selection);            
//                 var isValid = Validate(inputElement, rule);

//                 if (isValid) {
//                     isFormValid = false;
//                 }
//             })
            
//             if (isFormValid) {
//                 var enableInput = document.querySelectorAll('input[name]');
//                 var inputValue = Array.from(enableInput).reduce(function (acc, curr) {
//                     acc[curr.name] = curr.value;
//                     return acc;
//                 }, {});


//                 opptions.onSubmit(inputValue);
//             }
//         }



//         opptions.rules.forEach(function (rule) {

//             if (Array.isArray(getTest[rule.selection])) {
//                 getTest[rule.selection].push(rule.test)
//             } else {
//                 getTest[rule.selection] = [rule.test];
//             }

//             var inputElement = formElement.querySelector(rule.selection);
//             if(inputElement) {
//                 inputElement.onblur = function () {
//                     Validate(inputElement, rule)
//                 }

//                 inputElement.oninput = function () {
//                     var massageElement = inputElement.parentElement.querySelector('.form-massage');
//                     if (inputElement.value) {
//                         massageElement.innerText = '';

//                     }
//                 }
//             }
//         });
//     }
// }

// Validation.isRequire = function (selection) {
//     return {
//         selection: selection,
//         test: function (value) {
//             return value ? undefined : 'Vui lòng nhập trường này';
//         }
//     }
// }
// Validation.isEmail = function (selection) {
//     return {
//         selection: selection,
//         test: function (value) {
//             var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//             return regex.test(value) ? undefined : 'Trường này phải là email'

//         }
//     }
// }
// Validation.isPassword = function (selection, min) {
//     return {
//         selection: selection,
//         test: function (value) {
//             return value.length >= min ? undefined : 'Vui lòng nhập mật khẩu'
//         }
//     }
// }
// Validation.isPassword_again = function (selection, getConfirm) {
//     return {
//         selection: selection,
//         test: function (value) {
//             return value === getConfirm() ? undefined : 'Mật khẩu nhập lại chưa chính xác'
//         }
//     }
// }


var getApi = 'http://localhost:3000/courses';

function start() {
    getCourse(renderCourse)

    handlePostCourse()
}

start()

function getCourse(callback) {
    fetch(getApi)
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}

function postCourse(data, callback) {
    var opptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    fetch(getApi, opptions)
        .then(function (response) {
             response.json()
        })
        .then(callback)
}


function deleteCourse(id) {
    var opptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }
    fetch(getApi + "/" + id, opptions)
        .then(function (response) {
             response.json()
        })
        .then(callback)
}


function renderCourse(courses) {
    var blockCourse = document.querySelector('.courses_list');
    var html = courses.map(function (course) {
        return `
            <li class="course_items">
            <h3>${course.name}:</h3>
            <p>${course.describe}</p>
            <button onclick="deleteCourse(${course.id})">Xóa</button>
            </li>
        `
    });

    blockCourse.innerHTML = html;
}

function handlePostCourse() {
    var createCourse = document.querySelector('.create_course');

    createCourse.onclick = function () {
        var name = document.querySelector('input[name="name"]').value;
        var describe = document.querySelector('input[name="describe"]').value;

        var inputValue = {
            name: name,
            describe: describe
        }

        postCourse(inputValue);
    }
}