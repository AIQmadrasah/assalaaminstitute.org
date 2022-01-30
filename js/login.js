function checkIfUserIsLoggedIn() {
  firebase.auth().onAuthStateChanged(function(user) {
    if(!user){
      window.location = "login.html";
      return;
    } else {
      $(".navbar-nav.ml-auto").append('<li class="nav-item"><a class="nav-link" onclick="logout()">Logout</a></li>');
      $(".navbar-nav.ml-auto").append('<li class="nav-item"><a class="nav-link" onclick="changePassword()">Change Password</a></li>');
    }
  })
}

function checkIfUserIsLoggedOut() {
  firebase.auth().onAuthStateChanged(function(user) {
    if(user){
      login();
    }
  })
}

function checkUser(UID, FILE) {
  if(UID && FILE){
    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        if(user.uid === UID) return window.location = FILE
      } else {
        let email = document.getElementById("emailInput1").value;
        let password = document.getElementById("passwordInput1").value;
        firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
          Swal.fire({
            title: `${email} Logged in`,
            timer: 10000,
            timerProgressBar: true,
            didOpen: () => {
              timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    b.textContent = Swal.getTimerLeft()
                  }
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
              window.location = FILE
          })
        }).catch((error) => {
          Swal.fire({
            title: error.message,
            timer: 10000,
            timerProgressBar: true,
            didOpen: () => {
              timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                  const b = content.querySelector('b')
                  if (b) {
                    b.textContent = Swal.getTimerLeft()
                  }
                }
              }, 100)
            },
            willClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            return;
          })
        })
      }
    })
  }
}

function logout(){
  firebase.auth().onAuthStateChanged(function(user) {
      if(user){
          firebase.auth().signOut().then(() => {
              window.location="login.html"
            }).catch((error) => {
              Swal.fire({
                  title: error.message,
                  timer: 10000,
                  timerProgressBar: true,
                  didOpen: () => {
                    timerInterval = setInterval(() => {
                      const content = Swal.getContent()
                      if (content) {
                        const b = content.querySelector('b')
                        if (b) {
                          b.textContent = Swal.getTimerLeft()
                        }
                      }
                    }, 100)
                  },
                  willClose: () => {
                    clearInterval(timerInterval)
                  }
              }).then((result) => {
                return;
              })
          });
      } else {
          window.location="login.html"
      }
  })
}

function changePassword() {
  firebase.auth().onAuthStateChanged(function(user) {
    if(user){
      firebase.auth().sendPasswordResetEmail(user.email).then(function(){
        alert(`Please Check your email ${user.email}`);
      }).catch(function(err){
        alert(`There was an error ${err.message}`);
      })
    } else {
      window.location = "login.html"
    }
  })
}

