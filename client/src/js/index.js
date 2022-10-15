//entry point that webpack will look at to determine dependencies and assets for app
import { initDB, postDB, deleteDB, editDB } from '../js/database';
import { toggleForm, clearForm } from "./form";
import {fetchCards} from './cards';

//import bootstrap and popper
import { Tooltip, Toast, Popover } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


//import css files
import Logo from '../images/logo.png';
import Bear from '../images/bear.png';
import Dog from '../images/dog.png';

//import css files
import "../css/index.css";


  //use the window load event to keep the page load performant
window.addEventListener('load', function() {
    initDB();
    fetchCards();
    document.getElementById('logo').src = Logo;
    document.getElementById('bearThumbnail').src = Bear;
    document.getElementById('dogThumbnail').src = Dog;
    
})
//install button
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installBtn.style.visibility = 'visible';

  installBtn.addEventListener('click', () => {
    event.prompt();
    installBtn.setAttribute('disabled', true);
    installBtn.textContent = 'Installed!';
  });

});
window.addEventListener('appinstalled', (event) => {
  console.log('appinstalled', event);
});



  // Form functionality
  const form = document.getElementById("formToggle");
  const newContactButton = document.getElementById("new-contact");
  let submitBtnToUpdate = false;
  let profileId;
  
  newContactButton.addEventListener('click', event => {
    toggleForm()
   })
  
  form.addEventListener('submit', event => {
    // Handle data
    event.preventDefault();
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let profile = document.querySelector('input[type="radio"]:checked').value;
  
    // Post form data to IndexedDB OR Edit an existing card in IndexedDB
  if (submitBtnToUpdate == false) {
    postDB(name, email, phone, profile);
  } else {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let profile = document.querySelector('input[type="radio"]:checked').value;

  editDB(profileId, name, email, phone, profile);
  
    fetchCards();
      // Toggles the submit button back to POST functionality
    submitBtnToUpdate = false;
  }
  
  // Clear form
  clearForm();
  // Toggle form
  toggleForm();
  // Reload the DOM
  fetchCards();
  });

  //card functionality
  //adds deleteCard() to the global scope so each card has access to it
  //window. "scopes" the function to the window object to give the card the ability to be deleted. 
  window.deleteCard = (e) => {
    //grabs the id from the button element attached to the contact card
    let id = parseInt(e.id);
    //delete the card
    deleteDB(id);
    //reload the dom 
    fetchCards();
  };

  window.editCard = (e) => {
    profileId = parseInt(e.dataset.id);

    let editName = e.dataset.name;
    let editEmail = e.dataset.email;
    let editPhone = e.dataset.phone;

    document.getElementById("name").value = editName;
    document.getElementById("email").value = editEmail;
    document.getElementById("phone").value = editPhone;

    form.style.display = "block";
    
    submitBtnToUpdate = true;
  };