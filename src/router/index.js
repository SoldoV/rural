import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Footer from "../components/Footer.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/footer",
    name: "Footer",
    component: Footer
  },
  {
    path: "/dashboard",
    name: "Admin Dashboard",
    component: () =>
      import(
        /* webpackChunkName: "AdminDashboard" */
        "../components/Admin/AdminDashboard.vue"
      ),
    children: [{
        path: "tagovi",
        name: "Admin tagovi",
        component: () =>
          import(
            /* webpackChunkName: "about" */
            "../components/Admin/Tagovi.vue"
          )
      },
      {
        path: "domacinstva",
        name: "Admin domacinstva",
        component: () =>
          import(
            /* webpackChunkName: "about" */
            "../components/Admin/Domacinstva.vue"
          )
      },
      {
        path: "gradovi",
        name: "Admin gradovi",
        component: () =>
          import(
            /* webpackChunkName: "Admingradovi" */
            "../components/Admin/Gradovi.vue"
          )
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/About.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
