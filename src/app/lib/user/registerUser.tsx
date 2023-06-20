import axios from "axios";

axios.defaults.withCredentials = true;
export default async function registerUser(
  name: string,
  email: string,
  password: string
) {
  // console.log("called");

  // var myHeaders = new Headers();
  // myHeaders.append("Accept", "application/json");
  // myHeaders.append("Content-Type", "application/json");

  // var formdata = new FormData();
  // formdata.append("name", name);
  // formdata.append("email", email);
  // formdata.append("password", password);

  // fetch("https://6a93-102-89-41-89.ngrok-free.app/sanctum/csrf-cookie").then(
  //   async () => {
  //     fetch("/api/register", {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: formdata,
  //       redirect: "follow",
  //     })
  //       .then((response) => response.text())
  //       .then((result) => console.log(result))
  //       .catch((error) => console.log("error", error));
  //   }
  // );

  // const res = await fetch(

  //   "https://6a93-102-89-41-89.ngrok-free.app/api/register",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ name: name, email: email, password: password }),
  //   }
  // );

  // if (!res.ok) throw new Error("couldn't register user");

  // return res.json();

  axios
    .get("https://6a93-102-89-41-89.ngrok-free.app/sanctum/csrf-cookie")
    .then((res) => {
      if (res.status === 200) {
        console.log("got response");
      }
    })
    .catch((err) => {
      console.log("failed");
      console.log(err);
    });

  // .then((response) => {
  //   axios
  //     .post("https://6a93-102-89-41-89.ngrok-free.app/api/register", {
  //       name,
  //       email,
  //       password,
  //     })
  //     .then((res) => {
  //       if (res.data.status === 200) {
  //         console.log("success");
  //         console.log(res.data);
  //       }
  //     });
  // })
  // .catch((err) => {
  //   console.log("failed");
  //   console.log(err);
  // });
}
