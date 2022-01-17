export const navbarNavigations = [
    {
        title: "Dashboard",
        iconName: "board",
        href: "/admin/dashboard",
      },
    {
        
      title: "Courses",
      iconName: "box",
      href: "/admin/courses/all",
      child: [
        {
          title: "All courses",
          iconName: "box",
          href: "/admin/courses/all",
        },
        {
          title: "Your courses",
          iconName: "box",
          href: "/admin/courses/me",
        },
        {
          title: "New Course",
          iconName: "upload",
          href: "/admin/courses/new",
        }
      ],
    },
{   
    title: "Users",
    iconName: "box",
    href: "/admin/users/all",
    child: [
      {
        title: "All users",
        href: "/admin/users/all",
        iconName: "box",

      },
      {
        title: "New users",
        iconName: "upload",
        href: "/admin/users/new",
      }
    ],
  },
  {
        
    title: "Modules",
    href: "/admin/modules/all",
    iconName: "box",

    child: [
      {
        title: "All courses",
        href: "/admin/modules/all",
        iconName: "box",

      },
      {
        title: "Your courses",
        href: "/admin/modules/me",
        iconName: "box",

      },
      {
        title: "New Course",
        iconName: "upload",
        href: "/admin/modules/new",
      }
    ],
  },

  {
        
    title: "Lectures",
    href: "/admin/lectures/all",
    iconName: "box",

    child: [
      {
        title: "All lectures",
        href: "/admin/lectures/all",
        iconName: "box",
      },
      {
        title: "Your lectures",
        href: "/admin/lectures/me",
        iconName: "box",
      },
      {
        title: "New lectures",
        iconName: "upload",
        href: "/admin/lectures/new",
      }
    ],
  },

  {
        
    title: "Quizzes",
    href: "/admin/quizzes/all",
    iconName: "box",

    child: [
      {
        title: "All quizzes",
        href: "/admin/quizzes/all",
        iconName: "box",
      },
      {
        title: "Your quizzes",
        href: "/admin/quizzes/me",
      },
      {
        title: "New quizzes",
        iconName: "upload",
        href: "/admin/quizzes/new",
      }
    ],
  },
  {
        
    title: "Articles",
    href: "/admin/articles/all",
    iconName: "box",

    child: [
      {
        title: "All articles",
        href: "/admin/articles/all",
        iconName: "box",
      },
      {
        title: "Your articles",
        href: "/admin/articles/me",
        iconName: "box",
      },
      {
        title: "New articles",
        iconName: "upload",
        href: "/admin/articles/new",
      }
    ],
  },
  {
        
    title: "Publications",
    href: "/admin/publications/all",
    iconName: "box",

    child: [
      {
        title: "All publications",
        href: "/admin/publications/all",
        iconName: "box",
      },
      {
        title: "Your publications",
        href: "/admin/publications/me",
        iconName: "box",
      },
      {
        title: "New publications",
        iconName: "upload",
        href: "/admin/publications/new",
      }
    ],
  },
  {
        
    title: "Events",
    href: "/admin/events/all",
    iconName: "box",

    child: [
      {
        title: "All events",
        href: "/admin/events/all",
        iconName: "box",
      },
      {
        title: "Your events",
        href: "/admin/events/me",
        iconName: "box",
      },
      {
        title: "New events",
        iconName: "upload",
        href: "/admin/events/new",
      }
    ],
  },
  {
        
    title: "Trainings",
    href: "/admin/trainings/all",
    iconName: "box",

    child: [
      {
        title: "All trainings",
        href: "/admin/trainings/all",
        iconName: "box",
      },
      {
        title: "Your trainings",
        href: "/admin/trainings/me",
        iconName: "box",
      },
      {
        title: "New trainings",
        iconName: "upload",
        href: "/admin/trainings/new",
      }
    ],
  },
  {
    href: "/admin/account-settings",
    title: "Account Settings",
    iconName: "gear-2",
  },
    
  ];
  const linkList = [
    {
      href: "/admin/dashboard",
      title: "Dashboard",
      iconName: "board",
    },
    {
      href: "/admin/courses",
      title: "Courses",
      iconName: "box",
    },
    {
      href: "/admin/modules",
      title: "Modules",
      iconName: "box",
    },
    {
      href: "/admin/lectures",
      title: "Lectures",
      iconName: "upload",
    },

    {
      href: "/admin/categories",
      title: "Categories",
      iconName: "upload",
    },
    {
      href: "/admin/quizzes",
      title: "Quizzes",
      iconName: "upload",
    },
    {
      href: "/admin/promos",
      title: "Promo",
      iconName: "credit-card",
    },
    {
      href: "/admin/users",
      title: "Users",
      iconName: "user",
    },
    {
      href: "/admin/articles",
      title: "Articles",
      iconName: "upload",
    },
    {
      href: "/admin/payments",
      title: "Payments",
      iconName: "credit-card",
    },
    {
      href: "/admin/roles",
      title: "Roles",
      iconName: "upload",
    },
    {
      href: "/admin/complains",
      title: "Complains",
      iconName: "box",
    },
    
    {
      href: "/admin/publications",
      title: "Publications",
      iconName: "upload",
    },
   
    {
      href: "/admin/events",
      title: "Events",
      iconName: "upload",
    },
    {
      href: "/admin/trainings",
      title: "Trainings",
      iconName: "upload",
    },
    {
      href: "/admin/account-settings",
      title: "Account Settings",
      iconName: "gear-2",
    },
  ];
  
  export default linkList;