import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import axios from "axios";
import store from "../store";

Vue.use(VueRouter);

const routes = [

  {
    path: "/map",
    name: "map",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Map.vue"),
  },
  {
    path: "/edit",
    name: "edit",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Editar.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   if (to.matched.some((record) => record.meta.isAuth)) {
//     try {
//       if (localStorage.getItem("Token") == null) {
//         next({
//           path: "/login",
//         });
//       } else {
//         const res = await axios.get(`http://localhost:3000/api/isAuth`, {
//           headers: {
//             authorization: `Bearer ${localStorage.getItem("Token")}`,
//           },
//         });

//         if (res.data.auth) {
//           store.commit("setEmail", localStorage.getItem("Email"));
//           next();
//         }
//       }
//     } catch (err) {
//       console.log(err);
//       if (err.response.status === 403) {
//         next({
//           path: "/login",
//         });
//       }
//     }
//   } else {
//     next();
//   }
// });

export default router;
