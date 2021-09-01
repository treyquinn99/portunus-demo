import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Container, Row } from 'react-bootstrap';
import logo from './logo-placeholder.png'
import profilePlaceholder from "./ProfilePlaceholder.png";
import portunusLogo from "./portunus_logo.png";

class NavigationBar extends React.Component {

  loadUserProfile() {
    ReactDOM.render(<ProfilePage />, document.getElementById('root'));
  }
  loadPDDirectory() {
    ReactDOM.render(<DirectoryScreen />, document.getElementById('root'));
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
            </div>
          </Row>
        </Container>
      </div>
    );
  }
}

function OpListing(props) {
  return (
    <div className='OpListing'>
                <img
                  width={100}
                  height={100}
                  src={logo}
                  alt='Picture of company logo'
                />
                <br />
                <p className="ListingInfo">
                  <b>{props.orgName}</b> <br />
                  {props.opType}
                </p>
    </div>

  );
}

function DirectoryScreen() {
    return (
    <div>
      <NavigationBar />
      <div className='DirectoryScreen'>
      <h1 className="PageHeader">Professional Development Opportunities</h1>
      <br />
      <div className="DirectoryList">
      <OpListing orgName='Internship Analytics Company' opType='Resume Boosting'/>
      <OpListing orgName='Interview Preparation Company' opType='Workshop'/>
      <OpListing orgName='Women in STEM' opType='Mentorship Program'/>
      <OpListing orgName='Career Analytics' opType='Career Coaching'/>
      </div>
      </div>
    </div>
    );
}

class ProfilePage extends React.Component {

  onClickHandler() {
    ReactDOM.render(<EditProfile />, document.getElementById('root'));
  }

  render () {
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
          <b>Johnny Appleseed</b>
          <br/>Junior, Computer Science
        <br />
        <br />
        </p>
          <button className="ProfileButton" onClick={this.onClickHandler} alt="Button to edit user profile.">Edit Profile</button>
          <button className="ProfileButton" alt="Button to view followed job lisings.">View Followed Jobs</button>
          <button className="ProfileButton" alt="Button to view followed professional development opportunities.">View Followed Opportunities</button>
          <button className="ProfileButton" alt="Button to log out.">Log Out</button>
        </div>
      </div>
    ); // end return
  } // end render()
} // end ProfilePage

class EditProfile extends React.Component {
  onClickHandler() {
    ReactDOM.render(<ProfilePage />, document.getElementById('root'));
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
    );
  } // end render()
} // end EditProfile

function App() {
  return (
    <div className='App'>
      <ProfilePage />
    </div>
  );
}

export default App;
