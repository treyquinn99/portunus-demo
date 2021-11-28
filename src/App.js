/** 
  App.js
 Import React and ReactSom Libraries
*/


import './App.css';
import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Col, Container, Row } from 'react-bootstrap';
import logo from './logo-placeholder.png'
import profilePlaceholder from "./ProfilePlaceholder.png";
import portunusLogo from "./portunus_logo.png";

/** true if user is logged in */
var userLoggedIn = false;
var searchInput = ''
var globalEmail = ''

/*Displays Navigation Bar which includes 'User Profile', 'Professional Development Opportunities', and 'Job Opportunities'*/
class NavigationBar extends React.Component {
  loadUserProfile() {
    if (userLoggedIn) {
      /*API call to fetch user's data from the backend*/
      fetch(`http://localhost:3001/api/users/:id/?myparam1=${globalEmail}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
        .then(resp => resp.json())
        .then(data => {
          ReactDOM.render(<ProfilePage email = {data.email} name = {data.name} collegeYear = {data.collegeYear} major = {data.major} followedJobs = {data.followedJobs} followedOps = {data.followedOps} />, document.getElementById('root'));
        })
    } else {
      ReactDOM.render(<ProfilePage />, document.getElementById('root'));
    }
  }
  loadPDDirectory() {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    ReactDOM.render(<DirectoryScreen title="Professional Development Opportunities"/>, document.getElementById('root'));
  }
  loadJobsDirectory() {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    ReactDOM.render(<DirectoryScreen title="Job Opportunities"/>, document.getElementById('root'));
  }
  render() {
    return (
      <div className="NavBar">
        <Container fluid>
          <Row>
            <img src={portunusLogo} className="PortunusLogo" alt="Logo for Portunus" />
            <div className="NavButtons">
              <button className="NavBarButton" alt="Button to load user profile." onClick={this.loadUserProfile}>User Profile</button>
              <button className="NavBarButton" alt="Button to load Professional Development Opportunities directory."
                onClick={this.loadPDDirectory}>Professional Development Opportunities</button>
              <button className="NavBarButton" alt="Button to load Job Opportunities directory."
                onClick={this.loadJobsDirectory}>Job Opportunities</button>
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

{/*renders Opportunity's page from the Database*/}

class OpListing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orgName: props.orgName,
      opType: props.opType,
      description: props.description,
      companyName: props.companyName
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    if (!this.state.companyName) {
      /*API call to fetch organization's data from the backend*/
      fetch(`http://localhost:3001/api/organizations/:id/?myparam1=${this.state.orgName}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
          })
           .then(resp => resp.json())
           .then(data => {
             console.log(data)
             ReactDOM.render(<OrganizationPage name = {data.orgName} description = {data.orgDescription} />, document.getElementById('root'));
            })
            .catch(err => {
              console.log(err);
            })
    } else {
      /*API call to fetch job opportunity's data from the backend*/
      fetch(`http://localhost:3001/api/jobopportunities/:id/?myparam1=${this.state.orgName}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
       .then(resp => resp.json())
       .then(data => {
         console.log(data)
         ReactDOM.render(<OrganizationPage name = {data.companyName} description = {data.jobDescription} job = {true}/>, document.getElementById('root'));
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
  
  render() {
    /* renders the opportunity listing*/
  return (
    <div className='OpListing' onClick={this.onClickHandler}>
                <img
                  width={100}
                  height={100}
                  src={logo}
                  alt='Picture of company logo'
                />
                <br />
                <p className="ListingInfo">
                  <b>{this.state.orgName}</b> <br />
                  {this.state.opType}
                </p>
    </div>

  );
  }
}

class DirectoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      ops: props.ops ? props.ops : [],
      favorite: props.favorite,
      searchTerm: props.searchTerm
    }
  }
  renderOps = async(filter) => {
    const response = await fetch(`http://localhost:3001/api/organizations`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    });
    const ops = await response.json()
    let opsArray = []
    if (filter === undefined) {
      Object.keys(ops).forEach(function (key){
        opsArray.push(<OpListing key = {key} orgName = {ops[key].orgName} opType = {ops[key].opType} description = {ops[key].opType} />);
      })
    } else if (Array.isArray(filter)) {
      Object.keys(ops).forEach(function (key){
        if (filter.includes(ops[key].orgName)) {
          opsArray.push(<OpListing key = {key} orgName = {ops[key].orgName} opType = {ops[key].opType} description = {ops[key].opType} />);
        }
      })
    } else {
      Object.keys(ops).forEach(function (key){
        if ((ops[key].orgName).toLowerCase().includes(filter.toLowerCase())) {
          opsArray.push(<OpListing key = {key} orgName = {ops[key].orgName} opType = {ops[key].opType} description = {ops[key].opType} />);
        }
      })

    }
    this.setState({
      ops: opsArray
    });
  }
  renderJobs = async(filter) => {
    const response = await fetch(`http://localhost:3001/api/jobopportunities`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    });
    const ops = await response.json()
    let opsArray = []
    if (filter === undefined) {
      Object.keys(ops).forEach(function (key){
        opsArray.push(<OpListing key = {key} orgName = {ops[key].companyName} opType = {ops[key].jobTitle} description = {ops[key].jobDescription} companyName = {true}/>);
      })
    } else if (Array.isArray(filter)) {
      Object.keys(ops).forEach(function (key) {
        if (filter.includes(ops[key].companyName)) {
          opsArray.push(<OpListing key = {key} orgName = {ops[key].companyName} opType = {ops[key].jobTitle} description = {ops[key].jobDescription} companyName = {true}/>);
        }
      })
    } else {
      Object.keys(ops).forEach(function (key){
        if ((ops[key].companyName).toLowerCase().includes(filter.toLowerCase())) {
          opsArray.push(<OpListing key = {key} orgName = {ops[key].companyName} opType = {ops[key].jobTitle} description = {ops[key].jobDescription} />);
        }
      })
      
    }
 
    this.setState({
      ops: opsArray
    });
  }
  componentDidMount() {
    console.log("mont")
    console.log(this.state.searchTerm)
    if (!(this.state.favorite === undefined) && (this.state.title == "Professional Development Opportunities")) {
      this.renderOps(this.state.ops);
    } else if (!(this.state.favorite === undefined) && (this.state.title === "Job Opportunities")) {
      this.renderJobs(this.state.ops);
    } else if (this.state.title === "Professional Development Opportunities" && !(this.state.searchTerm === undefined)) {
      this.renderOps(this.state.searchTerm);
    } else if (this.state.title === "Job Opportunities" && !(this.state.searchTerm === undefined)) {
      console.log(this.state.searchTerm)
      this.renderJobs(this.state.searchTerm);
    } else if (this.state.title === "Job Opportunities") {
      this.renderJobs()
    } else {
      this.renderOps()
    }
  }
  render() {
    let suggestedNames = []
    if (this.state.favorite === undefined ) {
      this.state.ops.forEach((op) => {
        console.log(op)
        suggestedNames.push(op.props.orgName)
       })
    }
  
        return (
          <div>
            <NavigationBar />
            <div className='DirectoryScreen'>
            <h1 className="PageHeader">{this.state.title}</h1>
            <SearchBar title = {this.state.title} suggestions = {suggestedNames}/>
            <br />
            <div className="DirectoryList">
            {this.state.ops}
            </div>
            </div>
          </div>
          );
    }

}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: "",
      title: props.title
    };
    this.onSubmit = this.onSubmit.bind(this)
  }
  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText,
    });
    searchInput = e.currentTarget.innerText
    console.log(searchInput);
  };
  /* renders opportunity that the user entered */
  onSubmit() {
    console.log(this.state.userInput)
    ReactDOM.unmountComponentAtNode(document.getElementById('root'))
    ReactDOM.render(<DirectoryScreen searchTerm = {this.state.userInput} title={this.state.title} />, document.getElementById('root'))

  }
  /**Autofill suggestions for input*/
  handleChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1 && userInput.toLowerCase() === suggestion.toLowerCase().substring(0, userInput.length)
    );
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });

  }
  render () {
    const {
      handleChange,
      onClick,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {

              return (
                <li  key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      }
    }
    return (
      <div className="LogIn">
        <form>
          <label>
            Search Directory
            <br />
            <br />
            <input type="query" name="query" onChange={handleChange} value={userInput}/>
          </label>
          <br />
          {suggestionsListComponent}
          <br />
          <button className="ProfileButton" alt="Button to search through postings." type = "button"
            onClick={this.onSubmit}>Search</button>
        </form>

        </div>
    ); // end return
  } // end render()
}
/*Displays Profile page of the user */
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      collegeYear: props.collegeYear,
      major: props.major,
      followedJobs: props.followedJobs,
      email: props.email,
      followedOps: props.followedOps
    };
    this.onClickHandler = this.onClickHandler.bind(this)
    this.onClickHandlerViewJobs = this.onClickHandlerViewJobs.bind(this)
    this.onClickHandlerViewOps = this.onClickHandlerViewOps.bind(this)
  }

  onClickHandler() {
    console.log(globalEmail)
    ReactDOM.render(<EditProfile name = {this.state.name} collegeYear = {this.state.collegeYear} major = {this.state.major} />, document.getElementById('root'));
  }
  onClickHandlerLogIn() {
    ReactDOM.render(<LogIn />, document.getElementById('root'));
  }
  onClickHandlerLogOut() {
    userLoggedIn = false;
    ReactDOM.render(<ProfilePage />, document.getElementById('root'));
  }
  onClickHandlerCreateNewAccount() {
    ReactDOM.render(<CreateNewAccount />, document.getElementById('root'));
  }
  onClickHandlerViewJobs() {
    ReactDOM.render(<DirectoryScreen favorite = {true} title="Job Opportunities" ops = {this.state.followedJobs}/>, document.getElementById('root'))

  }
  onClickHandlerViewOps() {
    ReactDOM.render(<DirectoryScreen favorite = {true} title="Professional Development Opportunities" ops = {this.state.followedOps}/>, document.getElementById('root'))

  }

  render () {
    if(userLoggedIn) {
      return (
        <div>
          <NavigationBar />
          <div className="UserProfile">
          <h1 className="PageHeader">User Profile</h1>
          <br />
          <img className="ProfilePicture"
            src={profilePlaceholder}
            height={175}
            alt="default user profile picture"
          />
          <br />
          <br />
          <p className="ProfileInfo">
            <b>{this.state.name}</b>
            <br/>{this.state.collegeYear}, {this.state.major}
          <br />
          <br />
          </p>
            <button className="ProfileButton" onClick={this.onClickHandler} alt="Button to edit user profile.">Edit Profile</button>
            <button className="ProfileButton" onClick={this.onClickHandlerViewJobs} alt="Button to view followed job listings.">View Followed Jobs</button>
            <button className="ProfileButton" onClick={this.onClickHandlerViewOps} alt="Button to view followed professional development opportunities.">View Followed Opportunities</button>
            <button className="ProfileButton" onClick={this.onClickHandlerLogOut} alt="Button to log out.">Log Out</button>
          </div>
        </div>
      ); // end return
    } else {
      return (
        <div>
          <NavigationBar />
          <div className="UserProfile">
          <h1 className="PageHeader">Welcome</h1>
          <br />
          <img className="ProfilePicture"
            src={profilePlaceholder}
            height={175}
            alt="default user profile picture"
          />
          <br />
          <br />
          <p className="ProfileInfo">
            <b>Welcome to Portunus</b>
            <br/>Select an option below to log in or create a new account.
          <br />
          <br />
          </p>
            <button className="ProfileButton" onClick={this.onClickHandlerLogIn} alt="Button to log into user profile.">Log In</button>
            <button className="ProfileButton" onClick={this.onClickHandlerCreateNewAccount} alt="Button to create a new account.">Create New Account</button>
          </div>
        </div>
      ); // end return
    } // end else
  } // end render()
} // end ProfilePage

