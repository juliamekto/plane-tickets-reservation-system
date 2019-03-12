import React from "react";
import { BrowserRouter } from 'react-router-dom';
import { Route } from "react-router-dom";
import Intro from './intro/Intro.jsx';
import Authorization from './authorizationForm/Authorization.jsx';
import Registration from './registrationForm/Registration.jsx';

const AppRouter = () => {
    return (
        <BrowserRouter>
             <div>
                 <Route path="/" exact component={Intro} />
                 <Route path="/authorization" exact component={Authorization} />
                 <Route path="/registration" exact component={Registration} />
             </div>
        </BrowserRouter>
     );
}

export default AppRouter;