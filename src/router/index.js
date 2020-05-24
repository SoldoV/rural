import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js"

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
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "AdminDashboard" */
        "../components/Admin/AdminDashboard.vue"
      ),
    children: [{
        path: "tags",
        name: "Admin tags",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(
            /* webpackChunkName: "AdminTags" */
            "../components/Admin/Tags.vue"
          )
      },
      {
        path: "households",
        name: "Admin households",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(
            /* webpackChunkName: "AdminHouseholds" */
            "../components/Admin/Households.vue"
          )
      },
      {
        path: "cities",
        name: "Admin cities",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(
            /* webpackChunkName: "AdminCities" */
            "../components/Admin/Cities.vue"
          )
      },
      {
        path: "household/:id?",
        name: "Admin household",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(
            /* webpackChunkName: "AdminHousehold" */
            "../components/Admin/NewHousehold.vue"
          ),
        children: [{
            path: "description",
            name: "Admin household description",
            meta: {
              requiresAuth: true
            },
            component: () =>
              import(
                /* webpackChunkName: "householdDescription" */
                "../components/Admin/NewHouseholdDescription.vue"
              )
          },
          {
            path: "properties",
            meta: {
              requiresAuth: true
            },
            name: "Admin household properties",
            component: () =>
              import(
                /* webpackChunkName: "householdProperties" */
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.IS_LOGGED_IN) {
      next()
      return
    }
    next({
      name: "Home"
    })
  } else next()
})

export default router;