/*Displays Organization Page*/
class OrganizationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      description: props.description || props.jobDescription,
      email: props.email,
      job: props.job
    };
    this.onClickHandlerFollowJob = this.onClickHandlerFollowJob.bind(this)
    this.onClickHandlerBack = this.onClickHandlerBack.bind(this)
  }

  onClickHandlerBack() {
    if (!(this.state.job === undefined)) {
      ReactDOM.unmountComponentAtNode(document.getElementById('root'))
      ReactDOM.render(<DirectoryScreen title="Job Opportunities"/>, document.getElementById('root'));
    } else {
      ReactDOM.unmountComponentAtNode(document.getElementById('root'))
      ReactDOM.render(<DirectoryScreen title="Professional Development Opportunities"/>, document.getElementById('root'));
    }
  }
  /*API call to fetch user's followed opportunities from the backend*/
  onClickHandlerFollowJob() {
    fetch(`http://localhost:3001/api/users/follow/?myparam1=${this.state.name}&myparam2=${globalEmail}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
    })
      .then(resp => resp.json())
      .catch(err => {
        console.log(err);
      })
  }

  render () {
      return (
        <div>
          <NavigationBar />
          <div className="UserProfile">
          <h1 className="PageHeader">{this.state.name}</h1>
          <br />
          <img className="ProfilePicture"
            src={profilePlaceholder}
            height={175}
            alt="default user profile picture"
          />
          <br />
          <br />
          <p className="ProfileInfo">
            <br/>{this.state.description}
          <br />
          <br />
          </p>
            <button className="ProfileButton" onClick={this.onClickHandlerBack} alt="Button to return to directory.">Back</button>
            <button className="ProfileButton" onClick={this.onClickHandlerFollowJob} alt="Button to follow this opportunity.">Follow Opportunity</button>
          </div>
        </div>
      ); // end return
  } // end render()
} // end OrganizationPage

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      loginError:'',
      emailError:'',
    };
    this.onSubmit = this.onClickHandler.bind(this);
  }
  handleChange = e => {

    this.setState({ [e.target.name]: e.target.value });
  };
  onClickHandler = e => {
    e.preventDefault();
    /*API call to fetch user's email and password from the backend*/
    fetch('http://localhost:3001/api/users/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body : JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      })
    })
    .then(res => {
      if (res.status == 200) {
        userLoggedIn = true
        /*API call to fetch user's information(name,college year, etc.) from the backend*/
        fetch(`http://localhost:3001/api/users/:id/?myparam1=${this.state.email}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        })
          .then(resp => resp.json())
          .then(data => {
            globalEmail = data.email
            ReactDOM.render(<ProfilePage email = {data.email} name = {data.name} collegeYear = {data.collegeYear} major = {data.major} followedJobs = {data.followedJobs} followedOps = {data.followedOps} />, document.getElementById('root'));
          })
        }
        /*check if the entry is valid*/
        else{
          let check = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if(check.test(this.state.email) == false){
            this.setState({loginError: "Please enter a valid email address."})
          }
          else {
             this.setState({loginError: "The email or password is incorrect."})
          }
        }
      })
    }
  render () {
    return (
      <div>
        <NavigationBar />
        <div className="LogIn">
        <br />
        <h1 className="PageHeader">Log in to Profile</h1>
        <form>
          <label>
            Enter Email
            <br />
            <br />
            <input type="email" name="email" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <br />
          <label>
            Enter Password
            <br />
            <br />
            <input type="password" name="password" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <br />
          <p style={{ color: 'red' }}>{this.state.loginError}</p>
          <button className="ProfileButton" alt="Button to submit profile information."
            onClick={this.onSubmit}>Submit</button>
        </form>
        </div>
      </div>
    ); // end return
  } // end render()
} // end LogIn


