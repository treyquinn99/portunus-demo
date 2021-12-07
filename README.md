# Delivery Documentation

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation Guide
Note that the final goal is for Portunus to be accessible from the Internet (web application), so eventual end users will not have to go through this process. This install guide is for anyone interested in trying out Portunus in the meantime by running it on their local computer rather than navigating to a website.

### Prerequisites/Dependencies

We must first install the following pre-requisites/dependencies to run Portunus locally.
#### Node and npm
  >1)	Navigate to https://nodejs.org/en/.
  >2)	Select the download option that says Recommended for Most Users (LTS).
  >3)	Follow the instructions given by the Node Install Wizard.
  >4)	Upon completion, both Node and npm will be downloaded.
All dependencies will be automatically installed and handled by npm, so this is the only third party install we must go through.

### Download
We must now access the actual application code.
  >1)	Navigate to https://github.com/treyquinn99/portunus-demo/tree/master.
  >2)	Click the green Code dropdown button and select “Download ZIP”.
  >3)	Unzip the download to create the Portunus folder. 

### Installation 
We will now utilize pre-existing scripts to install the necessary components to run Portunus.
  >1)	Using a terminal window, change directory to the folder we created in the download section.
  >2)	In this folder, type the command `npm install` into the terminal and hit enter. This will install everything necessary to run the application.

### Running
We are now ready to launch the application
  >1)	The main folder has a subfolder named backend. In the open terminal window, change directory into backend, then type and run the command `npm start`. A message should indicate that a server is listening on port 3001 and MongoDB is connected.
  >2)	Open a second terminal window and navigate to the main folder. Run `npm start` in this folder as well. This will automatically launch the app in your browser at http://localhost:3000/portunus-demo. 

### Troubleshooting
Below are four common errors that could occur during the installation process. Causes and fixes provided.

#### 1) `Error: listen EADDRINUSE: address already in use :::3001`
  >Cause: Portunus is already running on an open terminal window, and the port on the local computer is therefore in use.\
  \
  >Fix: Find any open terminal window and control c to stop that instance of Portunus running. Then, repeat the running section in the instructions. Alternatively, use the instance of Portunus that is already running by navigating to http://localhost:3000/portunus-demo in any browser.


#### 2) `sh: react-scripts: command not found`
  >Cause: Tried to launch the application with `npm start` before running `npm install`, so scripts are not installed.\
  \
  >Fix: Run `npm install` in the same directory, and then continue with `npm start`.


#### 3) `ENOENT: no such file or directory, open '/Users/path/to/package.json'`

  >Cause: Tried to `npm install` in the wrong directory.\
  \
  >Fix: Change directory into the unzipped folder and continue with installation/running instructions.

#### 4) Browser launches but nothing happens when trying to create user or login

  >Cause: Frontend is started, but backend is not.\
  \
  >Fix: Open a terminal window, change directory into the backend folder, run `npm start`. This will start the backend.

## Release Notes version Portunus 1.0.0
### NEW FEATURES
>* Added ability create account and login.
>* Added ability to view, navigate, and search both Job Opportunity and Professional Development Opportunity directories.
>* Users can save both job opportunities and professional development opportunities to their profile.
>* Users can edit profile information at any time.

### BUG FIXES
>* Editing profile no longer logs the user out.
>* Creating an account after the first error messages such as “user already exists,” “enter a valid email address,” etc. now takes the user to their profile page.
>* Clicking user profile while not logged in no longer crashes the application
>* Selecting job opportunity or professional developement opportunity no longer crashes the application
>* Going directly from job directory to professional development directory no longer results in wrong header
### KNOWN BUGS

>* Searching for Job opportunities on the search bar, does not let user cannot access the job’s page.
>* After searching for an opportunity that does not exist on search bar, when the user enters existing opportunity again, the Autofill does not work.
>* Password is not masked when creating a new account.







