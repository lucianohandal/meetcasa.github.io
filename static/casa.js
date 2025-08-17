const body = $('body')[0];
const navbar = $("#navbar")[0];
const nav_items = $('.nav-item');
// const hello_h1 = $("#hello_world")[0];
const url = document.URL.split("?")[0];
// const hello_msg = "Hello World!";
// const hello_msg_html = "Hello World!<span id='new_line'>\\n</span>";
// const projects = $('.project_div');
// const contact_form = $("#contact_form")[0];
// const query = url.split('?',2)[1];
var current_section = 'hello';
var current_color = '#222831';
var sectionOffsets = [];
var sectNum = {};
var current_project = 0;
var loc = document.URL.split("?")[1];

function getSectionsOffsets(){
  sectionOffsets = [];
  let offset;
  let color;
  let id;
  let i = 0;
  for (section of $('.section')) {
    offset = section.offsetTop + section.offsetHeight;
    color = $(section).css("background-color");
    id = section.id;
    sectionOffsets.push({"offset":offset, "bg_color":color, "id":id});
    sectNum[id] = i++;
  }
}

function showPosition(i) {
  if (current_section == sectionOffsets[i].id) {
    return;
  }
  current_section = sectionOffsets[i].id;
  if (i < 0) {
    $('.active').removeClass('active');
    return;
  }
  // $("#navbar").show();

  if (i === 0 || i + 1 ===  sectionOffsets.length) {
    $("#navbar-waitlist-button").hide();
  } else {
    $("#navbar-waitlist-button").show();
  }
  if (i + 1 ===  sectionOffsets.length) {
    $('.nav-item').addClass('white');
  } else {
   $('.nav-item').removeClass('white');
  }
  $('.active').removeClass('active');
  $(nav_items[i]).addClass('active');
}

function colorCoordinate() {
  $(navbar).css('background-color', current_color)
  $('.modal-content').css('background-color', current_color)
  $(body).css('background-color', current_color)
}

function scrollNavbar(){
  let scrollPosition = $(window).scrollTop() + navbar.offsetHeight;
  for (var i = 0; i < sectionOffsets.length; i++) {
    if (scrollPosition < sectionOffsets[i].offset) {
      showPosition(i)
      // colorCoordinate();
      break
    }
  }
}

function goToSection(section_id){
  if (sectNum[section_id] == null) {
    return;
  }
  let time = Math.abs(sectionOffsets[sectNum[section_id]].offset - sectionOffsets[sectNum[current_section]].offset)
  time = Math.min(time/2, 1000)
  sect_index = sectNum[section_id]
  let location = sect_index === 0 ? 0 : sectionOffsets[sect_index - 1].offset;
  $('html, body').animate({scrollTop: location}, time,
    function(){window.scrollTo(0, location);});
}

// function typeChar(i) {
//   hello_h1.innerText = hello_msg.substring(0, i) + '|';
// }

// function typeHello() {
//   const rate = 100;
//   var time;
//   let msg_length = hello_msg.length;
//   for (let i = 0; i < msg_length; i++) {
//     time = i * rate;
//     setTimeout(function(){ typeChar(i); }, time);
//   }
//   time += rate;
//   setTimeout(function(){hello_h1.innerHTML = hello_msg_html;}, time);
//   time *= 2;
// }

function copyToClipboard(str) {
  const tempInput = document.createElement("input");
  tempInput.value = str;
  document.body.appendChild(tempInput);
  tempInput.select();
  tempInput.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}

function share(){
  let share_link = url;
  if (current_section != 'hello') {
    share_link += "?" + current_section;
  }
  copyToClipboard(share_link);
  $("#modal_link")[0].innerText = share_link;
  $("#modal_link")[0].href = share_link;
}

function hideContact(){
  $('#contact_container').hide();
  $('#contact_thx').show();
}

function toggleIcon() {
  $('#nav_icon').toggleClass('fa-ellipsis-v');
  $('#nav_icon').toggleClass('fa-times');
}

// var form = document.getElementById("contact_form");
//
// async function handleSubmit(event) {
//   event.preventDefault();
//   var status = document.getElementById("contact_status");
//   var data = new FormData(event.target);
//   fetch(event.target.action, {
//     method: form.method,
//     body: data,
//     headers: {
//         'Accept': 'application/json'
//     }
//   }).then(response => {
//     if (response.ok) {
//       hideContact();
//       form.reset()
//     } else {
//       response.json().then(data => {
//         if (Object.hasOwn(data, 'errors')) {
//           status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
//         } else {
//           status.innerHTML = "Oops! There was a problem submitting your form"
//         }
//       })
//     }
//   }).catch(error => {
//     status.innerHTML = "Oops! There was a problem submitting your form"
//   });
// }
// form.addEventListener("submit", handleSubmit)

// function sendForm(){
//   event.preventDefault();
//   $.ajax({
//     data:{
//       name: $(contact_form).serializeArray()[0].value,
//       subject: $(contact_form).serializeArray()[1].value,
//       email: $(contact_form).serializeArray()[2].value,
//       message: $(contact_form).serializeArray()[3].value
//     },
//     type: "POST",
//     url: contact_form.action,
//   });
//   hideContact();
//   return false;
// }

$('.project_div').hover(
  function() {
    $($( this ).find('.project_info')).animate({opacity: 1}, 400);
  }, function() {
    $($( this ).find('.project_info')).animate({opacity: 0}, 200);
  }
);

function selectTab(id){
  let tab_id = '#tab_' + id;
  let collapse_id = '#collapse_' + id;
  if ($(tab_id).hasClass('active_tab')) {
    return;
  }
  $('.active_tab').removeClass('active_tab');
  $(tab_id).addClass('active_tab');
  $('.about_collapse').collapse('hide');
  $(collapse_id).collapse('show');

}

// function projectSlide(prev=false) {
//   $(projects[current_project]).removeClass('selected')
//   if (prev) {
//     current_project = (current_project + projects.length - 1) % projects.length;
//   } else {
//     current_project = (current_project + 1) % projects.length;
//   }
//   $(projects[current_project]).addClass('selected')
// }

$('.navbar-collapse .nav-link').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});
function setURL(){

}

window.onscroll = function() {
  scrollNavbar()
};

function main() {
  // typeHello();
  getSectionsOffsets();
  scrollNavbar()
  // if (loc != 'hello') {
  //   goToSection(loc);
  // }
}

$( document ).ready(function() { main() });