/**EditProfile page lets users edit their profile: 
 * Edit Name, Colloege Year or Major
*/
class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      collegeYear: props.collegeYear,
      major: props.major,
      Name:'',
      emailError:'',
    };
    this.onClickHandler = this.onClickHandler.bind(this)
  }
  onClickHandler() {
    ReactDOM.render(<ProfilePage name = {this.state.name} collegeYear = {this.state.collegeYear} major = {this.state.major}/>, document.getElementById('root'));
  }
  render () {
    return (
      <div>
        <NavigationBar />
        <div className="EditProfile">
        <br />
        <h1 className="PageHeader">Edit Profile</h1>
        <form>
          <label>
            Edit Name
            <br />
            <br />
            <input type="text" name="name" />
          </label>
          <br />
          <br />
          <label>
            Edit College Year
            <br />
            <br />
            <input type="text" name="name" />
          </label>
          <br />
          <br />
          <label>
            Edit Major
            <br />
            <br />
            <input type="text" name="name" />
          </label>
          <br />
          <br />
          <button className="ProfileButton" alt="Button to change profile picture.">Edit Picture</button>
          <button className="ProfileButton" alt="Button to save changes." onClick={this.onClickHandler}>Save Changes</button>
        </form>
        </div>
      </div>
    ); // end return
  } // end render()
} // end EditProfile

