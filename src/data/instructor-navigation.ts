export const navbarNavigations = [
    {
        title: "Dashboard",
        iconName: "board",
        href: "/instructor/dashboard",
      },
    {
        
      title: "Courses",
      iconName: "box",
      href: "/instructor/courses/me",
      child: [
        {
          title: "Your courses",
          iconName: "box",
          href: "/instructor/courses/me",
        },
        {
          title: "New Course",
          iconName: "upload",
          href: "/instructor/courses/new",
        }
      ],
    },
  {
        
    title: "Modules",
    href: "/instructor/modules/me",
    iconName: "box",

    child: [
      {
        title: "Your courses",
        href: "/instructor/modules/me",
        iconName: "box",

      },
      {
        title: "New Course",
        iconName: "upload",
        href: "/instructor/modules/new",
      }
    ],
  },

  {
        
    title: "Lectures",
    href: "/instructor/lectures/me",
    iconName: "box",

    child: [
      {
        title: "Your lectures",
        href: "/instructor/lectures/me",
        iconName: "box",
      },
      {
        title: "New lectures",
        iconName: "upload",
        href: "/instructor/lectures/new",
      }
    ],
  },

  {
        
    title: "Quizzes",
    href: "/instructor/quizzes/me",
    iconName: "box",

    child: [
      {
        title: "Your quizzes",
        href: "/instructor/quizzes/me",
      },
      {
        title: "New quizzes",
        iconName: "upload",
        href: "/instructor/quizzes/new",
      }
    ],
  },
  {
        
    title: "Articles",
    href: "/instructor/articles/me",
    iconName: "box",

    child: [
      {
        title: "Your articles",
        href: "/instructor/articles/me",
        iconName: "box",
      },
      {
        title: "New articles",
        iconName: "upload",
        href: "/instructor/articles/new",
      }
    ],
  },
  {
        
    title: "Reports",
    href: "/instructor/reports/me",
    iconName: "box",

    child: [
      {
        title: "Your reports",
        href: "/instructor/reports/me",
        iconName: "box",
      },
      {
        title: "New reports",
        iconName: "upload",
        href: "/instructor/reports/new",
      }
    ],
  },
  {
        
    title: "Trainings",
    href: "/instructor/trainings/me",
    iconName: "box",

    child: [
      {
        title: "Your trainings",
        href: "/instructor/trainings/me",
        iconName: "box",
      },
      {
        title: "New trainings",
        iconName: "upload",
        href: "/instructor/trainings/new",
      }
    ],
  },
  {
    href: "/instructor/account-settings",
    title: "Account Settings",
    iconName: "gear-2",
  },
    
  ];
  
  const linkList = [
    {
      href: "/instructor/dashboard",
      title: "Dashboard",
      iconName: "board",
    },
    {
      href: "/instructor/courses",
      title: "Courses",
      iconName: "box",
    },
    {
      href: "/instructor/modules",
      title: "Modules",
      iconName: "box",
    },
    {
      href: "/instructor/lectures",
      title: "Lectures",
      iconName: "upload",
    },
    {
      href: "/instructor/quizzes",
      title: "Quizzes",
      iconName: "upload",
    },
    {
      href: "/instructor/articles",
      title: "Articles",
      iconName: "upload",
    },
    {
      href: "/instructor/reports",
      title: "Reports",
      iconName: "upload",
    },
    {
      href: "/instructor/events",
      title: "Events",
      iconName: "upload",
    },
    {
      href: "/instructor/trainings",
      title: "Trainings",
      iconName: "upload",
    },
    {
      href: "/instructor/account-settings",
      title: "Account Settings",
      iconName: "gear-2",
    },
  ];
  
  export default linkList;