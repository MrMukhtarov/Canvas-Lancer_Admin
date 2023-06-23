let form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let question = document.querySelector("#question");
  let answer = document.querySelector("#answer");
  let img = document.querySelector("#img");

  const ACCESS_KEY = "ECZyNDcEZAfVruJ82VKJEcQs8Iqep0D4Xa7A84QCVMs";

  let url = "";
  try {
    let response = await fetch(
      `https://api.unsplash.com/search/photos?query=${img.value}&client_id=${ACCESS_KEY}`
    );
    let json = await response.json();
    json.results.forEach((element) => {
      url = element.urls.full;
    });
  } catch (err) {
    console.log(err);
    alert("Please enter right city name");
  }

  let Faq = {
    question: question.value,
    answer: answer.value,
    img: url,
    date: new Date(),
  };

  const response = await fetch(
    `https://auth-admin-319e0-default-rtdb.firebaseio.com/faq.json`,
    {
      method: "POST",
      body: JSON.stringify(Faq),
    }
  );
  question.value = "";
  answer.value = "";
  img.value = "";
});

onload = GetData;
async function GetData() {
  let tbody = document.querySelector("tbody");

  let response = await fetch(
    `https://auth-admin-319e0-default-rtdb.firebaseio.com/faq.json`
  );

  let data = await response.json();

  let faq = [];

  for (let key in data) {
    data[key].id = key;
    faq.push(data[key]);
  }

  let tr = "";

  faq.forEach((item) => {
    tr += `
        <tr id="${item.id}-item">
        <td>${item.question}</td>
        <td>${item.answer.slice(0, 20) + "..."}</td>
        <td>${item.date}</td>
        <td><img class="table-img"src="${item.img}" alt=""></td>
        <td>
            <div class="d-flex justify-content-center gap-2">
                <button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="Update('${
                  item.id
                }')">Update</button>
                <button onclick="Delete('${
                  item.id
                }')" class="btn btn-danger btn-sm dels">Delete</button>
            </div>
        </td>
    </tr>
        `;
  });

  tbody.innerHTML = tr;
}

async function Update(id) {

  let questionModal = document.querySelector("#modal-question");
  let answerModal = document.querySelector("#modal-answer");
  let imageModal = document.querySelector("#modal-img");

  let response = await fetch(
    `https://auth-admin-319e0-default-rtdb.firebaseio.com/faq/${id}.json`
  );

  let data = await response.json();

  questionModal.value = data.question;
  answerModal.value = data.answer;

    let ImageRes = await fetch(
      `https://source.unsplash.com/random/900%C3%97700/?${imageModal.value}`
    );


  let save = document.querySelector("#save");
  save.addEventListener("click", async (e) => {
    console.log(ImageRes.url);
    let NewFaq = {
      question: questionModal.value,
      answer: answerModal.value,
      img: ImageRes.url,
      date: new Date(),
    };
    await fetch(
      `https://auth-admin-319e0-default-rtdb.firebaseio.com/faq/${id}.json`,
      {
        method: "PUT",
        body: JSON.stringify(NewFaq),
        headers : {
            "Content-Type" : "application/json"
        }
      }
    );
    let modal = document.querySelector("#exampleModal");
    let bootstrapModal = bootstrap.Modal.getInstance(modal);
    bootstrapModal.hide();
    window.location.reload();
  }
  );

}

async function Delete(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      let response = await fetch(
        `https://auth-admin-319e0-default-rtdb.firebaseio.com/faq/${id}.json`,
        {
          method: "DELETE",
        }
      );

      if (response.status === 200) {
        let del = document.querySelector(`#${id}-item`);
        if (del) {
          del.remove();
        }
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    }
  });
}
