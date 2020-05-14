import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: () =>
      import(
        /* webpackChunkName: "home" */
        "../views/Home.vue"
      )
  },
  {
    path: "/news",
    name: "news",
    component: () =>
      import(
        /* webpackChunkName: "news" */
        "../components/News.vue"
      )
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
        path: "tags",
        name: "Admin tags",
        component: () =>
          import(
            /* webpackChunkName: "AdminTags" */
            "../components/Admin/Tags.vue"
          )
      },
      {
        path: "households",
        name: "Admin households",
        component: () =>
          import(
            /* webpackChunkName: "AdminHouseholds" */
            "../components/Admin/Households.vue"
          )
      },
      {
        path: "cities",
        name: "Admin cities",
        component: () =>
          import(
            /* webpackChunkName: "AdminCities" */
            "../components/Admin/Cities.vue"
          )
      },
      {
        path: "newHousehold",
        name: "Admin new household",
        component: () =>
          import(
            /* webpackChunkName: "AdminNewHousehold" */
            "../components/Admin/NewHousehold.vue"
          ),
        children: [{
            path: "description",
            name: "Admin new household description",
            component: () =>
              import(
                /* webpackChunkName: "newHouseholdDescription" */
                "../components/Admin/NewHouseholdDescription.vue"
              )
          },
          {
            path: "properties",
            name: "Admin new household properties",
            component: () =>
              import(
                /* webpackChunkName: "newHouseholProperties" */
                "../components/Admin/NewHouseholdProperties.vue"
              )
          }
        ]
      },
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