/*Displays Create New Account page where users can create their account with Name, Email, Password, College Year, and Major*/
class CreateNewAccount extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email:'',
      password:'',
      collegeYear:'',
      major:'',
      nameError:'',
      passwordError:'',
      emailError:'',
      collegeYearError:'',
      majorError: '',
    };
    this.onSubmit = this.onClickHandlerSubmit.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClickHandlerSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:3001/api/users/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body : JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        collegeYear: this.state.collegeYear,
        major: this.state.major
      })
    })
    .then(res => {

      if (res.status === 200) {
        userLoggedIn = true;
        globalEmail = this.state.email
        ReactDOM.render(<ProfilePage name = {this.state.name} major = {this.state.major} collegeYear = {this.state.collegeYear}  />, document.getElementById('root'));
        this.state = {
          name: '',
          email:'',
          password:'',
          collegeYear:'',
          major:''
        };
      }
      else {
        ReactDOM.render(<CreateNewAccount />, document.getElementById('root'));
        
        if(this.state.name == ''){
          this.setState({nameError: "Please enter your name."})
        }
        if(this.state.email == ''){
          this.setState({emailError: "Please enter an email."})
        }
        if(this.state.password == ''){
          this.setState({passwordError: "Please enter a password."})
        }
        if(this.state.major == ''){
          this.setState({majorError: "Please enter a major."})
        }
        if(this.state.collegeYear == ''){
          this.setState({collegeYearError: "Please enter a college year."})
        }
      }
        })
      }

      


  onClickHandlerBack() {
    ReactDOM.render(<ProfilePage />, document.getElementById('root'));
  }
  render () {
    const mystyle = {
      color: "red",
      padding: "1px",
      fontSize: "14px"
    };
    return (
      <div>
        <NavigationBar />
        <div className="EditProfile">
        <br />
        <h1 className="PageHeader">Create New Account</h1>
        <form onSubmit={this.onSubmit}>
        
          <label>
            Enter Name
            <br />
            <br />
            <input type="text" name="name" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <strong style={mystyle}>{this.state.nameError}</strong>
          <br />
          <label>
            Enter Email
            <br />
            <br />
            <input type="text" name="email" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <strong style={mystyle}>{this.state.emailError}</strong>
          <br /><label>
            Enter Password
            <br />
            <br />
            <input type="text" name="password" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <strong style={mystyle}>{this.state.passwordError}</strong>
          <br />
          <label>
            Enter College Year
            <br />
            <br />
            <input type="text" name="collegeYear" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <strong style={mystyle}>{this.state.collegeYearError}</strong>
          <br />
          <label>
            Enter Major
            <br />
            <br />
            <input type="text" name="major" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <strong style={mystyle}>{this.state.majorError}</strong>
          <br />
          <button className="ProfileButton" alt="Button to return to login screen."onClick={this.onClickHandlerBack}>Back</button>
          <button className="ProfileButton" alt="Button to change profile picture.">Edit Picture</button>
          <button className="ProfileButton" alt="Button to submit profile information and login.">Submit</button>
        </form>
        </div>
      </div>
    ); // end return
  } // end render()
} // end CreateNewAccount

function App() {
  return (
    <div className='App'>
      <ProfilePage />
    </div>
  );
}

export default App;
