let updateid = null;
let table, nm;


//Validations and clearing form
function clearAEmail() {

    let modalA = $('#addStudentModal')
    modalA.find('#AddE').text('');
}

function validEmailAdd() {
    const re = /^([a-zA-Z0-9]+)([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,4})$/;
    let em = $("#email").val();
    if (!re.test(em) || em.length > 60) {

        let modalA = $('#addStudentModal')
        modalA.find('#AddE').text('Please enter a valid email.');
        return false;
    } else {
        clearAEmail();
        return true;
    }
}

function clearAName() {

    let modalA = $('#addStudentModal')
    modalA.find('#AddN').text('');
}

function validNameAdd() {
    const re = /^([a-zA-Z]{3,40})$/;
    if (!re.test($("#name").val())) {

        let modalA = $('#addStudentModal')
        modalA.find('#AddN').text('Name must be between 3 and 40 characters and should not contain Spaces or special characters.');
        return false;
    } else {
        clearAName();
        return true;
    }
}

function clearAUName() {

    let modalA = $('#addStudentModal')
    modalA.find('#AddU').text('');
}

function validUNameAdd() {
    const re = /^([a-zA-Z]{3,10}$)/;
    if (!re.test($("#un").val())) {

        let modalA = $('#addStudentModal')
        modalA.find('#AddU').text('University Name must be between 3 and 10 characters and should not contain Spaces or special characters.');
        return false;
    } else {
        clearAUName();
        return true;
    }

}

function clearEEmail() {

    let modalE = $('#editStudentModal')
    modalE.find('#EditE').text('');
}

function validEmailEdit() {
    const re = /^([a-zA-Z0-9]+)([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,4})$/;
    let em = $("#eemail").val();
    if (!re.test(em) || em.length > 45) {

        let modalE = $('#editStudentModal')
        modalE.find('#EditE').text('Please enter a valid Email.');
        return false;
    } else {
        clearEEmail();
        return true;
    }
}

function clearEName() {

    let modalE = $('#editStudentModal')
    modalE.find('#EditN').text('');
}

function validNameEdit() {
    const re = /^([a-zA-Z]{3,40})$/;
    if (!re.test($("#ename").val())) {

        let modalE = $('#editStudentModal')
        modalE.find('#EditN').text('Name must be between 3 and 40 characters and should not contain Spaces or special characters.');
        return false;
    } else {
        clearEName();
        return true;
    }
}

function clearEUName() {

    let modalE = $('#editStudentModal')
    modalE.find('#EditU').text('');
}

function validUNameEdit() {
    const re = /^([a-zA-Z]{3,10})$/;
    if (!re.test($("#eun").val())) {

        let modalE = $('#editStudentModal')
        modalE.find('#EditU').text('University Name must be between 3 and 10 characters and should not contain Spaces or special characters.');
        return false;
    } else {
        clearEUName();
        return true;
    }
}

function clearDuplicate(val) {
    if (val === "e") {

        let modalE = $('#editStudentModal')
        modalE.find('#EditE').text('');
    } else {

        let modalA = $('#addStudentModal')
        modalA.find('#AddE').text('');
    }
}

function duplicateEntry(val) {
    if (val === "e") {

        let modalE = $('#editStudentModal')
        modalE.find('#EditE').text('Duplicate value detected. Please recheck the value entered.');
    } else {

        let modalA = $('#addStudentModal')
        modalA.find('#AddE').text('Duplicate value detected. Please recheck the value entered.');
    }
}

function clearNullEntry(val) {
    if (val === "e") {

        let modalE = $('#editStudentModal')
        modalE.find('#invalidE').text('');
    } else {

        let modalA = $('#addStudentModal')
        modalA.find('#invalid').text('');
    }
}

function NullEntry(val) {
    if (val === "e") {

        let modalE = $('#editStudentModal')
        modalE.find('#invalidE').text('Please enter all values.');
    } else {

        let modalA = $('#addStudentModal')
        modalA.find('#invalid').text('Please enter all values.');
    }
}

function reload() {
    window.location.reload();
}

//Delete Modal functions
$(document).on('hidden.bs.modal', '#deleteStudentModal', function () {
    table.rows({selected: true}).deselect();
})
$(document).on('show.bs.modal', '#deleteStudentModal', function (event) {
    let selectedrow = table.rows({selected: true}).data();
    let id = selectedrow[0].id;
    let modal = $(this);
    modal.find('#delete').text('Are you sure you want to delete student with ID: ' + id);
})
$(document).on('show.bs.modal', '#deleteSuccess', function (event) {
    let selectedrow = table.rows({selected: true}).data();
    let id = selectedrow[0].id;
    let modal = $(this);
    modal.find('#deleteText').text('Successfully deleted student with ID: ' + id);
})

function deleteStudent() {

    let selectedrow = table.rows({selected: true}).data();
    let id = selectedrow[0].id;
    let ajx = $.ajax({
        url: 'http://localhost:8081/students/delete/' + id,
        method: 'DELETE',
        data: null
    })
    ajx.done(function () {
        $("#deleteStudentModal").modal('hide');
        $("#deleteSuccess").modal('show');
    })

}

//Add modal functions
$(document).on('show.bs.modal', '#addSuccess', function (event) {

    let modal = $(this);
    modal.find('#addText').text('Successfully added student with name: ' + nm);
})

