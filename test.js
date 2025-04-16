export const adminPaths2 = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: "ADMIN_DASHBOARD",
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: "CREATE_ADMIN",
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: "CREATE_FACULTY",
      },
      {
        name: "Create Student",
        path: "create-student",
        element: "CREATE_STUDENT",
      },
    ],
  },
];

// const newArray = adminPaths2.reduce((acc, item) => {
//   //path ar element thakle aita
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }

//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({ path: child.path, element: child.element });
//     });
//   }

//   return acc;
// }, []);

const newArray = adminPaths2.reduce((acc, item) => {
  //path ar element thakle aita
  if (item.path && item.name) {
    acc.push({
      key: item.name,
      label: "Navlink",
    });
  }

  if (item.children) {
    acc.push({
      key: item.name,
      label: item.name,
      children: item.children.map((child) => ({
        key: child.name,
        label: "Navlink",
      })),
    });
  }

  return acc;
}, []);

// console.log(newArray);
console.log(JSON.stringify(newArray));

//serial and non-serializable objects
//Non serialazable objects e data missing hoite pare tai react serializable chai
const obj = {
  name: "Mezba",
  role: "mentor",
  age: 18,
};
