const url = document.URL;

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
  copyToClipboard(url);
  $("#modal_link")[0].innerText = url;
  $("#modal_link")[0].href = url;
}
