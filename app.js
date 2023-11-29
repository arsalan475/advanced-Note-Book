let noteContainer = document.querySelector(".notes-container");
let createNoteBtn = document.querySelector("#add-btn");
let noteForm = document.querySelector(".note-form");
let addToBook = document.querySelector(".add-to-book");
let noteModeRadio = document.querySelectorAll(".note-mode input");
let selection = document.querySelectorAll("select option");
let checked;
let selected;
let note1;
let allId;
let close;
let html;
let gtData;
class NoteBook {
  note = document.getElementById("note");
  subject = document.getElementById("subject");
  th = this;
  allNotes = [];

  constructor() {
    createNoteBtn.addEventListener("click", this.showForm.bind(this));
    addToBook.addEventListener("click", this.addNote.bind(this));

    this.getDataFromLocalStorage();
  }

  checkingValidation() {
    let _Mode = Array.from(selection).some(function (mode) {
      if (mode.value) return true;
    });
    let _ImportanceField = Array.from(noteModeRadio).some(function (mode) {
      if (mode.checked) return true;
    });
    let _Checked;
    if (this.subject.value) {
      _Checked = true;
    }

    let _Note;

    if (this.note.value) {
      _Note = true;
    }

    return [_Checked, _Mode, _ImportanceField, _Note];
  }

  showForm() {
    noteForm.style.display = "block";
  }

  getingValues() {
    noteModeRadio.forEach(function (el, i) {
      if (el.checked) checked = el.value;

      if (selection[i].selected) selected = selection[i].value;
    });
  }

  addNote() {
    let validation = this.checkingValidation().every(
      (fields) => fields === true
    );

    if (validation) {
      this.showForm();
      this.getingValues();
      note1 = new newNote(
        checked,
        selected,
        this.subject.value,
        this.note.value
      );

      this.allNotes.push(note1);
      this.setToLocalStorage(this.allNotes);
      this.closeNote(this.th, allId, close);
      this.showNoteInDoc(note1);
    } else {
      alert("Please Must be filled all fields");
    }
  }

  setToLocalStorage(data) {
    localStorage.setItem("NoteData", JSON.stringify(data));
  }

  getDataFromLocalStorage() {
    gtData = JSON.parse(localStorage.getItem("NoteData"));
    // let s = this;

    if (!gtData) return;
    this.allNotes = gtData;
    //this.showNoteInDoc(this.allNotes);
    gtData.forEach((d) => {
      // s.showNoteInDoc(d);

      this.showNoteInDoc(d);
    });
  }

  showNoteInDoc(notes) {
    // html = "i m added";
    html = `
    <div class="my-note" id="${notes.id}">
    <div class="my-note-subject"><h1>${
      notes.subjectValue ? `${notes.subjectValue} 📚` : "subject not defined"
    }</h1><span class='cross'>❌</span></div>
    <div class="my-note-body">
     <p>${notes.noteValue ? notes.noteValue : "Notthing you wrote"}</p>
     <span><a href="#">read more</a></span>
    </div>
    <div class="my-note-mode">
       <div class="left">
           <h6>${notes.modeValue ? notes.modeValue : "Mode not defined"}</h6>
           <h6>${
             notes.ipmotanceValue
               ? notes.ipmotanceValue
               : "Importance not defined"
           }</h6>
         </div>
         <div class="date-container">
         <h6 class="date">${notes.date}</h6>
       </div>
    </div>
    </div>
    `;

    noteContainer.insertAdjacentHTML("beforeend", html);
    allId = document.querySelectorAll(".my-note");
    //  close = document.querySelectorAll(".my");

    noteForm.style.display = "none";
    return html;
  }

  closeNote(th, allId, close) {
    noteContainer.addEventListener(
      "click",
      function (e) {
        let parent = e.target.classList.contains("cross");
        if (parent) {
          let index = th.allNotes.findIndex(
            (el) => el.id === e.target.closest(".my-note").id
          );
          // console.log(delete th.gtData.index);
          // console.dir(th.allNotes);
          // console.log(e.target.closest(".my-note").id);
          th.allNotes.splice(index, 1);
          console.log(index);
          localStorage.setItem("NoteData", JSON.stringify(th.allNotes));
          //   console.log(e.target.closest(".my-note"));
          e.target.closest(".my-note").remove();
        }
      },
    );
  }
}

class newNote {
  date = new Date().toDateString();
  id = (Date.now() + "").slice(-10);
  constructor(modeValue, ipmotanceValue, subjectValue, noteValue) {
    this.modeValue = modeValue;
    this.ipmotanceValue = ipmotanceValue;
    this.subjectValue = subjectValue;
    this.noteValue = noteValue;
  }
}

const app = new NoteBook();
