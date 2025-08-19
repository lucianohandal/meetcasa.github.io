const body = $('body')[0];
const navbar = $("#navbar")[0];
const nav_items = $('.nav-item');
const maxCost = 1.19;
const maxHomeShare = 0.45;
const maxHomeShareAmount = 500_000;
const multiplier = 2;
const url = document.URL.split("?")[0];
var current_section = 'home';
var sectionOffsets = [];
var homeSplitOverTime = [];
var sectNum = {};
var loc = document.URL.split("?")[1];
var homeValue = 550_000;
var homeShare = 50_000;
var appreciationRate = 1.02;

const appreciationLabelMap = {
  "-1": "Decline",
   "0": "No change",
   "1": "Low appreciation",
   "2": "Moderate appreciation",
   "3": "High appreciation",
   "4": "Very high appreciation"
};


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

  let current_color = current_section === "waitlist" ? "#09475A" : $('#'+current_section).css('backgroundColor');

  $(body).css('background-color', current_color)
}

function scrollNavbar(){
  let scrollPosition = $(window).scrollTop() + navbar.offsetHeight;
  for (var i = 0; i < sectionOffsets.length; i++) {
    if (scrollPosition < sectionOffsets[i].offset) {
      showPosition(i)
      colorCoordinate();
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

function setBarHeights() {
  let maxHomeSplit = appreciationRate < 1 ? homeSplitOverTime[0] : homeSplitOverTime.at(-1);
  let maxHomeValue = maxHomeSplit.casa + maxHomeSplit.you;

  let barNum = 1;
  homeSplitOverTime.forEach(split => {
    let casaHeight = maxHomeValue === 0 ? 0 : (split.casa/maxHomeValue)*100;
    let yourHeight = maxHomeValue === 0 ? 0 : (split.you/maxHomeValue)*100;
    let emptyHeight = maxHomeValue === 0 ? 100 : ((maxHomeValue - split.casa - split.you)/maxHomeValue)*100;

    $('#bar' + barNum + ' .bar-casa').css('height', casaHeight + '%');
    $('#bar' + barNum + ' .bar-yours').css('height', yourHeight + '%');
    $('#bar' + barNum++ + ' .bg-transparent').css('height', emptyHeight + '%');
    // console.log(split)
  });
}

function calculateShareValues(){
  homeSplitOverTime = [];

  for (let year = 3; year <= 30; year += 3) {
    let casaShare = Math.round(Math.min(maxCost ** year, multiplier) * appreciationRate ** year * homeShare);
    let yourShare = Math.round(homeValue * appreciationRate ** year - casaShare);
    homeSplitOverTime.push({"casa":casaShare, "you":yourShare});
  }

  // console.log(homeSplitOverTime);
}

function homeValueCalculatorListener(){
  let newHomeValue = parseMoney($('#homeValue').val());
  let newHomeShare = parseMoney($('#homeShare').val());
  let appreciation = parseInt($('#appreciationSlider').val());

  if (isNaN(newHomeValue) || newHomeValue < -1) {
    $('#homeValue').val(homeValue);
    return;
  }

  if (isNaN(newHomeShare) || newHomeValue < -1) {
    $('#homeShare').val(homeShare);
    return;
  }

  if (isNaN(appreciation)) {
    $('#appreciationSlider').val((appreciationRate - 1) - 1);
    return;
  }

  if (newHomeShare > maxHomeShareAmount) {
    $('#homeShareInputErrorMessage').text(`You can get up to $${moneyFormat(maxHomeShareAmount)} through Home Share`);
    newHomeShare = maxHomeShareAmount;
  } else if (newHomeShare > newHomeValue * maxHomeShare) {
    $('#homeShareInputErrorMessage').text(`You can get up to ${maxHomeShare * 100}% of your home equity through Home Share`);
    newHomeShare = newHomeValue * maxHomeShare;
  } else {
    $('#homeShareInputErrorMessage').text(``);
  }

  homeValue = newHomeValue;
  homeShare = newHomeShare;
  appreciationRate = 1 + appreciation / 100;

  $('#appreciationLabel').text(appreciationLabelMap[appreciation]);

  if (moneyFormat(homeValue) !== $('#homeValue').val()
      || moneyFormat(homeShare) !== $('#homeShare').val() ){
    $('#homeValue').val(moneyFormat(homeValue));
    $('#homeShare').val(moneyFormat(homeShare));
  }

  $('#homeShare').attr('max', newHomeValue * maxHomeShare);

  calculateShareValues();
  setBarHeights();
  setShareSplit()
}

function moneyFormat(number){
  return number.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function parseMoney(str){
  if (!str || !str.replace(/,/g, '')){
    return 0;
  }

  return parseInt(str.replace(/,/g, ''), 10);
}

function setShareSplit() {
  let activeBar = $('.active-bar')[0];

  let barIndex = parseInt(activeBar.id.replace("bar", "")) - 1;
  let split = homeSplitOverTime[barIndex];

  $('#casaShareValue').text(moneyFormat(split.casa));
  $('#yourShareValue').text(moneyFormat(split.you));
}

function tappedBar(barId) {
  if ($('#'+barId).hasClass("active-bar")) {
    return;
  }
  $('.active-bar').removeClass("active-bar")
  $('#'+barId).addClass("active-bar")
  setShareSplit();
}

window.onscroll = function() {
  scrollNavbar()
};

async function getLocationInfo() {
  try {
    // Step 1: Get the client IP
    let ipResponse = await fetch("https://api.ipify.org?format=json");
    let ipData = await ipResponse.json();
    let ip = ipData.ip;

    // Step 2: Use IP to get geolocation
    let geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    let geoData = await geoResponse.json();

    // Step 3: Build state + country string
    let state = geoData.region;   // e.g. "California"
    let country = geoData.country_name; // e.g. "United States"
    let result = `${state}, ${country}`;

    return result;
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
}

const waitlistForm = document.getElementById("waitlist_form");
if (waitlistForm) {
  waitlistForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    $("#waitlist_form").find("input, button").prop("disabled", true);

    const formData = new FormData(this);

    try {
      const res = await fetch(this.action, {
        method: this.method || "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      const contentType = res.headers.get("content-type") || "";
      let payload;

      if (contentType.includes("application/json")) {
        payload = await res.json();
      } else {
        // Fallback for HTML or plain text responses
        payload = await res.text();
      }
      console.log("Success:", payload);
      $("#waitlist_thx").show();
      $("#waitlist_form").hide();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  });
}

function main() {
  // typeHello();
  getLocationInfo().then(location => {
    $("#location").val(location);
  });
  getSectionsOffsets();
  scrollNavbar()
  homeValueCalculatorListener()
  colorCoordinate();
  // if (loc != 'hello') {
  //   goToSection(loc);
  // }
}

$( document ).ready(function() { main() });
