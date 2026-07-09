import "./App.css";
import { useState } from "react";

// Using props
function Greeting(props) {
  return (
    <h1>
      Hello, I am {props.name} and I am {props.age} years old.
    </h1>
  );
}

// Destructured props
function Holla({ name, age }) {
  return (
    <h1>
      Hello, I am {name} and I am {age} years old.
    </h1>
  );
}

const user = {
  name: "Ijeoma",
  age: 20,
};

const isLoggedIn = false;

// Todo Component
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React" },
    { id: 2, text: "Build a React App" },
    { id: 3, text: "Deploy the App" },
  ]);

  const [newTodo, setNewTodo] = useState("");

  function addTodo() {
    if (newTodo.trim() === "") return;

    const todo = {
      id: Date.now(),
      text: newTodo,
    };

    setTodos([...todos, todo]);
    setNewTodo("");
  }

  return (
    <div>
      <h2>Todo List</h2>

      <input
        type="text"
        placeholder="Add a new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />

      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  const [showGreeting, setShowGreeting] = useState(false);

  function toggleGreeting() {
    setShowGreeting(!showGreeting);
  }

  return (
    <>
      <Greeting name={user.name} age={user.age} />

      <Holla name="Samuel" age={15} />

      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <h1>Please sign up.</h1>
      )}

      <button onClick={toggleGreeting}>Toggle Greeting</button>

      {showGreeting && (
        <Greeting name={user.name} age={user.age} />
      )}

      <TodoList />
    </>
  );
}

