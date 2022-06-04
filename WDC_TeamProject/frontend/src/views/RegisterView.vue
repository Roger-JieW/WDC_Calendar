<template>
    <main class="form-signin ">
    <form @submit.prevent="submit">
        <h1 class="h3 mb-3 fw-normal">Please sign up</h1>

        <div class="form-floating">
        <input v-model="data.name" type="name" class="form-control shadow-none" id="floatingInput" placeholder="User Name">
        <label for="floatingInput">User Name</label>
        </div>
        <div class="form-floating">
        <input v-model="data.password" type="password" class="form-control shadow-none" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Password</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
        <p class="mt-5 mb-3 text-muted">&copy; WDC 2022</p >
    </form>
    </main>
</template>

<script lang="ts">
import { reactive } from "vue"
import { useRouter } from "vue-router"
    export default{
        name: 'Register',
        setup(){
            const data = reactive({
                name: '',
                password: '',
            })
            var router = useRouter();
            const submit = async () => {
                var url = 'http://localhost:3000/register';
                await router.push('/login');
                await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
            }
            return {
                data,
                submit,
            }
        },
    }
</script>

<style>
.form-signin {

  width: 100%;
  max-width: 400px;
  padding: 15px;
  margin: 100px auto; 
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="name"] {
  margin-bottom: 5px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>