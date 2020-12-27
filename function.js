new Vue({
  el: "#formArea",

  data: {
    name: "",
    email: "",
    age: "",
    country: "your country",
    agreeTerms: false,

    nameIsValid: true,
    emailIsValid: true,
    ageIsValid: true,
    countryIsValid: true,

    contents: "",
  },

  methods: {
    validateName: function () {
      var letters = /^[A-Za-z ]+$/;
      if (this.name.match(letters)) {
        this.nameIsValid = true;
      } else {
        this.nameIsValid = false;
      }
    },

    validateEmail: function () {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          this.email
        )
      ) {
        this.emailIsValid = true;
      } else {
        this.emailIsValid = false;
      }
    },

    validateAge: function () {
      let year = "";
      let month = "";
      let day = "";
      for (let index = 0; index < this.age.length; index++) {
        if (index < 4) year += this.age[index];
        else if (index > 4 && index < 7) month += this.age[index];
        else if (index > 7) day += this.age[index];
      }
      year = parseInt(year);
      month = parseInt(month);
      day = parseInt(day);
      var today = new Date();
      if (today.getFullYear() - year > 18) {
        this.ageIsValid = true;
        return;
      } else if (today.getFullYear() - year === 18) {
        if (today.getMonth() + 1 > month) {
          this.ageIsValid = true;
          return;
        } else if (today.getMonth() + 1 === month) {
          if (today.getDate() >= day) {
            this.ageIsValid = true;
            return;
          }
        }
      }
      this.ageIsValid = false;
    },

    validateCountry: function () {
      if (this.country != "your country") this.countryIsValid = true;
      else this.countryIsValid = false;
    },

    fetchResult: function () {
      var formElem = this;
      var xhttp = new XMLHttpRequest();
      let reqURL = "https://restcountries.eu/rest/v2/region/" + this.country;
      xhttp.open("GET", reqURL);
      xhttp.send();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // Typical action to be performed when the document is ready:
          formElem.contents = JSON.parse(xhttp.responseText);
        }
      };
    },

    submitForm: function () {
      this.validateName();
      this.validateEmail();
      this.validateAge();
      this.validateCountry();

      if (
        this.nameIsValid &&
        this.emailIsValid &&
        this.ageIsValid &&
        this.countryIsValid &&
        this.agreeTerms
      ) {
        this.fetchResult();
      }
      // console.log(this.nameIsValid);
      // console.log(this.emailIsValid);
      // console.log(this.ageIsValid);
      // console.log(this.countryIsValid);
    },
  },
});
