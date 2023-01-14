const data = users;
const pageCount = Math.ceil(data.length / 10);

let pages = "";
var currentPage = 1;
let dataPerPage = 10;

getItems(pageCount, currentPage);
loadDataListForPage(data, dataPerPage);
function loadDataListForPage(data, dataPerPage) {
  var begin = (currentPage - 1) * dataPerPage;
  var end = begin + dataPerPage;

  pageList = data.slice(begin, end);
  var htmlView = pageList
    .map(
      (item) => `        
      <li class="contact-item cf">
          <div class="contact-details">
              <img class="avatar" src="${item.picture.medium}">
              <h3>${item.name.first} ${item.name.last}</h3>
              <span class="email">${item.email}</span>
          </div>
          <div class="joined-details">
              <span class="date">Joined ${item.dob.date.slice(0, 9)}</span>
          </div>
      </li>`
    )
    .join("");
  document.getElementsByClassName("contact-list")[0].innerHTML = htmlView;
}

function getItems(pageCount, currentPage) {
  console.log(currentPage);
  pages = "";
  for (let i = 1; i <= pageCount; i++) {
    if (i == currentPage) {
      console.log(i);
      pages =
        pages +
        `<li><a href="#" class="active" onclick="loadPage(event,${i})">${i}</a></li>`;
    } else {
      pages =
        pages + `<li><a href="#" onclick="loadPage(event,${i})">${i}</a></li>`;
    }
  }
  document.getElementById("pagination").innerHTML = `<ul class="pagination">
  <li><a href="#" onclick="firstPage(event)" >&laquo;</a></li>
  ${pages}
  <li><a href="#" onclick="lastPage(event)">&raquo;</a></li>
  </ul>`;
}

function firstPage(event) {
  event.preventDefault();
  if (currentPage == 1) {
    currentPage = 1;
  } else {
    currentPage = currentPage - 1;
  }
  getItems(pageCount, currentPage);
  loadDataListForPage(data, dataPerPage);
}
function lastPage(event) {
  event.preventDefault();
  if (currentPage == pageCount) {
    currentPage = pageCount;
  } else {
    currentPage = currentPage + 1;
  }
  getItems(pageCount, currentPage);
  loadDataListForPage(data, dataPerPage);
}
function loadPage(event, i) {
  event.preventDefault();
  currentPage = i;
  getItems(pageCount, currentPage);
  loadDataListForPage(data, dataPerPage);
}
document.getElementsByTagName("h3")[0].innerHTML = `Total: ${data.length}`;
