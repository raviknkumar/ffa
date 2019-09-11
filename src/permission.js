
import router from "@/router/index"
import {getUserId} from "@/commons/localStoreFunctions";

router.beforeEach((to, from, next) => {
    if(to.name === from.name){
        next(false)
    }
  if(to.name === 'Login'|| to.name === 'SignUp' ){
      if(getUserId()){
          next(false)
      }
      else
        next();
  }else {
      if(getUserId() === null){
          // router.push({ path: '/login' })
          router.push({ name: 'Login' })
      }
      else
        next();
  }
})