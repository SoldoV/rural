import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import news from "../components/NewsItem.vue";


Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/news",
    name: "news",
    component: news
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
        "../components/About.vue"
      )
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import(
        /* webpackChunkName: "contact" */
        "../components/Contact.vue"
      )
  },

];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
