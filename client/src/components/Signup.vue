<template>
  <div class="card">
    <h1>Signup Page</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="firstname">First Name</label>
        <input type="text" id="firstname" v-model="firstName" required />
      </div>

      <div class="form-group">
        <label for="lastname">Last Name</label>
        <input type="text" id="lastname" v-model="lastName" required />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SignUpPage",
  props: {
    name: String,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post(
          "http://localhost:5000/user/register",
          {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
          },
        );
        console.log(response.data);
        if (response.data) {
          alert("Registration successful You'll be Redirected To Login Screen");
          this.$router.push("/login");
        } else {
          alert("Registration failed");
        }
      } catch (err) {
        alert(err.response.data.error);
      }
    },
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

.form-group > label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
}

.form-group > input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: #f0f0f0;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.form-group > input:focus {
  outline: none;
  background-color: #e0e0e0;
}

.card {
  background-color: #000;
  color: #fff;
  padding: 2em;
  width: 100%;
  max-width: 420px;
  margin: 1em;
  border-radius: 30px;
}

button {
  background-color: #08a308;
  color: white;
  border-radius: 10px;
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background: #14641f;
}

h1.temp {
  margin: 0;
  margin-bottom: 0.4em;
}
</style>