function login() {
  checkUser('NyA8iRKneeUKBPQWpS1MPUO03tu2', 'resetsheet.html'); //admin account
  checkUser('uEcv5sBHqDfxVf0IiCkdBSzzITX2', 'abbas_alvi.html'); //abbas
  checkUser('ppDqqgHmXchKk7dGS90hkQz9yUq1', 'abdussamad_siddiqi.html'); //abdussamad
  checkUser('yL8qHbpfUFZD7045BvYmZybtXR73', 'abdullah_malek.html'); //Abdullah Malek
  checkUser('pts6EzfsQyQWhxD7onzvU4pBehh1', 'abdur-rafay_khan.html'); //Abdurrafay
  checkUser('S3Ti5aS9EmYKVNmSN0rSKj01H113', 'abuzar.html'); //Abuzar
  checkUser('lZt8XdMWpiarmnZmcrZQV48qem83', 'affan_s.html'); //Affan Shaikh
  checkUser('gC7uRVGvIsewk9plmLebQomT6A62', 'afnan_m.html'); //afnan Mirza
  checkUser('0bHaYkVi04UWRBSWj4n5k2EqjE03', 'basil_a.html'); //Basil Ahmed
  checkUser('IsmVwhDQqDOWpQ3EIXKBabpPVD73', 'bilal_m.html'); //Bilal muhammad
  checkUser('OmnvjCIScSUTS7J86aS3qj4gG8L2', 'hamdaan_abdul_suboor.html'); //Hamdaan abdul saboor
  checkUser('wojaYJDAwxgQykpT6i4k1dQPj1g1', 'haseeb.html'); //Haseeb Aziz
  checkUser('epr7BJEJ0Lg57tQuTrCE5uFodmE3', 'hassan_h.html'); //Hassan Hussain
  checkUser('YWp9PkI5rsZF4GBtILFq07JVVM82', 'humdaanS.html'); //Humdaan syed
  checkUser('oKFP2qq5vlhZDuub58DKbt59Nah1', 'hunaynA.html'); //Hunayn
  checkUser('ZpJyMwOcqjWnsgz7WxnNiQhCHDQ2', 'huzaifah_popalzai.html'); //Huzaifa P
  checkUser('05nH9nR3SeVSu5RLLueTKocOP4I3', 'irfan.html'); //Irfan Shaikh
  checkUser('OYoXjcjt68btpcXXseWrbOnwbrC3', 'ismael.html'); //Ismail Sherif
  checkUser('LnRavM362ihj1vqBtGbFe0aAzab2', 'luqmaanS.html'); //Lumqmaan shaikh
  checkUser('SywqHkycSPeldsD1LGTCNHXea0F2', 'maryam_a.html'); //Maryam A
  checkUser('YIzx4AWN3YauO98L5EanB2l3VTA2', 'mohib.html'); //mohib malek
  checkUser('yOR5TXQ0hYgrGNEjmAFV93xae5o1', 'muhammadm.html'); //Muhammad mehraban
  checkUser('huG5p8ed9Hh5zj1TnwNVFXqaNvD3', 'muhammad-k.html'); //muhammad k
  checkUser('oTy5HBN7aicw0obww8DVm4HSS4m1', 'munir.html'); //munir khan
  checkUser('AqdpYGrADGbviVXs1bgdpPKZAFw2', 'mustafa.html'); //Mustafa Khan
  checkUser('Xd3ZVDkmW4hJ8uT7dMfeZV5flcn1', 'nabil.html'); //Nabil k
  checkUser('YXdFN0yqwBOIab5hQFaKw0eGPp33', 'raashid-a.html'); //Rashid A
  checkUser('gSlvwgHXOEcvmggk6l9qer3obDp1', 'rayan-m.html'); //Rayan M
  checkUser('0f83ECkxkMU7UFmhbvJplOLBlIJ2', 'sadiq.html'); //Sadiq M
  checkUser('xsPYEq99TvaV9K4zRcLTB27dusq2', 'safa.html'); //Safa Alvi
  checkUser('dtPqtiWkUtWLinxXO8DIMbbYlYe2', 'sidik.html'); //Sidik K
  checkUser('yv6mfXIDVfWNhQDzoJOTF2PqoOB3', 'taha.html'); //Taha A
  checkUser('l50Qvgb6n4TyTACAavKuqnmAE1R2', 'talha.html'); //Talha Khan
  checkUser('4Uy5yjFhzThXNd8nxefNXXavPED2', 'umar_syed.html'); //Umar Syed
  checkUser('11jMCcMQAAYGvhWgufTvxPbHvZ72', 'umerc.html'); //Umer Ch
  checkUser('11jMCcMQAAYGvhWgufTvxPbHvZ72', 'usmanc.html'); //Usman Ch
  checkUser('11jMCcMQAAYGvhWgufTvxPbHvZ72', 'sidra.html'); //Sidra Ch
  checkUser('oEqk61xUykOwu34kcp4Am89W53k2', 'uthmanq.html'); //Uthman Qadri
  checkUser('xE2fZFUHlbXXJv0TRZ1Do7X3DGA3', 'yahhyaM.html'); //Yahya m
  checkUser('05VXhhM7uhZQsuYP2RWbWve74xw1', 'yousufM.html'); //yousuf M
  checkUser('5mox7cAjKoPTlwYze4Zo1jDRM713', 'yusufA.html'); //yusuf A
  checkUser('vPgk62fOByeVtspcZxbxS58gd273', 'yusufG.html'); //yusuf G
  checkUser('ngy4ZzX3s4ZCERa9ci5jedtRKCG3', 'yusufH.html'); //yusuf H
  checkUser('N5B94byvBUddRH53kQ7Yhhp1nAC3', 'zaakirS.html'); //Zaakir
  checkUser('fR5GG5dlgZcDAOguIT105iAqJVx1', 'zaigham.html'); //Zaigham
  checkUser('n0WGwJVqiSO3iYc2nggp7MvaF5v2', 'zaydI.html'); //Zayd Ikram
}
