/*This Script allows people to enter by using a form that asks for a
Username and Password*/
function pasuser(form) {
if (form.identifier.value=="admin") { 
console.log(form.identifier.value)
if (form.pass.value=="user") { 
  window.location.assign('https://assalaminstitute.ca/contact.html');
} else {
alert("Invalid Password");
}

} alert("Invalid Username");
}
}
} else {
  if (form.identifier.value=="zaakir.sheikh") { 
    console.log(form.identifier.value)
    if (form.pass.value=="6302009") { 
      window.location.assign('https://assalaminstitute.ca/zaakirS.html');
    } else {
    alert("Invalid Password");
}

} alert("Invalid Username");
