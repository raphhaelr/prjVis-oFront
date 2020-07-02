import React from 'react'

import { Route, Switch, BrowserRouter } from 'react-router-dom'
import SignIn from '../pages/SignIn'
import Dashboard from '../pages/Dashboard'
import Project from '../pages/Projects'
import AddProject from '../pages/Admin/Project/AddProject'
import AddSprint from '../pages/Admin/Project/Sprints/AddSprint'
import AddStep from '../pages/Admin/Project/AddStep'
import UpdateProject from '../pages/Admin/Project/UpdateProject'
import UpdateStep from '../pages/Admin/Project/Steps/UpdateStep'
import UpdateSprint from '../pages/Admin/Project/Sprints/UpdateSprint'
import ManageSprints from '../pages/Admin/Project/Sprints'
import ManageSteps from '../pages/Admin/Project/Steps'
import ManageUsers from '../pages/Admin/Users'
import AddUser from '../pages/Admin/Users/AddUser'
import UpdateUser from '../pages/Admin/Users/UpdateUser'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/'exact component={SignIn}/>
                <Route path='/dashboard'exact component={Dashboard}/>

                <Route path='/users' exact component={ManageUsers} />
                <Route path='/users/create' exact component={AddUser} />
                <Route path='/users/edit/:id' exact component={UpdateUser} />

                <Route path='/project/:id' exact component={Project}/>

                <Route path='/projects/create'exact component={AddProject}/>
                <Route path='/project/steps/create/:id' exact component={AddStep}/>
                <Route path='/project/sprints/create/:id' exact component={AddSprint}/>

                <Route path='/project/edit/:id' exact component={UpdateProject}/>
                <Route path='/project/steps/edit/:id' exact component={UpdateStep}/>
                <Route path='/project/sprints/edit/:id' exact component={UpdateSprint}/>

                <Route path='/project/steps/all/:id' exact component={ManageSteps}/>
                <Route path='/project/sprints/all/:id' exact component={ManageSprints}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes