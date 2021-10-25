import './App.css';
import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Col, Container, Row } from 'react-bootstrap';
import logo from './logo-placeholder.png'
import profilePlaceholder from "./ProfilePlaceholder.png";
import portunusLogo from "./portunus_logo.png";

var userLoggedIn = false;

class NavigationBar extends React.Component {
  loadUserProfile() {
    ReactDOM.render(<ProfilePage />, document.getElementById('root'));
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

class OpListing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orgName: props.orgName,
      opType: props.opType,
      description: props.description
    };
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    fetch(`http://localhost:3001/api/organizations/:id/?myparam1=${this.state.orgName}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        })
          .then(resp => resp.json())
          .then(data => {
            ReactDOM.render(<OrganizationPage name = {data.orgName} description = {data.orgDescription} />, document.getElementById('root'));
          })
          .catch(err => {
            console.log(err);
          })
  }
  
  render() {
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

function DirectoryScreen(props) {
  if (props.title == "Professional Development Opportunities") {
    return (
    <div>
      <NavigationBar />
      <div className='DirectoryScreen'>
      <h1 className="PageHeader">{props.title}</h1>
      <SearchBar suggestions = {["bat", "bell", "bolt"]}/>
      <br />
      <div className="DirectoryList">
      <OpListing orgName='Internship Analytics Company' opType='Resume Boosting' description="This is an internship at an analytics company."/>
      <OpListing orgName='Interview Preparation Company' opType='Workshop' description="This is an interview preparation company."/>
      <OpListing orgName='Women in STEM' opType='Mentorship Program' description="This is a mentorship program."/>
      <OpListing orgName='Career Analytics' opType='Career Coaching' description="This is a career coaching program."/>
      </div>
      </div>
    </div>
    );
  } else {
    return (
      <div>
        <NavigationBar />
        <div className='DirectoryScreen'>
        <h1 className="PageHeader">{props.title}</h1>
        <SearchBar suggestions ={["bat", "bell", "bolt"]} />
        <br />
        <div className="DirectoryList">
        <OpListing orgName='Facebook' opType='Junior Software Engineer' description="This is an internship at an analytics company."/>
        <OpListing orgName='Coca-Cola' opType='Strategic Analyst' description="This is an interview preparation company."/>
        <OpListing orgName='Amazon' opType='Summer Internship' description="This is a mentorship program."/>
        <OpListing orgName='Bank of America' opType='Financial Analyst' description="This is a career coaching program."/>
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
      userInput: ""
    };
  }
  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };
  onSubmit() {

  }
  handleChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
  
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1 && userInput == suggestion.substring(0, userInput.length)
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
          <ul class="suggestions">
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
          {suggestionsListComponent}
          <button className="ProfileButton" alt="Button to search through postings."
            onClick={this.onSubmit}>Search</button>
        </form>

        </div>
    ); // end return
  } // end render()
}

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      collegeYear: props.collegeYear,
      major: props.major
    };
    this.onClickHandler = this.onClickHandler.bind(this)
  }

  onClickHandler() {
    console.log(this.state)
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
            <button className="ProfileButton" alt="Button to view followed job listings.">View Followed Jobs</button>
            <button className="ProfileButton" alt="Button to view followed professional development opportunities.">View Followed Opportunities</button>
            <button className="ProfileButton" onClick={this.onClickHandlerLogOut} alt="Button to log out.">Log Out</button>
          </div>
        </div>
      ); // end return
    } else {
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

class OrganizationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      description: props.description
    };
  }

  onClickHandlerBack() {
    ReactDOM.render(<DirectoryScreen />, document.getElementById('root'));
  }
  onClickHandlerFollow() {
    
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
            <button className="ProfileButton" onClick={this.onClickHandlerFollow} alt="Button to follow this opportunity.">Follow Opportunity</button>
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
    };     
    this.onSubmit = this.onClickHandler.bind(this);
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onClickHandler = e => {
    e.preventDefault();
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
        fetch(`http://localhost:3001/api/users/:id/?myparam1=${this.state.email}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        })
          .then(resp => resp.json())
          .then(data => {
            ReactDOM.render(<ProfilePage name = {data.name} collegeYear = {data.collegeYear} major = {data.major} />, document.getElementById('root'));
          })
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
          <button className="ProfileButton" alt="Button to submit profile information."
            onClick={this.onSubmit}>Submit</button>
        </form>
        </div>
      </div>
    ); // end return
  } // end render()
} // end LogIn

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      collegeYear: props.collegeYear,
      major: props.major
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

class CreateNewAccount extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email:'',
      password:'',
      collegeYear:'',
      major:''
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
        ReactDOM.render(<ProfilePage name = {this.state.name} major = {this.state.major} collegeYear = {this.state.collegeYear}  />, document.getElementById('root'));
        this.state = {
          name: '',
          email:'',
          password:'',
          collegeYear:'',
          major:''
        };
      } else {
        this.state = {
          name: '',
          email:'',
          password:'',
          collegeYear:'',
          major:''
        };
        ReactDOM.render(<ProfilePage />, document.getElementById('root'));

      }
    }).catch(err => {
      this.state = {
        name: '',
        email:'',
        password:'',
        collegeYear:'',
        major:''
      };
      ReactDOM.render(<ProfilePage />, document.getElementById('root'));
      console.log(err);
    })
  }


  onClickHandlerBack() {
    ReactDOM.render(<ProfilePage />, document.getElementById('root'));
  }
  render () {
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
          <br />
          <label>
            Enter Email
            <br />
            <br />
            <input type="text" name="email" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <br /><label>
            Enter Password
            <br />
            <br />
            <input type="text" name="password" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <br />
          <label>
            Enter College Year
            <br />
            <br />
            <input type="text" name="collegeYear" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
          <br />
          <label>
            Enter Major
            <br />
            <br />
            <input type="text" name="major" value={this.state.value} onChange={this.handleChange} />
          </label>
          <br />
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
