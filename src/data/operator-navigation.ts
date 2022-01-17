export const navbarNavigations = [
    {
        title: "Dashboard",
        iconName: "board",
        href: "/operator/dashboard",
      },
    {
        
      title: "Courses",
      iconName: "box",
      href: "/operator/courses/all",
      child: [
        {
          title: "All courses",
          iconName: "box",
          href: "/operator/courses/all",
        },
        {
          title: "Your courses",
          iconName: "box",
          href: "/operator/courses/me",
        },
        {
          title: "New Course",
          iconName: "upload",
          href: "/operator/courses/new",
        }
      ],
    },
{   
    title: "Users",
    iconName: "box",
    href: "/operator/users/all",
    child: [
      {
        title: "All users",
        href: "/operator/users/all",
        iconName: "box",

      },
      {
        title: "New users",
        iconName: "upload",
        href: "/operator/users/new",
      }
    ],
  },
  {
        
    title: "Modules",
    href: "/operator/modules/all",
    iconName: "box",

    child: [
      {
        title: "All courses",
        href: "/operator/modules/all",
        iconName: "box",

      },
      {
        title: "Your courses",
        href: "/operator/modules/me",
        iconName: "box",

      },
      {
        title: "New Course",
        iconName: "upload",
        href: "/operator/modules/new",
      }
    ],
  },

  {
        
    title: "Lectures",
    href: "/operator/lectures/all",
    iconName: "box",

    child: [
      {
        title: "All lectures",
        href: "/operator/lectures/all",
        iconName: "box",
      },
      {
        title: "Your lectures",
        href: "/operator/lectures/me",
        iconName: "box",
      },
      {
        title: "New lectures",
        iconName: "upload",
        href: "/operator/lectures/new",
      }
    ],
  },

  {
        
    title: "Quizzes",
    href: "/operator/quizzes/all",
    iconName: "box",

    child: [
      {
        title: "All quizzes",
        href: "/operator/quizzes/all",
        iconName: "box",
      },
      {
        title: "Your quizzes",
        href: "/operator/quizzes/me",
      },
      {
        title: "New quizzes",
        iconName: "upload",
        href: "/operator/quizzes/new",
      }
    ],
  },
  {
        
    title: "Articles",
    href: "/operator/articles/all",
    iconName: "box",

    child: [
      {
        title: "All articles",
        href: "/operator/articles/all",
        iconName: "box",
      },
      {
        title: "Your articles",
        href: "/operator/articles/me",
        iconName: "box",
      },
      {
        title: "New articles",
        iconName: "upload",
        href: "/operator/articles/new",
      }
    ],
  },
  {
        
    title: "Reports",
    href: "/operator/reports/all",
    iconName: "box",

    child: [
      {
        title: "All reports",
        href: "/operator/reports/all",
        iconName: "box",
      },
      {
        title: "Your reports",
        href: "/operator/reports/me",
        iconName: "box",
      },
      {
        title: "New reports",
        iconName: "upload",
        href: "/operator/reports/new",
      }
    ],
  },
  {
        
    title: "Events",
    href: "/operator/events/all",
    iconName: "box",

    child: [
      {
        title: "All events",
        href: "/operator/events/all",
        iconName: "box",
      },
      {
        title: "Your events",
        href: "/operator/events/me",
        iconName: "box",
      },
      {
        title: "New events",
        iconName: "upload",
        href: "/operator/events/new",
      }
    ],
  },
  {
        
    title: "Trainings",
    href: "/operator/trainings/all",
    iconName: "box",

    child: [
      {
        title: "All trainings",
        href: "/operator/trainings/all",
        iconName: "box",
      },
      {
        title: "Your trainings",
        href: "/operator/trainings/me",
        iconName: "box",
      },
      {
        title: "New trainings",
        iconName: "upload",
        href: "/operator/trainings/new",
      }
    ],
  },
  {
    href: "/operator/account-settings",
    title: "Account Settings",
    iconName: "gear-2",
  },
    
  ];
  
  const linkList = [
    {
      href: "/operator/dashboard",
      title: "Dashboard",
      iconName: "board",
    },
    {
      href: "/operator/courses",
      title: "Courses",
      iconName: "box",
    },
    {
      href: "/operator/modules",
      title: "Modules",
      iconName: "box",
    },
    {
      href: "/operator/lectures",
      title: "Lectures",
      iconName: "upload",
    },
    {
      href: "/operator/quizzes",
      title: "Quizzes",
      iconName: "upload",
    },
    {
      href: "/operator/users",
      title: "Users",
      iconName: "user",
    },
    {
      href: "/operator/articles",
      title: "Articles",
      iconName: "upload",
    },
    
    
    {
      href: "/operator/reports",
      title: "Reports",
      iconName: "upload",
    },
    {
      href: "/operator/events",
      title: "Events",
      iconName: "upload",
    },
    {
      href: "/operator/trainings",
      title: "Trainings",
      iconName: "upload",
    },
    {
      href: "/operator/account-settings",
      title: "Account Settings",
      iconName: "gear-2",
    },
  ];
  
  export default linkList;