export default App;
/* 
Routing in React is a way to navigate between different components or pages in a React application. It allows you to create a single-page application (SPA) where the content changes dynamically without requiring a full page reload.

To implement routing in React, you can use the popular library called "React Router." React Router provides a set of components and hooks that enable you to define routes and handle navigation within your application.

Here's a basic example of how to set up routing in a React application using React Router:

1. Install React Router:
   You can install React Router by running the following command in your project directory:
   ```
   npm install react-router-dom
   ```

2. Set up routes:
   In your main component (e.g., App.jsx), you can define routes using the `BrowserRouter`, `Route`, and `Switch` components from React Router. Here's an example:

   ```jsx
   import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
   import Home from './Home';
   import About from './About';
   import Contact from './Contact';

   function App() {
     return (
       <Router>
         <Switch>
           <Route exact path="/" component={Home} />
           <Route path="/about" component={About} />
           <Route path="/contact" component={Contact} />
           <Route path="*" element={<h1 style={{ color: 'red'; padding: '0 1.5rem' }}>Not Found</h1>} />
         </Switch>
       </Router>
     );
   }

   export default App;
   ```

   Form Handing in react is a way to manage user input and form submissions in a React application. React provides a controlled component approach, where the form elements' values are controlled by the component's state.
   We can handle form submissions by using the `onSubmit` event and managing the form data in the component's state. Here's an example of how to handle forms in React:

   ```jsx
   import { useState } from 'react';

   function ContactForm() {
     const [formData, setFormData] = useState({
       name: '',
       email: '',
       message: ''
     });

     const handleChange = (e) => {
       const { name, value } = e.target;
       setFormData({
         ...formData,
         [name]: value
       });
     };

     const handleSubmit = (e) => {
       e.preventDefault();
       // Handle form submission logic here
       console.log('Form submitted:', formData);
     };

     return (
       <form onSubmit={handleSubmit}>
         <input
           type="text"
           name="name"
           placeholder="Name"
           value={formData.name}
           onChange={handleChange}
         />
         <input
           type="email"
           name="email"
           placeholder="Email"
           value={formData.email}
           onChange={handleChange}
         />
         <textarea
           name="message"
           placeholder="Message"
           value={formData.message}
           onChange={handleChange}
         />
         <button type="submit">Submit</button>
       </form>
     );
   }

   export default ContactForm;
   ```

In this example, we create a `ContactForm` component that manages the form data using the `useState` hook. The `handleChange` function updates the state whenever the user types in the input fields, and the `handleSubmit` function handles the form submission logic.

By combining routing and form handling, you can create a dynamic and interactive React application that allows users to navigate between different pages and submit forms seamlessly. 

We can also use the useForm hook from react-hook-form library to handle forms in react. It provides a simple and efficient way to manage form state, validation, and submission. Here's an example of how to use the useForm hook:  
  To do that, first install the react-hook-form library by running the following command in your project directory:
   ```
   npm install react-hook-form
   ```

   Then, you can use the `useForm` hook in your component like this:

   ```jsx
   import { useForm } from 'react-hook-form';

   function ContactForm() {
     const { register, handleSubmit, formState: { errors } } = useForm();

     const onSubmit = (data) => {
       // Handle form submission logic here
       console.log('Form submitted:', data);
     };

     return (
       <form onSubmit={handleSubmit(onSubmit)}>
         <input
           type="text"
           placeholder="Name"
           {...register('name', { required: true })}
         />
         {errors.name && <span>Name is required</span>}

         <input
           type="email"
           placeholder="Email"
           {...register('email', { required: true })}
         />
         {errors.email && <span>Email is required</span>}

         <textarea
           placeholder="Message"
           {...register('message', { required: true })}
         />
         {errors.message && <span>Message is required</span>}

         <button type="submit">Submit</button>
       </form>
     );
   }

   export default ContactForm;
   ```

In this example, we use the `useForm` hook to register the form fields and handle validation. The `handleSubmit` function is used to handle the form submission, and the `errors` object provides information about any validation errors.

By using React Router for routing and react-hook-form for form handling, you can create a robust and user-friendly React application that allows users to navigate between different pages and submit forms with ease.      

We can also use the useNavigate hook from react-router-dom library to navigate programmatically in react. It provides a simple and efficient way to navigate between different pages in a React application. Here's an example of how to use the useNavigate hook:  

  To do that, first install the react-router-dom library by running the following command in your project directory:
   ```
   npm install react-router-dom
   ```

   Then, you can use the `useNavigate` hook in your component like this:

   ```jsx
   import { useNavigate } from 'react-router-dom';

   function Home() {
     const navigate = useNavigate();

     const goToAboutPage = () => {
       navigate('/about');
     };

     return (
       <div>
         <h1>Home Page</h1>
         <button onClick={goToAboutPage}>Go to About Page</button>
       </div>
     );
   }

   export default Home;
   ```

In this example, we use the `useNavigate` hook to get the `navigate` function, which allows us to programmatically navigate to different routes. When the button is clicked, the user is redirected to the About page.

By combining routing, form handling, and programmatic navigation, you can create a dynamic and interactive React application that provides a seamless user experience. Users can navigate between different pages, submit forms, and interact with the application without the need for full page reloads.  

Handling context in React is a way to share data between components without having to pass props down through every level of the component tree. React provides a built-in Context API that allows you to create a context and provide it to components that need access to the shared data.
this can be useful for managing global state, themes, authentication, and other shared data in your application.
Here's an example of how to use context in a React application:

1. Create a context:
   You can create a context using the `createContext` function from React. Here's an example:
   ```jsx
   import { createContext, useState } from 'react';

   const UserContext = createContext();

   function UserProvider({ children }) {
     const [user, setUser] = useState({ name: 'John Doe', age: 30 });

     return (
       <UserContext.Provider value={{ user, setUser }}>
         {children}
       </UserContext.Provider>
     );
   }

   export { UserContext, UserProvider };
   ```

2. Consume the context:
   You can consume the context in any component that needs access to the shared data using the `useContext` hook. Here's an example:
   ```jsx
   import { useContext } from 'react';
   import { UserContext } from './UserContext';

   function UserProfile() {
     const { user, setUser } = useContext(UserContext);

     const updateUser = () => {
       setUser({ name: 'Jane Doe', age: 25 });
     };

     return (
       <div>
         <h1>User Profile</h1>
         <p>Name: {user.name}</p>
         <p>Age: {user.age}</p>
         <button onClick={updateUser}>Update User</button>
       </div>
     );
   }

   export default UserProfile;
   ```

In this example, we create a `UserContext` and a `UserProvider` component that provides the user data to its children. The `UserProfile` component consumes the context using the `useContext` hook and displays the user information. It also provides a button to update the user data.

By using context in React, you can easily share data between components without having to pass props down through multiple levels of the component tree. This makes it easier to manage global state and share data across your application.    

AuthContext in React is a way to manage authentication state and provide authentication-related data and functions to components in your application. It allows you to create a context that holds the authentication state (e.g., whether the user is logged in, user information) and provides functions for logging in, logging out, and checking authentication status.
Here's an example of how to implement AuthContext in a React application:

1. Create an AuthContext:
   You can create an AuthContext using the `createContext` function from React. Here's an example:
   ```jsx
   import { createContext, useState } from 'react';

   const AuthContext = createContext();

   function AuthProvider({ children }) {
     const [isAuthenticated, setIsAuthenticated] = useState(false);
     const [user, setUser] = useState(null);

     const login = (userData) => {
       setIsAuthenticated(true);
       setUser(userData);
     };

     const logout = () => {
       setIsAuthenticated(false);
       setUser(null);
     };

     return (
       <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
         {children}
       </AuthContext.Provider>
     );
   }

   export { AuthContext, AuthProvider };
   ```

2. Consume the AuthContext:
   You can consume the AuthContext in any component that needs access to the authentication state using the `useContext` hook. Here's an example:
   ```jsx
   import { useContext } from 'react';
   import { AuthContext } from './AuthContext';

   function UserProfile() {
     const { isAuthenticated, user, login, logout } = useContext(AuthContext);

     const handleLogin = () => {
       const userData = { name: 'John Doe', email: 'john.doe@example.com' };
       login(userData);
     };

     const handleLogout = () => {
       logout();
     };

     return (
       <div>
         <h1>User Profile</h1>
         {isAuthenticated ? (
           <>
             <p>Name: {user.name}</p>
             <p>Email: {user.email}</p>
             <button onClick={handleLogout}>Logout</button>
           </>
         ) : (
           <button onClick={handleLogin}>Login</button>
         )}
       </div>
     );
   }

   export default UserProfile;


   We can also use AuthContext to display routes based on the authentication state of the user. For example, we can create a PrivateRoute component that only allows access to certain routes if the user is authenticated. Here's an example:
   ```jsx
   import { useContext } from 'react';
   import { Route, Redirect } from 'react-router-dom';
   import { AuthContext } from './AuthContext';

   function PrivateRoute({ component: Component, ...rest }) {
     const { isAuthenticated } = useContext(AuthContext);

     return (
       <Route
         {...rest}
         render={(props) =>
           isAuthenticated ? (
             <Component {...props} />
           ) : (
             <Redirect to="/login" />
           )
         }
       />
     );
   }

   export default PrivateRoute;

   AuthContext.Provider can be used to wrap the entire application or specific parts of the application where authentication state is needed. This allows components within that part of the application to access the authentication state and functions provided by the AuthContext.  
   For example, you can wrap your entire application with the AuthProvider in your main index.js or App.js file like this:
   ```jsx
   import React from 'react';
   import ReactDOM from 'react-dom';
   import App from './App';
   import { AuthProvider } from './AuthContext';

   ReactDOM.render(
     <AuthProvider>
       <App />
     </AuthProvider>,
     document.getElementById('root')
   ); 

   To use AuthContext.Provider, you can wrap the components that need access to the authentication state and functions. Here's an example:
   ```jsx
   import React from 'react';
   import { AuthProvider } from './AuthContext';
   import UserProfile from './UserProfile';
   import PrivateRoute from './PrivateRoute';

   function App() {
     return (
       <AuthProvider></AuthProvider>
         <div>
           <h1>My App</h1>
            <PrivateRoute path="/profile" component={UserProfile} />
          </div>
        </AuthProvider>
      );
}

Working with APIs in React involves making HTTP requests to external services to fetch or send data. This can be done using the built-in `fetch` API or third-party libraries like Axios. Here's an example of how to work with APIs in a React application:

1. Fetching data from an API:
   You can use the `useEffect` hook to fetch data from an API when a component mounts. Here's an example using the `fetch` API:
   ```jsx
   import { useState, useEffect } from 'react';

   function DataFetcher() {
     const [data, setData] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {  
    
        fetch('https://api.example.com/data')
          .then((response) => response.json())
          .then((data) => {
            setData(data);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
          });
     }
      We can also use Axios to fetch data from an API. Here's an example using Axios:
   ```jsx
   import { useState, useEffect } from 'react';
   import axios from 'axios';

   function DataFetcher() {
     const [data, setData] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       axios.get('https://api.example.com/data')
         .then((response) => {
           setData(response.data);
           setLoading(false);
         })
         .catch((error) => {
           console.error('Error fetching data:', error);
           setLoading(false);
         });
     }  

     To send data to an API, you can use the `fetch` API or Axios with a POST request. Here's an example using the `fetch` API:
   ```jsx
   function sendData(data) {
     fetch('https://api.example.com/data', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(data),
     })
       .then((response) => response.json())
       .then((data) => {
         console.log('Data sent successfully:', data);
       }
       .catch((error) => {
         console.error('Error sending data:', error);
       });
   }  


   SideEffects in React are operations that can affect the state of a component or the application as a whole, and they can occur outside of the normal rendering process. Common side effects include data fetching, subscriptions, timers, and manually manipulating the DOM. In React, side effects are typically managed using the `useEffect` hook.
Here's an example of how to use the `useEffect` hook to handle side effects in a React component:



To display data from an API in a React component, you can use the `useEffect` hook to fetch the data when the component mounts and store it in the component's state. Here's an example:  
For example, you can create a `DataFetcher` component that fetches data from an API and displays it in a list or a table. Here's an example:
Step 1: Create a new component called `DataFetcher.jsx` and add the following code:
Step 2: Use the `useEffect` hook to fetch data from an API when the component mounts. 
You can use the `fetch` API or a library like Axios to make the HTTP request. Here's an example using the `fetch` API:
fetch('https://api.example.com/data')
  .then((response) => response.json())
  .then((data) => {
    setData(data);
    setLoading(false);
  } 
    You can also make the API call using Axios like this:
import axios from 'axios';
useEffect(() => {
  axios.get('https://api.example.com/data')
    .then((response) => {
      setData(response.data);
      setLoading(false);
    }
Step 3: Store the fetched data in the component's state using the `useState` hook. You can create a state variable called `data` to hold the fetched data and another state variable called `loading` to indicate whether the data is still being fetched. Here's an example:
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true); 

step 4: Render the fetched data in the component's JSX. You can use conditional rendering to display a loading indicator while the data is being fetched and then display the data once it has been successfully retrieved. Here's an example:
return (
  <div><div>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    )}
  </div>  

  The above process can also be asynchronous to avoid blocking the main thread. You can use the `async` and `await` keywords to make the API call asynchronous. Here's an example:  
  Step 1: Create an asynchronous function to fetch data from the API. You can use the `async` keyword to define the function and the `await` keyword to wait for the API response. Here's an example:
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    setData(data);
    setLoading(false);
  } catch (error) {
    console.error('Error fetching data:', error);
    setLoading(false);
  }
}
  Step 3: Call the `fetchData` function inside the `useEffect` hook to fetch data when the component mounts. Here's an example:
useEffect(() => {
  fetchData();
}, []);

Step 4: Render the fetched data in the component's JSX as described in Step 4 above. You can use conditional rendering to display a loading indicator while the data is being fetched and then display the data once it has been successfully retrieved. Here's an example:
return (
  <div>
    {loading ? (
      <p>Loading...</p>
    ) : (
      <ul>< /ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    )}
  </div>
);

Using a table to render data from an API in React can be a great way to display structured information in a clear and organized manner. Here's an example of how to render data in a table format:  
Step 1: Create a new component called `DataTable.jsx` and add the following code:
Step 2: Use the `useEffect` hook to fetch data from an API when the component mounts. You can use the `fetch` API or a library like Axios to make the HTTP request. Here's an example using the `fetch` API:
Step 3: Store the fetched data in the component's state using the `useState` hook. You can create a state variable called `data` to hold the fetched data and another state variable called `loading` to indicate whether the data is still being fetched. Here's an example:
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true); 
  Step 4: Render the fetched data in a table format in the component's JSX. You can use conditional rendering to display a loading indicator while the data is being fetched and then display the data in a table once it has been successfully retrieved. Here's an example:
return (
  <div></div>
    {loading ? (
      <p>Loading...</p> 
    ) : (
      <table>
        <thead>   
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody></tbody>
          {data.map((item) => (
            <tr key={item.id}>  
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);  

To avoid unnecessary re-renders when fetching data from an API in React, you can use the `useEffect` hook with an empty dependency array. 
This ensures that the data fetching logic is only executed once when the component mounts, rather than on every render. Here's an example:
Step 1: Use the `useEffect` hook with an empty dependency array to fetch data from the API when the component mounts. Here's an example:
useEffect(() => {
  fetchData();
}, []); // Empty dependency array

By providing an empty dependency array, the `useEffect` hook will only run once when the component mounts, preventing unnecessary re-renders and API calls. 

We can also use tansack query to fetch data from an API in react. It provides a simple and efficient way to manage server state, caching, and background updates. Here's an example of how to use tansack query to fetch data from an API in a React application: 
First, install the react-query library by running the following command in your project directory:
npm install react-query
then, you can use the `useQuery` hook from react-query to fetch data from an API. Here's an example:
Step 1: Create a new component called `DataFetcher.jsx` and add the following code:
  Step 2: Use the `useQuery` hook to fetch data from an API. You can provide a unique key for the query and a function that returns a promise for the data fetching logic. Here's an example:
import { useQuery } from 'react-query';
function DataFetcher() {
  const { data, isLoading, error } = useQuery('data', () =>
    fetch('https://api.example.com/data').then((res) => res.json())
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return (
    <div>
      <h1>Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
export default DataFetcher; 
Tansack query also provides features like caching, background updates, and automatic retries for failed requests. You can customize the behavior of the query using options provided by the `useQuery` hook. For example, you can set a cache time, refetch interval, or enable/disable automatic retries. Here's an example:
const { data, isLoading, error } = useQuery('data', () =>
  fetch('https://api.example.com/data').then((res) => res.json()), {
    cacheTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchInterval: 1000 * 60, // Refetch every minute
    retry: 3, // Retry failed requests up to 3 times
  }
);

By using tansack query in your React application, you can efficiently manage server state and handle data fetching with ease. It provides a powerful and flexible solution for working with APIs and managing asynchronous data in React. 

To create components in React, you can use either functional components or class components. Functional components are the recommended approach in modern React development, as they are simpler and easier to read. Here's an example of how to create a functional component: 
Steps to create a functional component in React:
1. Import React: At the top of your file, import the React library. This is necessary to use JSX syntax and create React components.
   ```jsx
   import React from 'react';
   Then , you can define a functional component by creating a JavaScript function that returns JSX. Here's an example:
   ```jsx
   function MyComponent() {
     return (
       <div>
         <h1>Hello, I am a functional component!</h1>
       </div>
      );
    
2. Export the component: To use the component in other parts of your application, you need to export it. You can use either a named export or a default export. Here's an example of a default export:
   ```jsx
   export default MyComponent;  
    
   Components like Navbar, Footer, Hero can be created as
   1. NavbarComponent:
   To create a NavbarComponent in React,
   Create a functional component named NavbarComponent
   Create your navbar html and styles And save
   Export the component so that you can be able to use it in another component

   





   ```*/