function validateAdd() {
    let nm = $("#name").val();
    let em = $("#email").val();
    let un = $("#un").val();
    if (nm === "" || em === "" || un === "") {
        return false;
    } else {
        return true;
    }
}

function clearInvalidAdd() {
    clearAEmail();
    clearAName();
    clearAUName();
    clearDuplicate("a");
    clearNullEntry("a");
}

$(document).on('hidden.bs.modal', '#addStudentModal', function () {
    $(this).find('form').trigger('reset');
    clearInvalidAdd();
})

function addStudent() {

    if (validateAdd() === true && validEmailAdd() === true && validNameAdd() === true && validUNameAdd() === true) {
        nm = $("#name").val();
        let em = $("#email").val();
        let un = $("#un").val();
        let ajx = $.ajax({
            url: 'http://localhost:8081/students/create',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({"name": nm, "email": em, "universityName": un})
        })
        ajx.done(function (data) {
            $("#addStudentModal").modal('hide');
            $("#addSuccess").modal('show');
        })
        ajx.fail(function () {
            duplicateEntry("a");
        })

    } else if (validateAdd() === false) {
        NullEntry("a");

    } else {

        let modalA = $('#addStudentModal')
        modalA.find('#invalid').text('Please enter valid details to continue.');
    }
}

//Update modal functions
$(document).on('show.bs.modal', '#editSuccess', function (event) {
    let selectedrow = table.rows({selected: true}).data();
    let id = selectedrow[0].id;
    let modal = $(this);
    modal.find('#editText').text('Successfully edited student with ID: ' + id);
})

function clearInvalidEdit() {
    clearEEmail();
    clearEName();
    clearEUName();
    clearDuplicate("e");
    clearNullEntry("e");
}

$(document).on('hidden.bs.modal', '#editStudentModal', function () {
    $(this).find('form').trigger('reset');
    clearInvalidEdit();
    table.rows({selected: true}).deselect();
})

$(document).on('shown.bs.modal', '#editStudentModal', function () {

    let selectedrow = table.rows({selected: true}).data();
    updateid = selectedrow[0].id;
    $("#ename").val(selectedrow[0].name);
    $("#eemail").val(selectedrow[0].email);
    $("#eun").val(selectedrow[0].universityName);
});

function validateEdit() {
    let nm = $("#ename").val();
    let em = $("#eemail").val();
    let un = $("#eun").val();
    if (nm === "" || em === "" || un === "") {
        return false;
    } else {
        return true;
    }
}

function updateTable() {

    if (validateEdit() === true && validEmailEdit() === true && validNameEdit() === true && validUNameEdit() === true) {
        let selectedrow = table.rows({selected: true}).data();
        updateid = selectedrow[0].id;
        let nm = $("#ename").val();
        let em = $("#eemail").val();
        let un = $("#eun").val();
        let ajx = $.ajax({
            url: 'http://localhost:8081/students/update/' + updateid,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({"id": updateid, "name": nm, "email": em, "universityName": un})
        })
        ajx.done(function () {
            $("#editStudentModal").modal('hide');
            $("#editSuccess").modal('show');
        })
        ajx.fail(function () {
            duplicateEntry("e");
        })
    } else if (validateEdit() === false) {
        NullEntry("e");
    } else {
       
        let modalE = $('#editStudentModal')
        modalE.find('#invalidE').text('Please enter valid details to continue.');
    }
}

//Context-menu Creation

$(function () {
    $('body').on('contextmenu', 'tr', function (e) {
        e.preventDefault();
        if ($(this).hasClass('selected')) {
            table.rows({selected: true}).deselect();
            document.getElementById("context-menu").classList.remove("active");
        } else {
            let contextElement = document.getElementById("context-menu");
            contextElement.classList.add("active");
            contextElement.style.top = e.pageY + "px";
            contextElement.style.left = e.pageX + "px";
            table.row($(this)).select();
        }

    });
});
window.addEventListener("click", function () {
    document.getElementById("context-menu").classList.remove("active");
});

$(function () {
    $('#example tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {

            document.getElementById("context-menu").classList.remove("active");
            table.rows({selected: true}).deselect();
        } else {
            table.row($(this)).select();
        }
    });
});
//Table Creation
$(document).ready(function () {
    let baseurl = "http://localhost:8081/students/list";
    let xmlreq = new XMLHttpRequest();
    xmlreq.open("GET", "http://localhost:8081/students/list", true);
    xmlreq.onload = function () {
        if (xmlreq.status === 200) {
            let students = JSON.parse(xmlreq.responseText);
            table = $("#example").DataTable({
                select: true,
                data: students,
                "columns": [
                    {data: "id"},
                    {data: "name"},
                    {data: "email"},
                    {data: "universityName"},
                    {
                        data: null,
                        className: "center",
                        defaultContent: '<a href="#editStudentModal" class="edit" data-toggle="modal"><i class="fas fa-user-edit"></i></a>'
                    },
                    {
                        data: null,
                        className: "center",
                        defaultContent: '<a href="#deleteStudentModal" class="delete" data-toggle="modal"><i class="fas fa-user-minus"></i></a>'

                    }
                ]
            });
        }
    };
    xmlreq.send();

});